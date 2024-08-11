import React, { useContext, useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import './CheckoutPage.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { CartContext } from "../App";
import Navbar from "../components/Navbar";
import { useNavigate, Link } from 'react-router-dom';

const MySwal = withReactContent(Swal);

function CheckoutPage() {
  const publishableKey = 'pk_test_51P7ai8LO5J7ORzPKB8mr7QaPvwECu3ebmWth80FNICCRX6ehA62vlkqUNwskIb678eCsIxmNNMPOVsL7sbv3M8CP00TFgHUti4';
  const { cartItem, setCartItem } = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [shippingCost, setShippingCost] = useState(0); // New state for shipping cost
  const [address, setAddress] = useState(""); // New state for address
  const [city, setCity] = useState(""); // New state for city
  const [state, setState] = useState(""); // New state for state
  const [zip, setZip] = useState(""); // New state for zip code
  const navigate = useNavigate();

  useEffect(() => {
    const total = cartItem.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const items = cartItem.reduce((acc, item) => acc + item.quantity, 0);
    setTotalPrice(total);
    setTotalItems(items);
  }, [cartItem]);

  const calculateShipping = (state) => {
    let cost = 0;

    if (state === 'VA') {
      cost = 10;
    } else if (state === 'FL') {
      cost = 20;
    }

    setShippingCost(cost);
  };

  useEffect(() => {
    calculateShipping(state);
  }, [state]);

  const priceForStripe = (totalPrice + shippingCost) * 100;
  const estimatedTaxes = 10; // Adjust if needed
  const totalAmount = totalPrice + shippingCost + estimatedTaxes;

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
        url: 'http://localhost:5001/payment',
        method: 'post',
        data: {
          amount: priceForStripe,
          token,
        },
      });
      if (response.status === 200) {
        handleSuccess();
        navigate('/confirmation', {
          state: {
            status: 'success',
            orderDetails: {
              orderNumber: "123456", // Sample order number
              estimatedDeliveryDate: "2024-08-20", // Sample estimated delivery date
              products: cartItem,
              confirmedDate: new Date().toISOString().split('T')[0],
              shippingCost,
              estimatedTaxes,
            }
          }
        });
      }
    } catch (error) {
      handleFailure();
      navigate('/confirmation', {
        state: {
          status: 'failure'
        }
      });
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
      <Navbar />
      <div className="checkout-container">
        <Link to="/" className="go-back-home-btn">Go Back Home</Link>
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
                <div className="quantity-buttons">
                  <button className="quantity-button" onClick={() => increaseQuantity(item.id)}>+</button>
                  <span className="quantity-text">{item.quantity}</span>
                  <button className="quantity-button" onClick={() => decreaseQuantity(item.id)}>-</button>
                </div>
                <span className="cart-total-item-price">${(item.price * item.quantity).toFixed(2)}</span>
              </p>
              <button className="delete-btn" onClick={() => removeItem(item.id)}>Delete</button>
            </div>
          </div>
        ))}
        <form className="address-form">
          <h3>Ship To</h3>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
          />
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
          />
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="State"
          >
            <option value="">Select State</option>
            <option value="VA">Virginia (VA)</option>
            <option value="FL">Florida (FL)</option>
            {/* Add more states as needed */}
          </select>
          <input
            type="text"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            placeholder="Zip Code"
          />
        </form>
        <p className="cart-total-price">
          <span>{totalItems} items </span> <br />
          <span>Subtotal: </span>${totalPrice.toFixed(2)} <br />
          <span>Shipping: </span>${shippingCost.toFixed(2)} <br />
          <span>Estimated Taxes: </span>${estimatedTaxes.toFixed(2)} <br />
          <span>Total: </span>${totalAmount.toFixed(2)}
        </p>
        <div className="stripe-checkout-button-wrapper">
          <StripeCheckout
            stripeKey={publishableKey}
            label="" // Hide the default label
            name="Pay With Credit Card"
            billingAddress
            shippingAddress
            amount={priceForStripe}
            description={`Your total is $${totalAmount.toFixed(2)}`}
            token={payNow}
            className="stripe-checkout-button-hidden" // Hide the default button
          />
          <button className="custom-pay-now" onClick={() => document.querySelector('.stripe-checkout-button-hidden').click()}>
            Pay Now
          </button>
        </div>
      </div>
    </>
  );
}

export default CheckoutPage;
