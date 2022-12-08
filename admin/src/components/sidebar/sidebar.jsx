import React from 'react'
import { useNavigate } from 'react-router-dom';
import './sidebar.css'

const Sidebar = () => {
  const navigate = useNavigate();
  const logout = () => {
    navigate('/signin');
  } 

  return (
    <div className="sidebar">
      <div className="center">
        <ul>
          <div>
            <p className="title">MAIN</p>
            <li>
              <a href="/dashboard">
                <span>Dashboard</span>
              </a>
            </li>
            <p className="title">LISTS</p>
            <li>
              <a href="/products">
                <span>Products</span>
              </a>
            </li>
            <li>
              <a href="/new-product">
                <span>New Product</span>  
              </a>
            </li>
            <li>
              <a href="/chatrooms">
                <span>Chat</span>  
              </a>
            </li>
            <p className="title">USER</p>
            <li onClick={() => logout()}>
              <span>Sign Out</span>
            </li>
          </div>
        </ul>
      </div>
      <div className="vertical-line"></div>
    </div>
  )
}

export default Sidebar