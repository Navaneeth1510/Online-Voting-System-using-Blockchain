import json

# Reloading the file content for processing
file_path = 'e-voting/src/voters.json'

# Load and parse the file content
with open(file_path, 'r') as file:
    data = json.load(file)

# Function to check for duplicate voterID and Email, and make them unique if found
def check_and_modify_duplicates(data):
    voter_ids = {}
    emails = {}
    updated_data = []

    for entry in data:
        voter_id = entry['voterID']
        email = entry['Email']
        
        # Check for duplicate voterID
        if voter_id in voter_ids:
            new_voter_id = voter_id
            counter = 1
            # Ensure uniqueness by appending numbers if necessary
            while new_voter_id in voter_ids:
                new_voter_id = voter_id + f'_{counter}'
                counter += 1
            entry['voterID'] = new_voter_id
        voter_ids[entry['voterID']] = True

        # Check for duplicate email
        if email in emails:
            new_email = email
            counter = 1
            # Ensure uniqueness by appending numbers if necessary
            while new_email in emails:
                at_index = email.index('@')
                new_email = email[:at_index] + f'{counter}' + email[at_index:]
                counter += 1
            entry['Email'] = new_email
        emails[entry['Email']] = True
        
        updated_data.append(entry)

    return updated_data

# Run the function and get updated data
updated_data = check_and_modify_duplicates(data)
print('hi')
var = updated_data[:5]  # Show the first few entries for verification
print(var)
