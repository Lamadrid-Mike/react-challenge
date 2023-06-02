import React, { useState, useEffect } from "react";
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
            style={{ width: 150, height: "auto" }}
          ></img>
          <p>{el.title}</p>
          <button id={id + 1} onClick={descriptionBtn}>
            description
          </button>
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
        <h3>${object.price}</h3>
        <p>{object.description}</p>
      </div>
    );
  };

  return (
    <div>
      <h1>clothing shop</h1>
      <p>welcome to our collection please pick any</p>
      <div className="main-container">
        <div className="main-left">{data ? leftSide(data) : "Loading.."}</div>
        <div className="main-right">
          {showContent ? rightSide(rightData) : ""}
        </div>
      </div>
    </div>
  );
}

export default App;
