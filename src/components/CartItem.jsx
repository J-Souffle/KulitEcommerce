import React, { useContext } from 'react';
import { CartContext } from '../App';
import '../components/CartItem.css';

function CartItem({ item }) {
  const { cartItem, setCartItem } = useContext(CartContext);

  const handleIncrease = () => {
    setCartItem(cartItem.map(cartItem =>
        cartItem.id === item.id && cartItem.size === item.size && cartItem.color === item.color
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
    ));
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
        setCartItem(cartItem.map(cartItem =>
            cartItem.id === item.id && cartItem.size === item.size && cartItem.color === item.color
                ? { ...cartItem, quantity: cartItem.quantity - 1 }
                : cartItem
        ));
    }
  };

  const handleRemove = () => {
    setCartItem(cartItem.filter(cartItem => 
        !(cartItem.id === item.id && cartItem.size === item.size && cartItem.color === item.color)
    ));
  };

  return (
    <div className="cart-item">
      <div className="cart-img">
        <img src={item.img} alt="product" />
      </div>
      <div className="cart-item-info">
        <p className="cart-item-description">{item.description}</p>
        {item.size && <p className="cart-item-size">Size: {item.size}</p>}
        {item.color && <p className="cart-item-color">Color: {item.color}</p>}
        <p className="cart-item-price">Price: ${(item.price * item.quantity).toFixed(2)}</p>
        <div className="quantity-controls">
          <button onClick={handleDecrease}>-</button>
          <span>{item.quantity}</span>
          <button onClick={handleIncrease}>+</button>
        </div>
        <button className="remove-btn" onClick={handleRemove}>Remove</button>
      </div>
    </div>
  );
}

export default CartItem;
