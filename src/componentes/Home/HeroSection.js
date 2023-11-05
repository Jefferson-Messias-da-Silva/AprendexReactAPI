import React from "react";
import "../../App";
import { Button } from "./Button";
import "./HeroSection.css";


function HeroSection() {
  return (
    <div className="hero-container">
      <h1>Aprendex</h1>
      <p>?</p>
      <div className="hero-btns">
        <Button
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
        >
          Explorar cursos
        </Button>
        <Button
          className="btns"
          buttonStyle="btn--primary"
          buttonSize="btn--large"
          onClick={console.log("hey")}
        >
          Inscreva-se
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
