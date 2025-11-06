import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { Header } from "../../components/Header";
import { ProductsGrid } from "./ProductsGrid";
import "./HomePage.css";

export function HomePage({ cart, loadCart }) {
  const [products, setProducts] = useState([]);

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  useEffect(() => {
    const fetchHomeData = async () => {
      let response = [];
      if (search) {
        response = await axios.get(`/api/products?search=${search}`);
      } else {
        response = await axios.get("/api/products");
      }
      setProducts(response.data);
    };
    fetchHomeData();
  }, [search]);

  return (
    <>
      <link
        rel="icon"
        type="image/png"
        href="/home-favicon.png"
      />
      <title>Velora</title>
      <Header cart={cart} />
      <div className="home-page">
        <ProductsGrid
          products={products}
          loadCart={loadCart}
        />
      </div>
    </>
  );
}
