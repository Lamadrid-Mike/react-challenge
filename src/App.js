import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Rating from "@mui/material/Rating";
import Data from "./Data.txt";
import "./App.css";

function App() {
  const [data, setData] = useState(null);
  const [dataDownloaded, setDataDownloaded] = useState(false);
  const [rightData, setRightData] = useState(null);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    return async function () {
      await fetch(Data)
        .then((response) => response.json())
        .then((json) => {
          setData(json);
          setDataDownloaded(true);
        });
    };
  }, []);

  const leftSide = (array) => {
    return array.map((el, id) => {
      return (
        <div key={id + 1} className="left-item-layout">
          <img
            src={el.image}
            alt={el.title}
            style={{ width: 120, height: "auto" }}
          ></img>
          <p>{el.title}</p>
          <Button
            size="small"
            variant="contained"
            id={id + 1}
            onClick={descriptionBtn}
          >
            info
          </Button>
        </div>
      );
    });
  };

  const descriptionBtn = (event) => {
    let itemId = +event.target.id;
    let result = data.find((el) => el.id === itemId);
    const { price, description, rating } = result;
    setRightData({
      price,
      description,
      rating,
    });
    setShowContent(true);
    console.log(rating);
  };

  const rightSide = (object) => {
    const { rate, count } = object.rating;
    return (
      <div className="description-layout">
        <h1 className="text-align">${object.price}</h1>
        <p className="p-text">{object.description}</p>
        <Rating name="read-only" value={rate} size="medium" readOnly />
        <p className="count">({count})</p>
        <div className="cart-btn">
          <Button variant="outlined" startIcon={<AddShoppingCartIcon />}>
            Add
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h1 className="text-align">Clothing Shop</h1>
      <p className="text-align">welcome to our collection please pick any</p>
      <div className="main-container">
        <div className="main-left">{dataDownloaded && leftSide(data)}</div>
        <div className="main-right">{showContent && rightSide(rightData)}</div>
      </div>
    </div>
  );
}

export default App;
