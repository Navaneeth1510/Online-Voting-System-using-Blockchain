import express from 'express';
import mongoose from 'mongoose';
import { mongoDBURL, PORT } from './MongoDB.js';
import { Voter } from '../schemas/VoterModel.js';

const router = express.Router();

mongoose.connect(mongoDBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log('Failed to connect to MongoDB:', err.message));

// Route to get voter by VoterID and Password
router.get('/:id/:pass', async (request, response) => {
    try {
        const { id, pass } = request.params;
        const voter = await Voter.findOne({ voterID: id, Password: pass });
        if (!voter) {
            return response.status(404).json({ message: 'Voter not found' });
        }
        return response.status(200).send(voter);
    } catch (err) {
        console.log(err.message);
        response.status(500).send({ message: err.message });
    }
});

router.get('/emails', async (req, res) => {
    try {
        // Fetch all voters and return only the Email field
        const voters = await Voter.find({}, 'Email Name');
        res.json(voters);
    } catch (error) {
        console.error('Error fetching voter emails:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/update/:id/:pass', async (request, response) => {
    try {
        const { id, pass } = request.params;
        const voter = await Voter.findOneAndUpdate(
            { voterID: id, Password: pass }, 
            { $set: { Status: 1 } }, 
            { new: true } 
        );        
        if (!voter) {
            return response.status(404).json({ message: 'Voter not found' });
        }
        return response.status(200).send(voter);
    } catch (err) {
        console.log(err.message);
        response.status(500).send({ message: err.message });
    }
});

router.get('/reset', async (request, response) => {
    try {
        const { id, pass } = request.params;
        const result = await Voter.updateMany(
            {}, 
            { $set: { Status: 0 } } 
        );
        if (result.modifiedCount === 0) {
            return response.status(404).json({ message: 'No records updated' });
        }  
        try{
            const res = await fetch('http://127.0.0.1:5000/blockchain/reset_blockchain', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if(res.ok){
                return response.status(200).json({ message: 'All voters updated to status 0 & blockchain is also reseted', status:200 });
            }
        }   
        catch(error){
            console.log(error.message);
            response.status(500).send({ message: error.message, status:500 });        
        }       
    } catch (err) {
        console.log(err.message);
        response.status(500).send({ message: err.message, status:500 });
    }
});



export default router;
