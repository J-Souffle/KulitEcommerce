import React from "react";
import CheckoutBanner from "../components/CheckoutComponents/CheckoutBanner";
import OrderSummary from "../components/CheckoutComponents/OrderSummary";
import ShippingInfo from "../components/CheckoutComponents/ShippingInfo";
import PaymentDetails from "../components/CheckoutComponents/PaymentDetails";
import ConfirmationButton from "../components/CheckoutComponents/ConfirmationButton";
import Footer from "../components/Footer";

function Checkout() {
  return (
    <>

      <CheckoutBanner />
      <OrderSummary />
      <ShippingInfo />
      <PaymentDetails />
      <ConfirmationButton />
      <Footer />
    </>
  );
}

export default Checkout;
