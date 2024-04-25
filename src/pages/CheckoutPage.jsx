import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import './CheckoutPage.css'
import axios from 'axios';
import OrderSummary from "../components/CheckoutComponents/OrderSummary.jsx";
import ShippingInfo from "../components/CheckoutComponents/ShippingInfo.jsx";
import PaymentDetails from "../components/CheckoutComponents/PaymentDetails.jsx";
import ConfirmationButton from "../components/CheckoutComponents/ConfirmationButton.jsx";
import Footer from "../components/Footer.jsx";

function Checkout() {
  const publishableKey = 'pk_test_51P7ai8LO5J7ORzPKB8mr7QaPvwECu3ebmWth80FNICCRX6ehA62vlkqUNwskIb678eCsIxmNNMPOVsL7sbv3M8CP00TFgHUti4'
  const [product, setProduct] = useState({name: 'Headphone', price: 10});
  const priceForStripe = product.price * 100;
  const payNow = async token => {
    try {
      const response = await axios({
        url:'http://localhost:5000/payment',
        method:'post',
        data: {
          amount:product.price * 100,
          token,
        }
      });
      if(response.status === 200) {
        console.log('Your payment was successful');
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="container">
      <h2>Complete React & Stripe payment integration</h2>
      <p>
        <span>Product: </span>
        {product.name}
      </p>
      <p>
        <span>Price: </span>${product.price}
      </p>
      <StripeCheckout
        stripeKey={publishableKey}
        label="Pay Now"
        name="Pay With Credit Card"
        billingAddress={priceForStripe}
        description={`Your total is $${product.price}`}
        token={payNow}
      />
    </div>
  );
}

export default Checkout;
