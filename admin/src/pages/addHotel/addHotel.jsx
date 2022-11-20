import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import Sidebar from '../../components/sidebar/sidebar';
import {useForm} from 'react-hook-form'
import './addHotel.css';

const AddHotel = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    clearErrors
  } = useForm();

  const onSubmit = (data) => {
    const post = () => {
      fetch('http://localhost:5000/admin/add-hotel', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
      })
        .then(res => {
          if (res.status === 200) navigate('/hotels');
        })
        .catch(err => console.log(err));
    }
    
    post();
    
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='form-control'>
                <div className='input-label'>
                    <label htmlFor="">Name</label>
                    {errors.name && <p className='error'>This field is required!</p>}
                </div>
                <input type="text" {...register('name', { required : true })} />
              </div>
              <div className='form-control'>
                <div className="input-label">
                    <label htmlFor="">City</label>
                    {errors.city && <p className='error'>This field is required!</p>}
                </div>
                <input type="text" {...register('city', { required : true })} />
              </div>
              <div className='form-control'>
                <div className="input-label">
                    <label htmlFor="">Distance from City Center</label>
                    {errors.distance && <p className='error'>This field is required!</p>}
                </div>
                <input type="text" {...register('distance', { required : true })} />
              </div>
              <div className='form-control'>
                <div className="input-label">
                    <label htmlFor="">Description</label>
                    {errors.desc && <p className='error'>This field is required!</p>}
                </div>
                <input type="text" name="desc" {...register('desc', { required : true })} />
              </div>
              <div className='form-control'>
                <div className="input-label">
                    <label htmlFor="">Images</label>
                    {errors.photos && <p className='error'>This field is required!</p>}
                </div>
                <textarea type="text" name="photos" {...register('photos', { required : true })} />
              </div>
              <div className='form-control'>
                <div className="input-label">
                    <label htmlFor="">Type</label>
                    {errors.type && <p className='error'>This field is required!</p>}
                </div>
                <input type="text" name="type" {...register('type', { required : true })} />
              </div>
              <div className='form-control'>
                <div className="input-label">
                    <label htmlFor="">Address</label>
                    {errors.address && <p className='error'>This field is required!</p>}
                </div>
                <input type="text" name="address" {...register('address', { required : true })} />
              </div>
              <div className='form-control'>
                <div className="input-label">
                    <label htmlFor="">Title</label>
                    {errors.title && <p className='error'>This field is required!</p>}
                </div>
                <input type="text" name="title" {...register('title', { required : true })} />
              </div>
              <div className='form-control'>
                <div className="input-label">
                    <label htmlFor="">Price</label>
                    {errors.cheapestPrice && <p className='error'>This field is required!</p>}
                </div>
                <input type="number" name="cheapestPrice" {...register('cheapestPrice', { required : true })} />
              </div>
              <div className='form-control'>
                <div className="input-label">
                    <label htmlFor="">Featured</label>
                    {errors.featured && <p className='error'>This field is required!</p>}
                </div>
                <select name="featured" id="featured" {...register('featured', { required : true })}>
                    <option value="">Select</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </select>
              </div>
              <div className='form-control-room'>
                <div className="input-label">
                    <label htmlFor="">Rooms</label>
                    {errors.rooms && <p className='error'>This field is required!</p>}
                </div>
                <textarea name="rooms" id="rooms" cols="20" rows="7" {...register('rooms', { required : true })}></textarea>
              </div>
              <div className='form-control'>
                <button className="add-button" onClick={() => handleSubmit(onSubmit)}>Add Hotel</button> 
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddHotel;