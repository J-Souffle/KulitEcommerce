import React, { useContext } from "react";
import StripeCheckout from "react-stripe-checkout";
import './CheckoutPage.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { CartContext } from "../pages/ProductPage.jsx";

const MySwal = withReactContent(Swal);

function Checkout() {
  const publishableKey = 'pk_test_51P7ai8LO5J7ORzPKB8mr7QaPvwECu3ebmWth80FNICCRX6ehA62vlkqUNwskIb678eCsIxmNNMPOVsL7sbv3M8CP00TFgHUti4';
  const { cartItem } = useContext(CartContext);

  const totalPrice = cartItem.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const priceForStripe = totalPrice * 100;

  const handleSuccess = () => {
    MySwal.fire({
      icon: 'success',
      title: 'Payment was successful',
      time: 4000,
    });
  };

  const handleFailure = () => {
    MySwal.fire({
      icon: 'error',
      title: 'Payment was not successful',
      time: 4000,
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
      }
    } catch (error) {
      handleFailure();
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h2>Complete React & Stripe payment integration</h2>
      <h3>Products in your cart:</h3>
      {cartItem.map((item, index) => (
        <div key={index} className="cart-item">
          <div className="cart-img">
            <img src={item.img} alt="product" />
          </div>
          <div className="cart-details">
            <p className="cart-name">{item.description}</p>
            <p className="cart-quantity">Quantity: {item.quantity}</p>
            <p className="cart-price">Price: ${item.price}</p>
            <p className="cart-total">Total: ${item.price * item.quantity}</p>
          </div>
        </div>
      ))}
      <p className="cart-total-price">
        <span>Total Price: </span>${totalPrice}
      </p>
      <StripeCheckout
        stripeKey={publishableKey}
        label="Pay Now"
        name="Pay With Credit Card"
        billingAddress
        shippingAddress
        amount={priceForStripe}
        description={`Your total is $${totalPrice}`}
        token={payNow}
      />
    </div>
  );
}

export default Checkout;
