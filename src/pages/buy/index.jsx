import React, { useState, useEffect } from "react";
import "./styles.scss";
import Navbar from "../../components/navbar";
import { Form, Col, Row, Button } from "react-bootstrap";
import axios from 'axios'

const Buy = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [quantity, setQuantity] = useState(1);

  const [totalPrice, setTotalPrice] = useState(0);
  const [product, setProduct] = useState();
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(true);

  const handleChange = (val, field) => {
    if (field === "name") {
      setName(val);
    }
    if (field === "address") {
      setAddress(val);
    }
    if (field === "email") {
      setEmail(val);
    }
    if (field === "phone") {
      setPhone(val);
    }
  };

  const getProductId = () => {
    setLoading(true);
    axios
      .get(
        `https://lap-center-v1.herokuapp.com/api/product/getProductById/60c07aaea1364c3894ac0b51`
      )
      .then(function (response) {
        // handle success
        const data = response.data.response;
        console.log("DATA: ", data);
        setProduct(data);
        setImage(data.images[0]);
        setTotalPrice(1*data.price)
        setLoading(false);
      })
      .catch(function (error) {
        // handle error
        setLoading(false);
      });
  };

  const handleChangeQuantity = (val) => {
    const value = parseInt(val);
    if (value < 1) {
      setQuantity(1);
      setTotalPrice(1 * product?.price);
    } else {
      setQuantity(val);
      setTotalPrice(val * product?.price);
    }
  };

  const handleUpOrDownQuantity = (method) => {
    if (method === "plus") {
      setQuantity(quantity + 1);
      setTotalPrice((quantity + 1) * product?.price);
    } else {
      if (quantity < 2) {
        setQuantity(1);
        setTotalPrice(1 * product?.price);
      } else {
        setQuantity(quantity - 1);
        setTotalPrice((quantity - 1) * product?.price);
      }
    }
  };

  useEffect(() => {
    getProductId()
  }, [])

  return (
    <div className="buyContainer">
      <Navbar />
      <div className="content">
        <b className="text-danger">Để đặt hàng, </b>{" "}
        <span>
          quý khách hàng vui lòng kiểm tra sản phẩm, số lượng, giá, màu sắc và
          điền các thông tin dưới đây:
        </span>
        <div className="d-flex justify-content-between mt-4">
          <img src={image} alt="" width={80} height={60} />
          <p className="h5 mt-3">{product?.name}</p>
          <div>
            <Button
              variant="secondary"
              className="mx-2"
              onClick={() => handleUpOrDownQuantity("minus")}
            >
              <i class="fa-solid fa-circle-minus"></i>
            </Button>
            <input
              type="number"
              className="inp px-2"
              value={quantity}
              onChange={(e) => handleChangeQuantity(e.target.value)}
            />
            <Button
              variant="secondary"
              className="mx-2"
              onClick={() => handleUpOrDownQuantity("plus")}
            >
              <i class="fa-solid fa-circle-plus"></i>
            </Button>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <div />
          <p className="fw-bold">{product?.price} VND</p>
        </div>
        <hr />
        <div className="d-flex justify-content-between">
          <p className="fw-bold">Tổng tiền:</p>
          <p className="fw-bold text-danger h4">{totalPrice} VND</p>
        </div>
        <Form className="mt-5">
          <Form.Group
            as={Row}
            className="mb-3 d-flex justify-content-between gy-5"
            controlId="formPlaintextEmail"
          >
            <Col sm="12">
              <Form.Label>Họ tên khách hàng</Form.Label>
              <Form.Control
                type="text"
                placeholder="Họ tên khách hàng"
                value={name}
                onChange={(e) => handleChange(e.target.value, "name")}
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3 d-flex justify-content-between"
            controlId="formPlaintextEmail"
          >
            <Col sm="12">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => handleChange(e.target.value, "email")}
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3 d-flex justify-content-between"
            controlId="formPlaintextPassword"
          >
            <Col sm="12">
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                type="text"
                placeholder="Số điện thoại"
                value={phone}
                onChange={(e) => handleChange(e.target.value, "phone")}
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3 d-flex justify-content-between"
            controlId="formPlaintextPassword"
          >
            <Col sm="12">
              <Form.Label>Địa chỉ nhận hàng</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                type="text"
                placeholder="Địa chỉ nhận hàng"
                value={address}
                onChange={(e) => handleChange(e.target.value, "address")}
              />
            </Col>
          </Form.Group>
          <div className="d-flex justify-content-center mt-4">
            <Button variant="success" disabled={disable}>Đặt hàng</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Buy;
