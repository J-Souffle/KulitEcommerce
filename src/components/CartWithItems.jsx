import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../App";
import EmptyCart from "./EmptyCart.jsx";
import CartItem from "./CartItem.jsx"; 
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory

function CartWithItems() {
  const { cartItem, setCartItem } = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate(); // Initialize useNavigate instead of useHistory

  useEffect(() => {
    const newTotalPrice = cartItem.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    setTotalPrice(newTotalPrice);
  }, [cartItem]);

  const handleCheckout = () => {
    // Navigate to the checkout page
    navigate('/checkout');
  };

  return (
    <>
      <div className="full-cart-div">
        <div className="full-cart">
          {cartItem.length !== 0 ? (
            cartItem.map((item, id) => (
              <CartItem key={id} item={item} setCartItem={setCartItem} stripePriceId={item.stripePriceId} />
            ))
          ) : (
            <EmptyCart />
          )}
        </div>
      </div>
      <div className="subtotal-div">
        <div className="sub-right">
          <p>Subtotal</p>
          <p className="total-price">${totalPrice}</p>
        </div>
        <div className="sub-left">
          <button onClick={handleCheckout}>Go to Checkout</button>
        </div>
      </div>
    </>
  );
}

export default CartWithItems;
