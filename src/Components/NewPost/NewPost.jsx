import React, { useEffect, useState } from 'react'
import './NewPost.css'
import { Button, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { createNewPost } from '../../Actions/Post';
import { toast } from 'react-toastify';
import { loadUser } from '../../Actions/User';

const NewPost = () => {

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

    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState("");

    const {loading, error, message} = useSelector((state)=> state.like)

    const dispatch = useDispatch();

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        const reader = new FileReader();

        reader.onload = () => {
            // console.log(reader.readyState);
            if(reader.readyState===2){
                // console.log(reader.result);
                setImage(reader.result);
                // console.log(image);
            }
        };

        if (file) {
            reader.readAsDataURL(file);
        }

        console.log(image);
    }

    const submitHandler = async(e) => {
        // console.log(caption);

        e.preventDefault();
        await dispatch(createNewPost(caption, image));
        dispatch(loadUser());
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
    <div className='newPost'>
        <form className='newPostForm' onSubmit={submitHandler}>

            <Typography variant="h3">New Post</Typography>

            {image && <img src={image} alt='post' />}

            <input type="file" accept='image/*' onChange={handleImageChange} />

            <input type="text" placeholder='Caption...' value={caption} onChange={(e)=>setCaption(e.target.value)} />

            <Button disabled={loading} type='submit' >
                Post
            </Button>

        </form>
      
    </div>
  )
}

export default NewPost
