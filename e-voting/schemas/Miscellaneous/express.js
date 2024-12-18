import express from "express";
import {mongoDBURL, PORT} from "./MongoDB.js";
import mongoose from "mongoose";
import voterRoute from './EndpointsVoter.js';
import constRoute from './EndpointsConst.js';
import adminRoute from './EndpointsAdmin.js';
import candiRoutes from './EndpointCandi.js';

const app = express();
app.use(express.json());


app.use('/add',voterRoute);
app.use('/addc', constRoute);
app.use('/adda',adminRoute);
app.use('/addca',candiRoutes);

mongoose
.connect(mongoDBURL)
.then(()=>{
    console.log('app connected to mongodb');
    app.listen(5015, ()=>{
        console.log(`App is listening to port : 5005`);
    });
})
.catch((err)=>{
    console.log(err)
})