import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({

    username:{
        type:String,
        required:true,
        

    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true


    },
    blog:[{
        type:mongoose.Types.ObjectId,
        ref:"BlogModel",
        

    }]


},{timestamps:true})


 export const User=  mongoose.model('User', UserSchema);



