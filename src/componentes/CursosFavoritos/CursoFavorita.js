import React, { useState, useEffect } from "react";
import "./cursoFavoritoStyles.css";
import FavoritoButton from "./FavoritoButton";

function CursoFavorita() {

const [ObjCursoFavorito,setObjCursoFavorito] = useState("")

  const usuarioId = localStorage.getItem('usuarioSessao');

  const [fetchFavoritosConcluido, setFetchFavoritosConcluido] = useState(false);

  useEffect(() => {
    const encontraFavoritos = async () => {
      fetch("http://localhost:8080/aprendex/curso/favoritos", {
        method: "post",
        body: usuarioId,
        headers: {
          "Content-type": "application/json",
          Accept: "application/json"
        }
      })
      .then((retorno) => retorno.json())
      .then((retorno_convertido) => {
        if (retorno_convertido.mensagem !== undefined) {
          alert(retorno_convertido.mensagem);
          window.location.href = "/home";
        } else {
          setObjCursoFavorito(retorno_convertido);
          setFetchFavoritosConcluido(true);
        }
      });
    };
    encontraFavoritos();
  },[])

  return (
    <div>
      <section>
        <div className="form-header">
          <div className="container">
            <h1 class="CFh1">Cursos Favoritos</h1>
          </div>
          {fetchFavoritosConcluido ? (
          <div className="cards">
            {ObjCursoFavorito.map((curso, i) => (
              <div key={i} className="card">
                <h3 class="CFh3">{curso.nome}</h3>
                <p class="CFp">{curso.descricao}</p>
                {/*<button className="btn">Inscreva-se</button>*/}
                {/*<FavoritoButton />*/}
              </div>
            ))}
          </div>) : ('')}
        </div>
      </section>
    </div>
  );
}

export default CursoFavorita;
