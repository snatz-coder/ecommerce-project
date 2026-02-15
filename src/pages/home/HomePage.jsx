import "./HomePage.css";
import { Header } from "../../components/Header";
import { useState, useEffect } from "react";
import axios from 'axios';
import { ProductGrid } from "./ProductsGrid";
import { useSearchParams } from 'react-router';

export function HomePage({cart, loadCart}) {
const [products, setProducts] = useState([]);
const [searchParams] = useSearchParams();
const search = searchParams.get('search');

useEffect(() => {
  const fetchData = async() => {
  const urlPath = search ? `/api/products?search=${search}` : '/api/products';
  const response = await axios.get(urlPath);
    setProducts(response.data)
  }
  fetchData();

}, [search])


  return (
    <>
      <Header cart={cart}/>
      <div className="home-page">
        <ProductGrid products={products} loadCart={loadCart}/>
      </div>
    </>
  );
}
