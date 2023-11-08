import React from "react";
import { useState, useEffect } from "react";
import "./buscaStyle.css";

const Busca = () => {
  var busca = window.location.pathname.split("/").pop();
  var buscant = true;
  const [cursos, setCursos] = useState([]);

  const buscar = () => {
    return fetch("http://localhost:8080/aprendex/curso/findname", {
      method: "post",
      body: busca,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json"
      }
    })
      .then((retorno) => retorno.json())
      .then((json) => {
        setCursos(json);

        return json;
      });
  };

  if (buscant) {
    buscar();
    buscant = false;
  }
  return (
    <div className="background">
      <div className="form-header-cusos">
        <div className="container-cusos">
          <h1 className="h1-cursos">Cursos</h1>
        </div>
        <div className="cards">
          {cursos.map((curso, i) => (
            <div key={i} className="card">
              {curso.imageUrl && (
                <img src={curso.imageUrl} alt="Imagem" className="card-image" />
              )}

              <h3>{curso.nome}</h3>
              <p>{curso.descricao}</p>
              <p>{curso.valor}</p>
              <button className="btn">Inscreva-se</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Busca;
