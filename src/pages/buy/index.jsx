import React, { useState } from "react";
import "./styles.scss";
import Navbar from "../../components/navbar";
import { Form, Col, Row, Button } from "react-bootstrap";

const Buy = () => {
  const img =
    "https://giatin.com.vn/wp-content/uploads/2020/11/cac-loai-kich-thuoc-man-hinh-laptop.jpg";
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState();

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
          <img src={img} alt="" width={80} height={60} />
          <p>Ten laptop</p>
          <div>
            <Button variant="secondary" className="mx-2">
              <i class="fa-solid fa-circle-minus"></i>
            </Button>
            <input type="text" className="inp px-2" />
            <Button variant="secondary" className="mx-2">
              <i class="fa-solid fa-circle-plus"></i>
            </Button>
          </div>
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
                as="textarea" rows={3}
                type="text"
                placeholder="Địa chỉ nhận hàng"
                value={address}
                onChange={(e) => handleChange(e.target.value, "address")}
              />
            </Col>
          </Form.Group>
          <div className="d-flex justify-content-center mt-4">
            <Button variant="success">Đặt hàng</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Buy;
