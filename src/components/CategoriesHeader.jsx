import { IconChevronLeft } from "@tabler/icons-react";
import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function CategoriesHeader() {
  const location = useLocation(); // Get current path
  const [btnName, setBtnName] = useState("All");

  useEffect(() => {
    // Map the current URL path to the appropriate header text
    switch (location.pathname) {
      case "/categories/tops":
        setBtnName("Tops");
        break;
      case "/categories/accessories":
        setBtnName("Accessories");
        break;
      case "/categories/other":
        setBtnName("Other");
        break;
      default:
        setBtnName("All");
    }
  }, [location.pathname]); // Re-run this effect whenever the pathname changes

  return (
    <>
      <div className="container">
        <div className="catego-header">
          <div className="title-home">
            <Link onClick={() => window.scrollTo(0, 0)} to="/">
              <IconChevronLeft /> Home
            </Link>
            <h3>{btnName}</h3>
          </div>
          <div className="filter-btns">
            <Link to="all">
              <button>All</button>
            </Link>
            <Link to="tops">
              <button>Tops</button>
            </Link>
            <Link to="accessories">
              <button>Accessories</button>
            </Link>
            <Link to="other">
              <button>Other</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoriesHeader;
