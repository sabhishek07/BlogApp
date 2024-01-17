import React, { useState } from 'react'
import {
    Box,
    AppBar,
    Toolbar,
    Button,
    Typography,
    Tabs,
    Tab,
 
  } from "@mui/material";
  import { useSelector, useDispatch } from "react-redux";
  import { authActions } from "../redux/store";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Header = () => {
    const [value, setValue] = useState("")
    const[redirect,setRedirect]=useState(false)

   let isLogin = useSelector((state) => state.isLogin);
   isLogin=isLogin || localStorage.getItem("userid");
   const dispatch = useDispatch();
   const navigate=useNavigate();
 
    const handleLogout = async() => {
        try {
          dispatch(authActions.logout());
       toast.success('User Logout succesfully')
       navigate("/")
       localStorage.clear();
    
                  
        } catch (error) {
          console.log(error);
        }
      };
     
  return (
    <div>
          <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6"> Blog App</Typography>
          {isLogin && (
            <Box display={"flex"} marginLeft="auto" marginRight={"auto"}>
              <Tabs
                textColor="inherit"
                value={value}
                onChange={(e, val) => setValue(val)}
              >
                <Tab label="Blogs" LinkComponent={Link} to="/" />
                <Tab label="My Blogs" LinkComponent={Link} to="/my-blogs" />
                <Tab
                  label="Create Blog"
                  LinkComponent={Link}
                  to="/create-blog"
                />
              </Tabs>
            </Box>
          )}
          <Box display={"flex"} marginLeft="auto">
            {!isLogin && (
              <>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to="/login"
                >
                  Login
                </Button>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to="/register"
                >
                  Register
                </Button>
              </>
            )}
            {isLogin && (
              <Button  onClick={handleLogout} sx={{ margin: 1, color: "white" }}>
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      
    </div>
  )
}

export default Header
