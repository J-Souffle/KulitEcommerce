import "./Header.css";
import Main1 from "../img/header/AllClothing.jpg";
import Main2 from "../img/header/Hoodies.jpg";
import Main3 from "../img/header/Shirts.jpg";
import Main4 from "../img/header/Other.jpg";
import Main5 from "../img/header/OtherSticker.jpeg"
import Main6 from "../img/header/Accessories.jpeg"
import Main7 from "../img/header/Tops.jpeg"
import { Link } from "react-router-dom";

function Hero() {
  return (
    <>
      <div className="home-container">
        <div className="container">
          <div className="grid-container">
            <div className="featured grid-one">
              <Link to="categories/all">
                <div id="img1" className="lil-overlay"></div>
                <img src={Main1} alt="img1" />
                <p className="main-description">All Clothing</p>
              </Link>
            </div>
            <div className="featured grid-two">
              <Link to="categories/tops">
                <div id="img2" className="lil-overlay"></div>
                <img src={Main7} alt="img2" />
                <p className="main-description">Tops</p>
              </Link>
            </div>
            <div className="featured grid-four">
              <Link to="categories/accessories">
                <div id="img3" className="lil-overlay"></div>
                <img src={Main6} alt="img3" />
                <p className="main-description">Accessories</p>
              </Link>
            </div>
            <div className="featured grid-four-low">
              <Link to="categories/other">
                <div id="img4" className="lil-overlay"></div>
                <img src={Main5} alt="img4" />
                <p className="main-description">Other</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
