import express from 'express';
import mongoose from 'mongoose';
import { mongoDBURL, PORT } from './MongoDB.js';
import { Constituency } from '../schemas/ConstituencyModel.js';

const router = express.Router();

mongoose.connect(mongoDBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log('Failed to connect to MongoDB:', err.message));

// Route to get voter by VoterID and Password
router.get('/:id', async (request, response) => {
    try {
        const { id, pass } = request.params;
        const voter = await Constituency.findOne({ constituencyID : id });
        if (!voter) {
            return response.status(404).json({ message: 'Constituency not found' });
        }
        return response.status(200).send(voter);
    } catch (err) {
        console.log(err.message);
        response.status(500).send({ message: err.message });
    }
});

export default router;
