import express from 'express';
import cors from 'cors';

import dotenv from 'dotenv'
import mongoose from 'mongoose';

import userRoutes from './routers/userRoutes.js';
import blogRoutes from './routers/blogroutes.js'

dotenv.config();
 const app=express();



 //middleware
 app.use(cors());
 app.use(express.json())


 app.use('/api/v1/user',userRoutes);
 app.use('/api/v1/blog',blogRoutes);
 const port=process.env.port;

 //mongodb connection
(async()=>{
    try {
        await mongoose.connect(`${process.env.mongo_url}`)
        console.log("database connection established")
        app.on('error',()=>{
            console.log(error)
        })
        
    } catch (error) {
        console.log("error in database",error)
        throw error;
        
    }

})()





 app.get('/',(req,res)=>{
    res.send('ok server')
 })

 app.listen(port,(req,res)=>{

    console.log(`app is running on ${port}`)

 })

 