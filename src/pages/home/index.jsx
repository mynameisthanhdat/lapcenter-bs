import React from "react";
import Navbar from "../../components/navbar";
import Card from "../../components/card";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div>Home</div>
      <div className="d-flex flex-wrap justify-content-around">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}
