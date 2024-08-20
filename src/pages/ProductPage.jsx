import React, { useContext, useState } from "react";
import { items } from "../components/AllData.js";
import TrendingSlider from "../components/TrendingSlider.jsx";
import Newsletter from "../components/Newsletter.jsx";
import Footer from "../components/Footer.jsx";
import Navbar from "../components/Navbar.jsx";
import { useParams } from "react-router-dom";
import { CartContext } from "../App";
import "../pages/ProductPage.css";

function ProductPage() {
  const { id } = useParams();
  const item = items.find((item) => item.id === parseInt(id));

  const [quantity, setQuantity] = useState(1);
  const [image, setImage] = useState(item ? item.img : "");
  const [selectedSize, setSelectedSize] = useState(item?.sizes ? item.sizes[0] : "");

  const { addToCart } = useContext(CartContext);
  const [notify, setNotify] = useState(false);

  const changeImage = (e) => {
    setImage(e.target.src);
  };

  const increase = () => {
    setQuantity(quantity + 1);
  };

  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const calcPrice = (quantity) => {
    return quantity * (item ? item.price : 0);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    addToCart({ ...item, quantity, size: selectedSize });
    setNotify(true);
    setTimeout(() => setNotify(false), 2000); // Hide notification after 2 seconds
  };

  return (
    <>
      <Navbar />
      <div
        onAnimationEnd={() => setNotify(false)}
        className={`notify ${notify ? "slide-in" : ""}`}
      >
        <p>Item has been added to the cart &nbsp; ✅</p>
      </div>

      <div className="product-page-div">
        <div className="container">
          <div className="product-div">
            <h3 className="product-big-name">{item ? item.description : ""}</h3>
            <div className="product-left">
              <div className="big-img">
                <img src={image} alt="product" />
              </div>
              <div className="small-imgs">
                <img onMouseOver={changeImage} src={item ? item.img : ""} alt="product" />
                {item && item.otherImgs && item.otherImgs.length > 0 && (
                  <>
                    <img onMouseOver={changeImage} src={item.otherImgs[0]} alt="product" />
                    {item.otherImgs.length > 1 && (
                      <img onMouseOver={changeImage} src={item.otherImgs[1]} alt="product" />
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="product-right">
              <p className="product-spec">{item ? item.specs : ""}</p>

              {item?.sizes && (
                <div className="product-size">
                  <p>Select Size:</p>
                  <div className="size-buttons">
                    {item.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => handleSizeChange(size)}
                        className={selectedSize === size ? 'selected' : ''}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="product-quant">
                <p>Quantity</p>
                <div className="product-btns">
                  <button onClick={decrease}>-</button>
                  <p className="quantity">{quantity}</p>
                  <button onClick={increase}>+</button>
                </div>
                <p className="product-price">${calcPrice(quantity)}.00</p>
              </div>
              <div className="atc-buy">
                <button onClick={handleAddToCart} className="atc-btn">
                  add to cart
                </button>
                {/* <button className="buy-btn">buy now</button> */}
              </div>
            </div>
          </div>

          <div className="specifications">
            <div className="spec">
              <p className="spec-title">Texture:</p>
              <p className="title-desc">{item ? item.texture : ""}</p>
            </div>
            {/* <div className="spec">
              <p className="spec-title">Weight:</p>
              <p className="title-desc">{item ? item.weight : ""}</p>
            </div> */}
            <div className="spec">
              <p className="spec-title">Reviews:</p>
              <p className="title-desc">None (TrustPilot Added Soon)</p>
            </div>
          </div>
        </div>
      </div>

      <TrendingSlider />
      <Newsletter />
      <Footer />
    </>
  );
}

export default ProductPage;
