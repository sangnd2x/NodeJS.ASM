import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../components/sidebar/sidebar';
import './roomsList.css';

const RoomsList = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [render, setRender] = useState(0);

  useEffect(() => {
    const fetch = () => {
    axios('http://localhost:5000/admin/rooms')
        .then(res => setRooms(res.data))
        .catch(err => console.log(err));
    };

    fetch();
  }, [render]);
  
  const handleAddNew = () => {
    navigate('/add-room');
  }

  const handleDelete = (id) => {
    const post = () => {
      fetch('http://localhost:5000/admin/delete-room', {
        method: 'POST',
        body: JSON.stringify({ id: id }),
        headers: {
            'Content-Type': 'application/json'
        }
      })
        .then(res => {
        if (res.status === 400) {
          return alert('Cannot Delete! There is unpaid transaction with this room!');
        } 
        if (res.status === 200) {
          alert('Are you sure?');
          return setRender(prev => prev + 1);
        }
        })
        .catch(err => console.log(err));
    };

    let confirm = window.confirm('Are you sure?');
    if (confirm) {
      post();
    } else {
      return
    }
  };

    const handleEdit = (id) => {
        const roomId = id;
        navigate(`/edit-room/${roomId}`, { state: { roomId } });
    }

  return (
    <div className="home">
      <div className="nav">
          <h3 style={{color: "#6F41FF"}}>Admin Page</h3>
          <hr style={{border: "1px solid lightgray"}} />
      </div>
      <div className="room__container">
        <Sidebar className="room-sidebar" />
        <div className='roomInfo'>
          <div className="roomInfo__board">
            <div className='roomInfo__board-title'>
              <h4>Rooms List</h4>
              <button onClick={() => handleAddNew()}>Add New</button>
            </div>
            <div className="roomInfo__board-table">
              <table>
                <thead>
                  <tr>
                    <th><input type="checkbox" /></th>
                    <th><span></span>ID</th>
                    <th><span></span>Title</th>
                    <th><span></span>Description</th>
                    <th><span></span>Price</th>
                    <th><span></span>Max People</th>
                    <th><span></span>Action</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                  {rooms.map((room, i) => (
                    <tr key={i}>
                      <td><input type="checkbox" /></td>
                      <td>{room._id}</td>
                      <td>{room.title}</td>
                      <td>{room.desc}</td>
                      <td>{room.price}</td>
                      <td>{room.maxPeople}</td>
                      <td><button className='delete-button' onClick={(e) => handleDelete(room._id)}>Delete</button></td>
                      <td><button className='edit-button' onClick={(e) => handleEdit(room._id)}>Edit</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
  </div>
  )
}

export default RoomsList