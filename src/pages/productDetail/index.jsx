import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import "./styles.scss";
import { Button, Spinner } from "react-bootstrap";
import { useLocation } from "react-router-dom";
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
  const location = useLocation()
  const [product, setProduct] = useState();
  const [productsBrand, setProductsBrand] = useState();
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const getProductId = () => {
    setLoading(true);
    axios
      .get(
        `https://lap-center-v1.herokuapp.com/api/product/getProductById/${state.id}`
      )
      .then(function (response) {
        // handle success
        const data = response.data.response;
        // console.log("SUCCESS: ", data);
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
      .get(`https://lap-center-v1.herokuapp.com/api/product`, {
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
              <span>T??nh tr???ng: C??n h??ng</span>
              <span className="mx-4">B???o h??nh: 24 th??ng</span>
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
                <span>Gi?? b??n: </span>{" "}
                <span className="amount">{product?.price} VND</span>
                <div className="gift">Khuy???n m??i - Qu?? t???ng</div>
                <div className="giftInfo">Th??ng tin qu?? t???ng</div>
                <div className="text-center">
                  <Button className="my-4 bg-danger">Mua ngay</Button>
                  <br />
                  <span>
                    G???I NGAY <span className="text-danger h4">0969 44 2510</span> ?????
                    GI??? H??NG
                  </span>
                </div>
              </div>
              <div className="contact col">
                <b>??i???n tho???i t?? v???n - ?????t h??ng</b>
                <ul>
                  <li>?????c Minh: 0123456789</li>
                  <li>Minh Lu??n: 0987654321</li>
                  <li>B???o Ng???c: 0987612345</li>
                </ul>
                <b>?????a ch??? mua h??ng</b>
                <ul>
                  <li>???? N???ng: 123 Nguy???n V??n Linh</li>
                  <li>Hu???: 123 L?? ????nh l??</li>
                  <li>TP HCM: 123 Nguy???n Ho??ng</li>
                  <li>H?? N???i: 123 Tr???n Duy H??ng</li>
                </ul>
              </div>
            </div>
            <hr />
            <table class="table my-5 table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">Ph???n c???ng</th>
                  <th scope="col">Th??ng s??? k??? thu???t</th>
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
                  <td>??? c???ng</td>
                  <td>{product?.disk}</td>
                </tr>
                <tr>
                  <td>Card ????? h???a</td>
                  <td>{product?.card}</td>
                </tr>
                <tr>
                  <td>M??n h??nh</td>
                  <td>{product?.monitor}</td>
                </tr>
              </tbody>
            </table>
            <p className="text-danger h5">S???n ph???m c??ng th????ng hi???u</p>
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
