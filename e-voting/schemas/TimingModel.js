import mongoose from "mongoose";

const TimingSchema = mongoose.Schema({
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    }
});

export const Timing = mongoose.model('Timing', TimingSchema);
