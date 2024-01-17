import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BlogCard from '../components/BlogCard'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';


const Blog = () => {

    const[blog,setblogs]=useState([])
    const[word,setWord]=useState("")
 
   

    useEffect(()=>{
        getsingle1blog();
       
        
    },[])

    //searchbar
  
  
    const getsingle1blog=async()=>{
        try {
           

            const{data}=await axios.get('/api/v1/blog/get-allblogs')
            if(data?.success){
                setblogs(data?.blogdetail)
    
            }
            
        } catch (error) {
            console.log(error)
            
        }
       

    }
  
    const searchbar=async(e)=>{


       let word= e.target.value
       if(word){
        const {data}=await axios.get(`/api/v1/blog/search/${word}`)
           
        if(data?.success){
           
         setblogs(data?.searchblog)
        }

        else{
            getsingle1blog();

        }

       }

        
        
       
      

    }
   
    //debounce 

    const redebounce=(searchbar,delay)=>{

        let timer;
        return(...arg)=>{
            clearTimeout(timer);
            timer=setTimeout(()=>{

                searchbar(...arg);

            },1000)
        }

    }

  const debounce=redebounce(searchbar,1000)




  return (
    <div>
        <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" onChange={debounce} label="Search" variant="outlined" />
      </Box>

         {blog && blog.length > 0 ? (
        blog.map((blogs) => (
          <BlogCard
            id={blogs._id}
            title={blogs.title}
            isUser={localStorage.getItem("userId") === blog?.user?._id}
            description={blogs.description}
            image={blogs.image}
            username={blogs.username}
            time={blogs.createdAt}
          />
        ))
      ) : (
        <h1>No blogs</h1>
      )}
      
    </div>
  )
}

export default Blog
