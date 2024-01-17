import mongoose from 'mongoose';

const BlogSchema=new mongoose.Schema({

    title:{
        type:String,
        required:true,
        

    },
    description:{
        type:String,
        required:true,
       
    },
    image:{
        type:String,
        required:true


    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    }


},{timestamps:true})


 export const BlogModel=  mongoose.model('BlogModel', BlogSchema);



