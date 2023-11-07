import { useState } from "react";
import "./stylesLogin.css";
import { ReactComponent as Img } from "../img/loginphoto.svg";

function Login() {
  const usuarioLogin = {
    email: "",
    senha: ""
  };

  const [ObjUsuarioLogin, setObjUsuarioLogin] = useState(usuarioLogin);

  const aoDigitar = (e) => {
    setObjUsuarioLogin({ ...ObjUsuarioLogin, [e.target.name]: e.target.value });
  };

  const login = (event) => {
    event.preventDefault();

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
          alert("Login realizado com sucesso");
          window.location.href = "/home"
        }
      });
  };

  function cadastro() {
    window.location.href = "/cadastro"
  }

  function logado(){
    if(localStorage.getItem('usuarioSessao') !== null){
      alert('Você já está Logado!')
      window.location.href = "/home"
    }
  }

  logado();

  return (
    <div className="bodyLogin">
    <div className="login-container">
      <div className="form-imageLogin">
      <div className="form-imageLogin">
        <Img />
      </div>
      </div>
      <div className="formLogin" onSubmit={login} autoComplete='off'>
        <form>
          <div className="form-headerLogin">
            <div className="title">
              <h1 className="h1Login">Faça login na sua conta</h1>
            </div>
            <div className="login-button">
                    <input onClick={cadastro} type="button" value="Ainda não tem uma conta? Inscreva-se" className="inputLogin" />
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
              type="submit"
              value="Login"
            />
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}

export default Login;
