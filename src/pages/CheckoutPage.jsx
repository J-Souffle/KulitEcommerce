import React from "react";
// import CheckoutBanner from "../components/CheckoutComponents/CheckoutBanner";
import OrderSummary from "../components/CheckoutComponents/OrderSummary.jsx";
import ShippingInfo from "../components/CheckoutComponents/ShippingInfo.jsx";
import PaymentDetails from "../components/CheckoutComponents/PaymentDetails.jsx";
import ConfirmationButton from "../components/CheckoutComponents/ConfirmationButton.jsx";
import Footer from "../components/Footer.jsx";

function Checkout() {
  return (
    <>
        
      <OrderSummary />
      <ShippingInfo />
      <PaymentDetails />
      <ConfirmationButton />
      <Footer />
    </>
  );
}

export default Checkout;
