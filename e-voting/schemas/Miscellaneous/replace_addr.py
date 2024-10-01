import json
import random

# Sample addresses corresponding to each constituency ID
addresses_by_constituency = {
    "1": [
        "45, 6th Main Road, Subramanyapura, Bengaluru 560061",
        "12, 8th Cross, ISRO Layout, Bengaluru 560078",
        "22, 2nd Block, BEML Layout, Rajarajeshwari Nagar, Bengaluru 560098",
        "34, Uttarahalli Main Road, Bengaluru 560061",
        "10, Doddakallasandra, Kanakapura Road, Bengaluru 560062",
        "57, 9th Main, Banashankari Stage III, Bengaluru 560085",
        "18, 3rd Cross, Turahalli, Bengaluru 560061",
        "88, Annapoorneshwari Nagar, Uttarahalli, Bengaluru 560061",
        "16, Manjunatha Nagar, Chikkalasandra, Bengaluru 560061",
        "66, 5th Main, Vasanthapura, Bengaluru 560061"
    ],
    "2": [
        "101, 4th Block, Jayanagar, Bengaluru 560041",
        "78, 6th Cross, 3rd Block, Jayanagar, Bengaluru 560011",
        "19, South End Circle, Jayanagar, Bengaluru 560070",
        "32, 1st Main, 9th Block, Jayanagar, Bengaluru 560082",
        "65, East End Main Road, Jayanagar, Bengaluru 560069",
        "45, 36th Cross, Jayanagar 4th T Block, Bengaluru 560041",
        "11, 22nd Main Road, Jayanagar, Bengaluru 560070",
        "27, 2nd Cross, 2nd Block, Jayanagar, Bengaluru 560011",
        "9, 9th Main, 5th Block, Jayanagar, Bengaluru 560041",
        "54, 4th Cross, 6th Block, Jayanagar, Bengaluru 560041"
    ],
    "3": [
        "15, Bull Temple Road, Basavanagudi, Bengaluru 560004",
        "28, DVG Road, Basavanagudi, Bengaluru 560004",
        "42, 5th Main Road, Gandhi Bazaar, Bengaluru 560004",
        "60, 2nd Cross, NR Colony, Bengaluru 560019",
        "78, Hanumanthnagar, Bengaluru 560019",
        "35, 6th Main, Thyagaraja Nagar, Bengaluru 560028",
        "14, MN Krishna Rao Road, Basavanagudi, Bengaluru 560004",
        "67, 8th Cross, Gavipuram, Bengaluru 560019",
        "20, 4th Cross, Katriguppe Main Road, Bengaluru 560028",
        "50, 3rd Block, Hanumantha Nagar, Bengaluru 560019"
    ],
    "4": [
        "32, 2nd Cross, Kumaraswamy Layout, Bengaluru 560078",
        "101, 9th Main Road, Kadirenahalli, Bengaluru 560070",
        "15, 8th Cross, Chikkalasandra, Bengaluru 560061",
        "40, 5th Main, Banashankari Stage II, Bengaluru 560070",
        "67, 3rd Block, Srinivasa Nagar, Bengaluru 560050",
        "9, 4th Cross, Gowdanapalya, Bengaluru 560061",
        "88, 2nd Main, Maruthi Nagar, Bengaluru 560061",
        "14, 5th Cross, Padmanabhanagar, Bengaluru 560070",
        "56, Thyagaraja Nagar, Bengaluru 560028",
        "24, 9th Main, Padmanabhanagar, Bengaluru 560061"
    ],
    "5": [
        "12, Avenue Road, Chickpet, Bengaluru 560053",
            "35, Old Market Road, Chickpet, Bengaluru 560053",
            "57, Kalasipalya, Bengaluru 560053",
            "44, Balepet, Chickpet, Bengaluru 560053",
            "11, Chickpet Main Road, Bengaluru 560053",
            "29, 2nd Cross, Cubbonpete, Bengaluru 560002",
            "6, Kumbarpet, Chickpet, Bengaluru 560002",
            "48, 1st Cross, Nagarathpet, Bengaluru 560002",
            "73, 4th Cross, Chikpet, Bengaluru 560002",
            "89, Avenue Road, Bengaluru 560053"
    ],
    "6": [
        "18, 3rd Main, Rajajinagar 1st Block, Bengaluru 560010",
            "102, 4th Cross, West of Chord Road, Bengaluru 560010",
            "56, 5th Main, Rajajinagar 4th Block, Bengaluru 560010",
            "22, 2nd Cross, Dr. Rajkumar Road, Bengaluru 560010",
            "9, 9th Main, Rajajinagar 2nd Block, Bengaluru 560010",
            "67, 8th Cross, Mahalakshmi Layout, Bengaluru 560086",
            "35, 5th Main, Basaveshwaranagar, Bengaluru 560079",
            "44, 6th Main, Manjunath Nagar, Bengaluru 560010",
            "12, 9th Cross, Nandini Layout, Bengaluru 560096",
            "81, 4th Cross, Rajajinagar Industrial Area, Bengaluru 560044"
    ],
    "7": [
        "17, Outer Ring Road, Hebbal, Bengaluru 560024",
            "45, 2nd Cross, Amruthahalli, Bengaluru 560092",
            "63, Ganganagar, Bengaluru 560032",
            "23, 8th Main Road, RT Nagar, Bengaluru 560032",
            "12, Bellary Road, Hebbal, Bengaluru 560024",
            "33, 3rd Main, Kempapura, Bengaluru 560024",
            "50, Sanjaynagar, Bengaluru 560094",
            "5, 4th Cross, Sahakarnagar, Bengaluru 560092",
            "27, 6th Main, Bhoopasandra, Bengaluru 560094",
            "77, 1st Cross, Byatarayanapura, Bengaluru 560092"
    ],
    "8": [
        "99, Infantry Road, Shivajinagar, Bengaluru 560001",
            "44, Commercial Street, Shivajinagar, Bengaluru 560001",
            "27, Bowring Hospital Road, Shivajinagar, Bengaluru 560001",
            "65, Cubbon Road, Shivajinagar, Bengaluru 560001",
            "23, Tasker Town, Bengaluru 560051",
            "18, Frazer Town, Bengaluru 560005",
            "37, Seppings Road, Shivajinagar, Bengaluru 560001",
            "12, Wheeler Road, Cox Town, Bengaluru 560005",
            "47, 2nd Cross, Bamboo Bazaar, Bengaluru 560001",
            "19, Veerapillai Street, Shivajinagar, Bengaluru 560001"
    ],
    "9": [
        "21, 8th Main, Malleshwaram, Bengaluru 560003",
            "53, Margosa Road, Malleshwaram, Bengaluru 560003",
            "14, 15th Cross, Malleshwaram, Bengaluru 560003",
            "88, Sampige Road, Malleshwaram, Bengaluru 560003",
            "36, 5th Main, Malleshwaram West, Bengaluru 560055",
            "101, 18th Cross, Malleshwaram, Bengaluru 560003",
            "66, 11th Cross, Malleshwaram, Bengaluru 560003",
            "22, Link Road, Malleshwaram, Bengaluru 560003",
            "45, 6th Main, Malleshwaram, Bengaluru 560003",
            "74, 9th Cross, Malleshwaram, Bengaluru 560003"
    ],
    "10": [
        "34, Tumkur Road, Yeshwanthpur, Bengaluru 560022",
        "12, 8th Main, Mathikere, Bengaluru 560054",
        "45, HMT Layout, Bengaluru 560054",
        "9, 5th Cross, Yeshwanthpur, Bengaluru 560022",
        "101, 1st Cross, Muthyalanagar, Bengaluru 560054",
        "56, Dr. Rajkumar Road, Rajajinagar Industrial Area, Bengaluru 560022",
        "88, 3rd Main, Gokula Extension, Bengaluru 560054",
        "44, Yeshwanthpur Industrial Area, Bengaluru 560022",
        "67, 9th Cross, Peenya 2nd Stage, Bengaluru 560058",
        "22, MS Palya, Yeshwanthpur, Bengaluru 560054"	
    ]
    # Add more constituencies and addresses as needed (up to 10 constituencies)
}

# Load the voter records from a JSON file
with open('e-voting/src/Miscellaneous/voters.json', 'r') as f:
    voters = json.load(f)

# Dictionary to track used addresses
used_addresses = {k: [] for k in addresses_by_constituency.keys()}

# Function to get a unique address from the available list
def get_unique_address(constituency_id):
    available_addresses = addresses_by_constituency[constituency_id]
    unused_addresses = [addr for addr in available_addresses if addr not in used_addresses[constituency_id]]
    if not unused_addresses:
        raise ValueError(f"All addresses for constituency {constituency_id} have been used.")
    selected_address = random.choice(unused_addresses)
    used_addresses[constituency_id].append(selected_address)
    return selected_address

# Iterate through voter records and replace addresses
for voter in voters:
    constituency_id = str(voter['ConstituencyID'])
    if constituency_id in addresses_by_constituency:
        voter['Address'] = get_unique_address(constituency_id)

# Save the updated voter records back to a JSON file
with open('updated_voters.json', 'w') as f:
    json.dump(voters, f, indent=4)

print("Voter records updated with new addresses.")
