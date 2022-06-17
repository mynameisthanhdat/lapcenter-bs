import React, { useState } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import Navbar from "../../components/navbar";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  let navigate = useNavigate();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();

  const handleChange = (val, field) => {
    if (field === "name") {
      setName(val);
    }
    if (field === "password") {
      setPassword(val);
    }
    if (field === "email") {
      setEmail(val);
    } 
    if (field === "phone") {
      setPhone(val);
    }
  };

  // const handleRegister = () => {
  //   alert("Tạo tài khoản thành công")
  //   navigate('/login')
  // }

  const handleRegister = () => {
    const url = "https://lap-center.herokuapp.com/api/register";
    axios
      .post(url, {
        name: name,
        email: email,
        phone: phone,
        password: password,
      })
      .then(function (response) {
        console.log("SUCCESS: ", response.data);
        navigate("/login");
      })
      .catch(function (error) {
        console.log("ERROR: ", error);
        alert(
          "Lỗi đăng ký, xin vui lòng thử lại!!!"
        );
      });
  };

  return (
    <div className="registerContainer">
      <Navbar />
      <div className="formRegister">
        <h2>Đăng ký </h2>
        <Form>
          <Form.Group
            as={Row}
            className="mb-3 d-flex justify-content-between gy-5"
            controlId="formPlaintextEmail"
          >
            <Form.Label column sm="3">
              Customer's name
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                placeholder="Customer's name"
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
            <Form.Label column sm="3">
              Email
            </Form.Label>
            <Col sm="9">
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
            <Form.Label column sm="3">
              Phone
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                placeholder="Phone"
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
            <Form.Label column sm="3">
              Password
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => handleChange(e.target.value, "password")}
              />
            </Col>
          </Form.Group>
          <div className="d-flex justify-content-center mt-4">
            <Button variant="success" onClick={handleRegister}>
              Đăng ký
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
