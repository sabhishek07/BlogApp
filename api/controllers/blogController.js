import express from 'express';
import { BlogModel } from '../models/blogmodel.js';
import { User } from '../models/users.js';
import mongoose from 'mongoose';

export const createblogController=async(req,res)=>{
try {
    const {title,description,image,user}=req.body;

    if(!title || !description || !image||!user ){
        return res.status(400).send({
            success:false,
            message:"all fields required "
        })
    }
    const exist1user=await User.findById(user);
    if(!exist1user){
        return res.status(400).send({
            success:false,
            message:"NO User Found "
        })
    }
    const blogdetails=await new BlogModel({title,description,image,user});


   await  exist1user.blog.push(blogdetails._id);
    await exist1user.save()
    await blogdetails.save();

    
    
    res.status(201).send({
        success:true,
        message:"blog post created succesfully",
        blogdetails
    })
    
} catch (error) {
    console.log(error);
    return res.status(500).send({
        success:false,
        message:"something went wrong"
    })
    
}
    

}

//get all blogs

export const getallBlogController=async(req,res)=>{
    try {

        const blogdetail=await BlogModel.find({}).populate('user')
        if(!blogdetail){
            return res.status(200).send({
                success:false,
                message:"no blogs"
            })
        }

         return res.status(200).send({
            success:true,
            message:"All blogs",
            blogdetail
        })
        
    } catch (error) {

        console.log(error)
        return res.status(500).send({
            success:false,
            message:"internal server error"
        })
        
    }

}

//update blog

export const updateController=async(req,res)=>{
    try {
        const{id}=req.params;
        const {title,description,image}=req.body;

        const updateblog=await BlogModel.findByIdAndUpdate(id,{...req.body},{new:true})

        res.status(201).send({
            success:true,
            message:"update succesfully",
            updateblog
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"error while updating",
            error
        })
    }

}

//fetch single blog

export const getSingleBlogController=async(req,res)=>{

    try {
        const {id}=req.params;

        const singleblog=await BlogModel.findById(id);

        if(!singleblog){
            return res.status(400).send({
                success:false,
                message:"post not found"
            })
        }
        res.status(200).send({
            success:true,
            Message:"single post",
            singleblog
        })
        
    } catch (error) {
        return res.status(500).sendd({
            success:false,
            message:"internal server error"
        })
        
    }
   

}

//delete blog

export const deleteController=async(req,res)=>{
try {
    const{id}=req.params;
  const deleteblog=  await BlogModel.findByIdAndDelete(id).populate('user');

  await deleteblog.user.blog.pull(deleteblog);
   await deleteblog.user.save();


    res.status(200).send({
        success:true,
        message:"blog delete succesfully"
    })
    
} catch (error) {
    return res.status(500).send({
        success:false,
        message:"someting went wrong"
    })
    
}
   

}

//get single user blog

export const singleUserBlogController=async(req,res)=>{
             try {

                const {id}=req.params;
                const bloguser=await User.findById(id).populate("blog");

                if(!bloguser){
                    return res.status(400).send({
                        success:false,
                        message:"No blogs found"
                    })
                }
                return res.status(201).send({
                    success:true,
                    message:"blogs found succesfully",
                    bloguser
                })
    
          } catch (error) {

            return res.status(400).send({
                success:false,
                message:"something went wrong"
          })
    
                 }
    




}

//search blog

export const SearchBlogController=async(req,res)=>{

    try {

        const{word}=req.params;
       
            const searchblog=await BlogModel.find({
                "$or":[
                    {"title":{$regex:word}},
                    {"description":{$regex:word}}
                ]
            })

        
         
          

        
       
      

        if(!searchblog){
           return res.status(400).send({
               success:false,
               message:"Error while searching" 
            })
        }

       return  res.status(201).send({
            success:true,
            message:"search result",
            searchblog
           

        })
        
    } catch (error) {

        console.log(error)
        
    }

}