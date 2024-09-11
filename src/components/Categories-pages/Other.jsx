import CategoriesItemOther from "./CategoriesItemOther.jsx";
import Footer from "../Footer.jsx";
import Newsletter from "../Newsletter.jsx";

function Other() {
  return (
    <>
      <CategoriesItemOther />
      {/* <h2 style={{textAlign: "center", fontSize: "50px", padding: "7rem", border: "2rem"}}>Coming Soon!</h2>
      <p style={{textAlign: "center", fontSize: "25px", border: "2rem", paddingBottom: "50rem"}}>Subscribe to our newsletter to get updates</p> */}
      <Newsletter />
      <Footer />
    </>
  );
}

export default Other;
