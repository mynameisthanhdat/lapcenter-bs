import React, { useState, useEffect } from "react";
import "./styles.scss";
import Navbar from "../../components/navbar";
import { Form, Col, Row, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

const Buy = () => {
  const { state } = useLocation();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [product, setProduct] = useState();
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [message, setMessage] = useState();
  const userId = localStorage.getItem("userId")

  const handleChange = (val, field) => {
    if (field === "name") {
      setName(val);
    }
    if (field === "address") {
      setAddress(val);
    }
    if (field === "email") {
      setEmail(val);
    }
    if (field === "phone") {
      setPhone(val);
    }
  };

  const getProductId = () => {
    setLoading(true);
    axios
      .get(
        `https://lap-center.herokuapp.com/api/product/getProductById/${state.id}`
      )
      .then(function (response) {
        // handle success
        const data = response.data.response;
        console.log("DATA: ", data);
        setProduct(data);
        setImage(data.images[0]);
        setTotalPrice(1 * data.price);
        setLoading(false);
      })
      .catch(function (error) {
        // handle error
        alert("Something went wrong!");
        setLoading(false);
      });
  };

  const handleChangeQuantity = (val) => {
    const value = parseInt(val);
    if (value < 1) {
      setQuantity(1);
      setTotalPrice(1 * product?.price);
    } else {
      setQuantity(val);
      setTotalPrice(val * product?.price);
    }
  };

  const handleUpOrDownQuantity = (method) => {
    if (method === "plus") {
      setQuantity(quantity + 1);
      setTotalPrice((quantity + 1) * product?.price);
    } else {
      if (quantity < 2) {
        setQuantity(1);
        setTotalPrice(1 * product?.price);
      } else {
        setQuantity(quantity - 1);
        setTotalPrice((quantity - 1) * product?.price);
      }
    }
  };

  const handleOrderProduct = () => {
    setLoading(true)
    axios
      .post("https://lap-center.herokuapp.com/api/order/addOrder", {
        // body request
        customerName: name,
        phone: phone,
        email: email,
        address: address,
        productName: product?.name,
        productBrand: product?.brand,
        quantity: quantity,
        orderStatus: 1,
      })
      .then((res) => {
        // alert("Tạo đơn hàng thành công!");
        setModalConfirm(true)
        setMessage("Tạo đơn hàng thành công!")
        setLoading(false)
        axios
          .post("https://lap-center.herokuapp.com/api/history/addProductToHistory", {
            userId: userId,
            phone: phone,
            address: address,
            productName: product.name,
            productBrand: product.brand,
            quantity: quantity,
          })
          .then(function (response) {
            console.log('Đã thêm sản phẩm vào lịch sử mua hàng.', response);
          })
          .catch(function (error) {
            console.log('Không thể thêm sản phẩm vào lịch sử mua hàng.', error);
          });
      })
      .catch((err) => {
        // alert("Tạo đơn hàng thất bại!");
        setModalConfirm(true)
        setMessage("Tạo đơn hàng thất bại!")
        setLoading(false)
      });
    setModalShow(false);
  };

  useEffect(() => {
    getProductId();
  }, []);

  let checkInfo = false;
  if (!name || !phone || !email || !address) checkInfo = false;
  if (name && phone && email && address) checkInfo = true;

  return (
    <div className="buyContainer">
      <Navbar />
      {!loading ? (
        <div className="content">
          <b className="text-danger">Để đặt hàng, </b>{" "}
          <span>
            quý khách hàng vui lòng kiểm tra sản phẩm, số lượng, giá, màu sắc và
            điền các thông tin dưới đây:
          </span>
          <div className="d-flex justify-content-between mt-4">
            <img src={image} alt="" width={80} height={60} />
            <p className="h5 mt-3">{product?.name}</p>
            <div>
              <Button
                variant="secondary"
                className="mx-2"
                onClick={() => handleUpOrDownQuantity("minus")}
              >
                <i class="fa-solid fa-circle-minus"></i>
              </Button>
              <input
                type="number"
                className="inp px-2"
                value={quantity}
                onChange={(e) => handleChangeQuantity(e.target.value)}
              />
              <Button
                variant="secondary"
                className="mx-2"
                onClick={() => handleUpOrDownQuantity("plus")}
              >
                <i class="fa-solid fa-circle-plus"></i>
              </Button>
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <div />
            <p className="fw-bold">{product?.price} VND</p>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <p className="fw-bold">Tổng tiền:</p>
            <p className="fw-bold text-danger h4">{totalPrice} VND</p>
          </div>
          <Form className="mt-5 order">
            <Form.Group
              as={Row}
              className="mb-3 d-flex justify-content-between gy-5"
              controlId="formPlaintextEmail"
            >
              <Col sm="12">
                <Form.Label>Họ tên khách hàng</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Họ tên khách hàng"
                  value={name}
                  onChange={(e) => handleChange(e.target.value, "name")}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3 d-flex justify-content-between"
              controlId="formPlaintextEmail"
            >
              <Col sm="12">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => handleChange(e.target.value, "email")}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3 d-flex justify-content-between"
              controlId="formPlaintextPassword"
            >
              <Col sm="12">
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Số điện thoại"
                  value={phone}
                  onChange={(e) => handleChange(e.target.value, "phone")}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3 d-flex justify-content-between"
              controlId="formPlaintextPassword"
            >
              <Col sm="12">
                <Form.Label>Địa chỉ nhận hàng</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  type="text"
                  placeholder="Địa chỉ nhận hàng"
                  value={address}
                  onChange={(e) => handleChange(e.target.value, "address")}
                />
              </Col>
            </Form.Group>
            <div className="d-flex justify-content-center mt-4">
              <Button
                variant="success"
                disabled={!checkInfo}
                onClick={() => setModalShow(true)}
              >
                Đặt hàng
              </Button>
            </div>
          </Form>
        </div>
      ) : (
        <div className="loading">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        backdrop="static"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="text-danger"
          >
            Xác nhận thông tin
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex">
            <div>
              <img src={image} alt="" height={160} width={200} />
            </div>
            <div className="mx-4">
              <div>
                <h5>Thông tin sản phẩm</h5>
                <span className="my-2">Tên sản phẩm: </span>{" "}
                <span className="fw-bold">{product?.name}</span>
                <br />
                <span className="my-2">Hãng: </span>{" "}
                <span className="fw-bold">{product?.brand}</span>
                <br />
                <span className="my-2">Số lượng: </span>{" "}
                <span className="fw-bold">{quantity}</span>
                <br />
                <span className="my-2">Tổng thanh toán: </span>{" "}
                <span className="fw-bold">{totalPrice} VNĐ</span>
              </div>
              <div>
                <h5 className="mt-4">Thông tin khách hàng</h5>
                <span className="my-2">Tên khách hàng: </span>{" "}
                <span className="fw-bold">{name}</span>
                <br />
                <span className="my-2">Số điện thoại: </span>{" "}
                <span className="fw-bold">{phone}</span>
                <br />
                <span className="my-2">Email: </span>{" "}
                <span className="fw-bold">{email}</span>
                <br />
                <span className="my-2">Địa chỉ nhận hàng: </span>{" "}
                <span className="fw-bold">{address}</span>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleOrderProduct}>Xác nhận</Button>
        </Modal.Footer>
      </Modal>
      {/* Confirm modal */}
      <Modal
        show={modalConfirm}
        onHide={() => setModalConfirm(false)}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Thông báo
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{message}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => setModalConfirm(false)}
            className="btn-success"
          >
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Buy;
