import pandas as pd

# Change these to your actual CSV filenames
csv1 = pd.read_csv('ibapi_properties_by_bank.csv')
csv2 = pd.read_csv('merged_output.csv')

merged = pd.concat([csv1, csv2], ignore_index=True)
merged_unique = merged.drop_duplicates(subset=['property_id'])

merged_unique.to_csv('merged_output.csv', index=False)
print("Merged CSV files! Output saved as merged_output.csv")
