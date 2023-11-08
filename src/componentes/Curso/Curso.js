import React, { useEffect, useState } from "react";
import "./CursoStyles.css";
import FavoritoButton from "./FavoriteButton";
import ShareButton from "./ShareButton";
import Maps from "../Maps/Maps";
import seta from "../img/Seta.png"
import FileViewer from "../FileViewer/FileViewer";

function Curso() {

  const urlCurso = window.location.href;

  const cursoId = window.location.pathname.split('/').pop();

  const usuarioId = localStorage.getItem('usuarioSessao')

  const [Curso, setCurso] = useState("")

  const [Criador, setCriador] = useState("")

  const [fetchConcluido, setFetchConcluido] = useState(false);


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
            var criadorId = retorno_convertido.criador.id
            console.log(Criador)
            encontrarCriador(criadorId);
            setFetchConcluido(true);
          }
        });
    };
    encontrarCurso();
  }, [])

  const encontrarCriador = (criadorId) => {
    fetch("http://localhost:8080/aprendex/usuario/findbyid", {
      method: "post",
      body: criadorId,
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
          setCriador(retorno_convertido)
        }
      });
  }

  const matricular = () => {
    if (usuarioId !== null) {
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
    } else {
      alert('É necessário estar logado para realizar essa ação!')
    }
  };

  return (
    <div>
      <div className="barra">
        <a href="">
          <img src={seta} alt="imagem de exemplo" width="40" height="40" />
        </a>
        <h1 className="texto">{Curso.categoria}</h1>
      </div>
      <div className="imagem-container">
        <div className="titulo-container">
          <h1 className="titulo">{Curso.nome}</h1>
          <FavoritoButton />
          <ShareButton link={urlCurso} />
        </div>
        <p className="subtitulo"> Duração: {Curso.duracao}h | Proximidade: 0KM </p>
        <div className="instituicao-container">
          <div className="img">
            <FileViewer cursoId={cursoId} />
          </div>
          <div className="instituicao">
            <p> Responsável: {Criador.nome} </p>
            <p> Valor: R${Curso.valor} </p>
            <p> Vagas: {Curso.valor} </p>
            <p> Modelo: {Curso.presencial ? ('Presencial') 
            : ('EAD')
            } </p>
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
      {fetchConcluido ? (
      <Maps Curso={Curso} />
      ) : (<p>Carregando...</p>)
      }
    </div>
  );
}

export default Curso;