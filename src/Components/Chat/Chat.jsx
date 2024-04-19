import React from 'react'
import './Chat.css'
import SearchIcon from '@mui/icons-material/Search';

const Chat = () => {

  return (
    <div className='chats'>
        <div className="chatsleft">
            <div className="leftsearch">
                <SearchIcon />
                <input type="text" className='chatSearch' placeholder='Search User' />
            </div>
            Left ?

        </div>

        <div className="chatsright">
            Right ?

        </div>
    </div>
  )
}

export default Chat
