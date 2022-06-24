import React from "react";
import "./styles.scss";

export default function Footer() {
  return (
    <div className="footerContainer">
      <div className="content">
        <div className="general">
          <h5>Thông tin chung</h5>
          <ul>
            <li>Giới thiệu về công ty</li>
            <li>Tin tuyển dụng</li>
            <li>Liên hệ, góp ý</li>
            <li>Tin tức</li>
          </ul>
        </div>
        <div className="branch">
          <h5>Chi nhánh</h5>
          <ul>
            <li>Đà Nẵng: 123 Nguyễn Văn Linh</li>
            <li>Huế: 123 Lê Đình lý</li>
            <li>TP HCM: 123 Nguyễn Hoàng</li>
            <li>Hà Nội: 123 Trần Duy Hưng</li>
          </ul>
        </div>
        <div className="contact">
          <h5>Kênh xã hội</h5>
          <ul>
            <li>Facebook</li>
            <li>Instagram</li>
            <li>Youtube</li>
            <li>Google+</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
