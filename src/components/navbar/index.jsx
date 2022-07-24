import React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";

export default function Navbar() {
  const accessToken = localStorage.getItem('accessToken')

  const handleLogout = () => {
    localStorage.clear()
  }

  return (
    <div className="d-flex justify-content-between navbar-container">
      <div className="logoIcon">
        <div className="text-danger">Lapcenter</div>
      </div>
      <div className="mainMenu">
        <ul className="d-flex">
          <li>
            <Link to="/">TRANG CHỦ</Link>
          </li>
          <li>
            <Link to="about">GIỚI THIỆU</Link>
          </li>
          <li>LIÊN HỆ</li>
          {accessToken ?
            <li onClick={handleLogout}>
              <Link to='login'>ĐĂNG XUẤT</Link>
            </li> :
            <li>
              <Link to="login">ĐĂNG NHẬP</Link>
            </li>
          }
        </ul>
      </div>
    </div>
  );
}
