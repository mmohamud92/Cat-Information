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
      catNames.push(catName); // making an array of cat names provided by the API so that the user can select from a list of cats
      catObject[catName] = catID; // making a hashmap of the cat name with the corresponding cat ID
    }
    setCatBreeds(catNames); // catBreeds is a list of all the cat breeds - to be used in dropdown
    setCatDetails(catObject);
  }

  async function getCatDetails(cat) {
    //
    const response = await fetch(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${cat}`,
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
    // when value changes, run getCatDetails
    getCatDetails(catDetails[value]); // with the cat ID from the hashmap created
    console.log(value);
  }, [value]);

  useEffect(() => {
    // get cat breeds on initial render of page
    getCatBreeds();
  }, []);

  const handleChange = (e) => {
    // select the value of the dropdowm option selected
    setValue(e.value);
  };

  const defaultOption = "select your cat breed!"; // default option on render
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
