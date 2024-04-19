import React, { useEffect } from 'react'
import "./Home.css"
import User from '../User/User'
import Post from '../Posts/Post'
import { useDispatch, useSelector } from 'react-redux'
import { getFollowingPosts, getallUsers } from '../../Actions/User'
import Loader from './../Loader/Loader'
import { Typography } from '@mui/material'
import { toast } from 'react-toastify';

const Home = () => {

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

  const {loading, posts, error} = useSelector(state => state.postOfFollowing);

  const {users, loading: usersLoading} = useSelector(state => state.allUsers);

  const {error: likeError, message} = useSelector(state => state.like);

  const {error: commentError, message: commentMsg} = useSelector(state => state.comment);

  const {error: deletecommentError, message: deletecommentMsg} = useSelector(state => state.deleteComment);

  useEffect(() => {
    dispatch(getFollowingPosts());
    dispatch(getallUsers());
  }, [dispatch]);

  useEffect(() => {
    if(error){
        toast.error(error, toastOptions);
        dispatch({type: "clearErrors"})
    }
    if(likeError){
        toast.error(likeError, toastOptions);
        dispatch({type: "clearErrors"})
    }
    if(commentError){
        toast.error(commentError, toastOptions);
        dispatch({type: "clearErrors"})
    }
    if(deletecommentError){
      toast.error(deletecommentError, toastOptions);
      dispatch({type: "clearErrors"})
    }
    if(deletecommentMsg){
        toast.success(deletecommentMsg, toastOptions);
        dispatch({type: "clearMessage"})
    }
    if(commentMsg){
        toast.success(commentMsg, toastOptions);
        dispatch({type: "clearMessage"})
    }
    if(message){
        toast.success(message, toastOptions);
        dispatch({type: "clearMessage"})
    }
  }, [toast, error, message, likeError, deletecommentMsg, commentMsg, deletecommentError, commentError, dispatch]);



  return (
    loading===true || usersLoading===true ? <Loader /> : (
      <div className='home'>

        <div className="homeleft">

          {
            posts && posts.length > 0 ? (
              posts.map((post) => (
                <Post 
                key={post._id}
                postId={post._id} 
                caption={post.caption} 
                postImage={post.image.url} 
                likes = {post.likes} 
                comments = {post.comments} 
                ownerImage = {post.owner.avatar.url}
                ownerName = {post.owner.username}
                ownerId = {post.owner._id} 
                // tab="home"
                />

              ))
            ) : ( 
              <Typography variant='h6'>No posts yet</Typography> 
            )
          }

        </div>
        <div className="homeright">
          {
            users && users.length > 0 ? (
              users.map((user) => (
                <User
                  key={user._id}
                  userId={user._id} 
                  username={user.username} 
                  avatar={user.avatar.url} 
                />
              ))
            ) : (
              <Typography variant='h6'>No users yet</Typography> 
            )
          }
          


        </div>
      
    </div>
    )
  )
}

export default Home
