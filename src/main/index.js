import React from "react";
import "./index.css";
import axios from "axios";
import { API_URL } from "../config/constants.js";
import { Carousel } from "antd";
import ProductCard from "../components/productCard";

function MainPage() {
  const [products, setProducts] = React.useState([]);
  const [banners, setBanners] = React.useState([]);

  React.useEffect(function () {
    axios
      .get(API_URL + "/products")
      .then(function (result) {
        const products = result.data.products;
        setProducts(products);
      })
      .catch(function (error) {
        console.log("에러발생 :", error);
      });

    axios
      .get(`${API_URL}/banners`)
      .then((result) => {
        const banners = result.data.banners;
        setBanners(banners);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <Carousel autoplay autoplaySpeed={7000}>
        {banners.map((banner, index) => {
          return (
            <Link to={banner.href}>
              <div id="banner">
                <img src={`${API_URL}/${banner.imageUrl}`} />
              </div>
            </Link>
          );
        })}
      </Carousel>
      <h1 id="product-headline">판매되는 상품들</h1>
      <div id="product-list">
        {products.map(function (product, index) {
          return <ProductCard product={product} key={index} />;
        })}
      </div>
    </div>
  );
}

export default MainPage;
