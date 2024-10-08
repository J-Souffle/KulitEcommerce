import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './ConfirmationPage.css'; // Ensure to include this file
import CheckoutNavbar from '../components/CheckoutComponents/CheckoutNavbar';
import FooterCheckout from '../components/CheckoutComponents/FooterCheckout';

const ConfirmationPage = () => {
  const location = useLocation();
  const { state } = location;

  const paymentStatus = state?.status;
  const orderDetails = state?.orderDetails;

  if (!orderDetails && paymentStatus === 'success') {
    return <p>Loading...</p>;
  }

  // Destructure with default values
  const {
    products = [],
    shippingCost = 0,
    salesTax = 0,
    discountAmount = 0,
    orderNumber = '',
    confirmedDate = '',
    promoCode = '' // Add promoCode to destructured orderDetails
  } = orderDetails || {};

  const subtotal = products.reduce((total, item) => total + (item.price * item.quantity), 0);
  const finalTotal = subtotal + shippingCost + salesTax - discountAmount;

  return (
    <>
      <CheckoutNavbar />
      <div className="confirmation-page">
        {paymentStatus === 'success' ? (
          <div className="confirmation-success">
            <h1>Payment Successful!</h1>
            <p>Thank you for your purchase! The order has been processed successfully and you will receive a confirmation email soon. Please give 2-5 business days to process and deliver your order.</p>
            <p><strong>Order Number:</strong> {orderNumber}</p>
            <p><strong>Order Confirmed Date:</strong> {confirmedDate}</p>
            {promoCode && ( // Show promo code if it exists
              <p><strong>Promo Code Used:</strong> {promoCode}</p>
            )}
            <br />
            <div className="order-summary">
              <h3>Order Summary</h3>
              <ul className="order-products-list">
                {products.map((item, index) => (
                  <li key={index} className="product-item">
                    <div className="product-img">
                      <img src={item.img} alt={item.description} />
                    </div>
                    <div className="product-info">
                      <p>{item.description}</p>
                      {item.color && <p>Color: {item.color}</p>}
                      <p>Size: {item.size}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Total: ${ (item.price * item.quantity).toFixed(2) }</p>
                    </div>
                  </li>
                ))}
              </ul>
              <p><strong>Subtotal:</strong> ${ subtotal.toFixed(2) }</p>
              <p><strong>Shipping Cost:</strong> ${ shippingCost.toFixed(2) }</p>
              <p><strong>Sales Tax:</strong> ${ salesTax.toFixed(2) }</p>
              {discountAmount > 0 && (
                <p><strong>Discount Applied:</strong> -${ discountAmount.toFixed(2) }</p>
              )}
              <p><strong>Total Amount:</strong> ${ finalTotal.toFixed(2) }</p>
            </div>
            <Link to="/" className="go-back-home-btn">Continue Shopping</Link>
          </div>
        ) : (
          <div className="confirmation-failure">
            <h1>Payment Failed</h1>
            <p>We’re sorry, but there was a problem processing your payment. Please try again.</p>
            <div className="confirmation-actions">
              <Link to="/checkout" className="retry-payment-btn">Return to Checkout</Link>
            </div>
          </div>
        )}
      </div>
      <FooterCheckout />
    </>
  );
};

export default ConfirmationPage;
