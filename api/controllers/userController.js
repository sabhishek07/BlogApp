import express from 'express'
import { User } from '../models/users.js';
import bcrypt from 'bcrypt';


//register controller
export  const registerController=async(req,res)=>{
    try {
        const{username,email,password}=req.body;

        if(!username || !email || !password){
            return res.status(400).send({
                message:"All fields are required",
                success:false
                
            })
        }
        
        // check validation for existing user 
      const existUser=await User.findOne({email})
        if(existUser){
            return res.status(401).send({
                success:false,
                message:"User Already Registered"
            })

        }
        const saltRounds = 10;
        const hashedPasssword=await bcrypt.hash(password,saltRounds);
        
       const user=await new User({username,email,password:hashedPasssword}).save();

       res.status(201).send({
        success:true,
        message:"User Register Succesfully",
        user
       })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"internal server error",
            error
        })
        
    }
}
//get all users

export const getAllUserController=async(req,res)=>{
    try {
        const user=await User.find({})
        res.status(200).send({
            count:user.length,
            success:true,
            message:"all user displayed",
            user
        })
        
    } catch (error) {
        console.log(error)
        
    }

}

//login controller
export const loginController=async(req,res)=>{
    try {

        const{email,password}=req.body;

        if(!email || !password){
            return res.status(401).send({
                success:false,
                message:"All fields required"
            })
        }

        const userDetail=await User.findOne({email})

        if(!userDetail){
            return res.status(401).send({
                success:false,
                message:'Please Register Yourself'
            })

        }
        const matchPassword=await bcrypt.compare(password,userDetail.password);
        if(!matchPassword){
            return res.status(400).send({
                success:false,
                message:'something went wrong'
            })
        
        
        }

        return res.status(201).send({
            success:true,
            message:'Login Succesfully',
            userDetail

        })




        
    } catch (error) {
        console.log(error)
        
    }

}
