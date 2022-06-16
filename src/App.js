import React from "react";
import { useState, useEffect } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "./App.css";
import Image from "./Components/Image/Image";
import Information from "./Components/Information/Information";

function App() {
  const [catBreeds, setCatBreeds] = useState([]);
  const [value, setValue] = useState("");
  const [catDetails, setCatDetails] = useState({});
  const [catData, setCatData] = useState([]);

  async function getCatBreeds() {
    let catNames = [];
    let catObject = {};
    const response = await fetch("https://api.thecatapi.com/v1/breeds", {
      method: "GET",
      withCredentials: true,
      headers: {
        "X-API-KEY": process.env.API_KEY,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    for (let i = 0; i < data.length; i++) {
      const catName = data[i].name;
      const catID = data[i].id;
      catNames.push(catName);
      catObject[catName] = catID;
    }
    setCatBreeds(catNames);
    setCatDetails(catObject);
  }

  async function getCatDetails(value) {
    const response = await fetch(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${value}`,
      {
        method: "GET",
        withCredentials: true,
        headers: {
          "X-API-KEY": process.env.API_KEY,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setCatData(data);
    console.log(data);
    return data;
  }

  useEffect(() => {
    getCatDetails(catDetails[value]);
    console.log(value);
  }, [value]);

  useEffect(() => {
    getCatBreeds();
  }, []);

  const handleChange = (e) => {
    setValue(e.value);
  };

  const defaultOption = "select your cat breed!";
  const options = catBreeds;
  return (
    <div>
      <div>
        <Dropdown
          options={options}
          value={defaultOption}
          onChange={handleChange}
          placeholder="Select an option"
        />
      </div>
      <div className="check">
        <Image catData={catData} />
      </div>
      <div className="cat-name">
        <div>{value}</div>
      </div>
      <div className="box-container">
      <Information catData={catData} />
      </div>
    </div>
  );
}

export default App;
