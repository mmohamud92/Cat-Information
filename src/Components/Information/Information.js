import React from "react";
import "./Information.css";

const Information = ({ catData }) => {
  return (
    <div>
      {catData.length > 0 ? (
        <div className="box">
          <div className="description">
            {" "}
            <span className="bold">Description</span> : {catData[0].breeds[0].description}{" "}
          </div>
          <div className="detail temperament">
          <span className="bold">Temperament</span> : {catData[0].breeds[0].temperament}
          </div>
          <div className="detail affection">
              <span className="bold">Affection</span> level : {catData[0].breeds[0].affection_level}/5
          </div>
          <div className="detail vocalisation">
          <span className="bold">Vocalisation</span> : {catData[0].breeds[0].vocalisation}/5
          </div>
          <div className="detail child-friendly">
          <span className="bold">Child friendly</span> : {catData[0].breeds[0].child_friendly}/5
          </div>
          <div className="detail stranger-friendly">
          <span className="bold">Stanger</span> friendly : {catData[0].breeds[0].stranger_friendly}/5
          </div>
          <div className="detail intelligence">
          <span className="bold">Intelligence</span> : {catData[0].breeds[0].intelligence}/5
          </div>
          <div className="detail social-needs">
          <span className="bold">Social Needs</span> : {catData[0].breeds[0].social_needs}/5
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Information;
