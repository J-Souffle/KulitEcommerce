import CategoriesItemOther from "./CategoriesItemOther.jsx";
import Footer from "../Footer.jsx";
import Newsletter from "../Newsletter.jsx";

function Other() {
  return (
    <>
      <CategoriesItemOther />
      <h2 style={{textAlign: "center", fontSize: "50px", padding: "7rem", border: "2rem", paddingBottom: "50rem"}}>Coming Soon!</h2>
      <Newsletter />
      <Footer />
    </>
  );
}

export default Other;
