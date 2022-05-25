import React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="d-flex justify-content-between navbar-container">
      <div className="logoIcon">
        <div className="text-danger">Lapcenter</div>
      </div>
      <div className="mainMenu">
        <ul className="d-flex">
          <li>
            <Link to="/">TRANG CHU</Link>
          </li>
          <li>
            <Link to="about">GIỚI THIỆU</Link>
          </li>
          <li>LIÊN HỆ</li>
          <li>
            <Link to="login">ĐĂNG NHẬP</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
