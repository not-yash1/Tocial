import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./Components/Header/Header";
import Login from "./Components/Login/Login";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./Actions/User";
import Home from "./Components/Home/Home";
import Account from "./Components/Account/Account";
import NewPost from "./Components/NewPost/NewPost";
import Register from "./Components/Register/Register";
import UpdateProfile from "./Components/UpdateProfile/UpdateProfile";
import UpdatePassword from "./Components/UpdatePassword/UpdatePassword";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import UserProfile from "./Components/UserProfile/UserProfile";
import Search from "./Components/Search/Search";
import Chat from "./Components/Chat/Chat";


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const {isAuthenticated} = useSelector(state => state.user)

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="dark"
      />
      <Router>
        {
          isAuthenticated && <Header />
        }

        <Routes>

          <Route path='/' element={isAuthenticated? <Home /> :<Login />} />

          <Route path='/account' element={isAuthenticated? <Account /> :<Login />} />

          <Route path='/newPost' element={isAuthenticated? <NewPost /> :<Login />} />

          <Route path='/register' element={isAuthenticated? <Account /> :<Register />} />

          <Route path='/update/profile' element={isAuthenticated? <UpdateProfile /> :<Login />} />

          <Route path='/update/password' element={isAuthenticated? <UpdatePassword /> :<Login />} />

          <Route path='/forgot/password' element={isAuthenticated? <UpdatePassword /> :<ForgotPassword />} />

          <Route path='/password/reset/:token' element={isAuthenticated ? <UpdatePassword /> :<ResetPassword />} />

          <Route path='/user/:id' element={isAuthenticated? <UserProfile /> :<Login />} />

          <Route path='/search' element={isAuthenticated? <Search /> :<Login />} />

          <Route path='/chats' element={isAuthenticated? <Chat /> :<Login />} />

        </Routes>

      </Router>
    </>

  );
}

export default App;
