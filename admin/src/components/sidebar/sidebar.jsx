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
              <FaThLarge className="icon"/>
              <span>Dashboard</span>
            </li>
            <p className="title">LISTS</p>
            <li>
              <FaUser className="icon"/>
              <span>Users</span>
            </li>
            <li>
              <FaHotel className="icon"/>
              <span>Hotels</span>  
            </li>
            <li>
              <FaBed className="icon"/>
              <span>Rooms</span>
            </li>
            <li>
              <FaMoneyCheckAlt className="icon"/>
              <span>Transaction</span>
            </li>
            <p className="title">NEW</p>
            <li>
              <FaHotel className="icon"/>
              <span>New Hotel</span>
            </li>
            <li>
              <FaBed className="icon"/>
              <span>New Room</span>
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