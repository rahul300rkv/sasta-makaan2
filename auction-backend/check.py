import csv

input_file = 'cleaned_properties.csv'
output_file = 'output_unique_headers.csv'

with open(input_file, newline='', encoding='utf-8') as infile, \
     open(output_file, 'w', newline='', encoding='utf-8') as outfile:

    reader = csv.reader(infile)
    writer = csv.writer(outfile)

    headers = next(reader)
    seen = {}
    new_headers = []

    for h in headers:
        if h not in seen:
            seen[h] = 0
            new_headers.append(h)
        else:
            seen[h] += 1
            new_headers.append(f"{h}_{seen[h]}")

    writer.writerow(new_headers)
    for row in reader:
        writer.writerow(row)

print(f"New CSV saved to {output_file} with unique headers.")
