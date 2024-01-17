import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BlogCard from '../components/BlogCard'
import toast from 'react-hot-toast'

const SingleBlogUser = () => {
    const[blog,setblogs]=useState([])

    const getsingleblog=async()=>{
        try {
            const id=localStorage.getItem('userid')

            const{data}=await axios.get(`/api/v1/blog/get-single-user-blog/${id}`)
            if(data?.success){
                setblogs(data?.bloguser.blog)
               
    
            }
            
        } catch (error) {
            console.log(error)
            
        }
       

    }
    useEffect(()=>{
        getsingleblog();
    },[])
  return (
   
      <div>
      {blog && blog.length > 0 ? (
        blog.map((blogs) => (
          <BlogCard
            id={blogs._id}
            isUser={true}
            title={blogs.title}
            description={blogs.description}
            image={blogs.image}
            username={blogs.username}
            time={blogs.createdAt}
          />
        ))
      ) : (
        <h1>You Havent Created a blog</h1>
      )}
    </div>
  )
}

export default SingleBlogUser
