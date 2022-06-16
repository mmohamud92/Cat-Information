import React from "react";
import "./Image.css";

const Image = ({ catData }) => {
  return (
    <div>
      <div className="image-container">
        {catData.length > 0 ? (
          <img className="cat-image" src={catData[0].url} />
        ) : null}
      </div>
      
        {catData.length > 0 ? (
            <div className="ovals">
          <div className="nationality">{catData[0].breeds[0].origin}</div>
          <a href={catData[0].breeds[0].wikipedia_url} target="_blank">
            <div className="wiki">Wiki</div>
          </a>
          </div>
        ) : null}     
    </div>
  );
};

export default Image;
