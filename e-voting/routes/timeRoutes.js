import express from 'express';
import mongoose from 'mongoose';
import { mongoDBURL, PORT } from './MongoDB.js';
import { Timing } from '../schemas/TimingModel.js';

const router = express.Router();

mongoose.connect(mongoDBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log('Failed to connect to MongoDB:', err.message));

// Route to get time of election
router.get('/', async (request, response) => {
    try {
        const admin = await Timing.findOne();
        if (!admin) {
            return response.status(404).json({ message: 'None scheduled' });
        }
        return response.status(200).send(admin);
    } catch (err) {
        console.log(err.message);
        response.status(500).send({ message: err.message });
    }
});
const convertToIST = (date) => {
    const offset = 5.5 * 60 * 60 * 1000; 
    return new Date(date.getTime() + offset); 
};

router.post('/schedule', async(request, response)=>{
    try{
        let schedule = request.body;
        schedule.startTime = convertToIST(new Date(schedule.startTime));
        schedule.endTime = convertToIST(new Date(schedule.endTime));
        const del = await Timing.deleteMany({});
        const res = await Timing.create(schedule);
        if(res){
            response.status(200).send({ message: 'Schedule updated successfully!' });
        }else{
            response.status(400).send({ message: 'Schedule updated failed!' });
        }        
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;
