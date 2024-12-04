import express from 'express';
import { Candidate } from '../CandidateModel.js'; 


const router = express.Router();

router.post('/', async (request, response) => {
    try {
        const candi = request.body; // Expecting an array of voter objects

        // Validate if the request body is an array
        if (!Array.isArray(candi)) {
            return response.status(400).send({ message: 'Request body must be an array of voters.' });
        }

        // Insert multiple voter records into the database
        const createdVoters = await Candidate.insertMany(candi);
        return response.status(201).send(createdVoters); // Return the created voters

    } catch (error) {
        console.log("error");
        return response.status(500).send("here"); // Send a 500 error for server issues
    }
});

router.get('/', async (request, response) => {
    try {
        const candi = await Candidate.find();
        return response.status(201).send(candi); // Return the created voters

    } catch (error) {
        console.log("error");
        return response.status(500).send("here"); // Send a 500 error for server issues
    }
});

export default router;