import mongoose from "mongoose"

const constituencySchema = mongoose.Schema(
    {
        constituencyID: {
            type: Number,
            required: true,
            unique: true, 
        },
        Name: {
            type: String,
            required: true,
        },
        Details: {
            type: String,
            required: true,
        },
        constituencyPic: {
            type: String, 
            required: true,
        },
    }
);


export const Constituency = mongoose.model('constituency', constituencySchema);