import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './ConfirmationPage.css'; // Make sure to include this file

const ConfirmationPage = () => {
  const location = useLocation();
  const { state } = location;
  
  const paymentStatus = state?.status;
  const orderDetails = state?.orderDetails;

  if (!orderDetails && paymentStatus === 'success') {
    return <p>Loading...</p>;
  }

  const { products, shippingCost, estimatedTaxes } = orderDetails;
  const subtotal = products.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalAmount = subtotal + shippingCost + estimatedTaxes;

  return (
    <div className="confirmation-page">
      {paymentStatus === 'success' ? (
        <div className="confirmation-success">
          <h1>Payment Successful!</h1>
          <p>Thank you for your purchase. Your order has been processed successfully.</p>
          <p><strong>Order Number:</strong> {orderDetails.orderNumber}</p>
          <p><strong>Estimated Delivery Date:</strong> {orderDetails.estimatedDeliveryDate}</p>
          <p><strong>Order Confirmed Date:</strong> {orderDetails.confirmedDate}</p>
          <div className="order-summary">
            <h3>Order Summary</h3>
            <ul>
              {products.map((item, index) => (
                <li key={index}>
                  {item.description} - {item.quantity} x ${item.price.toFixed(2)} <br />
                  <strong>Total: ${ (item.price * item.quantity).toFixed(2) }</strong>
                </li>
              ))}
            </ul>
            <p><strong>Subtotal:</strong> ${ subtotal.toFixed(2) }</p>
            <p><strong>Shipping Cost:</strong> ${ shippingCost.toFixed(2) }</p>
            <p><strong>Estimated Taxes:</strong> ${ estimatedTaxes.toFixed(2) }</p>
            <p><strong>Total Amount:</strong> ${ totalAmount.toFixed(2) }</p>
          </div>
          <Link to="/">Continue Shopping</Link>
        </div>
      ) : (
        <div className="confirmation-failure">
          <h1>Payment Failed</h1>
          <p>We’re sorry, but there was a problem processing your payment. Please try again.</p>
          <Link to="/checkout">Return to Checkout</Link>
        </div>
      )}
    </div>
  );
};

export default ConfirmationPage;
