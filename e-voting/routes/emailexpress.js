import express from 'express';
import {mongoDBURL} from "./MongoDB.js";
import mongoose from "mongoose";
import cors from 'cors';

import emailRoutes from './mail_setup.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/email',emailRoutes);

mongoose
.connect(mongoDBURL)
.then(()=>{
    console.log('app connected to mongodb');
    app.listen(5010, ()=>{
        console.log(`App is listening to port : 5010`);
    });
})
.catch((err)=>{
    console.log(err)
})