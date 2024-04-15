import Banner from "../components/Banner";
import BannerReverse from "../components/BannerReverse";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Newsletter from "../components/Newsletter";
import ProudProducts from "../components/ProudProducts";
import TrendingSlider from "../components/TrendingSlider";
import Banner1 from "../img/banner/FilipinoFood.jpg";
import Banner2 from "../img/banner/FilipinoTransportation.jpg";

function Home() {
  return (
    <>
      <Hero />
      <ProudProducts />
      <Banner
        title="Quality Products"
        text=" Yummy Food"
        img={Banner1}
      />
      <TrendingSlider />
      <BannerReverse
        title="Made By Real Filipinos"
        text=" Yessir"
        img={Banner2}
      />
      <Newsletter />
      <Footer />
    </>
  );
}

export default Home;
