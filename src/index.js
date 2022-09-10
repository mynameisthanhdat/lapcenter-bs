import reportWebVitals from './reportWebVitals';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Login from "./pages/login";
import Register from './pages/register';
import ProductDetail from './pages/productDetail';
import Buy from './pages/buy';
import MyCarts from './pages/carts';
import MyHistory from './pages/history';
import Orders from './pages/admin/orders';
import PageNotFound from './pages/pageNotFound';
const root = ReactDOM.createRoot(document.getElementById('root'));
const isAdmin = localStorage.getItem("isAdmin")

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/buy/:productId" element={<Buy />} />
        <Route path="/myCarts" element={<MyCarts />} />
        <Route path="/myHistory" element={<MyHistory />} />
        <Route path="/*" element={<PageNotFound />} />
        {
          isAdmin === "false" &&
          <Route path="/orders" element={<Orders />} />
        }
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
