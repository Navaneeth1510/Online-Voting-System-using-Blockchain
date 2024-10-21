import express from 'express';
import mongoose from 'mongoose';
import { mongoDBURL, PORT } from './MongoDB.js';
import {Candidate} from '../schemas/CandidateModel.js';

const router = express.Router();

mongoose.connect(mongoDBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log('Failed to connect to MongoDB:', err.message));

// Route to get candi by constituencyID and Password
router.get('/:id', async (request, response) => {
    try {
        const {id} = request.params;
        const candi = await Candidate.find({constituencyID:id});
        if (!candi) {
            return response.status(404).json({ message: 'Candidates not found' });
        }
        return response.status(200).send(candi);
    } catch (err) {
        console.log(err.message);
        response.status(500).send({ message: err.message });
    }
});

export default router;
