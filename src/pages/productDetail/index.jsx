import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import "./styles.scss";
import { Button, Spinner } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import SameCard from "../../components/sameCard";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export default function ProductDetail() {
  const { state } = useLocation();
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState();
  const [productsBrand, setProductsBrand] = useState();
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const getProductId = () => {
    setLoading(true);
    axios
      .get(
        `https://lap-center.herokuapp.com/api/product/getProductById/${state.id}`
      )
      .then(function (response) {
        // handle success
        const data = response.data.response;
        console.log("SUCCESS: ", data);
        setProduct(data);
        setImage(data.images[0]);
        setLoading(false);
      })
      .catch(function (error) {
        // handle error
        setLoading(false);
        console.log("ERROR: ", error);
      });
  };

  const getProductsBrand = () => {
    setLoading(true);
    axios
      .get(`https://lap-center.herokuapp.com/api/product`, {
        params: {
          productBrand: state.brand,
        },
      })
      .then(function (response) {
        // console.log("SUCCESS 1: ", response.data);
        setLoading(false);
        setProductsBrand(response.data.products);
      })
      .catch(function (error) {
        setLoading(false);
        console.log("ERROR 1: ", error);
      });
  };

  useEffect(() => {
    // ham chay dau tien, neu [] chung ta de rong
    // ham nay se chay khi du lieu abc hoac def trong [abc, def] co su thay doi
    getProductId();
    getProductsBrand();
    // console.log("ham nay chi chay 1 lan duy nhat");
  }, [location]);

  return (
    <>
      <Navbar />
      {!loading ?
        <div>
          <div className="productDetailContainer">
            <div className="title">
              <h3>{product?.name}</h3>
              <span>Tình trạng: Còn hàng</span>
              <span className="mx-4">Bảo hành: 24 tháng</span>
            </div>
            <hr />
            <div className="info row">
              <div className="productImg col">
                <img src={image} alt="" className="image" />
                <div className="text-center">
                  {product?.images.length > 0 &&
                    product?.images.map((item, idx) => (
                      <img
                        src={item}
                        alt=""
                        className="imgSmall"
                        key={idx}
                        onClick={() => setImage(item)}
                      />
                    ))}
                </div>
              </div>
              <div className="price col">
                <span>Giá bán: </span>{" "}
                <span className="amount">{product?.price} VND</span>
                <div className="gift">Khuyến mãi - Quà tặng</div>
                <div className="giftInfo">Thông tin quà tặng</div>
                <div className="text-center">
                  <Button className="my-4 bg-danger" onClick={() => {
                    navigate(`/buy/${product._id}`, {state: { id: product._id }})}
                  }>Mua ngay</Button>
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
                  <td>{product?.model}</td>
                </tr>
                <tr>
                  <td>CPU</td>
                  <td>{product?.cpu}</td>
                </tr>
                <tr>
                  <td>RAM</td>
                  <td>{product?.ram}</td>
                </tr>
                <tr>
                  <td>Ổ cứng</td>
                  <td>{product?.disk}</td>
                </tr>
                <tr>
                  <td>Card đồ họa</td>
                  <td>{product?.card}</td>
                </tr>
                <tr>
                  <td>Màn hình</td>
                  <td>{product?.monitor}</td>
                </tr>
              </tbody>
            </table>
            <p className="text-danger h5">Sản phẩm cùng thương hiệu</p>
            <hr />
          </div>
          <Carousel responsive={responsive}>
            {productsBrand?.length > 0 &&
              productsBrand?.map((item, index) => (
                <SameCard product={item} key={index} />
              ))}
          </Carousel>
        </div> :
        <div className="loading">
          <Spinner animation="border" variant="primary" />
        </div>
      }
      <Footer />
    </>
  );
}
