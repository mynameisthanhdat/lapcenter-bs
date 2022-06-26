import React from "react";
import "./styles.scss";
import { useNavigate } from "react-router-dom";

const SameCard = ({ product }) => {
  const navigate = useNavigate();

  const moveToDetail = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div
      className="cardItem-container"
      onClick={() => moveToDetail()}
      title={product.name}
    >
      <img
        className="image"
        src={product.images[0]}
      />
      <h4 className="name">{product.name}</h4>
      <p className="price-text">{product.price} VND</p>
    </div>
  );
};

export default SameCard;
