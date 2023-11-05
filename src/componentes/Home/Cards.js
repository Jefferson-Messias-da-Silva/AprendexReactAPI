import React from "react";
import "./Cards.css";
import CardItem from "./CardItem";

function Cards() {
  return (
    <div className="cards">
      <h1>Conheça os cursos em ALTA!</h1>
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            <CardItem
              src=""
              text="Pedagogia"
              label="Curso EAD"
              path="/Cursos"
            />
            <CardItem
              src=""
              text="Analise e Desenvolimento de sistema"
              label="Curso Hibrido"
              path="/Cursos"
            />
            <CardItem
              src=""
              text="Direito"
              label="Curso Presencial"
              path="/Cursos"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
