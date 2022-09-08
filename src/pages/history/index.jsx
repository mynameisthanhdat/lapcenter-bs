import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'
import './styles.scss'

const MyHistory = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = localStorage.getItem("customerName")
  const userId = localStorage.getItem("userId")
  const navigate = useNavigate()

  const fetchAPI = () => {
    setLoading(true);
    axios
      .get(`https://lap-center.herokuapp.com/api/history/${userId}`)
      .then(function (response) {
        // handle success
        const data = response.data.products;
        console.log("History: ", data);
        setData(data.reverse());
        setLoading(false);
      })
      .catch(function (error) {
        // handle error
        setLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    fetchAPI()
  }, [])

  return (
    <>
      <Navbar />
      <div className="myHistoryContainer">
        <h3 className="text-center my-4">Lịch sử mua hàng của <span className="text-success">{user}</span> </h3>
        {loading ? 
          // LOADING
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div> :
          <div>
            {/* CUSTOMIZE TABLE HEADER */}
            <div className="d-flex tb-header rounded-top fw-bold text-light justify-content-between">
              <p className="tbh-img">STT</p>
              <p className="tbh-name">Tên sản phẩm</p>
              <p className="tbh-brand">Hãng</p>
              <p className="tbh-price">Số lượng</p>
            </div>
            {/* CUSTOMIZE TABLE BODY */}
            {/* LOOP DATA */}
            {data.map((item, index) => (
              <div className="d-flex tb-body fw-bold  justify-content-between border-top-0 border-success">
                <p className="tbb-img">{index + 1}</p>
                <p className="tbh-name mt-2">{item.productName}</p>
                <p className="tbh-brand mt-2">{item.productBrand}</p>
                <p className="tbh-price text-danger mt-2">{item.quantity}</p>
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

export default MyHistory;
