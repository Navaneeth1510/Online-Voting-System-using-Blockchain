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

export default router;
