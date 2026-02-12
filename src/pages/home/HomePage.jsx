import "./HomePage.css";
import { Header } from "../../components/Header";
import { useState, useEffect } from "react";
import axios from 'axios';
import { ProductGrid } from "./ProductsGrid";

export function HomePage({cart}) {
const [products, setProducts] = useState([]);

useEffect(() => {
  const fetchData = async() => {
   const response =  await axios.get('/api/products');
    setProducts(response.data)
  }
  fetchData();

}, [])


  return (
    <>
      <Header cart={cart}/>
      <div className="home-page">
        <ProductGrid products={products}/>
      </div>
    </>
  );
}
