import React, { useEffect, useState } from 'react';
import "./UpdatePassword.css"
import { Typography, Button } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { updateMyPassword } from '../../Actions/User';
import { toast } from 'react-toastify';

const UpdatePassword = () => {

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
    
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const {loading, error, message} = useSelector((state)=>state.like);
    
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(updateMyPassword(oldPassword, newPassword, confirmPassword))
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
    <div className='updatePassword'>
        <form className='updatePasswordForm' onSubmit={submitHandler}>

            <Typography variant='h3' style={{ padding: "2vmax" }}>
                Social App
            </Typography>

            <input 
            type='password' 
            placeholder='Old Password' 
            required 
            className='updatePasswordInputs' 
            value={oldPassword} 
            onChange={(e)=>setOldPassword(e.target.value)} />

            <input 
            type='password' 
            placeholder='New Password' 
            required 
            className='updatePasswordInputs' 
            value={newPassword} 
            onChange={(e)=>setNewPassword(e.target.value)} />

            <input 
            type='password' 
            placeholder='Confirm Password' 
            required 
            className='updatePasswordInputs' 
            value={confirmPassword} 
            onChange={(e)=>setConfirmPassword(e.target.value)} />

            <Button disabled={loading} type='submit'>Change Password</Button>

        </form>
    </div>
  )
}

export default UpdatePassword
