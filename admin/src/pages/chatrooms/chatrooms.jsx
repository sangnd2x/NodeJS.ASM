import { useState, useEffect } from 'react';
import Header from '../../components/header/header';
import Sidebar from '../../components/sidebar/sidebar';
import { FaTelegramPlane } from 'react-icons/fa';
import './chatrooms.css';
import openSocket from 'socket.io-client';
import axios from 'axios';

const ChatRooms = () => {
  const [chatrooms, setChatrooms] = useState([]);
  const [roomId, setRoomId] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const headers = {
      'authorization': 'Bearer ' + localStorage.getItem('token')
    }
    const fetchChatRooms = async () => {
      const response = await axios.get('http://localhost:5000/admin/chatrooms');
      // console.log(response.data);
      setChatrooms(response.data);
    }
    
    fetchChatRooms();
    openSocket('http://localhost:5000');
  }, []);

  // fetch message
  useEffect(() => {
    const fetchMessage = async () => {
      const response = await axios.get(`http://localhost:5000/admin/chatrooms/getById?roomId=${roomId}`);
      setMessages(response.data.messages);
    }

    fetchMessage();
  },[roomId])
  
  const handleClick = (roomId) => {
    const fetchRoomById = async () => {
      const response = await axios.get(`http://localhost:5000/admin/chatrooms/getById?roomId=${roomId}`);
      // console.log(response.data);
      setRoomId(roomId);
    }

    fetchRoomById();
  }

  const handleSend = (e) => {
    console.log(e.target.value)
  }
  
  console.log(messages)
  return (
    <div>
      <Header />
      <div className="chatrooms-container">
        <Sidebar />
        <div className="chatrooms-main">
          <div className="chatrooms-title">
            <h1>Chat</h1>
          </div>
          <div className="chatrooms">
            <div className="chatrooms-navigation">
              <input type="text" placeholder='Search Contact' />
              <hr />
              {chatrooms && chatrooms.map(chatroom => (
                <div className='room-id'>
                  <button key={chatroom._id} onClick={handleClick(chatroom._id)}>{chatroom._id}</button>
                  <hr />
                </div>
              ))}
            </div>
            <div className="chatrooms-chatInterface">
              <div className="messages-display">
                <div className="client">
                  {messages && messages.map((mess, i) => (
                    <p key={i}>{mess}</p>
                  ))}
                </div>
                <div className="admin">
                  <p>General Kenobi</p>
                </div>
              </div>
              <div className="send-message">
                <input type="text" placeholder='Type and enter' onKeyUp={(e) => {
                  if (e.key === 'Enter') {
                    handleSend(e);
                  }
                }}/>
                <a href=""><FaTelegramPlane size={40}/></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatRooms