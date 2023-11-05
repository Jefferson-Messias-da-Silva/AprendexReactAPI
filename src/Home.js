import React from "react";
import "./App";
import Cards from "./componentes/Home/Cards";
import HeroSection from "./componentes/Home/HeroSection";
import Footer from "./componentes/Home/Footer";

function Home() {
  return (
    <>
      <HeroSection />
      <Cards />
      <Footer />
    </>
  );
}

export default Home;
