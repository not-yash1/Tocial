import React, { useEffect, useState } from 'react';
import "./Login.css"
import { Typography, Button } from "@mui/material"
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { loginUser } from '../../Actions/User';
import { toast } from 'react-toastify';

const Login = () => {

    const toastOptions = {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const {error} = useSelector(state => state.user)
    const {message} = useSelector(state => state.user)

    const loginHandler = (e) => {
        e.preventDefault();

        // console.log(email, password);
        dispatch(loginUser(email, password));
    }

    useEffect(() => {
        if(error){
            toast.error(error, toastOptions);
            dispatch({type: "clearErrors"})
        }
        if(message){
            toast.success(message, toastOptions);
            dispatch({type: "clearMessage"})
        }
      }, [toast, error, message, dispatch]);

  return (
    <div className='login'>
        <form className='loginForm' onSubmit={loginHandler}>

            <Typography variant='h3' style={{ padding: "2vmax" }}>
                Social App
            </Typography>

            <input 
            type='email' 
            placeholder='Email' 
            required 
            value={email} 
            onChange={(e)=>setEmail(e.target.value)} />

            <input 
            type='password' 
            placeholder='Password' 
            required 
            value={password} 
            onChange={(e)=>setPassword(e.target.value)} />

            <Link to="/forgot/password" >
                <Typography>
                    Forgot Password?
                </Typography>
            </Link>

            <Button type='submit'>Login</Button>

            <Link to="/register" >
                <Typography>
                    New User
                </Typography>
            </Link>

        </form>
    </div>
  )
}

export default Login
