import mongoose from "mongoose"

const voterSchema = mongoose.Schema(
    {
        voterID: {
            type: String,
            required: true,
            unique: true, 
        },
        Password:{
            type:String,
            required: true,
        },
        Name: {
            type: String,
            required: true,
        },
        Email: {
            type: String,
            required: true,
            unique: true,
            match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'], 
        },
        DOB: {
            type: String,
            required: true,
        },
        Address: {
            type: String,
            required: true,
        },
        ConstituencyID: {
            type: String,
            required: true,
        },
        VoterPic: {
            type: String, 
            required: true,
        },
        Status:{
            type:Number,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);


export const Voter = mongoose.model('voter', voterSchema);