import React, { useState, useEffect } from "react";
import Sidebar from './Sidebar';
import Content from './Content';
import './stylesPerfil.css';



function Perfil() {

    const usuarioId = localStorage.getItem('usuarioSessao')

    console.log(usuarioId)

    const [ObjUsuario, setObjUsuario] = useState("");
    const [ObjCursoFavorito,setObjCursoFavorito] = useState("")
    const [fetchConcluido, setFetchConcluido] = useState(false);

    const [ObjMeusCursos, setObjMeusCursos] = useState("");
    const [fetchMeusCursosConcluido, setFetchMeusCursosConcluido] = useState("");

    const [ObjCertificados, setObjCertificados] = useState("");
    const [fetchObjCertificadosConcluido, setFetchObjCertificadosConcluido] = useState("");

    const [fetchFavoritosConcluido, setFetchFavoritosConcluido] = useState(false);

    useEffect(() => {
        const encontrarUsuario = async () => {
          fetch("http://localhost:8080/aprendex/usuario/findbyid", {
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
              setObjUsuario(retorno_convertido);
              setObjCursoFavorito(retorno_convertido.cursoFavorito)
              setFetchConcluido(true);
            }
          });
        };
        encontrarUsuario();
      },[])

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

      useEffect(() => {
        const encontraMeusCursos = async () => {
          fetch("http://localhost:8080/aprendex/matricula/matriculas", {
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
              setObjMeusCursos("");
            } else {
              setObjMeusCursos(retorno_convertido);
              setFetchMeusCursosConcluido(true);
            }
          });
        };
        encontraMeusCursos();
      },[])

      useEffect(() => {
        const encontrarCertificado = async () => {
          fetch("http://localhost:8080/aprendex/matricula/findfim", {
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
                setObjCertificados("")
              } else {
                setObjCertificados(retorno_convertido)
                setFetchObjCertificadosConcluido(true)
              }
            });
        };
        encontrarCertificado();
      }, []);
 
  return (
    <div className="container">
        {fetchConcluido ? (
      <Sidebar usuario={ObjUsuario}>
        <h1>Título 1 - Sidebar</h1>
      </Sidebar>
        ) : (
            <p>Carregando...</p>
        )
        }
        {fetchFavoritosConcluido  ? (
      <div className="conteudo" style={{ marginLeft: '250px' }}>
        <h1>Meus Favoritos</h1>
        <Content cursos={ObjCursoFavorito} />
        <a href="/curso/favorito">Ver todos</a>
      </div>
        ) : (
          <p>Carregando...</p>
        )
      }
      {fetchMeusCursosConcluido ? (
      <div className="conteudo" style={{ marginLeft: '250px' }}>
        <h1>Meus Cursos</h1>
        <Content cursos={ObjMeusCursos} /><a href="/curso/favorito">Ver todos</a>
       <a href="/curso/meuscursos">Ver todos</a>
      </div>
      ) : ''
      }
      {fetchObjCertificadosConcluido ? (
      <div className="conteudo" style={{ marginLeft: '250px' }}>
        <h1>Meus Certificados</h1>
        <Content cursos={ObjCertificados} /><a href="/curso/favorito">Ver todos</a>
        <a href="/curso/certificado">Ver todos</a>
      </div>) : (
        "")
      
      }
    </div>
    
  );
}

export default Perfil;