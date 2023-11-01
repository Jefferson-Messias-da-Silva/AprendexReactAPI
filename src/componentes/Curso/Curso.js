import React, { useEffect, useState } from "react";
import "./CursoStyles.css";
import FavoritoButton from "./FavoriteButton";
import ShareButton from "./ShareButton";
import Maps from "../Maps/Maps";
import AppNavbar from "../AppNavBar";
import FileViewer from "../FileViewer/FileViewer";

function Curso() {

  const cursoId = window.location.pathname.split('/').pop();

  console.log(cursoId)

  const usuarioId = localStorage.getItem('usuarioSessao')

  const [Curso, setCurso] = useState("")

  const requestData = {
    usuarioId: usuarioId,
    cursoId: cursoId
  };

  useEffect(() => {
    const encontrarCurso = async () => {
      fetch("http://localhost:8080/aprendex/curso/findid", {
        method: "post",
        body: cursoId,
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
            setCurso(retorno_convertido);
            return retorno_convertido;
          }
        });
    };
    encontrarCurso();
  },[])

  const matricular = () => {
    fetch("http://localhost:8080/aprendex/matricula/save", {
      method: "post",
      body: JSON.stringify(requestData),
      headers: {
        "Content-type": "application/json",
        Accept: "application/json"
      }
    })
      .then((retorno) => retorno.json())
      .then((retorno_convertido) => {
        if (retorno_convertido.mensagem !== undefined) {
          alert(retorno_convertido.mensagem);
        } else {
          alert("matricula realizada com sucesso")
        }
      });
  };

  return (
    <div>

      <div>
        <AppNavbar />
        <div className="barra">
          <a href="http://www.example.com">
            <img src="" alt="imagem de exemplo" width="40" height="40" />
          </a>
          <h1 className="texto">{Curso.categoria}</h1>
        </div>
        <div className="imagem-container">
          <div className="titulo-container">
            <h1 className="titulo">{Curso.nome}</h1>
            <FavoritoButton />
            <ShareButton />
          </div>
          <p className="subtitulo"> Duração: {Curso.duracao} | Proximidade: 0KM </p>
          <div className="instituicao-container">
            <div className="img">
              <FileViewer cursoId={Curso.id}/>
            </div>
            <div className="instituicao">
              <p> Instituição: xxxxxx</p>
              <p> Valor: R${Curso.valor} </p>
              <p> Vagas: {Curso.valor} </p>
              <p> Modelo: xxxxxx </p>
            </div>
          </div>
          <p className="descricao"> Descrição: </p>
          <p className="descricaotexto">
            {" "}
            {Curso.descricao}{" "}
          </p>
        </div>
        <div className="button-container">
          <button className="button" onClick={matricular}>Matricule-se</button>
        </div>
      </div>

      <Maps />

    </div>
  );
}

export default Curso;