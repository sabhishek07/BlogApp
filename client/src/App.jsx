import { useState } from 'react'
import Header from './components/Header'

import './App.css'
import { Route,Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Blog from './pages/Blog'
import SingleBlogUser from './pages/SingleBlogUser'
import CreateBlog from './pages/CreateBlog'
import Blogdetail from './pages/Blogdetail'
import { Toaster } from 'react-hot-toast'
import ReadBlogs from './pages/ReadBlogs'

function App() {
  

  return (
    <>
    <Header/>
    <Toaster/>
    <Routes>
    
    <Route path="/"element={<Blog/>}/>
    <Route path="/blog"element={<Blog/>}/>
    <Route path="/my-blogs"element={<SingleBlogUser/>}/>
    <Route path='/create-blog' element={<CreateBlog/>}/>
    <Route path='/blog-details/:id'element={<Blogdetail/>}/>
    <Route path='/ReadBlogs/:id' element={<ReadBlogs/>}/>
    <Route path="/login"element={<Login/>}/>
    <Route path="/register"element={<Register/>}/>
    </Routes>
     </>
  )
}

export default App
