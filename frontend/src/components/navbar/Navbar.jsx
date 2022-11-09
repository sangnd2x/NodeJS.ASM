import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css"

const Navbar = (props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(props.user);
  const [hotel, setHotel] = useState(props.hotel);

  const handleClick = () => {
    if (!props.user) return
    if (props.user) navigate('/transaction', { state: { user, hotel } });
  }
  return (
    <div className="navbar">
      {props.user ?
        (<div className="navContainer">
        <span className="logo">Booking Website</span>
        <div className="navItems">
          <p>{props.user.username}</p>
          <button className="navButton" onClick={() => handleClick()}><a href="">Transaction</a></button>
          <button className="navButton"><a href="/login">Logout</a></button>
        </div>
        </div>)
        :
        (<div className="navContainer">
        <span className="logo">Booking Website</span>
        <div className="navItems">
          <button className="navButton"><a href="/register">Register</a></button>
          <button className="navButton"><a href="/login">Log in</a></button>
        </div>
      </div>) }
    </div>
  )
}

export default Navbar
