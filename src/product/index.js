import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "./index.css";
import { API_URL } from "../config/constants.js";
import dayjs from "dayjs";
import { Button, message } from "antd";
import ProductCard from "../components/productCard";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);

  const getProduct = () => {
    axios
      .get(`${API_URL}/products/${id}`)
      .then((result) => {
        setProduct(result.data.product);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getRecommendations = () => {
    axios
      .get(`${API_URL}/products/${id}/recommendation`)
      .thnen((result) => {
        setProducts(result.data.products);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(
    function () {
      getProduct();
      getRecommendations();
    },
    [id]
  );

  if (product === null) {
    return <h1>상품 정보를 받고 있습니다....</h1>;
  }

  const onClickPurchase = () => {
    axios
      .post(`${API_URL}/purchase/${id}`)
      .then((result) => {
        message.info("구매가 완료되었습니다");
        getProduct();
      })
      .catch((error) => {
        message.error(`에러가 발생했습니다: ${error.message}`);
      });
  };

  return (
    <div>
      <div id="image-box">
        <img src={`${API_URL}/${product.imageUrl}`} />
      </div>
      <div id="profile-box">
        <img src="/images/icons/avatar.png" />
        <span>{product.seller}</span>
      </div>
      <div id="contents-box">
        <div id="name">{product.name}</div>
        <div id="price">{product.price}</div>
        <div id="createdAt">
          {dayjs(product.createdAt).format("YYYY년 MM월 DD일")}
        </div>
        <Button
          id="purchase-button"
          size="large"
          type="primary"
          danger
          onClick={onClickPurchase}
          disabled={product.soldout === 1}
        >
          재빨리 구매하기
        </Button>
        <div id="description-box">
          <pre id="description">{product.description}</pre>
        </div>
        <div>
          <h1>추천 상품</h1>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {products.map((product, index) => {
              <ProductCard key={index} product={product} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
