import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Categories from "./pages/Categories.jsx";
import All from "./components/Categories-pages/All.jsx";
import Furnitures from "./components/Categories-pages/Furnitures.jsx";
import Electronics from "./components/Categories-pages/Electronics.jsx";
import Lamps from "./components/Categories-pages/Lamps.jsx";
import Kitchen from "./components/Categories-pages/Kitchen.jsx";
import Chairs from "./components/Categories-pages/Shirts.jsx";
import Hoodies from "./components/Categories-pages/Hoodies.jsx";
import ProductPage, { CartContext } from "./pages/ProductPage.jsx";
import { useEffect, useState } from "react";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import Navbar from "./components/Navbar.jsx";
import CheckoutNavbar from "./components/CheckoutComponents/NavbarCheckout.jsx";

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
          <Route path="chairs" element={<Chairs />} />
          <Route path="sweatshirt" element={<Hoodies />} />
        </Route>
        <Route path="/categories/product/:id" element={<ProductPage />} />

        {/* Define route for CheckoutPage with its own navbar */}
        <Route path="/checkout" element={<><CheckoutNavbar /><CheckoutPage /></>} />
      </Routes>
    </CartContext.Provider>
  );
}

export default App;
