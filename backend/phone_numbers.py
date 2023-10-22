import csv
import random
import faker  # You may need to install the 'Faker' library: pip install Faker

# Initialize the Faker library for generating random names
fake = faker.Faker()

# Function to generate a random phone number with area code
def generate_phone_number():
    area_code = random.randint(100, 999)
    central_office_code = random.randint(100, 999)
    line_number = random.randint(1000, 9999)
    return f'+1{area_code}{central_office_code}{line_number}'

# Number of name-phone pairs to generate
num_entries = 50

# Create and write to the CSV file
with open('data/random_name_phone.csv', mode='w', newline='') as file:
    writer = csv.writer(file)
    
    # Write the headers
    writer.writerow(['Name', 'Number'])
    
    # Generate and write name-phone pairs
    for _ in range(num_entries):
        name = fake.name()
        phone_number = generate_phone_number()
        writer.writerow([name, phone_number])

print(f'{num_entries} random name-phone pairs with area codes have been generated and saved to "random_name_phone.csv".')

