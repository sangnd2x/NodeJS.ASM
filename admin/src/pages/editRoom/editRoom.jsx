import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../../components/sidebar/sidebar';
import axios from 'axios';
import './editRoom.css';

const EditRoom = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [roomId, setRoomId] = useState(location.state.roomId);
    const [roomInfo, setRoomInfo] = useState({});
    const [availHotels, setAvailHotels] = useState([]);

    // Fetch list of hotels
    useEffect(() => {
        axios.get('http://localhost:5000/admin/hotels')
            .then(res => setAvailHotels(res.data))
            .catch(err => console.log(err));
    }, []);

    // Fetch edit room info
    useEffect(() => {
        axios.get(`http://localhost:5000/admin/edit-room/${roomId}`)
            .then(res => {
                console.log(res);
                setRoomInfo(res.data);
                // setRoomName(res.data.roomName);
            })
            .catch(err => console.log(err));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoomInfo({ ...roomInfo, [name]: value });
    }

    const handleEdit = (e) => {
        e.preventDefault();
        console.log(roomInfo);
        const post = () => {
            fetch(`http://localhost:5000/admin/edit-room/${roomId}`, {
                method: 'POST',
                body: JSON.stringify(roomInfo),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => console.log(res))
                .catch(err => console.log(err));
        }
        post();
        navigate('/rooms');
    }


    return (
        <div className="editRoom">
            <div className="nav">
                <h3 style={{color: "#6F41FF"}}>Admin Page</h3>
                <hr style={{border: "1px solid lightgray"}} />
            </div>
            <div className="editRoom__container">
                <Sidebar className="sidebar" />
                <div className='form__container'>
                    <div className="form__container-title">
                        <h4>Edit Room</h4>
                    </div>
                    <div className="form__container-form">
                        <form>
                            <div className='form-control'>
                                <div className='input-label'>
                                    <label htmlFor="">Title</label>
                                    {/* <p className='error'>{errors.title}</p> */}
                                </div>
                                <input type="text" name="title" onChange={(e) => handleChange(e)}
                                    defaultValue={roomInfo.title}
                                />
                            </div>
                            <div className='form-control'>
                                <div className='input-label'>
                                    <label htmlFor="">Description</label>
                                    {/* <p className='error'>{errors.desc}</p> */}
                                </div>
                                <input type="text" name="desc" onChange={(e) => handleChange(e)}
                                    defaultValue={roomInfo.desc}
                                />
                            </div>
                            <div className='form-control'>
                                <div className='input-label'>
                                    <label htmlFor="">Price</label>
                                    {/* <p className='error'>{errors.price}</p> */}
                                </div>
                                <input type="number" name="price" onChange={(e) => handleChange(e)}
                                    defaultValue={roomInfo.price}
                                />
                            </div>
                            <div className='form-control'>
                                <div className="input-label">
                                    <label htmlFor="">Max People</label>
                                    {/* <p className='error'>{errors.maxPeople}</p> */}
                                </div>
                                <input type="number" name="maxPeople" onChange={(e) => handleChange(e)}
                                    defaultValue={roomInfo.maxPeople}
                                />
                            </div>
                            <div className='form-control'>
                                <div className="input-label">
                                    <label htmlFor="">Hotel</label>
                                    {/* <p className='error'>{errors.hotel}</p> */}
                                </div>
                                <select name="hotel" id="hotel" onChange={(e) => handleChange(e)}>
                                    <option value={roomInfo.hotel}>Select</option>
                                    {availHotels.map((hotel, i) => (
                                        <option key={i} value={hotel.name}>{hotel.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='form-control-room'>
                                <div className="input-label">
                                    <label htmlFor="">Rooms</label>
                                    {/* <p className='error'>{errors.rooms}</p> */}
                                </div>
                                <textarea name="roomNumbers" id="roomNumbers" cols="20" rows="7"
                                    placeholder="New line after every room number"
                                    onChange={(e) => handleChange(e)}
                                    defaultValue={roomInfo.roomNumbers}
                                ></textarea>
                            </div>
                            <div className='form-control'>
                                <button className="add-button" onClick={(e) => handleEdit(e)}>Update Room</button> 
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default EditRoom;