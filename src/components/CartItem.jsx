import React, { useContext } from 'react';
import { CartContext } from '../App';

function CartItem({ item }) {
  const { cartItem, setCartItem } = useContext(CartContext);

  const handleIncrease = () => {
    setCartItem(cartItem.map(cartItem =>
      cartItem.id === item.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    ));
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      setCartItem(cartItem.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      ));
    }
  };

  const handleRemove = () => {
    setCartItem(cartItem.filter(cartItem => cartItem.id !== item.id));
  };

  return (
    <div className="cart-item">
      <div className="cart-item-info">
        <p>{item.description}</p>
        <p>{item.price}.00$ x {item.quantity}</p>
        <div className="quantity-controls">
          <button onClick={handleDecrease}>-</button>
          <span>{item.quantity}</span>
          <button onClick={handleIncrease}>+</button>
        </div>
        <button onClick={handleRemove}>Remove</button>
      </div>
    </div>
  );
}

export default CartItem;
