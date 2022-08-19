import React from "react";
import Navbar from "../../components/navbar";
import "./styles.scss";
import iconCart from '../../assets/imgs/iconCart.png'
import iconDelete from '../../assets/imgs/delete.jpg'

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
  const user = localStorage.getItem("customerName")
  return (
    <>
      <Navbar />
      <div className="myCartsContainer">
        <h3 className="text-center my-4">Giỏ hàng của <span className="text-success">{user}</span> </h3>
        {/* CUSTOMIZE TABLE HEADER */}
        <div className="d-flex tb-header rounded-top fw-bold text-light justify-content-between">
          <p className="tbh-img">Hình ảnh</p>
          <p className="tbh-name">Tên sản phẩm</p>
          <p className="tbh-brand">Hãng</p>
          <p className="tbh-price">Giá</p>
          <p className="tbh-actions">Hành động</p>
        </div>
        {/* CUSTOMIZE TABLE BODY */}
        {/* <div className="d-flex tb-body fw-bold  justify-content-between">
          <p className="tbh-img">Hình ảnh</p>
          <p className="tbh-name">Tên sản phẩm</p>
          <p className="tbh-brand">Hãng</p>
          <p className="tbh-price">Giá</p>
          <p className="tbh-actions">Hành động</p>
        </div> */}
        {/* LOOP DATA */}
        {fakeData.map((item) => (
          <div className="d-flex tb-body fw-bold  justify-content-between border-top-0 border-success">
            <img className="tbb-img" src={item.image} alt="" />
            <p className="tbh-name mt-2">{item.productName}</p>
            <p className="tbh-brand mt-2">{item.productBrand}</p>
            <p className="tbh-price text-danger mt-2">{item.price} VND</p>
            <div className="tbh-actions d-flex mt-2">
              <div className="bg-icon">
                <img className="icon" src={iconDelete} alt="" />
              </div>
              <div className="bg-icon">
                <img className="icon" src={iconCart} alt="" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MyCarts;
