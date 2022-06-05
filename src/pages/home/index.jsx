import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import Card from "../../components/card";
import { data } from "../../data";
import { Form, Button } from "react-bootstrap";
import "./styles.scss";
import axios from "axios";

export default function Home() {
  const [list, setList] = useState(data);
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState();

  useEffect(() => {
    console.log("ham nay chay dau tien");
    // fetchAPI();
    // fetchAxios();
  }, []);

  const fetchAPI = () => {
    fetch("https://reqres.in/api/users/")
      .then((response) => response.json())
      .then((data) => {
        console.log("Successsssssssssss API:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const fetchAxios = () => {
    axios
      .get("https://lap-center.herokuapp.com/api/product")
      .then(function (response) {
        // handle success
        console.log('SUCCESS: ', response.data);
        setList(response.data.products)
      })
      .catch(function (error) {
        // handle error
        console.log('ERROR: ',error);
      })
  };

  const handleChange = (val) => {
    setSearch(val);
    setList(
      data.filter((item) =>
        item?.name?.toLowerCase()?.includes(val.toLowerCase())
      )
    );
  };

  const onSubmitSearch = () => {
    setList(
      data.filter((item) =>
        item?.name?.toLowerCase()?.includes(search.toLowerCase())
      )
    );
  };

  const handleSelectChange = (e) => {
    const val = e.target.value;
    setBrand(val);
    setList(
      data.filter((item) =>
        item?.brand?.toLowerCase()?.includes(val.toLowerCase())
      )
    );
  };

  const sortPrice = (e) => {
    const val = e.target.value;
    setPrice(val);
    if (val === "1") {
      setList(data.sort((a, b) => a.price - b.price));
    } else {
      setList(data.sort((a, b) => b.price - a.price));
    }
  };

  return (
    <div className="homeContainer">
      <Navbar />
      <div className="content">
        <div className="menu_left">
          <Form.Label htmlFor="inputPassword5">Tim kiem san pham</Form.Label>
          <div className="d-flex justify-content-between">
            <Form.Control
              type="text"
              id="hi"
              value={search}
              onChange={(e) => {
                handleChange(e.target.value);
              }}
            />
            <Button variant="primary" onClick={onSubmitSearch}>
              Search
            </Button>
          </div>
          <div className="selectForm d-flex">
            <p>Hãng</p>
            <select
              className="selectBox"
              value={brand}
              onChange={handleSelectChange}
            >
              <option selected value=""></option>
              <option value="Asus">ASUS</option>
              <option value="Dell">DELL</option>
              <option value="Acer">ACER</option>
              <option value="Lenovo">LENOVO</option>
            </select>
          </div>
          <div className="selectForm d-flex">
            <p>Giá</p>
            <select className="selectBox" value={price} onChange={sortPrice}>
              <option selected value=""></option>
              <option value="1">Từ thấp đến cao</option>
              <option value="2">Từ cao đến thấp</option>
            </select>
          </div>
        </div>
        <div className="d-flex flex-wrap justify-content-around list_products">
          {list.map((item) => (
            <Card product={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
