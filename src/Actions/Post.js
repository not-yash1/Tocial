import axios from "axios"

const serverUrl = "http://localhost:4000/api/v1"

export const likePost = (id) => async(dispatch) => {
    try {
        dispatch({
            type: "LikeRequest",
        });

        const {data} = await axios.get(`${serverUrl}/post/${id}`, {
            withCredentials: true,
        });

        dispatch({
            type: "LikeSuccess",
            payload: data.message,
        })
        
    } catch (error) {

        dispatch({
            type: "LikeFailure",
            payload: error.response.data.message
        })  
    }
}


export const addCommentOnPost = (id, comment) => async(dispatch) => {
    try {
        dispatch({
            type: "addCommentRequest",
        });

        const {data} = await axios.post(`${serverUrl}/post/comment/${id}`, {comment}, {
            withCredentials: true,
        }, {
            headers:{
                "Content-Type":"application/json"
            },
        });

        // console.log(data);

        dispatch({
            type: "addCommentSuccess",
            payload: data.message,
        })
        
    } catch (error) {

        dispatch({
            type: "addCommentFailure",
            payload: error.response.data.message
        })
        
    }

}


export const deleteCommentOnPost = (id, commentId) => async(dispatch) => {
    try {
        dispatch({
            type: "deleteCommentRequest",
        });

        const {data} = await axios.delete(`${serverUrl}/post/comment/${id}/${commentId}`, {
            withCredentials: true,
        });

        dispatch({
            type: "deleteCommentSuccess",
            payload: data.message,
        })
        
    } catch (error) {

        dispatch({
            type: "deleteCommentFailure",
            payload: error.response.data.message
        })  
    }
}

export const getMyPosts = () => async(dispatch) => {
    try {
        dispatch({
            type: "getMyPostsRequest",
        });

        const {data} = await axios.get(`${serverUrl}/my/posts`, {
            withCredentials: true,
        });

        dispatch({
            type: "getMyPostsSuccess",
            payload: data.posts,
        })
        
    } catch (error) {

        dispatch({
            type: "getMyPostsFailure",
            payload: error.response.data.message
        })  
    }
}

export const getUserPosts = (id) => async(dispatch) => {
    try {
        dispatch({
            type: "userPostsRequest",
        });

        const {data} = await axios.get(`${serverUrl}/userposts/${id}`, {
            withCredentials: true,
        });

        dispatch({
            type: "userPostsSuccess",
            payload: data.posts,
        })
        
    } catch (error) {

        dispatch({
            type: "userPostsFailure",
            payload: error.response.data.message
        })  
    }
}

export const createNewPost = (caption, image) => async(dispatch) => {
    try {
        dispatch({
            type: "newPostRequest",
        });

        const {data} = await axios.post(`${serverUrl}/post/upload`, {caption, image}, {
            withCredentials: true,
        }, {
            headers:{
                "Content-Type":"application/json"
            },
        });

        // console.log(data);

        dispatch({
            type: "newPostSuccess",
            payload: data.message,
        })
        
    } catch (error) {

        // console.log(error);
        dispatch({
            type: "newPostFailure",
            payload: error.response.data.message
        })  
    }
}

export const updatePost = (caption, id) => async(dispatch) => {
    try {
        dispatch({
            type: "updateCaptionRequest",
        });

        const {data} = await axios.put(`${serverUrl}/post/${id}`, {caption}, {
            withCredentials: true,
        }, {
            headers:{
                "Content-Type":"application/json"
            },
        });

        dispatch({
            type: "updateCaptionSuccess",
            payload: data.message,
        })
        
    } catch (error) {

        // console.log(error);
        dispatch({
            type: "updateCaptionFailure",
            payload: error.response.data.message
        })  
    }
}

export const deletePost = (id) => async(dispatch) => {
    try {
        dispatch({
            type: "deleteMyPostRequest",
        });

        const {data} = await axios.delete(`${serverUrl}/post/${id}`, {
            withCredentials: true,
        });

        dispatch({
            type: "deleteMyPostSuccess",
            payload: data.message,
        })
        
    } catch (error) {

        // console.log(error);
        dispatch({
            type: "deleteMyPostFailure",
            payload: error.response.data.message
        })  
    }
}


