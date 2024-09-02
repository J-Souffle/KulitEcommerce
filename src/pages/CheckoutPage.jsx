import React, { useContext, useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import './CheckoutPage.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { CartContext } from "../App";
import CheckoutNavbar from "../components/CheckoutComponents/CheckoutNavbar";
import { useNavigate } from 'react-router-dom';
import FooterCheckout from "../components/CheckoutComponents/FooterCheckout";

const MySwal = withReactContent(Swal);

function CheckoutPage() {
  const publishableKey = 'pk_test_51P7ai8LO5J7ORzPKB8mr7QaPvwECu3ebmWth80FNICCRX6ehA62vlkqUNwskIb678eCsIxmNNMPOVsL7sbv3M8CP00TFgHUti4';
  const { cartItem, setCartItem } = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoCodeError, setPromoCodeError] = useState(""); // State for promo code error
  const navigate = useNavigate();

  useEffect(() => {
    const subtotal = cartItem.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalItemCount = cartItem.reduce((acc, item) => acc + item.quantity, 0);
    setTotalPrice(subtotal);
    setTotalItems(totalItemCount);

    const calculateShippingCost = () => {
      if (subtotal >= 50) {
        return 0; // Free shipping if subtotal is $50 or more
      } else {
        let totalShippingCost = 0;
        cartItem.forEach(item => {
          const { quantity, shippingCost, additionalShippingCost } = item;
          if (quantity > 0) {
            totalShippingCost += shippingCost; // Base cost for the first item
            if (quantity > 1) {
              totalShippingCost += additionalShippingCost * (quantity - 1); // Additional cost for extra items
            }
          }
        });
        return totalShippingCost;
      }
    };

    // Calculate and set the total shipping cost
    setShippingCost(calculateShippingCost());
  }, [cartItem]);

  const applyPromoCode = () => {
    if (promoCode === "10OFF!") {
      setDiscount(0.1); // Apply 10% discount
      setPromoCodeError(""); // Clear any previous error message
    } else {
      setDiscount(0);
      setPromoCodeError("Invalid promo code"); // Set error message
    }
  };

  const salesTax = (totalPrice - discount * totalPrice) * 0.06; // Adjust if needed
  const discountAmount = totalPrice * discount;
  const totalAmount = totalPrice + shippingCost + salesTax - discountAmount;
  const priceForStripe = Math.round(totalAmount * 100);

  const handleSuccess = (orderNumber) => {
    MySwal.fire({
      icon: 'success',
      title: 'Payment was successful',
      timer: 4000,
    });

    navigate('/confirmation', {
      state: {
        status: 'success',
        orderDetails: {
          orderNumber,
          estimatedDeliveryDate: "2024-08-20", // Sample estimated delivery date
          products: cartItem,
          confirmedDate: new Date().toISOString().split('T')[0],
          shippingCost,
          salesTax,
        }
      }
    });
  };

  const handleFailure = (error) => {
    const errorDetails = {
      message: error.message || "An unknown error occurred.",
      response: error.response?.data || "No response data",
      stack: error.stack || "No stack trace available",
    };

    MySwal.fire({
      icon: 'error',
      title: 'Payment was not successful',
      html: `
        <p><strong>Error Message:</strong> ${errorDetails.message}</p>
        <p><strong>Response Data:</strong> ${JSON.stringify(errorDetails.response, null, 2)}</p>
        <p><strong>Stack Trace:</strong> <pre>${errorDetails.stack}</pre></p>
      `,
      timer: 10000,
      showConfirmButton: true,
    });

    navigate('/confirmation', {
      state: {
        status: 'failure',
        error: errorDetails
      }
    });
  };

  const payNow = async token => {
    try {
      const response = await axios({
        url: 'https://kulit-backend.vercel.app/payment', // Change to http for local testing
        method: 'post',
        data: {
          amount: priceForStripe,
          token,
          cartItems: cartItem,
        },
      });
      if (response.status === 200) {
        const { orderNumber } = response.data;
        handleSuccess(orderNumber); // Pass orderNumber to handleSuccess
      }
    } catch (error) {
      handleFailure(error); // Pass the error object to handleFailure
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
      <CheckoutNavbar />
      <div className="checkout-container">
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
              {item.size && <p className="cart-size">Size: {item.size}</p>}
              <div className="cart-price"> {/* Change p to div here */}
                <div className="quantity-buttons">
                  <button className="quantity-button" onClick={() => increaseQuantity(item.id)}>+</button>
                  <span className="quantity-text">{item.quantity}</span>
                  <button className="quantity-button" onClick={() => decreaseQuantity(item.id)}>-</button>
                </div>
                <span className="cart-total-item-price">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
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
        <form className="promo-code-form">
          <h3>Promo Code</h3>
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            placeholder="Enter Promo Code"
            className={`promo-code-input ${promoCodeError ? 'error' : ''}`}
          />
          <button type="button" onClick={applyPromoCode} className="apply-promo-btn">Apply</button>
          {promoCodeError && <p className="promo-code-error">{promoCodeError}</p>}
        </form>
        <div className="cart-total-price"> {/* Change p to div here */}
          <span>{totalItems} items </span> <br />
          <span>Subtotal: </span>${totalPrice.toFixed(2)} <br />
          <span>Shipping: </span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`} <br />
          <span>Sales Tax: </span>${salesTax.toFixed(2)} <br />
          {discount > 0 && (
            <span>Discount: -${discountAmount.toFixed(2)} <br /></span>
          )}
          <span>Total: </span>${totalAmount.toFixed(2)}
        </div>
        <div className="checkout-button">
          <StripeCheckout
            label="Pay Now"
            name="Your Company"
            billingAddress
            shippingAddress
            description={`Your total is $${totalAmount.toFixed(2)}`}
            amount={priceForStripe}
            token={payNow}
            stripeKey={publishableKey}
          />
        </div>
      </div>
      <FooterCheckout />
    </>
  );
}

export default CheckoutPage;
