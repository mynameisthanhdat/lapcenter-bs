import React from "react";
import { Button } from "react-bootstrap";
import "./styles.scss";
import { useNavigate } from 'react-router-dom'

export default function Card({product}) {
  const navigate = useNavigate();
  // console.log("URL: ", product);
  // const url = product.image
  return (
    <div className="card-product pb-3 pt-2 my-4 mx-3">
      <img className="image" src={product.images[0]} alt="" />
      <div className="info-product">
        <h5>{product.name}</h5>
        <p>Hang: {product.brand}</p>
        <p>Chip: {product.cpu}</p>
        <p>Gia: {product.price} VND</p>
      </div>
      <div className="btn-view">
        <Button variant="primary" onClick={() => {navigate(`/product/${product._id}`, {state: { id: product._id, brand: product.brand }})}}>Xem san pham</Button>
      </div>
    </div>
  );
}
