import axios from "axios"

// const serverUrl = "http://localhost:4000/api/v1"
const serverUrl = "https://tocial-backend.onrender.com/api/v1"

export const loginUser = (email, password) => async(dispatch) => {
    try {
        dispatch({
            type: "LoginRequest",
        });

        const {data} = await axios.post(`${serverUrl}/login`, {email, password}, {
            withCredentials: true,
        }, {
            headers:{
                "Content-Type":"application/json"
            },
        });

        // console.log(data);

        dispatch({
            type: "LoginSuccess",
            payload: data.user
        })
        
    } catch (error) {

        dispatch({
            type: "LoginFailure",
            payload: error.response.data.message
        })
        
    }

}

export const registerUser = (name, email, password, username, avatar) => async(dispatch) => {

    try {

        dispatch({
            type: "RegisterRequest",
        });

        const {data} = await axios.post(`${serverUrl}/register`, {name, email, password, username, avatar}, {
            withCredentials: true,
        }, {
            headers:{
                "Content-Type":"application/json"
            },
        });

        // console.log(data);

        dispatch({
            type: "RegisterSuccess",
            payload: data.user
        })
        
    } catch (error) {

        dispatch({
            type: "RegisterFailure",
            payload: error.response.data.message
        }) 
    }
}

export const logoutUser = () => async(dispatch) => {

    try {

        dispatch({
            type: "LogoutUserRequest",
        });

        await axios.get(`${serverUrl}/logout`, {
            withCredentials: true,
        });

        // console.log(data);

        dispatch({
            type: "LogoutUserSuccess",
        })
        
    } catch (error) {

        dispatch({
            type: "LogoutUserFailure",
            payload: error.response.data.message
        })
        
    }

}

export const loadUser = () => async(dispatch) => {
    try {
        dispatch({
            type: "LoadUserRequest",
        });

        const {data} = await axios.get(`${serverUrl}/me`, {
            withCredentials: true,
        });

        // console.log(data);

        dispatch({
            type: "LoadUserSuccess",
            payload: data.user
        })
        
    } catch (error) {

        dispatch({
            type: "LoadUserFailure",
            payload: error.response.data.message
        })
    }
}

export const getFollowingPosts = () => async(dispatch) => {
    try {
        dispatch({
            type: "postOfFollowingRequest",
        });

        const {data} = await axios.get(`${serverUrl}/posts`, {
            withCredentials: true,
        });

        // console.log(data);

        dispatch({
            type: "postOfFollowingSuccess",
            payload: data.posts
        })
        
    } catch (error) {

        dispatch({
            type: "postOfFollowingFailure",
            payload: error.response.data.message
        }) 
    }
}

export const getallUsers = (name = "") => async(dispatch) => {
    try {
        dispatch({
            type: "allUserRequest",
        });

        const {data} = await axios.get(`${serverUrl}/users?name=${name}`, {
            withCredentials: true,
        });

        dispatch({
            type: "allUserSuccess",
            payload: data.users
        })
        
    } catch (error) {

        dispatch({
            type: "allUserFailure",
            payload: error.response.data.message
        }) 
    }
}

export const updateProfile = (name, email, username, avatar) => async(dispatch) => {
    try {
        dispatch({
            type: "updateProfileRequest",
        });

        const {data} = await axios.put(`${serverUrl}/update/profile`, {
            name, email, username, avatar
        }, {
            withCredentials: true,
        }, {
            headers:{
                "Content-Type":"application/json"
            },
        });

        // console.log(data);

        dispatch({
            type: "updateProfileSuccess",
            payload: data.message,
        })
        
    } catch (error) {

        // console.log(error);
        dispatch({
            type: "updateProfileFailure",
            payload: error.response.data.message
        })  
    }
}

export const updateMyPassword = (oldPassword, newPassword, confirmPassword) => async(dispatch) => {
    try {
        dispatch({
            type: "updatePasswordRequest",
        });

        const {data} = await axios.put(`${serverUrl}/update/password`, {
            oldPassword, newPassword, confirmPassword
        }, {
            withCredentials: true,
        }, {
            headers:{
                "Content-Type":"application/json"
            },
        });

        // console.log(data);

        dispatch({
            type: "updatePasswordSuccess",
            payload: data.message,
        })
        
    } catch (error) {

        // console.log(error);
        dispatch({
            type: "updatePasswordFailure",
            payload: error.response.data.message
        })  
    }
}

export const deleteMyProfile = () => async(dispatch) => {
    try {
        dispatch({
            type: "deleteProfileRequest",
        });

        const {data} = await axios.delete(`${serverUrl}/delete/me`, {
            withCredentials: true,
        });

        // console.log(data);

        dispatch({
            type: "deleteProfileSuccess",
            payload: data.message,
        })
        
    } catch (error) {

        // console.log(error);
        dispatch({
            type: "deleteProfileFailure",
            payload: error.response.data.message
        })  
    }
}

export const forgotPassword = (email) => async(dispatch) => {
    try {
        dispatch({
            type: "forgotPasswordRequest",
        });

        const {data} = await axios.post(`${serverUrl}/forgot/password`, {
            email
        }, {
            withCredentials: true,
        }, {
            headers:{
                "Content-Type":"application/json"
            },
        });

        // console.log(data);

        dispatch({
            type: "forgotPasswordSuccess",
            payload: data.message,
        })
        
    } catch (error) {

        // console.log(error);
        dispatch({
            type: "forgotPasswordFailure",
            payload: error.response.data.message
        })  
    }
}

export const resetPassword = (token, newPassword, confirmPassword) => async(dispatch) => {
    try {
        dispatch({
            type: "resetPasswordRequest",
        });

        const {data} = await axios.put(`${serverUrl}/password/reset/${token}`, {
            newPassword, confirmPassword
        }, {
            withCredentials: true,
        }, {
            headers:{
                "Content-Type":"application/json"
            },
        });

        // console.log(data);

        dispatch({
            type: "resetPasswordSuccess",
            payload: data.message,
        })
        
    } catch (error) {

        // console.log(error);
        dispatch({
            type: "resetPasswordFailure",
            payload: error.response.data.message
        })  
    }
}

export const getUserProfile = (id) => async(dispatch) => {
    try {
        dispatch({
            type: "userProfileRequest",
        });

        const {data} = await axios.get(`${serverUrl}/user/${id}`, {
            withCredentials: true,
        });

        dispatch({
            type: "userProfileSuccess",
            payload: data.user,
        })
        
    } catch (error) {

        dispatch({
            type: "userProfileFailure",
            payload: error.response.data.message
        })  
    }
}

export const followAndUnfollowUser = (id) => async(dispatch) => {
    try {
        dispatch({
            type: "followUserRequest",
        });

        const {data} = await axios.get(`${serverUrl}/follow/${id}`, {
            withCredentials: true,
        });

        dispatch({
            type: "followUserSuccess",
            payload: data.message,
        })
        
    } catch (error) {

        dispatch({
            type: "followUserFailure",
            payload: error.response.data.message
        })  
    }
}
