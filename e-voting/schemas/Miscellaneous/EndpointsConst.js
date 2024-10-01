import express from 'express';
import { Constituency } from '../ConstituencyModel.js'; 


const router = express.Router();

router.post('/', async (request, response) => {
    try {
        const voters = request.body; // Expecting an array of voter objects

        // Validate if the request body is an array
        if (!Array.isArray(voters)) {
            return response.status(400).send({ message: 'Request body must be an array of voters.' });
        }

        // Insert multiple voter records into the database
        const createdVoters = await Constituency.insertMany(voters);
        return response.status(201).send(createdVoters); // Return the created voters

    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message }); // Send a 500 error for server issues
    }
});

export default router;