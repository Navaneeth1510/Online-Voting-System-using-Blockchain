import datetime
import hashlib
import json
from flask import Flask, jsonify, request
import os
from pymongo import MongoClient
from bson import ObjectId  


print("Current working directory:", os.getcwd())  


# Building the Blockchain
class Blockchain:
    def __init__(self, mongo_uri="mongodb+srv://NavaneethN:N%40va1510av%40N@mindmender.s2p1k4t.mongodb.net/Blockchain-EVoting?retryWrites=true&w=majority&appName=MindMender", db_name="votingDB", collection_name="Blockchain"):
        self.client = MongoClient(mongo_uri)
        self.db = self.client.get_default_database()
        self.collection = self.db[collection_name]
        self.chain = []
        
        # Load the chain from MongoDB collection
        if self.collection.count_documents({}) > 0:
            self.load_chain_from_mongodb()
        else:
            self.create_block(proof=1, previous_hash='0')  # this is the genesis block
    
    def load_chain_from_mongodb(self):
        # Load the chain from MongoDB
        records = self.collection.find().sort("index", 1)  
        self.chain = []
        for record in records:
            record_copy = {key: (str(value) if isinstance(value, ObjectId) else value) for key, value in record.items() if key != '_id'}
            self.chain.append(record_copy)
    
    def save_chain_to_mongodb(self):
        # empty the collection and then backup
        self.collection.delete_many({})  
        
        # Save each block into MongoDB
        for block in self.chain:
            block_copy = {key: value for key, value in block.items() if key != '_id'}
            self.collection.insert_one(block_copy)

    
    
    def create_block(self, proof, previous_hash):
        # Create a new block
        block = {
            'index': len(self.chain) + 1,
            'timestamp': str(datetime.datetime.now()),
            'proof': proof,
            'previous_hash': previous_hash,
        }
        self.chain.append(block)
        self.save_chain_to_mongodb()  # Save the blockchain to MongoDb
        return block
    
    def get_previous_block(self):
        return self.chain[-1]

    def proof_of_work(self, previous_proof):
        new_proof = 1
        check_proof = False
        while not check_proof:
            hash_operation = hashlib.sha256(
                str(new_proof**2 - previous_proof**2).encode()
            ).hexdigest()
            if hash_operation[:4] == '0000':  # leading zeroes
                check_proof = True
            else:
                new_proof += 1
        return new_proof
    
    def hash(self, block):
        block_copy = block.copy()
        for key, value in block_copy.items():
            if isinstance(value, ObjectId):  
                block_copy[key] = str(value) 

        # Return the SHA-256 hash of the block
        encoded_block = json.dumps(block_copy, sort_keys=True).encode()
        return hashlib.sha256(encoded_block).hexdigest()
        
    def is_chain_valid(self, chain):
        # Validate the blockchain
        previous_block = chain[0]
        block_index = 1
        while block_index < len(chain):
            block = chain[block_index]
            if block['previous_hash'] != self.hash(previous_block):
                return False  # Check if previous hash matches
            previous_proof = previous_block['proof']
            proof = block['proof']
            hash_operation = hashlib.sha256(
                str(proof**2 - previous_proof**2).encode()
            ).hexdigest()
            if hash_operation[:4] != '0000':  # Check proof-of-work
                return False
            previous_block = block
            block_index += 1
        return True

    def tamper_block_data(self, block_index, new_data):
        if 0 < block_index < len(self.chain):
            block = self.chain[block_index]

            new_data_copy = new_data.copy()
            for key, value in new_data_copy.items():
                if isinstance(value, ObjectId):
                    new_data_copy[key] = str(value)

            block['block_data'] = new_data_copy
            return block
        else:
            raise ValueError("Invalid block index")
        
    def restore_blockchain_from_backup(self):
        self.load_chain_from_mongodb()
        response={
            "message":"Blockchain restored successfully!"
        }
        return jsonify(response), 200 
    
    def reset_blockchain(self):
        self.chain = []  
        self.collection.delete_many({})
        self.save_chain_to_mongodb()


# Flask app
app = Flask(__name__)
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = False
from flask import Flask, jsonify, request
from flask_cors import CORS 

app = Flask(__name__)
CORS(app) 

CORS(app, resources={r"/*": {"origins": "http://onlinevotingsystem.com:5173"}})


blockchain = Blockchain() 



@app.route('/mine_block', methods=['POST'])
def mine_block():
    data = request.get_json()
    if not data or 'candidate_id' not in data or 'constituency_id' not in data or 'timestamp' not in data:
        return jsonify({'message': 'Invalid data: Missing candidate_id, constituency_id, or timestamp'}), 400
    
    candidate_id = data['candidate_id']
    timestamp = data['timestamp']
    constituency_id = data['constituency_id']

    previous_block = blockchain.get_previous_block()
    previous_proof = previous_block['proof']
    
    proof = blockchain.proof_of_work(previous_proof)  
    previous_hash = blockchain.hash(previous_block)  
    
    # new block is creted here
    block = blockchain.create_block(proof, previous_hash)  
    block['block_data'] = {
        'candidate_id': candidate_id,
        'timestamp': timestamp,
        'constituency_id': constituency_id,
    }

    blockchain.save_chain_to_mongodb()
    
    response = {
        'status':'true',
        'message': 'Block mined successfully!',
        'index': block['index'],
        'timestamp': block['timestamp'],
        'proof': block['proof'],
        'previous_hash': block['previous_hash'],
        'block_data': block['block_data'],
    }
    return jsonify(response), 200 

@app.route('/reset_blockchain', methods=['POST'])  
def reset_blockchain():
    for collection in blockchain.db.list_collection_names():
        blockchain.db[collection].delete_many({})
    blockchain.__init__()  
    return jsonify({'message': 'Blockchain reset and all collections emptied.'}), 200 


# retreive the entire blockchain
@app.route('/get_chain', methods=['GET'])
def get_chain():
    response = {
        'chain': blockchain.chain,
        'length': len(blockchain.chain),
    }
    return jsonify(response), 200


# validity
@app.route('/is_valid', methods=['GET'])
def is_valid():
    is_valid = blockchain.is_chain_valid(blockchain.chain)
    response = {
        'message': 'All good. The Blockchain is valid.' if is_valid else 'Navaneeth, we have a problem. The Blockchain is invalid.',
        'is_valid': is_valid,
    }
    return jsonify(response), 200


# tamper a particular blck
@app.route('/tamper_block', methods=['POST'])
def tamper_block():
    print("Tamper block endpoint was called.")  
    data = request.get_json()
    if not data or 'block_index' not in data or 'new_data' not in data:
        return jsonify({'message': 'Invalid data: Missing block_index or new_data'}), 400

    block_index = data['block_index']
    new_data = data['new_data']

    try:
        tampered_block = blockchain.tamper_block_data(block_index, new_data)

        response = {
            'message': 'Block tampered successfully!',
            'tampered_block': tampered_block,
        }
        return jsonify(response), 200
    except ValueError as e:
        return jsonify({'error': str(e)}), 400



# restring the blockain
@app.route('/restore_blockchain', methods=['POST'])
def restore_blockchain():
    try:
        blockchain.restore_blockchain_from_backup()
        return jsonify({"status":"true","message": "Blockchain restored from backup."}), 200
    except FileNotFoundError as e:
        return jsonify({"error": str(e)}), 404


# Run the Flask App
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5005)
