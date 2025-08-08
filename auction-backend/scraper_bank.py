from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait, Select
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
import json
import csv
import time


# 1. Load the list of desired state names from text file
with open('states.txt', 'r', encoding='utf-8') as f:
    states = [line.strip() for line in f if line.strip()]


chrome_options = Options()
chrome_options.add_argument('--headless')
driver = webdriver.Chrome(options=chrome_options)
wait = WebDriverWait(driver, 20)


all_properties = []


driver.get('https://www.ibapi.in/sale_info_home.aspx')


for state in states:
    print(f"Processing state: {state}")
    try:
        Select(driver.find_element(By.ID, 'DropDownList_State')).select_by_visible_text(state)
        time.sleep(2.5)  # Let district/city dropdowns update
        Select(driver.find_element(By.ID, 'DropDownList_Bank')).select_by_visible_text('All Banks')
        for _ in range(8):
            try:
                dist_select = Select(driver.find_element(By.ID, 'DropDownList_District'))
                dist_select.select_by_visible_text('All Districts')
                break
            except Exception:
                time.sleep(0.5)
        for _ in range(8):
            try:
                city_select = Select(driver.find_element(By.ID, 'DropDownList_City'))
                city_select.select_by_visible_text('All Cities')
                break
            except Exception:
                time.sleep(0.5)
        Select(driver.find_element(By.ID, 'DropDownList_Property_Type')).select_by_visible_text('All Properties')


        # Accept T&C if not already ticked
        checkbox = driver.find_element(By.ID, 'chk_term')
        if not checkbox.is_selected():
            checkbox.click()


        search_btn = driver.find_element(By.ID, 'Button_search')
        search_btn.click()


        try:
            wait.until(EC.visibility_of_element_located((By.ID, 'tbl_search')))
        except Exception:
            try:
                alert = driver.switch_to.alert
                print(f"Alert for {state}: {alert.text}")
                alert.accept()
            except Exception:
                pass
            continue


        for _ in range(12):
            rows = driver.find_elements(By.CSS_SELECTOR, '#tbl_search tbody tr')
            if len(rows) > 0:
                break
            time.sleep(1)


        for row in rows:
            cells = row.find_elements(By.TAG_NAME, 'td')
            if len(cells) >= 11:
                all_properties.append({
                    "property_id": cells[0].text.strip(),
                    "bank_name": cells[1].text.strip(),
                    "property": cells[2].text.strip(),
                    "reserve_price": cells[3].text.strip(),
                    "emd": cells[4].text.strip(),
                    "emd_last_date": cells[5].text.strip(),
                    "auction_start_date": cells[6].text.strip(),
                    "auction_end_date": cells[7].text.strip(),
                    "state": cells[8].text.strip(),
                    "district": cells[9].text.strip(),
                    "city": cells[10].text.strip()
                })
    except Exception as e:
        print(f"Error for {state}: {str(e)}")
        continue


driver.quit()


# Save as JSON (optional)
with open('ibapi_all_states_properties.json', 'w', encoding='utf-8') as f:
    json.dump(all_properties, f, ensure_ascii=False, indent=2)
print(f"Scraped {len(all_properties)} properties across all states and saved JSON.")


# Save as CSV for Supabase import
csv_columns = [
    "property_id", "bank_name", "property", "reserve_price", "emd",
    "emd_last_date", "auction_start_date", "auction_end_date",
    "state", "district", "city"
]


csv_file = "ibapi_all_states_properties.csv"
try:
    with open(csv_file, 'w', encoding='utf-8', newline='') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=csv_columns)
        writer.writeheader()
        for data in all_properties:
            writer.writerow(data)
    print(f"CSV file {csv_file} written successfully. Ready for Supabase import.")
except IOError as e:
    print(f"I/O error({e.errno}): {e.strerror}")
