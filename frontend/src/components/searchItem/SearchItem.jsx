import "./searchItem.css";
import { useNavigate } from "react-router-dom";

const SearchItem = (props) => {
  const hotel = props.hotel;
  const date = props.date;
  const user = props.user;
  const options = props.options
  const navigate = useNavigate();

  console.log(hotel, date, user);

  const handleClick = () => {
    navigate(`/hotels/${props.hotel._id}`, { state: { hotel, date, user, options } });
  }
  return (
    <div className="searchItem">
      <img
        src={props.hotel.photos.length > 0 ? props.hotel.photos[0] : ''}
        alt=""
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{props.hotel.title}</h1>
        <span className="siDistance">{props.hotel.distance}m from center</span>
        <span className="siTaxiOp">tag</span>
        <span className="siSubtitle">
          {props.hotel.desc}
        </span>
        <span className="siFeatures">
          {props.hotel.type}
        </span>
        {/* If can cancel */}
        {/* {free_cancel ? (
          <div>
            <span className="siCancelOp">Free cancellation </span>
            <span className="siCancelOpSubtitle">
              You can cancel later, so lock in this great price today!
            </span>
          </div>
        ) : (<div></div>)} */}
      </div>
      <div className="siDetails">
        <div className="siRating">
          <span>{props.hotel.rating? props.hotel.rating : '5 ⭐️'}</span>
          <button>Rate</button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">${props.hotel.cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <button className="siCheckButton" onClick={() => handleClick()}>See availability</button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
