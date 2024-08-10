import { IconChevronLeft } from "@tabler/icons-react";
import { useState } from "react";
import { Link } from "react-router-dom";

function CategoriesHeader() {
  const [btnName, setBtnName] = useState("All");

  const handleBtnName = (e) => {
    setBtnName(e);
  };

  // NEED TO UPDATE THIS
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
            <Link to="all" onClick={() => handleBtnName("all")}>
              <button>All</button>
            </Link>
            <Link to="shirts">
              <button onClick={() => handleBtnName("shirts")}>Tops</button>
            </Link>
            <Link to="sweatshirt">
              <button onClick={() => handleBtnName("sweatshirts")}>
                Bottoms
              </button>
            </Link>
            <Link to="other">
              <button onClick={() => handleBtnName("other")}>Other</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoriesHeader;
