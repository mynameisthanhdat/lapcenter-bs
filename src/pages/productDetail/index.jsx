import React from "react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import "./styles.scss";
import { Button } from "react-bootstrap";

export default function ProductDetail() {
  return (
    <>
      <Navbar />
      <div className="productDetailContainer">
        <div className="title">
          <h3>PRODUCT DETAIL PAGE</h3>
          <span>Tình trạng: Còn hàng</span>
          <span className="mx-4">Bảo hành: 24 tháng</span>
        </div>
        <hr />
        <div className="info row">
          <div className="productImg col">
            <img
              src="https://philong.com.vn/media/product/24366-5.jpg"
              alt=""
              className="image"
            />
            <div className="text-center">
              <img
                src="https://philong.com.vn/media/product/24366-5.jpg"
                alt=""
                className="imgSmall"
              />
            </div>
          </div>
          <div className="price col">
            <span>Giá bán: </span> <span className="amount">20000000 VND</span>
            <div className="gift">Khuyến mãi - Quà tặng</div>
            <div className="giftInfo">Thông tin quà tặng</div>
            <div className="text-center">
              <Button className="my-4 bg-danger">Mua ngay</Button>
              <br />
              <span>
                GỌI NGAY <span className="text-danger h4">0969 44 2510</span> ĐỂ
                GIỮ HÀNG
              </span>
            </div>
          </div>
          <div className="contact col">
            <b>Điện thoại tư vấn - Đặt hàng</b>
            <ul>
              <li>Đức Minh: 0123456789</li>
              <li>Minh Luân: 0987654321</li>
              <li>Bảo Ngọc: 0987612345</li>
            </ul>
            <b>Địa chỉ mua hàng</b>
            <ul>
              <li>Đà Nẵng: 123 Nguyễn Văn Linh</li>
              <li>Huế: 123 Lê Đình lý</li>
              <li>TP HCM: 123 Nguyễn Hoàng</li>
              <li>Hà Nội: 123 Trần Duy Hưng</li>
            </ul>
          </div>
        </div>
        <hr />
        <table class="table my-5 table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Phần cứng</th>
              <th scope="col">Thông số kỹ thuật</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Model</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>CPU</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>RAM</td>
              <td>@twitter</td>
            </tr>
            <tr>
              <td>Ổ cứng</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>Card đồ họa</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>Màn hình</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
        <hr />
      </div>
      <Footer />
    </>
  );
}
