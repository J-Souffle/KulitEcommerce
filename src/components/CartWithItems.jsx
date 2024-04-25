import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../pages/ProductPage.jsx";
import EmptyCart from "./EmptyCart.jsx";
import CartItem from "./CartItem.jsx"; // Import the CartItem component

import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51P7ai8LO5J7ORzPKB8mr7QaPvwECu3ebmWth80FNICCRX6ehA62vlkqUNwskIb678eCsIxmNNMPOVsL7sbv3M8CP00TFgHUti4');

function CartWithItems() {
  const { cartItem, setCartItem } = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const newTotalPrice = cartItem.reduce((acc, item) => acc + item.price, 0);
    setTotalPrice(newTotalPrice);
  }, [cartItem]);

  const handleCheckout = async () => {
    const stripe = await stripePromise;

    // Filter out items without a valid stripePriceId
    const validCartItems = cartItem.filter(item => item.stripePriceId);

    const lineItems = validCartItems.map((item) => ({
      price: String(item.stripePriceId),
      quantity: 1
    }));

    if (lineItems.length === 0) {
      console.error("No valid items for checkout");
      return;
    }

    const session = await stripe.redirectToCheckout({
      lineItems,
      mode: 'payment',
      successUrl: 'https://yourdomain.com/success',
      cancelUrl: 'https://yourdomain.com/cancel',
    });

    if (session.error) {
      console.error(session.error.message);
    }
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
          <p className="total-price">{totalPrice + ".00$"}</p>
        </div>
        <div className="sub-left">
          <button onClick={handleCheckout}>Go to Checkout</button>
        </div>
      </div>
    </>
  );
}

export default CartWithItems;
