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

router.get('/', async (request, response) => {
    try {
        const candidates = await Candidate.find(); 
        if (!candidates || candidates.length === 0) {
            return response.status(404).json({ message: 'Candidates not found' });
        }

        let counter = 1;
        const formattedData = {};

        // Iterate through candidates and structure by constituencyID
        for (const candidate of candidates) {
            const constituencyID = candidate.constituencyID;
            console.log(constituencyID)

            // Make API call to fetch constituency name
            const constituencyResponse = await fetch(`http://localhost:5000/const/${constituencyID}`);
            // const votingPercentage = await fetch(`http://localhost:5000/blockchain/voting_percentage/${constituencyID}`);
            // Check if the response is successful
            if (!constituencyResponse.ok) {
                throw new Error('Failed to fetch constituency data');
            }

            // Parse the JSON response
            const constituencyData = await constituencyResponse.json();
            const constituencyName = constituencyData.Name;  // Access the 'Name' property
            const constiDetails = constituencyData.Details;
            console.log(constituencyName)

            if (!formattedData[constituencyID]) {
                formattedData[constituencyID] = {
                    constituencyID: constituencyID.toString(),
                    constituencyName: constituencyName, 
                    details:constiDetails,
                    candidates: [],
                };
            }

            formattedData[constituencyID].candidates.push({
                candidateID: candidate.candidateID,
                candidateName: candidate.candidateName,
                partyName: candidate.partyName,
                partyPic: candidate.partyPic,
                candidatePic: candidate.candidatePic,
                votes: counter, // Use counter as votes
            });

            counter += 1;
        }

        const result = Object.values(formattedData);

        return response.status(200).json(result);
    } catch (err) {
        console.error(err.message);
        response.status(500).json({ message: 'Internal Server Error' });
    }
});




export default router;
