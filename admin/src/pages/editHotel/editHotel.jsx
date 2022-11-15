import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios';
import Sidebar from '../../components/sidebar/sidebar';
import './editHotel.css';

const EditHotel = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [hotelId, setHotelId] = useState(location.state.hotelId)
    const [editInfo, setEditInfo] = useState({});
    const [roomName, setRoomName] = useState([]);
    // console.log(errors);

    // Fetch edit hotel info
    useEffect(() => {
        axios.get(`http://localhost:5000/admin/edit-hotel/${hotelId}`)
            .then(res => {
                setEditInfo(res.data.hotel);
                setRoomName(res.data.roomName);
            })
            .catch(err => console.log(err));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditInfo({ ...editInfo, [name]: value });
    }

    const handleEdit = (e) => {
        e.preventDefault();

        const post = () => {
            fetch(`http://localhost:5000/admin/edit/${hotelId}`, {
                method: 'POST',
                body: JSON.stringify(editInfo),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => console.log(res))
                .catch(err => console.log(err));
        }
        post();
        navigate('/hotels');
    }


    return (
        <div className="editHotel">
            <div className="nav">
                <h3 style={{color: "#6F41FF"}}>Admin Page</h3>
                <hr style={{border: "1px solid lightgray"}} />
            </div>
            <div className="editHotel__container">
                <Sidebar className="sidebar" />
                <div className='form__container'>
                    <div className="form__container-title">
                        <h4>Edit Hotel</h4>
                    </div>
                    <div className="form__container-form">
                        <form>
                            <div className='form-control'>
                                <div className='input-label'>
                                    <label htmlFor="">Name</label>
                                    {/* <p className='error'>{errors.name}</p> */}
                                </div>
                                <input type="text" name="name" onChange={(e) => handleChange(e)}  
                                    defaultValue={editInfo.name}
                                />
                                
                            </div>
                            <div className='form-control'>
                                <div className="input-label">
                                    <label htmlFor="">City</label>
                                    {/* <p className='error'>{errors.city}</p> */}
                                </div>
                                <input type="text" name="city" onChange={(e) => handleChange(e)}  
                                    defaultValue={editInfo.city}
                                />
                            </div>
                            <div className='form-control'>
                                <div className="input-label">
                                    <label htmlFor="">Distance from City Center</label>
                                    {/* <p className='error'>{errors.distance}</p> */}
                                </div>
                                <input type="text" name="distance" onChange={(e) => handleChange(e)}  
                                    defaultValue={editInfo.distance}
                                />
                            </div>
                            <div className='form-control'>
                                <div className="input-label">
                                    <label htmlFor="">Description</label>
                                    {/* <p className='error'>{errors.desc}</p> */}
                                </div>
                                <input type="text" name="desc" onChange={(e) => handleChange(e)}  
                                    defaultValue={editInfo.desc}
                                />
                            </div>
                            <div className='form-control'>
                                <div className="input-label">
                                    <label htmlFor="">Images</label>
                                    {/* <p className='error'>{errors.photos}</p> */}
                                </div>
                                <textarea type="text" name="photos" onChange={(e) => handleChange(e)}  
                                    defaultValue={editInfo.photos}
                                />
                            </div>
                            <div className='form-control'>
                                <div className="input-label">
                                    <label htmlFor="">Type</label>
                                    {/* <p className='error'>{errors.type}</p> */}
                                </div>
                                <input type="text" name="type" onChange={(e) => handleChange(e)}  
                                    defaultValue={editInfo.type}
                                />
                            </div>
                            <div className='form-control'>
                                <div className="input-label">
                                    <label htmlFor="">Address</label>
                                    {/* <p className='error'>{errors.address}</p> */}
                                </div>
                                <input type="text" name="address" onChange={(e) => handleChange(e)}  
                                    defaultValue={editInfo.address}
                                />
                            </div>
                            <div className='form-control'>
                                <div className="input-label">
                                    <label htmlFor="">Title</label>
                                    {/* <p className='error'>{errors.title}</p> */}
                                </div>
                                <input type="text" name="title" onChange={(e) => handleChange(e)}  
                                    defaultValue={editInfo.title}
                                />
                            </div>
                            <div className='form-control'>
                                <div className="input-label">
                                    <label htmlFor="">Price</label>
                                    {/* <p className='error'>{errors.cheapestPrice}</p> */}
                                </div>
                                <input type="number" name="cheapestPrice" onChange={(e) => handleChange(e)}
                                    defaultValue={editInfo.cheapestPrice}
                                />
                            </div>
                            <div className='form-control'>
                                <div className="input-label">
                                    <label htmlFor="">Featured</label>
                                    {/* <p className='error'>{errors.featured}</p> */}
                                </div>
                                <select name="featured" id="featured" onChange={(e) => handleChange(e)} 
                                    value={editInfo.featured}
                                >
                                    <option value="">Select</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                </select>
                            </div>
                            <div className='form-control-room'>
                                <div className="input-label">
                                    <label htmlFor="">Rooms</label>
                                    {/* <p className='error'>{errors.rooms}</p> */}
                                </div>
                                <textarea name="rooms" id="rooms" cols="20" rows="7" onChange={(e) => handleChange(e)} 
                                defaultValue={roomName? roomName.join('\n') : roomName}
                                ></textarea>
                            </div>
                            <div className='form-control'>
                                <button className="add-button" onClick={(e) => handleEdit(e)}>Update Hotel</button> 
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default EditHotel;