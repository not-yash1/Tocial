import React, { useEffect, useState } from 'react'
import './ForgotPassword.css'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Typography } from '@mui/material';
import { forgotPassword } from '../../Actions/User';
import { toast } from 'react-toastify';

const ForgotPassword = () => {

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

    const dispatch = useDispatch();

    // const {error} = useSelector(state => state.user)
    const { error, loading, message} = useSelector(state => state.like)

    const submitHandler = (e) => {
        e.preventDefault();

        // console.log(email, password);
        dispatch(forgotPassword(email));
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
    <div className='forgotPassword'>
        <form className='forgotPasswordForm' onSubmit={submitHandler}>

            <Typography variant='h3' style={{ padding: "2vmax" }}>
                Social App
            </Typography>

            <input 
            type='email' 
            placeholder='Email' 
            required 
            className='forgotPasswordInputs' 
            value={email} 
            onChange={(e)=>setEmail(e.target.value)} />

            <Button disabled={loading} type='submit'>Send Email</Button>

        </form>
    </div>
  )
}

export default ForgotPassword
