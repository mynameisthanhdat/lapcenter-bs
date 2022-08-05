import React, { useState } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import iconHome from '../../assets/imgs/iconHome.png'

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
      //localStorage gồm 4 functions chính: 
      // - setItem => dùng để cài đặt tên biến và giá trị
      // - getItem => lấy giá trị của biến cần lấy
      // - removeItem => xóa tên biến và giá trị của biến đó ra khỏi store
      // - clear => xóa tất cả các tên biến và giá trị của nó khỏi store
      localStorage.setItem('customerName', response.data.userName)
      localStorage.setItem('accessToken', response.data.token)
      localStorage.setItem('userId', response.data.userId)
      navigate('/');
    })
    .catch(function (error) {
      console.log("ERROR: ",error);
      alert("Tên tài khoản hoặc mật khẩu không chính xác. Vui lòng thử lại!!!")
    });
  }

  return (
    <div className="loginContainer">
      <img src={iconHome} alt="" width={45} height={45} className='iconHome' title='Trang chủ' onClick={() => navigate('/')}/>
      <div className="formLogin">
        <h2>Đăng nhập</h2>
        <Form>
          <Form.Group
            as={Row}
            className="mb-3 d-flex justify-content-between"
            controlId="formPlaintextEmail"
          >
            <Col sm="12">
              <Form.Label>
                Email hoặc Số điện thoại
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Email hoặc Số điện thoại"
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
            <Button variant="success" onClick={handleLogin}>Đăng nhập</Button>
          </div>
          <p className="createNewAcc" onClick={() => navigate("/register")}>Tạo tài khoản mới</p>
        </Form>
      </div>
    </div>
  );
}
