import json

# Load voters and passwords from JSON files
with open('e-voting/schemas/Miscellaneous/voters.json', 'r') as voters_file:
    voters = json.load(voters_file)

with open('e-voting/schemas/Miscellaneous/Passwords.json', 'r') as passwords_file:
    passwords = json.load(passwords_file)

# Check if there are enough passwords for each voter
if len(voters) > len(passwords):
    print("Error: Not enough passwords for all voters.")
else:
    # Assign a unique password to each voter
    for i, voter in enumerate(voters):
        voter['Password'] = passwords[i]

    # Save updated voters data to a new file
    with open('UpdatedVoters.json', 'w') as updated_voters_file:
        json.dump(voters, updated_voters_file, indent=2)

    print("UpdatedVoters.json has been created successfully.")
