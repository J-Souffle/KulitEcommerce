import ProductItem from "./ProductItem.jsx";
import "./ProudProducts.css";
function ProudProducts() {
  return (
    <div className="proud-container">
      <h2 className="container proud-h2">Featured Products </h2>
      <div className="container">
        <div className="products-grid">
          <ProductItem />
        </div>
      </div>
    </div>
  );
}

export default ProudProducts;
