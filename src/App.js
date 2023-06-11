import React, { useState } from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import "./App.css";

const data = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating: { rate: 3.9, count: 120 },
  },
  {
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts ",
    price: 22.3,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    category: "men's clothing",
    image:
      "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    rating: { rate: 4.1, count: 259 },
  },
  {
    id: 3,
    title: "Mens Cotton Jacket",
    price: 55.99,
    description:
      "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    rating: { rate: 4.7, count: 500 },
  },
  {
    id: 4,
    title: "Mens Casual Slim Fit",
    price: 15.99,
    description:
      "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
    rating: { rate: 2.1, count: 430 },
  },
];

function App() {
  const [loadData, setLoadData] = useState(null);
  const [rightData, setRightData] = useState(null);
  const [showContent, setShowContent] = useState(false);

  new Promise((res) => {
    setTimeout(() => {
      return res(data);
    }, 1500);
  }).then((data) => setLoadData(data));

  const leftSide = (array) => {
    return array.map((el, id) => {
      return (
        <div key={id + 1} className="left-item-layout">
          <img
            src={el.image}
            alt={el.title}
            style={{ width: 120, height: "auto", borderRadius: "10px" }}
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

  const loadingEffect = () => {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  };

  return (
    <div>
      <h1 className="text-align">Clothing Shop</h1>
      <p className="text-align">welcome to our collection please pick any</p>
      <div className="main-container">
        <div className="main-left">
          {loadData ? leftSide(loadData) : loadingEffect()}
        </div>
        <div className="main-right">{showContent && rightSide(rightData)}</div>
      </div>
    </div>
  );
}

export default App;
