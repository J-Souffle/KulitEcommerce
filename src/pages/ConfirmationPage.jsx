import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const ConfirmationPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const paymentStatus = query.get('status'); // 'success' or 'failure'

  return (
    <div className="confirmation-page">
      {paymentStatus === 'success' ? (
        <div>
          <h1>Payment Successful!</h1>
          <p>Thank you for your purchase. Your order has been processed successfully.</p>
          <Link to="/">Continue Shopping</Link>
        </div>
      ) : (
        <div>
          <h1>Payment Failed</h1>
          <p>We’re sorry, but there was a problem processing your payment. Please try again.</p>
          <Link to="/checkout">Return to Checkout</Link>
        </div>
      )}
    </div>
  );
};

export default ConfirmationPage;
