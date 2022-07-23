import React, { useState } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import iconHome from '../../assets/imgs/iconHome.png'

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
      <img src={iconHome} alt="" width={45} height={45} className='iconHome' title='Trang chủ' onClick={() => navigate('/')}/>
      <div className="formRegister">
        <h2>Đăng ký </h2>
        <Form>
          <Form.Group
            as={Row}
            className="mb-3 d-flex justify-content-between gy-5"
            controlId="formPlaintextEmail"
          >
            <Col sm="12">
              <Form.Label>
                Tên khách hàng
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Tên khách hàng"
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
              <Form.Label>
                Email
              </Form.Label>
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
              <Form.Label>
                Số điện thoại
              </Form.Label>
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
              <Form.Label>
                Mật khẩu
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Mật khẩu"
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
