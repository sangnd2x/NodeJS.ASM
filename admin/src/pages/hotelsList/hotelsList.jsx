import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../components/sidebar/sidebar';
import './hotelsList.css';

const HotelsList = () => {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [render, setRender] = useState(0);

  useEffect(() => {
      const fetch = () => {
      axios('http://localhost:5000/admin/hotels')
          .then(res => setHotels(res.data))
          .catch(err => console.log(err));
          };

      fetch();
  }, [render]);

  const handleDelete = (id) => {
    const post = () => {
      fetch('http://localhost:5000/admin/delete-hotel', {
        method: 'POST',
        body: JSON.stringify({ id: id }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        if (res.status === 400) {
          return alert('Cannot Delete! There are unpaid transactions!');
        }
        if (res.status === 200) {
          return setRender(prev => prev + 1);
        }
      }).catch(err => console.log(err));
    }

    if (window.confirm('Are you sure?')) {
      post();
    } else {
      return
    }
  };
    
    const handleAddNew = () => {
        navigate('/add-hotel');
    }

    const handleEdit = (id) => {
        const hotelId = id;
        navigate(`/edit-hotel/${hotelId}`, { state: { hotelId } });
    }

  return (
    <div className="home">
      <div className="nav">
          <h3 style={{color: "#6F41FF"}}>Admin Page</h3>
          <hr style={{border: "1px solid lightgray"}} />
      </div>
      <div className="hotel__container">
          <Sidebar className="hotel-sidebar" />
          <div className='hotelInfo'>
              <div className="hotelInfo__board">
                  <div className='hotelInfo__board-title'>
                    <h4>Hotels List</h4>
                    <button onClick={() => handleAddNew()}>Add New</button>
                  </div>
                  <div className="hotelInfo__board-table">
                      <table>
                          <thead>
                              <tr>
                                  <th><input type="checkbox" /></th>
                                  <th><span></span>ID</th>
                                  <th><span></span>Name</th>
                                  <th><span></span>Type</th>
                                  <th><span></span>Title</th>
                                  <th><span></span>City</th>
                                  <th><span></span>Action</th>
                                  <th></th>
                                  </tr>
                          </thead>
                          <tbody>
                              {hotels.map((hotel, i) => (
                                  <tr key={i}>
                                      <td><input type="checkbox" /></td>
                                      <td>{hotel._id}</td>
                                      <td>{hotel.name}</td>
                                      <td>{hotel.type}</td>
                                      <td>{hotel.title}</td>
                                      <td>{hotel.city}</td>
                                      <td><button className='delete-button' onClick={(e) => handleDelete(hotel._id)}>Delete</button></td>
                                      <td><button className='edit-button' onClick={(e) => handleEdit(hotel._id)}>Edit</button></td>
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

export default HotelsList