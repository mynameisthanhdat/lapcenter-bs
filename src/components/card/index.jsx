import React from "react";
import { Button } from "react-bootstrap";
import "./styles.scss";

const product1 = require("../../assets/imgs/p1.jpg");

export default function Card() {
  return (
    <div className="card-product pb-3 pt-2 my-4 mx-3">
      <img className="image" src={product1} alt="" />
      <div className="info-product">
        <h5>LAP ABC</h5>
        <p>Hang: ASUS</p>
        <p>Chip: Itel</p>
        <p>Gia: 10000000 VND</p>
      </div>
      <div className="btn-view">
        <Button variant="primary">Xem san pham</Button>
      </div>
    </div>
  );
}
