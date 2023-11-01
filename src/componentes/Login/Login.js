import { useState, useEffect } from "react";
import AppNavbar from "../AppNavBar";
import "./stylesLogin.css";
import loginImage from "../img/loginImg.png";

function Login() {
  const usuarioLogin = {
    email: "",
    senha: ""
  };

  const [ObjUsuarioLogin, setObjUsuarioLogin] = useState(usuarioLogin);

  const aoDigitar = (e) => {
    setObjUsuarioLogin({ ...ObjUsuarioLogin, [e.target.name]: e.target.value });
  };

  const login = () => {
    fetch("http://localhost:8080/aprendex/usuario/login", {
      method: "post",
      body: JSON.stringify(ObjUsuarioLogin),
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
          localStorage.setItem("usuarioSessao", retorno_convertido.id);
        }
      });
  };

  return (
    <div className="bodyLogin">
    <div className="login-container">
      <div className="form-imageLogin">
        <img src={loginImage}></img>
      </div>
      <div className="formLogin">
        <form>
          <div className="form-headerLogin">
            <div className="title">
              <h1>Faça login na sua conta</h1>
            </div>
            <div className="login-button">
              <button>
                <a href="/cadastro">Ainda não tem uma conta? Inscreva-se</a>
              </button>
            </div>
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
          <div className="continue-button">
            <input
              className="inputLogin"
              type="button"
              value="Login"
              onClick={login}
            />
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}

export default Login;
