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
  const [phone, setPhone] = useState(""); // New phone number state
  const [phoneError, setPhoneError] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoCodeError, setPromoCodeError] = useState("");
  const [isFormValid, setIsFormValid] = useState(true); // Default to true
  const [formErrorMessage, setFormErrorMessage] = useState(""); // State for form error message
  const [shippingCostVisible, setShippingCostVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const subtotal = cartItem.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalItemCount = cartItem.reduce((acc, item) => acc + item.quantity, 0);
    setTotalPrice(subtotal);
    setTotalItems(totalItemCount);

    const calculateShippingCost = () => {
      if (subtotal >= 50) {
        return 0;
      } else {
        let totalShippingCost = 0;
        cartItem.forEach(item => {
          const { quantity, shippingCost, additionalShippingCost } = item;
          if (quantity > 0) {
            totalShippingCost += shippingCost;
            if (quantity > 1) {
              totalShippingCost += additionalShippingCost * (quantity - 1);
            }
          }
        });
        return totalShippingCost;
      }
    };

    if (isFormValid) {
      setShippingCost(calculateShippingCost());
      setShippingCostVisible(true);
    } else {
      setShippingCost(0);
      setShippingCostVisible(false);
    }
  }, [cartItem, isFormValid]);

  useEffect(() => {
    const validateForm = () => {
      const sanitizedPhone = phone.replace(/[^\d]/g, ""); // Sanitize phone number input
      const isValid = address.trim() !== "" && 
                      city.trim() !== "" && 
                      state.trim() !== "" && 
                      zip.trim() !== "" && 
                      /^\d{5}$/.test(zip) &&
                      phone.trim() !== "" &&
                      /^\d{10}$/.test(sanitizedPhone); // Validate sanitized phone number
      setIsFormValid(isValid);
  
      if (!isValid) {
        setFormErrorMessage("Please fill out all fields, including a valid 10-digit phone number.");
      } else {
        setFormErrorMessage("");
      }
    };
  
    validateForm();
  }, [address, city, state, zip, phone]); // Add phone to the dependency array
  

  const validatePhoneNumber = (phone) => {
    const sanitizedPhone = phone.replace(/[^\d]/g, ""); // Remove non-numeric characters
    if (sanitizedPhone.length === 10) {
      setPhoneError(""); // Valid phone number
      return true;
    } else {
      setPhoneError("Please enter a valid 10-digit phone number.");
      return false;
    }
  };

  const applyPromoCode = () => {
    if (promoCode === "10OFF!") {
      setDiscount(0.1);
      setPromoCodeError("");
    } else if (promoCode === "30OFF!") {
        setDiscount(0.3);
        setPromoCodeError("");
    } else {
      setDiscount(0);
      setPromoCodeError("Invalid promo code");
    }
  };

  const salesTax = totalPrice * 0.06;
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
          estimatedDeliveryDate: "2024-08-20",
          products: cartItem,
          confirmedDate: new Date().toISOString().split('T')[0],
          shippingCost,
          salesTax,
          discountAmount,
          promoCode: promoCode,
          totalAmount,
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
    if (!isFormValid) {
      return; // Exit the function if the form is not valid
    }
  
    try {
      const response = await axios({
        url: 'https://kulit-backend.vercel.app/payment',
        method: 'post',
        data: {
          amount: priceForStripe,
          token,
          cartItems: cartItem, 
          promoCode,
          subtotal: totalPrice, // Send subtotal
          shippingCost,         // Send shipping cost
          discountAmount,       // Send discount
          salesTax,            // Send sales tax
          // Include shipping information and phone number
          shippingInfo: {
            address,
            city,
            state,
            zip,
            phone,
          },
        },
      });
      if (response.status === 200) {
        const { orderNumber } = response.data;
        handleSuccess(orderNumber);
      }
    } catch (error) {
      handleFailure(error);
    }
  };  
  

  const increaseQuantity = (itemId, size) => {
    const updatedCart = cartItem.map(item =>
      item.id === itemId && item.size === size ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItem(updatedCart);
  };

  const decreaseQuantity = (itemId, size) => {
    const updatedCart = cartItem.map(item =>
      item.id === itemId && item.size === size && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCartItem(updatedCart);
  };

  const removeItem = (itemId, size) => {
    const updatedCart = cartItem.filter(item => !(item.id === itemId && item.size === size));
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
          <div key={`${item.id}-${item.size}`} className="cart-item">
            <div className="cart-img">
              <img src={item.img} alt="product" />
            </div>
            <div className="cart-details">
  <p className="cart-name">{item.description}</p>
  {item.color && <p className="cart-color">Color: {item.color}</p>}  {/* Display color */}
  {item.size && <p className="cart-size">Size: {item.size}</p>}
  <div className="cart-price">
    <div className="quantity-buttons">
      <button className="quantity-button" onClick={() => increaseQuantity(item.id, item.size)}>+</button>
      <span className="quantity-text">{item.quantity}</span>
      <button className="quantity-button" onClick={() => decreaseQuantity(item.id, item.size)}>-</button>
    </div>
    <span className="cart-total-item-price">${(item.price * item.quantity).toFixed(2)}</span>
  </div>
  <button className="delete-btn" onClick={() => removeItem(item.id, item.size)}>Delete</button>
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
            className={address.trim() === "" ? 'error' : ''}
          />
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
            className={city.trim() === "" ? 'error' : ''}
          />
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className={state.trim() === "" ? 'error' : ''}
          >
          <option value="">Select State</option>
          <option value="AL">Alabama (AL)</option>
<option value="AK">Alaska (AK)</option>
<option value="AZ">Arizona (AZ)</option>
<option value="AR">Arkansas (AR)</option>
<option value="CA">California (CA)</option>
<option value="CO">Colorado (CO)</option>
<option value="CT">Connecticut (CT)</option>
<option value="DE">Delaware (DE)</option>
<option value="FL">Florida (FL)</option>
<option value="GA">Georgia (GA)</option>
<option value="HI">Hawaii (HI)</option>
<option value="ID">Idaho (ID)</option>
<option value="IL">Illinois (IL)</option>
<option value="IN">Indiana (IN)</option>
<option value="IA">Iowa (IA)</option>
<option value="KS">Kansas (KS)</option>
<option value="KY">Kentucky (KY)</option>
<option value="LA">Louisiana (LA)</option>
<option value="ME">Maine (ME)</option>
<option value="MD">Maryland (MD)</option>
<option value="MA">Massachusetts (MA)</option>
<option value="MI">Michigan (MI)</option>
<option value="MN">Minnesota (MN)</option>
<option value="MS">Mississippi (MS)</option>
<option value="MO">Missouri (MO)</option>
<option value="MT">Montana (MT)</option>
<option value="NE">Nebraska (NE)</option>
<option value="NV">Nevada (NV)</option>
<option value="NH">New Hampshire (NH)</option>
<option value="NJ">New Jersey (NJ)</option>
<option value="NM">New Mexico (NM)</option>
<option value="NY">New York (NY)</option>
<option value="NC">North Carolina (NC)</option>
<option value="ND">North Dakota (ND)</option>
<option value="OH">Ohio (OH)</option>
<option value="OK">Oklahoma (OK)</option>
<option value="OR">Oregon (OR)</option>
<option value="PA">Pennsylvania (PA)</option>
<option value="RI">Rhode Island (RI)</option>
<option value="SC">South Carolina (SC)</option>
<option value="SD">South Dakota (SD)</option>
<option value="TN">Tennessee (TN)</option>
<option value="TX">Texas (TX)</option>
<option value="UT">Utah (UT)</option>
<option value="VT">Vermont (VT)</option>
<option value="VA">Virginia (VA)</option>
<option value="WA">Washington (WA)</option>
<option value="WV">West Virginia (WV)</option>
<option value="WI">Wisconsin (WI)</option>
<option value="WY">Wyoming (WY)</option>
          </select>
          <input
            type="text"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            placeholder="Zip Code"
            className={zip.trim() === "" || !/^\d{5}$/.test(zip) ? 'error' : ''}
          />
          <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          onBlur={() => validatePhoneNumber(phone)} // Validate on blur (or whenever needed)
          placeholder="Phone Number"
          className={phoneError ? 'error' : ''}
          />
{phoneError && <p className="error-message">{phoneError}</p>}
          {formErrorMessage && <p className="error-message">{formErrorMessage}</p>}
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
        <div className="cart-total-price">
          <span>{totalItems} items </span> <br />
          <span>Subtotal: </span>${totalPrice.toFixed(2)} <br />
          {shippingCostVisible && ( // Conditional rendering of shipping cost
            <>
              <span>Shipping: </span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`} <br />
            </>
          )}
          {discount > 0 && (
            <span>Discount: -${discountAmount.toFixed(2)} <br /></span>
          )}
          <span>Sales Tax: </span>${salesTax.toFixed(2)} <br />
          <span>Total: </span>${totalAmount.toFixed(2)}
        </div>
        <div className="stripe-checkout-button-wrapper">
          <StripeCheckout
            label=""
            name="Pay With Credit Card"
            billingAddress
            shippingAddress
            description={`Your total is $${totalAmount.toFixed(2)}`}
            amount={priceForStripe}
            token={payNow}
            stripeKey={publishableKey}
            className="stripe-checkout-button-hidden"
          />
          <button
            className="custom-pay-now"
            onClick={() => document.querySelector('.stripe-checkout-button-hidden').click()}
            disabled={!isFormValid} // Disable button if form is invalid
          >
            Pay Now
          </button>
        </div>
      </div>
      <FooterCheckout />
    </>
  );
}

export default CheckoutPage;
