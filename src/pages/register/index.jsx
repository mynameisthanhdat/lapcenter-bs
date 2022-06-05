import React, { useState } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import Navbar from "../../components/navbar";
import "./styles.scss";
import { useNavigate } from "react-router-dom";

export default function Register() {
  let navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const handleChange = (val, field) => {
    if (field === "username") {
      setUsername(val);
    }if (field === "password") {
      setPassword(val);
    } else {
      setConfirmPassword(val);
      console.log("PASSWORD: ", val);
    }
  };

  const handleRegister = () => {
    alert("Tạo tài khoản thành công")
    navigate('/login')
  }

  return (
    <div className="registerContainer">
      <Navbar />
      <div className="formRegister">
        <h2>Đăng ký </h2>
        <Form>
          <Form.Group
            as={Row}
            className="mb-3 d-flex justify-content-between"
            controlId="formPlaintextEmail"
          >
            <Form.Label column sm="2">
              Username
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => handleChange(e.target.value, "username")}
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3 d-flex justify-content-between"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="2">
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
          <Form.Group
            as={Row}
            className="mb-3 d-flex justify-content-between"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="2">
              Confirm Password
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => handleChange(e.target.value, "confirm_password")}
              />
            </Col>
          </Form.Group>
          <div className="d-flex justify-content-center mt-4">
            <Button variant="success" onClick={handleRegister}>Đăng ký</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
