import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import All from "./components/Categories-pages/All";
import Furnitures from "./components/Categories-pages/Furnitures";
import Electronics from "./components/Categories-pages/Electronics";
import Lamps from "./components/Categories-pages/Lamps";
import Kitchen from "./components/Categories-pages/Kitchen";
import Chairs from "./components/Categories-pages/Chairs";
import Hoodies from "./components/Categories-pages/Hoodies";
import ProductPage, { CartContext } from "./pages/ProductPage";
import { useEffect, useState } from "react";
import CheckoutPage from "./pages/CheckoutPage";
import Navbar from "./components/Navbar";
import CheckoutNavbar from "./components/CheckoutComponents/NavbarCheckout";

function App() {
  const [cartItem, setCartItem] = useState([]);

  const addToCart = (item) => {
    setCartItem([...cartItem, item]);
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

  return (
    <CartContext.Provider value={{ cartItem, addToCart, setCartItem }}>
      <Navbar />
      <Routes>
        {/* Define routes for pages with navbar */}
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
          path="categories"
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
          <Route path="chairs" element={<Chairs />} />
          <Route path="skin-care" element={<Hoodies />} />
        </Route>
        <Route path="categories/product/:id" element={<ProductPage />} />

        {/* Define route for CheckoutPage with its own navbar */}
        <Route path="checkout" element={<><CheckoutNavbar /><CheckoutPage /></>} />
      </Routes>
    </CartContext.Provider>
  );
}

export default App;
