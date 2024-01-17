import express from 'express';
import { SearchBlogController, createblogController, deleteController, getSingleBlogController, getallBlogController,  singleUserBlogController, updateController } from '../controllers/blogController.js';
 const router=express.Router();

//create blog
 router.post('/create-post',createblogController)

 //get all blogs
 router.get('/get-allblogs',getallBlogController)

 //search blog

 router.get('/search/:word',SearchBlogController)

 //update all blogs

 router.put('/update-blog/:id',updateController)

 //get single blog

 router.get('/get-single-blog/:id',getSingleBlogController)

 //delete blog
 router.delete('/delete-blog/:id',deleteController)

 //getuserblog

 router.get('/get-single-user-blog/:id',singleUserBlogController)
 export default router;