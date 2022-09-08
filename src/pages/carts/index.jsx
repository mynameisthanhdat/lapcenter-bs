import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import "./styles.scss";
import iconCart from '../../assets/imgs/iconCart.png'
import iconDelete from '../../assets/imgs/delete.jpg'
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'

const fakeData = [
  {
    _id: "6257c89d462518002330074f",
    userId: "617d08a5ad12171f2c494d8c",
    productId: "60c07aaea1364c3894ac0b51",
    productName: "LAPTOP ACER NITRO 5 AN515-45-R0B6",
    productBrand: "ACER",
    image: "https://philong.com.vn/media/product/24366-5.jpg",
    price: 32990000,
    createdAt: "2022-04-14T07:09:17.158Z",
    updatedAt: "2022-04-14T07:09:17.158Z",
    __v: 0,
  },
  {
    _id: "6298ba34505b90002306d2e3",
    userId: "617d08a5ad12171f2c494d8c",
    productId: "60c07aaea1364c3894ac0b51",
    productName: "LAPTOP ACER NITRO 5 AN515-45-R0B6",
    productBrand: "ACER",
    image: "https://philong.com.vn/media/product/24366-5.jpg",
    price: 32990000,
    createdAt: "2022-06-02T13:25:08.172Z",
    updatedAt: "2022-06-02T13:25:08.172Z",
    __v: 0,
  },
];

const MyCarts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = localStorage.getItem("customerName")
  const userId = localStorage.getItem("userId")
  const navigate = useNavigate()

  const fetchAPI = () => {
    setLoading(true);
    axios
      .get(`https://lap-center.herokuapp.com/api/cart/${userId}`)
      .then(function (response) {
        // handle success
        const data = response.data.products;
        console.log("Carts: ", data);
        setData(data.reverse());
        setLoading(false);
      })
      .catch(function (error) {
        // handle error
        setLoading(false);
        console.log(error);
      });
  };

  const handleDelete = (cartId) => {
    console.log("CART ID: ", cartId);
    setLoading(true)
    axios.delete(`https://lap-center-v1.herokuapp.com/api/cart/removeCartInCart/${cartId}`)
    .then(function (response) {
      // handle success
      console.log("success");
      setLoading(false);
      fetchAPI()
    })
    .catch(function (error) {
      // handle error
      setLoading(false);
      console.log(error);
    });
  }

  useEffect(() => {
    fetchAPI()
  }, [])

  return (
    <>
      <Navbar />
      <div className="myCartsContainer">
        <h3 className="text-center my-4">Giỏ hàng của <span className="text-success">{user}</span> </h3>
        {loading ? 
          // LOADING
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div> :
          <div>
            {/* CUSTOMIZE TABLE HEADER */}
            <div className="d-flex tb-header rounded-top fw-bold text-light justify-content-between">
              <p className="tbh-img">Hình ảnh</p>
              <p className="tbh-name">Tên sản phẩm</p>
              <p className="tbh-brand">Hãng</p>
              <p className="tbh-price">Giá</p>
              <p className="tbh-actions">Hành động</p>
            </div>
            {/* CUSTOMIZE TABLE BODY */}
            {/* LOOP DATA */}
            {data.map((item) => (
              <div className="d-flex tb-body fw-bold  justify-content-between border-top-0 border-success">
                <img className="tbb-img" src={item.image} alt="" />
                <p className="tbh-name mt-2">{item.productName}</p>
                <p className="tbh-brand mt-2">{item.productBrand}</p>
                <p className="tbh-price text-danger mt-2">{item.price} VND</p>
                <div className="tbh-actions d-flex mt-2">
                  <div className="bg-icon" onClick={() => handleDelete(item._id)}>
                    <img className="icon" src={iconDelete} alt="" />
                  </div>
                  <div className="bg-icon" onClick={() => navigate(`/buy/${item.productId}`, { state: {id: item.productId}})}>
                    <img className="icon" src={iconCart} alt="" />
                  </div>
                </div>
              </div>
            ))}
            {data?.length === 0 && 
              <div className="text-center mt-2">
                <p>Không có sản phẩm nào trong giỏ hàng!!!</p>
              </div>
            }
          </div>
        }
      </div>
    </>
  );
};

export default MyCarts;
