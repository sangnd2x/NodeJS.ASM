import { useState, useEffect } from 'react';
import {useNavigate, useLocation} from 'react-router-dom'
import Sidebar from '../../components/sidebar/sidebar';
import './addHotel.css';

const AddHotel = () => {
    const navigate = useNavigate();
    const [hotelInfo, setHotelInfo] = useState({
        name: '',
        type: '',
        city: '',
        address: '',
        distance: '',
        cheapestPrice: 0,
        photos: '',
        rooms: '',
        title:'',
        desc: '',
        featured: ''
    });
    const [errors, setErros] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHotelInfo({ ...hotelInfo, [name]: value });
    }
    const handleAddNew = (e) => {
        e.preventDefault();
        console.log(hotelInfo);
        setErros(validator(hotelInfo));

        const post = () => {
            fetch('http://localhost:5000/admin/add-hotel', {
                method: 'POST',
                body: JSON.stringify(hotelInfo),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => console.log(res))
                .catch(err => console.log(err));
        }

        if (!errors) {
            post();
            navigate('/hotels');
        } else {
            alert('All fields must be filled');
        }
    }

    const validator = (values) => {
        const errors = {}
        if (!values.name) {
            errors.name = 'Name is required!'
        }
        if (!values.type) {
            errors.type = 'Type is required!'
        }
        if (!values.city) {
            errors.city = 'City is required!'
        }
        if (!values.address) {
            errors.address = 'Address is required!'
        }
        if (!values.distance) {
            errors.distance = 'Distance is required!'
        }
        if (!values.cheapestPrice) {
            errors.cheapestPrice = 'Price is required!'
        }
        if (!values.photos) {
            errors.photos = 'Photos is required!'
        }
        if (!values.rooms) {
            errors.rooms = 'Rooms is required!'
        }
        if (!values.title) {
            errors.title = 'Title is required!'
        }
        if (!values.desc) {
            errors.desc = 'Description is required!'
        }
        if (!values.featured) {
            errors.featured = 'Feature must be selected!'
        }
        return errors;
    }

    return (
        <div className="addHotel">
            <div className="nav">
                <h3 style={{color: "#6F41FF"}}>Admin Page</h3>
                <hr style={{border: "1px solid lightgray"}} />
            </div>
            <div className="addHotel__container">
                <Sidebar className="sidebar" />
                <div className='form__container'>
                    <div className="form__container-title">
                        <h4>Add New Hotel</h4>
                    </div>
                    <div className="form__container-form">
                        <form>
                            <div className='form-control'>
                                <div className='input-label'>
                                    <label htmlFor="">Name</label>
                                    <p className='error'>{errors.name}</p>
                                </div>
                                <input type="text" name="name" onChange={(e) => handleChange(e)} />
                                
                            </div>
                            <div className='form-control'>
                                <div className="input-label">
                                    <label htmlFor="">City</label>
                                    <p className='error'>{errors.city}</p>
                                </div>
                                <input type="text" name="city" onChange={(e) => handleChange(e)} />
                            </div>
                            <div className='form-control'>
                                <div className="input-label">
                                    <label htmlFor="">Distance from City Center</label>
                                    <p className='error'>{errors.distance}</p>
                                </div>
                                <input type="text" name="distance" onChange={(e) => handleChange(e)} />
                            </div>
                            <div className='form-control'>
                                <div className="input-label">
                                    <label htmlFor="">Description</label>
                                    <p className='error'>{errors.desc}</p>
                                </div>
                                <input type="text" name="desc" onChange={(e) => handleChange(e)} />
                            </div>
                            <div className='form-control'>
                                <div className="input-label">
                                    <label htmlFor="">Images</label>
                                    <p className='error'>{errors.photos}</p>
                                </div>
                                <textarea type="text" name="photos" onChange={(e) => handleChange(e)} />
                            </div>
                            <div className='form-control'>
                                <div className="input-label">
                                    <label htmlFor="">Type</label>
                                    <p className='error'>{errors.type}</p>
                                </div>
                                <input type="text" name="type" onChange={(e) => handleChange(e)} />
                            </div>
                            <div className='form-control'>
                                <div className="input-label">
                                    <label htmlFor="">Address</label>
                                    <p className='error'>{errors.address}</p>
                                </div>
                                <input type="text" name="address" onChange={(e) => handleChange(e)} />
                            </div>
                            <div className='form-control'>
                                <div className="input-label">
                                    <label htmlFor="">Title</label>
                                    <p className='error'>{errors.title}</p>
                                </div>
                                <input type="text" name="title" onChange={(e) => handleChange(e)} />
                            </div>
                            <div className='form-control'>
                                <div className="input-label">
                                    <label htmlFor="">Price</label>
                                    <p className='error'>{errors.cheapestPrice}</p>
                                </div>
                                <input type="number" name="cheapestPrice" onChange={(e) => handleChange(e)} />
                            </div>
                            <div className='form-control'>
                                <div className="input-label">
                                    <label htmlFor="">Featured</label>
                                    <p className='error'>{errors.featured}</p>
                                </div>
                                <select name="featured" id="featured" onChange={(e) => handleChange(e)}>
                                    <option value="">Select</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                </select>
                            </div>
                            <div className='form-control-room'>
                                <div className="input-label">
                                    <label htmlFor="">Rooms</label>
                                    <p className='error'>{errors.rooms}</p>
                                </div>
                                <textarea name="rooms" id="rooms" cols="20" rows="7" onChange={(e) => handleChange(e)}></textarea>
                            </div>
                            <div className='form-control'>
                                <button className="add-button" onClick={(e) => handleAddNew(e)}>Add Hotel</button> 
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default AddHotel;