import React, { useEffect, useState } from 'react'
import './UpdateProfile.css'
import { Avatar, Button, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { loadUser, registerUser, updateProfile } from '../../Actions/User';
import Loader from '../Loader/Loader';

const UpdateProfile = () => {

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

    const dispatch = useDispatch();
    
    const {loading, error, user} = useSelector((state)=>state.user); 
    const {loading: updateLoading , error: updateError, message} = useSelector((state)=>state.like); 

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [avatar, setAvatar] = useState("");
    const [avatarPrev, setAvatarPrev] = useState(user.avatar.url);
    const [username, setUsername] = useState(user.username);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        
        const reader = new FileReader();
        
        reader.onload = () => {
            // console.log(reader.readyState);
            if(reader.readyState===2){
                // console.log(reader.result);
                setAvatarPrev(reader.result);
                setAvatar(reader.result);
                // console.log(avatar);
            }
        };
        
        if (file) {
            reader.readAsDataURL(file);
        }
    }

    const submitHandler = async(e) => {
        e.preventDefault();
        await dispatch(updateProfile(name, email, username, avatar));
        dispatch(loadUser());
    }

    useEffect(() => {
        if(error){
            toast.error(error, toastOptions);
            dispatch({type: "clearErrors"})
        }
        if(updateError){
            toast.error(updateError, toastOptions);
            dispatch({type: "clearErrors"})
        }
        if(message){
            toast.success(message, toastOptions);
            dispatch({type: "clearMessage"})
        }
      }, [toast, error, updateError, message, dispatch]);


  return (
    loading ? <Loader /> : (
        <div className='updateProfile'>
            <form className='updateProfileForm' onSubmit={submitHandler}>

                <Typography variant="h3">Social App</Typography>

                <Avatar 
                src={avatarPrev} 
                alt='User' 
                sx={{ height: "10vmax", width: "10vmax" }} />

                <input type='file' accept='image/*' onChange={handleImageChange}/>

                <input 
                type='text' 
                value={name} 
                placeholder='Name' 
                className='updateProfileInputs' 
                onChange={(e)=>setName(e.target.value)} />

                <input 
                type='email' 
                placeholder='Email' 
                className='updateProfileInputs' 
                value={email} 
                onChange={(e)=>setEmail(e.target.value)} />

                <input 
                type='text' 
                placeholder="username" 
                className='updateProfileInputs' 
                // unique 
                value={username} 
                onChange={(e)=>setUsername(e.target.value)} />

                <Button disabled={updateLoading} type='submit'>Update</Button>


            </form>
      
        </div>
    )
    
  )
}


export default UpdateProfile
