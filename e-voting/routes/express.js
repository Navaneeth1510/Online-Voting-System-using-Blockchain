import express from 'express';
import {mongoDBURL, PORT} from "./MongoDB.js";
import mongoose from "mongoose";
import voterRoutes from './voterRoutes.js'
import adminRoutes from './adminRoutes.js'
import constRoutes from './constRoutes.js'
import candiRoutes from './candiRoutes.js';
import blockchainRoutes from './blockchainRoutes.js';
import timingRoutes from './timeRoutes.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());


app.use('/voter',voterRoutes);
app.use('/admin',adminRoutes);
app.use('/const',constRoutes);
app.use('/candi',candiRoutes);
app.use('/blockchain',blockchainRoutes);
app.use('/time',timingRoutes);


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







