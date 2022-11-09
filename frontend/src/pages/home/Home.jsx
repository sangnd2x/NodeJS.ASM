import { useState, useEffect, useRef } from "react";
import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import "./home.css";
import axios from 'axios';
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  const [hotels, setHotels] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [bestRated, setBestRated] = useState([]);
  const [isHotel, setIsHotel] = useState(0);
  const [isApartments, setIsApartments] = useState(0);
  const [isResorts, setIsResorts] = useState(0);
  const [isVillas, setIsVillas] = useState(0);
  const [isCabins, setIsCabins] = useState(0);

  const [user, setUser] = useState(location.state ? location.state.user : null);

  useEffect(() => {
    axios.get('http://localhost:5000/hotels')
      .then(res => {
        setHotels(res.data);
        setFeatured(res.data.filter(hotel => hotel.featured === true));
        setBestRated(res.data.filter(hotel => {
          if (hotel.rating) {
            return hotel;
          }
        }).sort((a, b) => b.rating - a.rating));
        setIsHotel(res.data.filter(hotel => hotel.type === 'hotel'));
        setIsApartments(res.data.filter(hotel => hotel.type === 'apartment'));
        setIsResorts(res.data.filter(hotel => hotel.type === 'resort'));
        setIsVillas(res.data.filter(hotel => hotel.type === 'villa'));
        setIsCabins(res.data.filter(hotel => hotel.type === 'cabin'));
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <Navbar user={user} />
      <Header user={user} />
      <div className="homeContainer">
        <Featured featured={featured} />
        <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList hotel={isHotel} apt={isApartments} resorts={isResorts} villas={isVillas} cabins={isCabins} />
        <h1 className="homeTitle">Homes guests love</h1>
        <FeaturedProperties rating={bestRated.length > 0 ? bestRated : featured} />
        <MailList/>
        <Footer/>
      </div>
    </div>
  );
};

export default Home;
