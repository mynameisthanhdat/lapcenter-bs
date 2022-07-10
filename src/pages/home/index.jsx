import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import Card from "../../components/card";
import { data } from "../../data";
import { Form, Button, Spinner } from "react-bootstrap";
import "./styles.scss";
import axios from "axios";
import ReactPaginate from 'react-paginate';

export default function Home() {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("");
  const [sort, setSort] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("ham nay chay dau tien");
    // fetchAPI();
    fetchAxios();
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
    setLoading(true)
    axios
      .get("https://lap-center-v1.herokuapp.com/api/product")
      .then(function (response) {
        // handle success
        console.log("SUCCESS: ", response.data);
        setLoading(false)
        setList(response.data.products);
      })
      .catch(function (error) {
        // handle error
        setLoading(false)
        alert("Something went wrong!!!")
        console.log("ERROR: ", error);
      });
  };

  const handleChange = (val) => {
    setSearch(val);
    console.log("SEARCH: ", search);
    console.log("VAL: ", val);
  };

  const onSubmitSearch = () => {
    console.log("val: ", search);
    handleCallApi(search, brand, sort);
  };

  const handleSelectChange = (e) => {
    const val = e.target.value;
    setBrand(val);
    handleCallApi(search, val, sort);
  };

  const handleSort = (e) => {
    const val = e.target.value;
    setSort(val);
    handleCallApi(search, brand, val);
  };

  const handleCallApi = (productName, productBrand, priceSort) => {
    setLoading(true)
    axios
      .get("https://lap-center-v1.herokuapp.com/api/product", {
        params: {
          productName: productName,
          productBrand: productBrand,
          orderByColumn: "price",
          orderByDirection: priceSort,
        },
      })
      .then(function (response) {
        console.log("SUCCESS: ", response.data);
        setLoading(false)
        setList(response.data.products);
      })
      .catch(function (error) {
        setLoading(false)
        alert("Something went wrong!!!")
        console.log("ERROR: ", error);
      });
  };

  return (
    <div className="homeContainer">
      <Navbar />
      <div className="content">
        <div className="menu_top">
          <div className="d-flex">
            <Form.Control
              type="text"
              id="hi"
              value={search}
              onChange={(e) => {
                handleChange(e.target.value);
              }}
            />
            <Button variant="primary" className='btnSearch' onClick={onSubmitSearch}>
              Tìm kiếm
            </Button>
          </div>
          <div className="selectForm d-flex">
            <p className="txtFilter">Hãng</p>
            <select
              className="selectBox"
              value={brand}
              onChange={handleSelectChange}
            >
              <option selected value="">Tất cả</option>
              <option value="Asus">ASUS</option>
              <option value="Dell">DELL</option>
              <option value="Acer">ACER</option>
              <option value="Lenovo">LENOVO</option>
            </select>
          </div>
          <div className="selectForm d-flex">
            <p className="txtFilter">Giá</p>
            <select className="selectBox" value={sort} onChange={handleSort}>
              <option selected value="">Tất cả</option>
              <option value="asc">Từ thấp đến cao</option>
              <option value="desc">Từ cao đến thấp</option>
            </select>
          </div>
        </div>
        <div className="d-flex flex-wrap justify-content-around list_products">
          {(!loading && list.length > 0) ?
            list.map((item) => <Card product={item} key={item.id} />) :
            <div className="text-center">
              <Spinner animation="border" variant="primary" />
            </div>
          }
        </div>
        <div className="pagination">
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={2}
            marginPagesDisplayed={2}
            pageRangeDisplayed={4}
            onPageChange={(e) => console.log("EEEE: ", e.selected + 1)}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </div>
      </div>
    </div>
  );
}
