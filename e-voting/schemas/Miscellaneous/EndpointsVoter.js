import express from 'express';
import { Voter } from '../VoterModel.js'; 

const router = express.Router();


router.post('/', async (request, response) => {
    try {
        const voters = request.body; // Expecting an array of voter objects

        // Validate if the request body is an array
        if (!Array.isArray(voters)) {
            return response.status(400).send({ message: 'Request body must be an array of voters.' });
        }

        // Validate each voter object in the array
        for (const voter of voters) {
            if (!voter.voterID || !voter.Name || !voter.Email || !voter.DOB || 
                !voter.Address || !voter.ConstituencyID || !voter.VoterPic) {
                return response.status(400).send({ message: 'All fields are required for each voter.' });
            }
        }

        // Insert multiple voter records into the database
        const createdVoters = await Voter.insertMany(voters);
        return response.status(201).send(createdVoters); // Return the created voters

    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message }); // Send a 500 error for server issues
    }
});


export default router;