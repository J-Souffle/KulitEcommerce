import "./Navbar.css";
import LogoImg2 from "../img/1.png";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import CartWithItems from "./CartWithItems.jsx";
import EmptyCart from "./EmptyCart.jsx";
import { CartContext } from "../App";
import { IconMenu2, IconShoppingCart, IconX } from "@tabler/icons-react";

function Navbar() {
  const [sticky, setSticky] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [cart, setCart] = useState(false);

  const { cartItem, getTotalQuantity } = useContext(CartContext);

  const handleScroll = () => {
    if (window.scrollY > 10) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  const openCart = () => {
    setCart(!cart);
  };

  window.addEventListener("scroll", handleScroll);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div
        className={`mobile-nav-full ${mobileNav ? "open-flex" : "closed-flex"}`}
      >
        <IconX onClick={() => setMobileNav(!mobileNav)} className="x-mobile" />
        <div className="mobile-links">
          <Link onClick={() => setMobileNav(!mobileNav)} to="/categories/all">
            categories
          </Link>
          <Link onClick={() => setMobileNav(!mobileNav)} to="/support">
            Support
          </Link>
        </div>
      </div>

      {/* overlay */}
      <div
        onClick={openCart}
        className={`page-overlay ${cart ? "open-flex" : "closed-flex"}`}
      ></div>

      {/* cart */}
      <div className={`cart-div ${cart ? "open-cart" : "closed-cart"}`}>
        <div className="cart-title-btn">
          <h2 className="cart-full-h2">
            Your Shopping Cart ({getTotalQuantity()})
          </h2>
          <IconX onClick={openCart} />
        </div>

        <div className="cart-body">
          {cartItem.length < 1 ? (
            <EmptyCart openCart={openCart} />
          ) : (
            <CartWithItems />
          )}
        </div>
      </div>

      <nav className="navbar">
        <div className="container">
          <div className={`nav-container ${sticky ? "cont-sticky" : ""}`}>
            <Link to="/">
              <img
                onClick={scrollToTop}
                src={LogoImg2}
                alt="logo"
                className="logo-img"
              />
            </Link>
            <div className="nav-links">
              <Link onClick={() => window.scrollTo(0, 0)} to="/categories/all">
                shop
              </Link>
              <Link onClick={() => window.scrollTo(0, 0)} to="/support">
                Support
              </Link>
              <i
                data-array-length={getTotalQuantity()}
                onClick={openCart}
                className={`cart-icon ${cartItem.length > 0 ? "with-items" : ""}`}
              >
                <IconShoppingCart />
                {/* Cart quantity indicator */}
                <span className="cart-quantity">{getTotalQuantity()}</span>
              </i>
            </div>
            <div className="hamburger-menu">
              <i
                data-array-length={getTotalQuantity()}
                onClick={openCart}
                className={`hamburger-cart ${cartItem.length > 0 ? "with-items" : ""}`}
              >
                <IconShoppingCart />
                {/* Cart quantity indicator */}
                <span className="cart-quantity">{getTotalQuantity()}</span>
              </i>
              <i
                onClick={() => setMobileNav(!mobileNav)}
                className="hamburger-hamb"
              >
                <IconMenu2 />
              </i>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
