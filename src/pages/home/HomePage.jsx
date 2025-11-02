import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { ProductsGrid } from "./ProductsGrid";
import "./HomePage.css";

export function HomePage({ cart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchHomeData = async () => {
      const response = await axios.get("/api/products");
      setProducts(response.data);
    };
    fetchHomeData();
  }, []);

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
        <ProductsGrid products={products} />
      </div>
    </>
  );
}
