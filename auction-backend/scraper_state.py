from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait, Select
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
import json
import csv
import time

with open('states.txt', 'r', encoding='utf-8') as f:
    states = [line.strip() for line in f if line.strip()]

def scrape_state(state):
    chrome_options = Options()
    # chrome_options.add_argument('--headless')  # Uncomment for background execution
    chrome_options.add_argument('--disable-gpu')
    driver = webdriver.Chrome(options=chrome_options)
    wait = WebDriverWait(driver, 20)
    properties = []

    try:
        driver.get('https://www.ibapi.in/sale_info_home.aspx')
        time.sleep(4)

        # 1. Select State
        state_elem = wait.until(EC.element_to_be_clickable((By.ID, 'DropDownList_State')))
        Select(state_elem).select_by_visible_text(state)
        time.sleep(2)  # Let page refresh

        # 2. Check Terms and Conditions checkbox
        term_elem = driver.find_element(By.ID, 'chk_term')
        if not term_elem.is_selected():
            term_elem.click()
        time.sleep(1)

        # 3. Click Search button
        driver.find_element(By.ID, 'Button_search').click()
        time.sleep(8)

        # Handle alert if present
        try:
            alert = driver.switch_to.alert
            print(f"Alert for {state}:", alert.text)
            alert.accept()
            return []
        except Exception:
            pass

        # Extract property details from popup modal for each row, handle pagination
        while True:
            rows = driver.find_elements(By.CSS_SELECTOR, '#tbl_search tbody tr')
            print(f"{state}: Found {len(rows)} rows.")
            if len(rows) == 0:
                break

            for row in rows:
                cells = row.find_elements(By.TAG_NAME, 'td')
                if len(cells) < 11:
                    continue
                property_id_table = cells[0].text.strip()
                try:
                    row.click()
                    wait.until(EC.visibility_of_element_located((By.ID, 'modal_detail')))
                    wait.until(lambda d: d.find_element(By.ID, 'lbl_view_prop_id').text.strip() != '')

                    property_id_modal = driver.find_element(By.ID, 'lbl_view_prop_id').text.strip()
                    if property_id_modal != property_id_table:
                        driver.find_element(By.CSS_SELECTOR, '#modal_detail .modal-header .close').click()
                        wait.until(EC.invisibility_of_element_located((By.ID, 'modal_detail')))
                        continue

                    # Scrape all details in modal
                    details = {
                        "property_id": property_id_modal,
                        "bank_name": driver.find_element(By.ID, 'spn_bank_name').text.strip(),
                        "branch_name": driver.find_element(By.ID, 'spn_br_name').text.strip(),
                        "state": driver.find_element(By.ID, 'spn_state').text.strip(),
                        "district": driver.find_element(By.ID, 'spn_district').text.strip(),
                        "reserve_price_rs": driver.find_element(By.ID, 'spn_rsrv_price').text.strip(),
                        "emd_rs": driver.find_element(By.ID, 'spn_emd').text.strip(),
                        "emd_last_date": driver.find_element(By.ID, 'spn_emd_last_dt').text.strip(),
                        "city": driver.find_element(By.ID, 'spn_city').text.strip(),
                        "borrower_name": driver.find_element(By.ID, 'spn_borrower').text.strip(),
                        "owner_name": driver.find_element(By.ID, 'spn_owner').text.strip(),
                        "ownership_type": driver.find_element(By.ID, 'spn_ownership').text.strip(),
                        "summary_description": driver.find_element(By.ID, 'spn_sumry_desc').text.strip(),
                        "property_type": driver.find_element(By.ID, 'spn_property_type').text.strip(),
                        "property_sub_type": driver.find_element(By.ID, 'spn_property_sub_type').text.strip(),
                        "type_of_title_deed": driver.find_element(By.ID, 'spn_deed').text.strip(),
                        "status_of_possession": driver.find_element(By.ID, 'spn_possession').text.strip(),
                        "auction_open_date": driver.find_element(By.ID, 'spn_auctn_start_dt').text.strip(),
                        "auction_close_date": driver.find_element(By.ID, 'spn_auctn_end_dt').text.strip(),
                        "sealed_bid_last_date": driver.find_element(By.ID, 'spn_bid_last_dt').text.strip(),
                        "sealed_bid_extended_date": driver.find_element(By.ID, 'spn_bid_extd_dt').text.strip(),
                        "address": driver.find_element(By.ID, 'spn_address').text.strip(),
                        "nearest_airport_railway_bus": driver.find_element(By.ID, 'spn_dist_air_rly').text.strip(),
                        "authorised_officer_detail": driver.find_element(By.ID, 'spn_ao_detail').text.strip(),
                    }

                    properties.append(details)
                    # Close popup
                    driver.find_element(By.CSS_SELECTOR, '#modal_detail .modal-header .close').click()
                    wait.until(EC.invisibility_of_element_located((By.ID, 'modal_detail')))
                except Exception as inner_e:
                    print(f"{state}: Error reading modal for property {property_id_table}: {inner_e}")
                    continue

            # Pagination (next page)
            try:
                next_btn = driver.find_element(By.XPATH, "//a[contains(text(),'Next')]")
                if next_btn.get_attribute('aria-disabled') == 'true' or 'disabled' in next_btn.get_attribute('class'):
                    break
                next_btn.click()
                print(f"{state}: Next page clicked")
                time.sleep(5)
            except Exception:
                print(f"{state}: No more next button.")
                break

    except Exception as e:
        print(f"{state}: Error - {e}")
    finally:
        driver.quit()
    return properties

all_properties = []
for state in states:
    props = scrape_state(state)
    all_properties.extend(props)

# Save to JSON/CSV
with open('ibapi_full_properties_from_popup.json', 'w', encoding='utf-8') as f:
    json.dump(all_properties, f, ensure_ascii=False, indent=2)
print(f"Scraped {len(all_properties)} properties and saved all popup fields as JSON.")

csv_columns = [
    "property_id", "bank_name", "branch_name", "state", "district", "reserve_price_rs", "emd_rs",
    "emd_last_date", "city", "borrower_name", "owner_name", "ownership_type", "summary_description",
    "property_type", "property_sub_type", "type_of_title_deed", "status_of_possession",
    "auction_open_date", "auction_close_date", "sealed_bid_last_date", "sealed_bid_extended_date",
    "address", "nearest_airport_railway_bus", "authorised_officer_detail"
]

csv_file = "ibapi_full_properties_from_popup.csv"
try:
    with open(csv_file, 'w', encoding='utf-8', newline='') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=csv_columns)
        writer.writeheader()
        for data in all_properties:
            writer.writerow(data)
    print(f"CSV file {csv_file} written successfully.")
except IOError as e:
    print(f"I/O error({e.errno}): {e.strerror}")
