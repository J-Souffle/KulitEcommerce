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
  const [selectedColor, setSelectedColor] = useState(item?.colors ? item.colors[0].color : "");

  const { addToCart } = useContext(CartContext);
  const [notify, setNotify] = useState(false);

  const changeImage = (e) => {
    setImage(e.target.src);
  };

  const handleColorChange = (color, img) => {
    setSelectedColor(color);
    setImage(img);
  };

  const calcPrice = () => {
    const price = item?.prices ? item.prices[selectedSize] : item?.price;
    return quantity * price;
  };

  const handleAddToCart = () => {
    const price = item?.prices ? item.prices[selectedSize] : item?.price;
    addToCart({ 
      ...item, 
      quantity, 
      size: selectedSize, 
      color: selectedColor, 
      img: image, 
      price 
    });
    setNotify(true);
    setTimeout(() => setNotify(false), 2000); // Hide notification after 2 seconds
  };

  return (
    <>
      <Navbar />
      <div onAnimationEnd={() => setNotify(false)} className={`notify ${notify ? "slide-in" : ""}`}>
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
                        onClick={() => setSelectedSize(size)}
                        className={selectedSize === size ? 'selected' : ''}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {item?.colors && (
                <div className="product-color">
                  <p>Select Color:</p>
                  <div className="color-buttons">
                    {item.colors.map(({ color, img }) => (
                      <button
                        key={color}
                        onClick={() => handleColorChange(color, img)}
                        className={selectedColor === color ? 'selected' : ''}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="product-quant">
                <p>Quantity</p>
                <div className="product-btns">
                  <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</button>
                  <p className="quantity">{quantity}</p>
                  <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
                <p className="product-price">${calcPrice().toFixed(2)}</p>
              </div>
              <div className="atc-buy">
                <button onClick={handleAddToCart} className="atc-btn">
                  add to cart
                </button>
              </div>
            </div>
          </div>

          <div className="specifications">
            <div className="spec">
              <p className="spec-title">Texture:</p>
              <p className="title-desc">{item ? item.texture : ""}</p>
            </div>
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
