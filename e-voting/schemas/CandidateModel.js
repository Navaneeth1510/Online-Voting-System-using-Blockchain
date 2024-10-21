import mongoose from "mongoose"

const candiSchema = mongoose.Schema(
    {
        candidateID:{
            type:String,
            required: true,
            unique: true,
        },
        candidateName:{
            type:String,
            required: true,
        },
        constituencyID:{
            type:Number,
            required: true,
        },
        partyName:{
            type:String,
            required: true,
        },
        partyPic:{
            type:String,
            required:true,
        },
        candidatePic:{
            type:String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);


export const Candidate = mongoose.model('candidate', candiSchema);