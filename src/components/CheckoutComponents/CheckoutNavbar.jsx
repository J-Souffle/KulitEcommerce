import "./CheckoutNavbar.css";
import LogoImg2 from "../../img/1.png";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import CartWithItems from "../CartWithItems.jsx";
import EmptyCart from "../EmptyCart.jsx";
import { CartContext } from "../../App.js";
import { IconX, IconArrowLeft } from "@tabler/icons-react";

function CheckoutNavbar() {
  const [sticky, setSticky] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [cart, setCart] = useState(false);

  const { cartItem } = useContext(CartContext);

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
          <Link onClick={() => setMobileNav(!mobileNav)} to="/categories/lamps">
            lamps
          </Link>
          <Link
            onClick={() => setMobileNav(!mobileNav)}
            to="/categories/product/19"
          >
            product page
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
            Your Shopping Cart ({cartItem.length})
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
              <Link to="/">
                <IconArrowLeft className="go-back-arrow" />
              </Link>

            </div>
            <div className="hamburger-menu-checkout">
              <i
                onClick={() => setMobileNav(!mobileNav)}
                className="hamburger-hamb"
              >
                <Link to="/">
                <IconArrowLeft className="go-back-arrow" />
              </Link>
              </i>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default CheckoutNavbar;
