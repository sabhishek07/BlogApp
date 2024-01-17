
import React, { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import toast from "react-hot-toast";

const CreateBlog = () => {
       
    const[title,setTitle]=useState("")
    const[description,Setdescription]=useState("")
    const[image,Setimage]=useState("")

    const[redirect,setredirect]=useState(false)

    const id=localStorage.getItem('userid')

    const handleSubmit=async(e)=>{
        e.preventDefault()

        try {
            const {res}=await axios.post('/api/v1/blog/create-post',{title,description,image,user:id})
            if(res?.success){
                setredirect(true)
                toast.success('Blog Created Succesfully')  
              
             }
        
            
        } catch (error) {
             console.log(error)
        }

    }
    if(redirect){
        return <Navigate to={'/my-blogs'}/>
    }

 
  return (
    <>
         <form onSubmit={handleSubmit}>
        <Box
          width={"40%"}
          border={3}
          borderRadius={10}
          padding={3}
          margin="auto"
          boxShadow={"10px 10px 20px #ccc"}
          display="flex"
          flexDirection={"column"}
          marginTop="30px"
        >
          <Typography
            variant="h4"
            textAlign={"center"}
            fontWeight="bold"
            padding={3}
            color="gray"
          >
            Create Blogs
          </Typography>
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Title
          </InputLabel>
          <TextField
            name="title"
            value={title}
            onChange={(e)=>{setTitle(e.target.value)}}
            margin="normal"
            variant="outlined"
            required
          />
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Description
          </InputLabel>
          <TextField
            name="description"
            value={description}
            onChange={(e)=>{Setdescription(e.target.value)}}
            margin="normal"
            variant="outlined"
            required
          />
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Image URL
          </InputLabel>
          <TextField
            name="image"
            value={image}
            onChange={(e)=>{Setimage(e.target.value)}}
            margin="normal"
            variant="outlined"
            required
          />
          <Button type="submit" color="primary" variant="contained">
            SUBMIT
          </Button>
        </Box>
      </form>
      
    </>
  );
};

export default CreateBlog;
