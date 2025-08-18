import pandas as pd

# Mapping from raw CSV columns to clean column names
COLUMN_MAP = {
    "PROPERTY_ID": "property_id",
    "Property ID": "property_id",
    "BANK_NAME": "bank_name",
    "Bank Name": "bank_name",
    "BRANCH_NAME": "branch_name",
    "Branch": "branch_name",
    "STATE_NAME": "state",
    "State": "state",
    "DISTRICT_NAME": "district",
    "District": "district",
    "CITY": "city",
    "City": "city",
    "RESERVE_PRICE": "reserve_price_rs",
    "Reserve Price (Rs)": "reserve_price_rs",
    "EMD": "emd_rs",
    "EMD (Rs)": "emd_rs",
    "EMD_LAST_DATE": "emd_last_date",
    "EMD Last Date & Time": "emd_last_date",
    "AUCTION_OPEN_DATE": "auction_open_date",
    "Auction Start Date & Time": "auction_open_date",
    "AUCTION_CLOSE_DATE": "auction_close_date",
    "Auction End Date & Time": "auction_close_date",
    "SEALED_BID_LASTDATE": "sealed_bid_last_date",
    "SEALED_BID_EXTENDED_DATE": "sealed_bid_extended_date",
    "BORROWER_NAME": "borrower_name",
    "BORROWER_CIF": "borrower_cif",
    "OWNER_NAME": "owner_name",
    "OWNERSHIP": "ownership_type",
    "SUMMARY_DESC": "summary_description",
    "PROPERTY_NAME": "property_type",
    "Property": "property_type",
    "PROPERTY_SUB_TYPE_NAME": "property_sub_type",
    "DEED_NAME": "type_of_title_deed",
    "POSSESSION_NAME": "status_of_possession",
    "NEAREST_AIR_RLY_BUS": "nearest_airport_railway_bus",
    "AO_DETAIL": "authorised_officer_detail",
    "IFSC_CODE": "ifsc_code",
    "PINCODE": "pincode",
    "CLICK_COUNT": "click_count",
    "ROWID": "rowid",
    "BIDDING_URL": "bidding_url",
    "COORDINATE_LATITUDE": "coordinate_latitude",
    "COORDINATE_LONGITUDE": "coordinate_longitude",
    "OWNERSHIP_CODE": "ownership_code",
    "PROPERTY_CODE": "property_code",
    "PROPERTY_CODE1": "property_code",
    "MSTC_STATUS": "mstc_status",
    "Media URLs": "media_urls",
}

def clean_csv_columns(input_csv_path, output_csv_path):
    # Read original CSV
    df = pd.read_csv(input_csv_path)

    # Rename columns based on mapping, ignore columns not in mapping
    rename_dict = {col: COLUMN_MAP[col] for col in df.columns if col in COLUMN_MAP}
    df = df.rename(columns=rename_dict)

    # Optional: Drop columns not in mapping (uncomment if needed)
    # df = df[list(rename_dict.values())]

    # Save cleaned CSV
    df.to_csv(output_csv_path, index=False)
    print(f"Saved cleaned CSV to {output_csv_path}")

if __name__ == "__main__":
    input_csv = "bank_properties_detailed.csv"  # Change to your source CSV filename
    output_csv = "cleaned_properties.csv"
    clean_csv_columns(input_csv, output_csv)
