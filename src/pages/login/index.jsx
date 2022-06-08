import React, { useState } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import Navbar from "../../components/navbar";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const fakeAccount = {username: "admin", password: "admin"}

export default function Login() {
  let navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleChange = (val, field) => {
    if (field === "username") {
      setUsername(val);
      console.log("USERNAME: ", val);
    } else {
      setPassword(val);
      console.log("PASSWORD: ", val);
    }
  };

  const handleLogin = () => {
    const url = 'https://lap-center.herokuapp.com/api/login'
    axios.post(url, {
      username: username,
      password: password
    })
    .then(function (response) {
      console.log("SUCCESS: ", response.data);
      navigate('/');
    })
    .catch(function (error) {
      console.log("ERROR: ",error);
      alert("Tên tài khoản hoặc mật khẩu không chính xác. Vui lòng thử lại!!!")
    });
  
  }

  return (
    <div className="loginContainer">
      <Navbar />
      <div className="formLogin">
        <h2>Đăng nhập</h2>
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
          <div className="d-flex justify-content-center mt-4">
            <Button variant="success" onClick={handleLogin}>Đăng nhập</Button>
          </div>
          <p className="createNewAcc" onClick={() => navigate("/register")}>Tạo tài khoản mới</p>
        </Form>
      </div>
    </div>
  );
}
