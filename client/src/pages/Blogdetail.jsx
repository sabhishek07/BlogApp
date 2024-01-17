
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import toast from 'react-hot-toast';

const Blogdetail = () => {

  const id=useParams().id

  const navigate=useNavigate();

  //these states to get value
  const [blog,setblogs]=useState()
  const[title,seTitle]=useState()
  const[description,setdescription]=useState()
  const [image,setimage]=useState()

  //////


  //these states for 

  const blogdetailshow=async()=>{
    try {
      const {data}=await axios.get(`/api/v1/blog/get-single-blog/${id}`)
      if(data?.singleblog){
      
      setblogs(data?.singleblog)
      seTitle(data?.singleblog.title)
     setdescription(data?.singleblog.description)
      setimage(data?.singleblog.image)

      }
    } catch (error) {
      console.log(error)
      
    }
  }

  useEffect(()=>{
    blogdetailshow();
   
  },[id])

const submit=async(e)=>{
  e.preventDefault();
  try {

    const {res}=await axios.put(`/api/v1/blog/update-blog/${id}`,{title,description,image,user:id})

    if(res?.success){
    toast.success('Hurray! Updated')
    navigate('/my-blogs')
     
  
    }
    
  } catch (error) {
    console.log(error)
    
  }

}

  return (
    <div>
         <form onSubmit={submit}>
        <Box
          width={"50%"}
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
            Update Your Blog
          </Typography>
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Title
          </InputLabel>
          <TextField
            name="title"
            value={title}
            onChange={(e)=>{seTitle(e.target.value)}}
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
            onChange={(e)=>{setdescription(e.target.value)}}
           
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
            onChange={(e)=>{setimage(e.target.value)}}
            
            margin="normal"
            variant="outlined"
            required
          />
          <Button type="submit" color="warning" variant="contained">
            UPDATE
          </Button>
        </Box>
      </form>
  
    </div>
  )
}

export default Blogdetail
