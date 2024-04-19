import React, { useState } from 'react'
import './Header.css';
import { Link } from 'react-router-dom';
import { 
    Home, 
    HomeOutlined, 
    Add, 
    AddOutlined, 
    SearchOutlined, 
    Search, 
    AccountCircle, 
    AccountCircleOutlined,
    SendOutlined, 
    Send
} from '@mui/icons-material';

const Header = () => {

    const [tab, setTab] = useState(window.location.pathname);

  return (
    <div className='header'>
        <Link to="/" onClick={()=>setTab("/")}>
        {
            tab==="/"?<Home style={{color: "black"}} />:<HomeOutlined />
        }
        </Link>

        <Link to="newpost" onClick={()=>setTab("/newpost")}>
        {
            tab==="/newpost"?<Add style={{color: "black"}} />:<AddOutlined />
        }
        </Link>

        <Link to="search" onClick={()=>setTab("/search")}>
        {
            tab==="/search"?<Search style={{color: "black"}} />:<SearchOutlined />
        }
        </Link>

        <Link to="account" onClick={()=>setTab("/account")}>
        {
            tab==="/account"?<AccountCircle style={{color: "black"}} />:<AccountCircleOutlined />
        }
        </Link>

        <Link to="chats" onClick={()=>setTab("/chats")}>
        {
            tab==="/chats"?<Send style={{color: "black"}} />:<SendOutlined />
        }
        </Link>
      
    </div>
  )
}

export default Header

