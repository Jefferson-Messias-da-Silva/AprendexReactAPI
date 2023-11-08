import "./gerenciaMatriculasStyles.css";
import React, { useState, useEffect } from "react";

export default function GerenciaMatricula() {
    function logado() {
        if (localStorage.getItem('usuarioSessao') === null) {
            alert('Para acessar essa página você precisa realizar o login!')
            window.location.href = "/home"
        }
    }

    const [ObjMatricula, setObjMatricula] = useState("");

    const [fetchMatriculasConcluido, setFetchMatriculasConcluido] = useState(false);

    logado();

    const usuarioId = localStorage.getItem('usuarioSessao');

    useEffect(() => {
        const encontrarMatriculas = async () => {
            fetch("http://localhost:8080/aprendex/matricula/matriculasporcriador", {
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
                        console.log(retorno_convertido.criador)
                        if (retorno_convertido.mensagem !== undefined) {
                            alert(retorno_convertido.mensagem);
                            window.location.href = "/home";
                        } else {
                            setObjMatricula(retorno_convertido);
                            setFetchMatriculasConcluido(true);
                        }
                    }
                });
        };
        encontrarMatriculas();
    }, [])

  return (
    <div>
      <section>
        <div className="form-header">
          <div className="container">
            <h1 className="gerencia">Gerenciar matricula</h1>
          </div>
        </div>
        {fetchMatriculasConcluido ?(
        <div className="gerencia">
            {ObjMatricula.map((matricula,i) => (
          <div className="container">
            <div className="card">
              <div className="card-header">
                <div className="uinfo">
                  <div className="info">
                    <span className="span">{matricula.curso.nome}</span>
                    <br />
                    <small className="txtpqueno">Presencial </small>
                  </div>
                </div>
                <div className="info-right">
                  <button id="follow-btn-lg" className="botao">
                    <span> cancelar matricula </span>
                    <span style={{ fontWeight: "bolder" }}>
                      <i className="fas fa-times"></i>
                    </span>
                  </button>
                </div>
              </div>
              <div className="info-right2">
                <button id="follow-btn-lg2" className="botao2">
                  <span> encerrar matricula </span>
                  <span style={{ fontWeight: "bolder" }}>
                    <i className="fas fa-times"></i>
                  </span>
                </button>
              </div>
              <div className="card-body">
                <p>
                  Descrição Curso Desenvolvimento de Software Multiplataforma
                </p>
              </div>
              <div className="card-footer">
                <div className="foot-item"></div>
              </div>
            </div>
          </div>))}
        </div>) : (<p>Carregando...</p>)
}
      </section>
    </div>
  );
}
