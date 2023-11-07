import React, { useState, useEffect } from "react";
import "./stylesAlteraUsuario.css";

function AlteraUsuario() {

  function logado() {
    if (localStorage.getItem('usuarioSessao') === null) {
      alert('Para acessar essa página você precisa realizar o login!')
      window.location.href = "/home"
    }
  }

  logado();

  const usuarioId = localStorage.getItem('usuarioSessao');


  const usuario = {
    id: "",
    nome: "",
    sobrenome: "",
    login: "",
    email: "",
    telefone: "",
    dtnascimento: "",
    cep: "",
    numero: "",
    senha: "",
    endereco: "",
    perfil: {}
  };

  const [ObjUsuario, setObjUsuario] = useState(usuario);

  const [ObjPerfil, setObjPerfil] = useState(usuario.perfil);

  const [Pessoa, setPessoa] = useState(false);

  const aoDigitar = (e) => {
    setObjUsuario({ ...ObjUsuario, [e.target.name]: e.target.value });
  };

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
            setObjPerfil(retorno_convertido.perfil);
          }
        });
    };
    encontrarUsuario();
  }, [])

  useEffect(() => {
    if (ObjPerfil && ObjPerfil.tipo !== 2) {
      setPessoa(true);
    } else {
      setPessoa(false);
    }
  }, [ObjUsuario, ObjPerfil]);



  const alterar = () => {
    fetch("http://localhost:8080/aprendex/usuario/altera", {
      method: "post",
      body: JSON.stringify(ObjUsuario),
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
          alert("Alteração realizada com sucesso");
        }
      });
  };

  const checkCEP = (e) => {
    const cep = e.target.value.replace(/\D/g, '')
    console.log(cep.length)
    if (cep.length === 8) {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(res => res.json())
        .then(data => {
          if (!data.erro) {
            ObjUsuario.endereco = data.logradouro + ", " + ObjUsuario.numero + " - " + data.bairro + " - " + data.localidade + " - " + data.uf
          } else {
            alert("CEP inválido. Por favor, verifique o CEP inserido.");
            document.getElementById('cep').value = '';
          }
        })
    } else {
      alert("CEP inválido. Por favor, verifique o CEP inserido.");
      document.getElementById('cep').value = '';
    }
  }

  function home() {
    window.location.href = "/home"
  }

  return (
    <div>
      <div className="bodyMeusDados">
        <div className="container-alteraUsuario">
          <div className="formalteraUsuario">
            <div className="form-headeralteraUsuario">
              <h1 className="meus-dados-header">Meus Dados</h1>
            </div>
            <div className="alteraDadosinput-group">
              <div className="alteraDadosinput-box">
                <label>Login:</label>
                <input
                  type="text"
                  name="login"
                  id="login"
                  value={ObjUsuario.login}
                  onChange={aoDigitar}
                />
              </div>
              <div className="alteraDadosinput-box">
                <label>Nome:</label>
                <input
                  type="text"
                  name="nome"
                  id="nome"
                  value={ObjUsuario.nome}
                  onChange={aoDigitar}
                />
              </div>
              {Pessoa ? (
                <div className="alteraDadosinput-box">
                  <label>Sobrenome:</label>
                  <input
                    type="text"
                    name="sobrenome"
                    id="sobrenome"
                    value={ObjUsuario.sobrenome}
                    onChange={aoDigitar}
                  />
                </div>) : (
                  ''
                )
              }
              <div className="alteraDadosinput-box">
                <label>Email:</label>
                <input
                  type="text"
                  name="email"
                  value={ObjUsuario.email}
                  disabled
                />
              </div>
              <div className="alteraDadosinput-box">
                <label>Número de Telefone:</label>
                <input
                  type="text"
                  name="telefone"
                  value={ObjUsuario.telefone}
                  onChange={aoDigitar}
                />
              </div>
              {Pessoa ? (
                <div className="alteraDadosinput-box">
                  <label>Data de Nascimento:</label>
                  <input
                    type="text"
                    name="dtnascimento"
                    id="dtnascimento"
                    value={ObjUsuario.dtnascimento}
                    onChange={aoDigitar}
                  />
                </div>) : (
                ''
              )
              }
              <div className="alteraDadosinput-box">
                <label>Número:</label>
                <input
                  type="text"
                  name="numero"
                  value={ObjUsuario.numero}
                  onChange={aoDigitar}
                />
              </div>
              <div className="alteraDadosinput-box">

                <label>CEP:</label>
                <input
                  type="text"
                  name="cep"
                  value={ObjUsuario.cep}
                  onChange={aoDigitar}
                  onBlur={checkCEP}
                />
              </div>
              <div className="alteraDadosinput-box">
                <label>Senha Atual:</label>
                <input
                  type="password"
                  value={ObjUsuario.senha}
                  onChange={aoDigitar}
                />
              </div>
            </div>
            <div className="alteraDadoscontinue-button alteraDadosbutton-container">
              <input
                className="inputAlterar"
                type="button"
                value="Alterar"
                onClick={alterar}
              />
              <input
                className="inputAlterar"
                type="button"
                value="Cancelar"
                onClick={home}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlteraUsuario;