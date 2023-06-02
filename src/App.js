import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "./App.css";

function App() {
  const [data, setData] = useState(null);
  const [rightData, setRightData] = useState(null);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    return async function () {
      await fetch("https://fakestoreapi.com/products?limit=4")
        .then((response) => response.json())
        .then((json) => setData(json));
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
  };

  const rightSide = (object) => {
    return (
      <div className="description-layout">
        <h1 className="text-align">${object.price}</h1>
        <p className="p-text">{object.description}</p>
      </div>
    );
  };

  const loadingEffect = () => {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  };

  return (
    <div>
      <h1 className="text-align">clothing shop</h1>
      <p className="text-align">welcome to our collection please pick any</p>
      <div className="main-container">
        <div className="main-left">
          {data ? leftSide(data) : loadingEffect()}
        </div>
        <div className="main-right">{showContent && rightSide(rightData)}</div>
      </div>
    </div>
  );
}

export default App;
