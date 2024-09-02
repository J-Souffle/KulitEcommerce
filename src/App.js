import React, { createContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Categories from "./pages/Categories.jsx";
import All from "./components/Categories-pages/All.jsx";
import Furnitures from "./components/Categories-pages/Furnitures.jsx";
import Electronics from "./components/Categories-pages/Electronics.jsx";
import Lamps from "./components/Categories-pages/Lamps.jsx";
import Kitchen from "./components/Categories-pages/Kitchen.jsx";
import Accessories from "./components/Categories-pages/Accessories.jsx";
import Tops from "./components/Categories-pages/Tops.jsx";
import Other from "./components/Categories-pages/Other.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import ConfirmationPage from "./pages/ConfirmationPage.jsx";
import Navbar from "./components/Navbar.jsx";
import NavbarCheckout from "./components/CheckoutComponents/CheckoutNavbar.jsx";
import Support from "./components/Support.jsx";
import CartWithItems from "./components/CartWithItems.jsx";

export const CartContext = createContext();

function App() {
  const [cartItem, setCartItem] = useState([]);

  const addToCart = (newItem) => {
    setCartItem((prevCartItems) => {
      const existingItem = prevCartItems.find(
        (cartItem) => cartItem.id === newItem.id && cartItem.size === newItem.size
      );
      
      if (existingItem) {
        // If the item with the same ID and size exists, update the quantity
        return prevCartItems.map((cartItem) =>
          cartItem.id === newItem.id && cartItem.size === newItem.size
            ? { ...cartItem, quantity: cartItem.quantity + newItem.quantity }
            : cartItem
        );
      } else {
        // If the item doesn't exist in the cart, add it
        return [...prevCartItems, { ...newItem, quantity: newItem.quantity }];
      }
    });
  };

  // local storage
  useEffect(() => {
    const json = localStorage.getItem("cartItem");
    const savedCart = JSON.parse(json);
    if (savedCart) {
      setCartItem(savedCart);
    }
  }, []);

  useEffect(() => {
    const json = JSON.stringify(cartItem);
    localStorage.setItem("cartItem", json);
  }, [cartItem]);

  const getTotalQuantity = () => {
    return cartItem.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cartItem, addToCart, setCartItem, getTotalQuantity }}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />
        <Route
          path="/categories"
          element={
            <>
              <Navbar />
              <Categories />
            </>
          }
        >
          <Route path="all" element={<All />} />
          <Route path="furnitures" element={<Furnitures />} />
          <Route path="electronics" element={<Electronics />} />
          <Route path="lamps" element={<Lamps />} />
          <Route path="kitchen" element={<Kitchen />} />
          <Route path="accessories" element={<Accessories />} />
          <Route path="tops" element={<Tops />} />
          <Route path="other" element={<Other />} />
        </Route>
        <Route path="/categories/product/:id" element={<ProductPage />} />
        <Route path="/checkout/*" element={<NavbarCheckout />} /> {/* Use wildcard for nested routes */}
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} /> {/* Added route for ConfirmationPage */}
        <Route path="/support" element={<Support />} />
        <Route path="/cart" element={<CartWithItems />} />
      </Routes>
    </CartContext.Provider>
  );
}

export default App;
