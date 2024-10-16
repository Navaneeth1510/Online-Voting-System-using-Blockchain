import mongoose from "mongoose"

const adminSchema = mongoose.Schema(
    {
        adminID: {
            type: String,
            required: true,
            unique: true, 
        },
        Password:{
            type: String,
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
        },
        DOB: {
            type: Date,
            required: true,
        },
        Address: {
            type: String,
            required: true,
        },
        AdminPic: {
            type: String, 
            required: true,
        },
        isAdmin:{
            type: Boolean,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);


export const Admin = mongoose.model('admin', adminSchema);