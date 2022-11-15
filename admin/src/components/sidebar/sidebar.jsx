import React from 'react'
import { FaThLarge, FaUser, FaHotel, FaBed, FaMoneyCheckAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import {AiOutlineLogout} from 'react-icons/ai'
import './sidebar.css'

const Sidebar = () => {
  const navigate = useNavigate();
  const logout = () => {
    navigate('/');
  } 

  return (
    <div className="sidebar">
      <div className="center">
        <ul>
          <div>
            <p className="title">MAIN</p>
            <li>
              <a href="/dashboard">
                <FaThLarge className="icon"/>
                <span>Dashboard</span>
              </a>
            </li>
            <p className="title">LISTS</p>
            <li>
              <a href="/users">
                <FaUser className="icon"/>
                <span>Users</span>
              </a>
            </li>
            <li>
              <a href="/hotels">
                <FaHotel className="icon"/>
                <span>Hotels</span>  
              </a>
            </li>
            <li>
              <a href="/rooms">
                <FaBed className="icon"/>
                <span>Rooms</span>
              </a>
            </li>
            <li>
              <a href="/transactions">
                <FaMoneyCheckAlt className="icon"/>
                <span>Transaction</span>
              </a>
            </li>
            <p className="title">NEW</p>
            <li>
              <a href="/add-hotel">
                <FaHotel className="icon"/>
                <span>New Hotel</span>
              </a>
            </li>
            <li>
              <a href="/add-room">
                <FaBed className="icon"/>
                <span>New Room</span>
              </a>
            </li>
            <p className="title">USER</p>
            <li onClick={() => logout()}>
              <AiOutlineLogout className="icon"/>
              <span>Log Out</span>
            </li>
          </div>
          <div className="vl">
          </div>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar