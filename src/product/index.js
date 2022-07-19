import { useParams } from "react-router-dom";

function ProductPage() {
  const { id } = useParams();

  return <h1>상품관련 {id} 페이지</h1>;
}

export default ProductPage;
