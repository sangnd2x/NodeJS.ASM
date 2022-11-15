import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Hotel = (props) => {
  const location = useLocation();
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(location.state.date);
  const [user, setUser] = useState(location.state.user);
  const [hotel, setHotel] = useState(location.state.hotel);
  const [options, setOptions] = useState(location.state.options);

  const navigate = useNavigate();

  const start = new Date(location.state.date[0].startDate);
  const end = new Date(location.state.date[0].endDate);
  
  const dateDiff = Math.floor(end.getTime() - start.getTime())/(24*3600*1000);

  const photos = location.state.hotel.photos;

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber)
  };

  const handleBooking = () => {
    navigate('/booking', { state: { date, user, hotel, options } });
  }

  return (
    <div>
      <Navbar user={user} hotel={hotel} />
      <Header type="list" />
      <div className="hotelContainer">
        {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              <img src={photos[slideNumber]} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
        <div className="hotelWrapper">
          <button className="bookNow">Reserve or Book Now!</button>
          <h1 className="hotelTitle">{location.state.hotel.title}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{location.state.hotel.address}</span>
          </div>
          <span className="hotelDistance">
            Excellent location – {location.state.hotel.distance}m from center
          </span>
          <span className="hotelPriceHighlight">
            Book a stay over ${location.state.hotel.cheapestPrice} at this property and get a free airport taxi
          </span>
          <div className="hotelImages">
            {location.state.hotel.photos.map((photo, i) => (
              <div className="hotelImgWrapper" key={i}>
                <img
                  onClick={() => handleOpen(i)}
                  src={photo}
                  alt=""
                  className="hotelImg"
                />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">Stay in the heart of City</h1>
              <p className="hotelDesc">
                {location.state.hotel.desc}
              </p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for a {dateDiff}-night stay!</h1>
              <h2>
                <b>${dateDiff * location.state.hotel.cheapestPrice}</b> ({dateDiff} nights)
              </h2>
              <button onClick={() => handleBooking()}>Reserve or Book Now!</button>
            </div>
          </div>
        </div>
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Hotel;
