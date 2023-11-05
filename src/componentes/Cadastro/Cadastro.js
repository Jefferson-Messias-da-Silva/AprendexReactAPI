import { useState, useEffect } from "react";
import AppNavbar from "../AppNavBar";
import "./stylesCadastro.css";
import cadastroImage from "../img/cadastrophoto.svg";

function Cadastro() {
  const usuario = {
    nome: "",
    sobrenome: "",
    login: "",
    senha: "",
    email: "",
    dtnascimento: "",
    avaliacao: 0.0,
    cursoFavorito: [],
    cnpj: "",
    cpf: "",
    telefone: "",
    ativo: false,
    cep: "",
    numero: "",
    endereco: "",
    perfil: {}
  };

  const [ObjUsuario, setObjUsuario] = useState(usuario);

  const aoDigitar = (e) => {
    setObjUsuario({ ...ObjUsuario, [e.target.name]: e.target.value });
  };


  const cadastrar = () => {
    fetch("http://localhost:8080/aprendex/usuario/save", {
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
          alert("Cadastro realizado com sucesso");
          window.location.href = "/home"
        }
      });
  };

  function login() {
    window.location.href = "/login"
  }

  const checkCEP = (e) => {
    const cep = e.target.value.replace(/\D/g, '')
    console.log(cep.length )
    if (cep.length === 8) {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(res => res.json())
        .then(data => {
          if (!data.erro) {
            setObjUsuario((prevState) => ({ 
              ...prevState,
              endereco: data.logradouro + ", " + ObjUsuario.numero + " - " + data.bairro + " - " + data.localidade + " - " + data.uf}));
          } else {
            alert("CEP inválido. Por favor, verifique o CEP inserido.");
          }
        })
    } else {
      alert("CEP inválido. Por favor, verifique o CEP inserido.");
    }
  }

  const encontrarPerfil = (event) => {
    const tipo = event.target.value;
    fetch("http://localhost:8080/aprendex/perfil/tipo", {
      method: "post",
      body: tipo,
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
          console.log(retorno_convertido);
          setObjUsuario((prevState) => ({
            ...prevState,
            perfil: retorno_convertido,
          }));
        }
      });
  }


  return (
      <div className="bodyCadastro">
        <div className="cadastro-container">
          <div className="form-imagecadastro">
            <img src={cadastroImage} />
          </div>
          <div className="formcadastro">
            <form onSubmit={cadastrar}>
              <div className="form-headercadastro">
                <div className="title">
                  <h1>Cadastre-se</h1>
                </div>
                <div className="login-button">
                  <input onClick={login} type="button" value="Entrar" className="inputLogin" />
                </div>
              </div>

              <div className="input-group">
                <div className="input-box">
                  <label htmlFor="login">Nome de Usuário</label>
                  <input
                    placeholder="Digite seu nome de usuário"
                    required
                    id="login"
                    type="text"
                    name="login"
                    onChange={aoDigitar}
                  />
                </div>

                <div className="input-box">
                  <label htmlFor="nome">Primeiro Nome</label>
                  <input
                    placeholder="Digite seu primeiro nome"
                    required
                    id="nome"
                    name="nome"
                    type="text"
                    onChange={aoDigitar}
                  />
                </div>

                <div className="input-box">
                  <label htmlFor="sobrenome">Sobrenome</label>
                  <input
                    placeholder="Digite seu sobrenome"
                    required
                    id="sobrenome"
                    onChange={aoDigitar}
                    type="text"
                    name="sobrenome"
                  />
                </div>

                <div className="input-box">
                  <label htmlFor="NUMERO">Numero</label>
                  <input
                    placeholder="N° Residencial"
                    required
                    id="numero"
                    onChange={aoDigitar}
                    type="text"
                    name="numero"
                  />
                </div>

                <div className="input-box">
                  <label htmlFor="CEP">CEP</label>
                  <input
                    placeholder="Digite seu sobrenome"
                    required
                    id="cep"
                    onChange={aoDigitar}
                    type="text"
                    name="cep"
                    onBlur={checkCEP}
                  />
                </div>

                <div className="input-box">
                  <label htmlFor="data">Data de Nascimento</label>
                  <input
                    id="dtnascimento"
                    type="date"
                    name="dtnascimento"
                    onChange={aoDigitar}
                    required
                  />
                </div>

                <div className="input-box">
                  <label htmlFor="email">E-mail</label>
                  <input
                    placeholder="Digite seu e-mail"
                    required
                    id="email"
                    type="email"
                    name="email"
                    onChange={aoDigitar}
                  />
                </div>

                <div className="input-box">
                  <label htmlFor="telefone">Celular</label>
                  <input
                    placeholder="(xx) xxxx-xxxx"
                    required
                    id="telefone"
                    type="text"
                    name="telefone"
                    onChange={aoDigitar}
                  />
                </div>

                <div className="input-box">
                  <label htmlFor="senha">Senha</label>
                  <input
                    placeholder="Digite sua senha"
                    required
                    id="senha"
                    type="password"
                    name="senha"
                    onChange={aoDigitar}
                  />
                </div>

              </div>

              <div className="gender-inputs">
                <div className="gender-title">
                  <h6>Tipo de usuário</h6>
                </div>

                <div className="gender-group">
                  <fieldset required>
                  <div className="gender-input">
                    <input id="aluno" type="radio" name="tipo" value="0" onChange={encontrarPerfil} required/>
                    <label htmlFor="aluno">Aluno</label>
                  </div>

                  <div className="gender-input">
                    <input id="professor" type="radio" name="tipo" value="1" onChange={encontrarPerfil} required/>
                    <label htmlFor="professor">Professor</label>
                  </div>

                  <div className="gender-input">
                    <input id="intituicao" type="radio" name="tipo" value="2" onChange={encontrarPerfil} required/>
                    <label htmlFor="intituicao">Instituição</label>
                  </div>
                  </fieldset>
                </div>
              </div>

              <div className="continue-button">
                <input
                  className="inputLogin"
                  type="submit"
                  value="Cadastrar"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
  );
}

export default Cadastro;
