import express from "express";
import {mongoDBURL, PORT} from "./MongoDB.js";
import mongoose from "mongoose";
import voterRoute from './EndpointsVoter.js';
import constRoute from './EndpointsConst.js';
import adminRoute from './EndpointsAdmin.js';

const app = express();
app.use(express.json());


app.use('/add',voterRoute);
app.use('/addc', constRoute);
app.use('/adda',adminRoute);
 
mongoose
.connect(mongoDBURL)
.then(()=>{
    console.log('app connected to mongodb');
    app.listen(PORT, ()=>{
        console.log(`App is listening to port : ${PORT}`);
    });
})
.catch((err)=>{
    console.log(err)
})