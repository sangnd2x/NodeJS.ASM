import { useState, useEffect } from 'react'
import Header from '../../components/header/header'
import Sidebar from '../../components/sidebar/sidebar'
import axios from 'axios'
import './products.css'

const Products = () => {
  const [products, setProducts] = useState([])
  const [searchProducts, setSearchProducts] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('https://asm3-server.onrender.com/admin/products')
      // console.log(response.data)
      setProducts(response.data)
    }

    fetchProducts();
  }, [searched])

  const search = (e) => {
    setSearchQuery(e.target.value)
    if (searchQuery) {
      setSearched(true)
    } else {
      setSearched(false)
    }

    const data = {
      query: searchQuery
    }

    const postSearch = async () => {
      const response = await axios.post('https://asm3-server.onrender.com/admin/search', data);
      console.log(response.data);
      setSearchProducts(response.data);
      setSearched(!searched)
    }

    postSearch();
  }

  return (
    <div>
      <Header />
      <div className="products-container">
        <Sidebar />
        <div className='products-container__main'>
          <div className="search">
            <h1>Products</h1>
            <input type="text" placeholder='Enter Product Name' onChange={(e) => search(e)}/>
          </div>
          <div className="products-container__main-table">
            {/* <div className="center-table"> */}
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th>Category</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {products && !searched ? products.map(product => (
                    <tr key={product._id}>
                      <td>{product._id}</td>
                      <td>{product.name}</td>
                      <td>{new Intl.NumberFormat('vn-Vn', {style: 'currency', currency: 'VND'}).format(product.price)}</td>
                      <td><img src={product.img1} width='60'/></td>
                      <td>{product.category}</td>
                      <td>
                        <button className='update-btn'>Update</button>
                        <button className='edit-btn'>Delete</button>
                      </td>
                    </tr>
                  )) : searchProducts.map(product => (
                    <tr key={product._id}>
                      <td>{product._id}</td>
                      <td>{product.name}</td>
                      <td>{new Intl.NumberFormat('vn-Vn', {style: 'currency', currency: 'VND'}).format(product.price)}</td>
                      <td><img src={product.img1} width='60'/></td>
                      <td>{product.category}</td>
                      <td>
                        <button className='update-btn'>Update</button>
                        <button className='edit-btn'>Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products