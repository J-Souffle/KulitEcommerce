import React from "react";
import Banner from "../components/Banner.jsx";
import BannerReverse from "../components/BannerReverse.jsx";
import Footer from "../components/Footer.jsx";
import Hero from "../components/Hero.jsx";
import Newsletter from "../components/Newsletter.jsx";
import ProudProducts from "../components/ProudProducts.jsx";
import TrendingSlider from "../components/TrendingSlider.jsx";
import Banner1 from "../img/banner/FilipinoFood.jpg";
import Banner2 from "../img/banner/FilipinoTransportation.jpg";

function Home() {
  return (
    <>
      <Hero />
      <ProudProducts />
      <Banner
        title="Quality Products"
        text="Yummy Food"
        img={Banner1}
      />
      <TrendingSlider />
      <BannerReverse
        title="Made By Real Filipinos"
        text="Yessir"
        img={Banner2}
      />
      <Newsletter />
      <Footer />
    </>
  );
}

export default Home;
