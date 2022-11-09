import { useState, useEffect } from "react";
import "./featured.css";

const Featured = (props) => {
  return (
    <div className="featured">
      {props.featured.map(f => (
        <div className="featuredItem" key={f._id}>
          <img
            src={f.photos[2]}
            alt={f.name}
            className="featuredImg"
          />
          <div className="featuredTitles">
            <h1>{f.city}</h1>
            <h2>{f.rooms.length} properties</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Featured;
