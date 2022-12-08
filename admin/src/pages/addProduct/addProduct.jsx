import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/header'
import Sidebar from '../../components/sidebar/sidebar'
import axios from 'axios'
import './addProduct.css'

const AddProduct = () => {
  const navigate = useNavigate();
  const [prodName, setProdName] = useState('')
  const [category, setCategory] = useState('')
  const [shortDesc, setShortDesc] = useState('')
  const [longDesc, setLongDesc] = useState('')
  const [price, setPrice] = useState('');
  const [images, setImages] = useState([])
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('productName', prodName);
    data.append('category', category);
    data.append('shortDesc', shortDesc);
    data.append('longDesc', longDesc);
    data.append('price', price);
    for (let i = 0; i < images.length; i++){
      data.append('images', images[i]);
    }

    const postProduct = async () => {
      const response = await axios.post('http://localhost:5000/admin/new-product', data);
      if (response.status === 200) {
        navigate('/products');
      }
    }

    postProduct();
  }

  return (
    <div>
      <Header />
      <div className="addProduct-container">
        <Sidebar />
        <div className="addProduct">
          <h1>Add Product</h1>
          <div className="addProduct-form">
            <div className="form-control">
              <label htmlFor="product-name">Product Name</label>
              <input type="text" name='product-name' placeholder='Enter Product Name' onChange={(e) => setProdName(e.target.value)}/>
            </div>
            <div className="form-control">
              <label htmlFor="category">Category</label>
              <input type="text" name='addProduct-container' placeholder='Enter Category' onChange={(e) => setCategory(e.target.value)}/>
            </div>
            <div className="form-control">
              <label htmlFor="price">Price</label>
              <input type="text" multiple name='price' onChange={(e) => setPrice(e.target.value)} placeholder='Enter price'/>
            </div>
            <div className="form-control">
              <label htmlFor="short-description">Short Description</label>
              <textarea type="text" name='short-description' placeholder='Enter Short Description' rows={5} onChange={(e) => setShortDesc(e.target.value)}></textarea>
            </div>
            <div className="form-control">
              <label htmlFor="long-description">Long Description</label>
              <textarea type="text" name='long-description' placeholder='Enter Long Description'rows={10} onChange={(e) => setLongDesc(e.target.value)}></textarea>
            </div>
            <div className="form-control">
              <label htmlFor="iamges">Upload Images (5 images)</label>
              <input type="file" multiple name='images' onChange={(e) => setImages(e.target.files)}/>
            </div>
            <div className="form-control">
              <button onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddProduct