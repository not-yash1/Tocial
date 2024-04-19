import React, { useEffect, useState } from 'react'
import './Account.css'
import { useDispatch, useSelector } from 'react-redux'
import { getMyPosts } from '../../Actions/Post';
import Loader from '../Loader/Loader';
import Post from '../Posts/Post';
import { Avatar, Button, Dialog, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import User from '../User/User';
import { deleteMyProfile, logoutUser } from '../../Actions/User';
import { toast } from 'react-toastify';

const Account = () => {

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

    const {user, loading: userLoading} = useSelector(state => state.user)
    const {loading, posts, error} = useSelector((state) => state.myPosts)
    const {error: likeError, message, loading: deleteLoading} = useSelector(state => state.like);
    const {error: delError, message: delMessage} = useSelector(state => state.deleteComment);

    const [followersToggle, setFollowersToggle] = useState(false);
    const [followingToggle, setFollowingToggle] = useState(false);

    const {error: commentError, message: commentMsg} = useSelector(state => state.comment);

    const logoutHandler = async() => {
        dispatch(logoutUser());
        toast.success("Logged out successfully")
    }

    const deleteProfileHandler = async() => {
        await dispatch(deleteMyProfile());
        dispatch(logoutUser());
    }

    useEffect(() => {
        dispatch(getMyPosts())
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
    if(delError){
        toast.error(delError, toastOptions);
        dispatch({type: "clearErrors"})
    }
    if(message){
        toast.success(message, toastOptions);
        dispatch({type: "clearMessage"})
    }
    if(delMessage){
        toast.success(delMessage, toastOptions);
        dispatch({type: "clearMessage"})
    }
    if(commentMsg){
        toast.success(commentMsg, toastOptions);
        dispatch({type: "clearMessage"})
    }
    }, [toast, error, message, likeError, commentError, commentMsg, delMessage, delError, dispatch]);

  return (
    loading===true || userLoading===true ? (
        <Loader /> 
    ) : (
        <div className='account'>
            <div className="accountleft">
                {
                    posts && posts.length > 0 ? (
                    posts.map(post => (
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
                        isAccount = {true}
                        isDelete = {true}
                        /> 
                    ))
                    ) : ( 
                    <Typography variant='h6'>No posts to show</Typography> 
                    )
                }
            </div>
            <div className="accountright">

                <Avatar 
                    src={user.avatar.url}
                    sx={{ height: "8vmax", width: "8vmax"}} 
                />

                <Typography variant='h5'>
                    {user.username}
                </Typography>

                <div>
                    <Button onClick={()=>setFollowersToggle(!followersToggle)}>
                        <Typography>
                            Followers
                        </Typography>
                    </Button>
                        <Typography>
                            {user.followers.length}
                        </Typography>
                </div>

                <div>
                    <Button onClick={()=>setFollowingToggle(!followingToggle)}>
                        <Typography>
                            Following
                        </Typography>
                    </Button>
                        <Typography>
                            {user.following.length}
                        </Typography>
                </div>


                <div>
                    <Typography>
                        Posts
                    </Typography>
                
                    <Typography>
                        {user.posts.length}
                    </Typography>
                </div>

                <Button variant='contained' onClick={logoutHandler}>
                    Logout
                </Button>

                <Link to="/update/profile">Edit Profile</Link>
                <Link to="/update/password">Edit Password</Link>

                <Button variant='text' style={{ color: "red", margin: "2vmax" }} onClick={deleteProfileHandler} disabled={deleteLoading}>
                    Delete My Profile
                </Button>

                <Dialog 
                    open={followersToggle} 
                    onClose={()=>setFollowersToggle(!followersToggle)} >

                        <div className="DialogBox">
                            <Typography variant='h4' >Followers</Typography>

                            {
                                user && user.followers.length > 0 ? (
                                    user.followers.map((follower)=>(
                                        <User 
                                        key={follower._id}
                                        userId={follower._id} 
                                        username={follower.username} 
                                        avatar={follower.avatar.url} />
                                    ))
                                ) : (
                                    <Typography style={{ margin: "2vmax" }} >You have no followers</Typography>
                                )
                            }
                        </div>
                </Dialog>

                <Dialog 
                    open={followingToggle} 
                    onClose={()=>setFollowingToggle(!followingToggle)} >

                        <div className="DialogBox">
                            <Typography variant='h4' >Following</Typography>

                            {
                                user && user.following.length > 0 ? (
                                    user.following.map((follow)=>(
                                        <User 
                                        key={follow._id}
                                        userId={follow._id} 
                                        username={follow.username} 
                                        avatar={follow.avatar.url} />
                                    ))
                                ) : (
                                    <Typography style={{ margin: "2vmax" }} >You don't follow anyone</Typography>
                                )
                            }
                        </div>
                </Dialog>

            </div>
        </div> 
    )
  )
}

export default Account
