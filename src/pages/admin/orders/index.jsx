import React, { useEffect, useState } from "react";
import Navbar from "../../../components/navbar";
import "./styles.scss";
import iconEye from '../../../assets/imgs/eye.png'
import iconDelete from '../../../assets/imgs/delete.jpg'
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'

const Orders = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = localStorage.getItem("customerName")
  const userId = localStorage.getItem("userId")
  const navigate = useNavigate()

  const fetchAPI = () => {
    setLoading(true);
    axios
      .get(`https://lap-center.herokuapp.com/api/order`)
      .then(function (response) {
        // handle success
        const data = response.data.orders;
        console.log("Orders: ", data);
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

  const handleShowOrderStatus = (orderStatus) => {
    if(orderStatus === 1) {
      return 'Vừa đặt hàng'
    }
    if(orderStatus === 2) {
      return 'Đang giao hàng'
    }
    if(orderStatus === 3) {
      return 'Đã nhận hàng'
    }
    if(orderStatus === 4) {
      return 'Đã trả hàng'
    }
  }

  const handleShowColorOrderStatus = (orderStatus) => {
    if(orderStatus === 1) {
      return 'text-success'
    }
    if(orderStatus === 2) {
      return 'text-primary'
    }
    if(orderStatus === 3) {
      return 'text-info'
    }
    if(orderStatus === 4) {
      return 'text-danger'
    }
  }

  useEffect(() => {
    fetchAPI()
  }, [])

  return (
    <>
      <Navbar />
      <div className="ordersContainer">
        <h3 className="text-center my-4">Quản lý đơn hàng </h3>
        {loading ? 
          // LOADING
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div> :
          <div>
            {/* CUSTOMIZE TABLE HEADER */}
            <div className="d-flex tb-header rounded-top fw-bold text-light justify-content-between">
              <p className="tbh-name">Tên khách hàng</p>
              <p className="tbh-brand">Tên sản phẩm</p>
              <p className="tbh-price">Số lượng</p>
              <p className="tbh-price">Trạng thái</p>
              <p className="tbh-actions">Hành động</p>
            </div>
            {/* CUSTOMIZE TABLE BODY */}
            {/* LOOP DATA */}
            {data.map((item) => (
              <div className="d-flex tb-body fw-bold  justify-content-between border-top-0 border-success">
                <p className="tbh-name mt-2">{item.customerName}</p>
                <p className="tbh-brand mt-2">{item.productName}</p>
                <p className="tbh-price text-danger mt-2">{item.quantity}</p>
                <p className={`tbh-price mt-2 ${handleShowColorOrderStatus(item.orderStatus)}`}>{handleShowOrderStatus(item.orderStatus)}</p>
                <div className="tbh-actions d-flex mt-2">
                  <div className="bg-icon" onClick={() => handleDelete(item._id)}>
                    <img className="icon" src={iconDelete} alt="" />
                  </div>
                  <div className="bg-icon" onClick={() => navigate(`/buy/${item.productId}`, { state: {id: item.productId}})}>
                    <img className="icon" src={iconEye} alt="" />
                  </div>
                </div>
              </div>
            ))}
            <div className="my-5" />
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

export default Orders;
