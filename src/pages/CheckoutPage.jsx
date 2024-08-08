import React, { useContext, useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import './CheckoutPage.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { CartContext } from "../App";
import Navbar from "../components/Navbar"; // Import the Navbar component
import { useNavigate, Link } from "react-router-dom"; // Import Link and useNavigate for navigation

const MySwal = withReactContent(Swal);

function CheckoutPage() {
  const publishableKey = 'pk_test_51P7ai8LO5J7ORzPKB8mr7QaPvwECu3ebmWth80FNICCRX6ehA62vlkqUNwskIb678eCsIxmNNMPOVsL7sbv3M8CP00TFgHUti4';
  const { cartItem, setCartItem } = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const total = cartItem.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const items = cartItem.reduce((acc, item) => acc + item.quantity, 0);
    setTotalPrice(total);
    setTotalItems(items);
  }, [cartItem]);

  const priceForStripe = totalPrice * 100;

  const handleSuccess = () => {
    MySwal.fire({
      icon: 'success',
      title: 'Payment was successful',
      timer: 4000,
    });
  };

  const handleFailure = () => {
    MySwal.fire({
      icon: 'error',
      title: 'Payment was not successful',
      timer: 4000,
    });
  };

  const payNow = async token => {
    try {
      const response = await axios({
        url: 'http://localhost:5000/payment',
        method: 'post',
        data: {
          amount: priceForStripe,
          token,
        },
      });
      if (response.status === 200) {
        handleSuccess();
        console.log('Your payment was successful');
        // Redirect to confirmation page with success status
        navigate('/confirmation?status=success');
      }
    } catch (error) {
      handleFailure();
      console.log(error);
      // Redirect to confirmation page with failure status
      navigate('/confirmation?status=failure');
    }
  };

  const increaseQuantity = (itemId) => {
    const updatedCart = cartItem.map(item =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItem(updatedCart);
  };

  const decreaseQuantity = (itemId) => {
    const updatedCart = cartItem.map(item =>
      item.id === itemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCartItem(updatedCart);
  };

  const removeItem = (itemId) => {
    const updatedCart = cartItem.filter(item => item.id !== itemId);
    setCartItem(updatedCart);
  };

  return (
    <>
      <Navbar /> {/* Render the Navbar component */}
      <div className="container">
        <Link to="/" className="go-back-home-btn">Go Back Home</Link> {/* Link to navigate back to home page */}
        <div className="header">
          <h2>Products in your cart:</h2>
        </div>
        {cartItem.map((item, index) => (
          <div key={index} className="cart-item">
            <div className="cart-img">
              <img src={item.img} alt="product" />
            </div>
            <div className="cart-details">
              <p className="cart-name">{item.description}</p>
              <p className="cart-price">
                Color: Yellow <br />
                Size: M <br />
                {/* Price: ${item.price}.00 <br /> */}
                Quantity: {item.quantity}
                <button onClick={() => increaseQuantity(item.id)}>+</button>
                <button onClick={() => decreaseQuantity(item.id)}>-</button>
              </p>
              <p className="cart-total-item-price">${(item.price * item.quantity).toFixed(2)}</p>
              <button className="delete-btn" onClick={() => removeItem(item.id)}>Delete</button>
            </div>
          </div>
        ))}
        <p className="cart-total-price">
          <span>{totalItems} items </span> <br />
          <span>Subtotal ({totalItems} items): </span>${totalPrice.toFixed(2)}
        </p>
        <StripeCheckout
          stripeKey={publishableKey}
          label="Pay Now"
          name="Pay With Credit Card"
          billingAddress
          shippingAddress
          amount={priceForStripe}
          description={`Your total is $${totalPrice.toFixed(2)}`}
          token={payNow}
        />
      </div>
    </>
  );
}

export default CheckoutPage;
