import requests
import json
import csv
from bs4 import BeautifulSoup
from urllib.parse import quote
from concurrent.futures import ThreadPoolExecutor, as_completed

BASE_URL = "https://www.ibapi.in"
CERT_PATH = "./ibapi.crt"  # Adjust or set to None if no cert

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
    "Accept": "application/json, text/javascript, */*; q=0.01",
    "X-Requested-With": "XMLHttpRequest",
    "Origin": BASE_URL,
    "Referer": f"{BASE_URL}/sale_info_home.aspx",
    "Content-Type": "application/json; charset:utf8",
}

def get_session_cookies():
    session = requests.Session()
    print("[*] Getting home page to obtain session cookies...")
    resp = session.get(f"{BASE_URL}/sale_info_home.aspx", verify=CERT_PATH, headers=HEADERS)
    resp.raise_for_status()
    print(f"[+] Cookies acquired: {session.cookies.get_dict()}")
    return session

def get_all_banks(session):
    print("[*] Fetching all banks...")
    url = f"{BASE_URL}/Sale_Info_Home.aspx/fill_DropDownList_Bank"
    payload = {"state": "", "dist": "", "city": "", "property": "", "period": ""}
    resp = session.post(url, json=payload, headers=HEADERS, verify=CERT_PATH)
    resp.raise_for_status()
    banks = resp.json().get("d") or []
    print(f"[+] Banks found: {banks}")
    return banks

def search_properties(session, bank_name):
    print(f"[*] Searching properties for bank: {bank_name}")
    url = f"{BASE_URL}/Sale_Info_Home.aspx/Button_search_Click"
    payload = {"key_val": [["Bank", f"'{bank_name}'"]]}
    resp = session.post(url, json=payload, headers=HEADERS, verify=CERT_PATH)
    resp.raise_for_status()
    raw_data = resp.json().get("d")
    if raw_data:
        props = json.loads(raw_data)
        # Clean Property ID to extract text from HTML anchor tag
        for prop in props:
            raw_html = prop.get("Property ID", "")
            soup = BeautifulSoup(raw_html, "html.parser")
            prop["Property ID"] = soup.get_text(strip=True)
        return props
    return []

def fetch_property_detail(session, prop_id):
    url_detail = f"{BASE_URL}/Sale_Info_Home.aspx/bind_modal_detail"
    payload_detail = {"prop_id": prop_id}
    resp_detail = session.post(url_detail, json=payload_detail, headers=HEADERS, verify=CERT_PATH)
    resp_detail.raise_for_status()
    raw = resp_detail.json().get("d")
    if raw:
        details_list = json.loads(raw)
        if details_list:
            return details_list[0]
    return {}

def convert_paths_to_urls(raw_paths):
    urls = []
    for raw_path in raw_paths.split("^"):
        raw_path = raw_path.strip()
        if not raw_path:
            continue
        # Remove drive letter like "C:"
        if ":" in raw_path[:3]:
            raw_path = raw_path.split(":", 1)[1]
        # Replace backslashes with forward slashes and strip leading slash
        path = raw_path.replace("\\", "/").lstrip("/")
        # URL encode each path segment
        encoded_path = "/".join(quote(part) for part in path.split("/"))
        url = f"https://www.ibapi.in/{encoded_path}"
        urls.append(url)
    return urls

def fetch_media_urls(session, prop_id):
    url_media = f"{BASE_URL}/Sale_Info_Home.aspx/getCarouselData"
    payload_media = {"prop_id": prop_id}
    resp_media = session.post(url_media, json=payload_media, headers=HEADERS, verify=CERT_PATH)
    resp_media.raise_for_status()
    raw_media = resp_media.json().get("d", "")
    if raw_media:
        urls = convert_paths_to_urls(raw_media)
        return urls
    return []

def save_to_csv(all_properties, filename="bank_properties_detailed.csv"):
    if not all_properties:
        print("[!] No properties to save.")
        return
    keys = set()
    for d in all_properties:
        keys.update(d.keys())
    keys = sorted(keys)
    with open(filename, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=keys)
        writer.writeheader()
        writer.writerows(all_properties)
    print(f"[+] Saved {len(all_properties)} properties with details to '{filename}'")

def scrape_bank_properties(session, bank):
    try:
        props = search_properties(session, bank)
        if not props:
            print(f"  No properties found for {bank}")
            return []
        print(f"  Retrieved {len(props)} properties for {bank}")

        detailed_props = []
        for prop in props:
            prop_id = prop.get("Property ID")
            if not prop_id:
                continue
            detail = fetch_property_detail(session, prop_id)
            media_urls = fetch_media_urls(session, prop_id)
            if detail:
                prop.update(detail)
            prop["Media URLs"] = ", ".join(media_urls)
            detailed_props.append(prop)
        return detailed_props
    except Exception as e:
        print(f"  Error fetching properties for {bank}: {e}")
        return []

def main():
    session = get_session_cookies()
    banks = get_all_banks(session)
    if not banks:
        print("[!] No banks found, exiting.")
        return

    all_properties = []
    with ThreadPoolExecutor(max_workers=5) as executor:
        futures = {executor.submit(scrape_bank_properties, session, bank): bank for bank in banks}
        for future in as_completed(futures):
            bank = futures[future]
            try:
                props = future.result()
                all_properties.extend(props)
            except Exception as e:
                print(f"Error processing bank {bank}: {e}")

    save_to_csv(all_properties)

if __name__ == "__main__":
    main()
