import React, { useState } from "react";
import "./stylesAlteraUsuario.css"; // Importando o arquivo CSS
import { Navbar } from "reactstrap";
import AppNavbar from "../AppNavBar";

function AlteraUsuario() {
  //Aqui deixei uma fun para escrever auto os dados do usuario
  const [dados, setDados] = useState({
    nome: "",
    email: "",
    telefone: "",
    dataNascimento: "",
    cep: "",
    numeroCasa: "",
    senha: ""
  });

  const [senhaAtual, setSenhaAtual] = useState(""); //Tentei criar um set para seta a nova senha
  const [novaSenha, setNovaSenha] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "dataNascimento") {
      // Lógica de formatação de data de nascimento Dia/Mes/Ano
    } else if (name === "cep") {
      // Lógica de formatação de CEP 00000-000
    } else if (name === "telefone") {
      const formattedPhone = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
      setDados({ ...dados, [name]: formattedPhone }); //Formatando telefone para (00)00000-0000
    } else {
      setDados({ ...dados, [name]: value });
    }
  };

  const handleChangePassword = () => {
    // Usei o chat para tenta criar a fun de alterar senha, n sei se ta certo
    if (senhaAtual === dados.senha) {
      setDados({ ...dados, senha: novaSenha });
      setSenhaAtual("");
      setNovaSenha("");
    } else {
      alert("Senha atual incorreta. Tente novamente.");
    }
  };

  return (
    <div>
      <AppNavbar/>
    <div className="bodyMeusDados">
      <div className="container-alteraUsuario">
        <div className="formalteraUsuario">
          <div className="form-headeralteraUsuario">
            <h1 className="meus-dados-header">Meus Dados</h1>
          </div>
          <div className="input-group">
            <div className="input-box">
              <label>Nome:</label>
              <input
                type="text"
                name="nome"
                value={dados.nome}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-box">
              <label>Email:</label>
              <input
                type="text"
                name="email"
                value={dados.email}
                disabled
              />{" "}
              {
                // Deixei Disable para o usuario não conseguir troca o e-mail
              }
            </div>
            <div className="input-box">
              <label>Número de Telefone:</label>
              <input
                type="text"
                name="telefone"
                value={dados.telefone}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-box">
              <label>Data de Nascimento:</label>
              <input
                type="text"
                name="dataNascimento"
                value={dados.dataNascimento}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-box">
              <label>CEP:</label>
              <input
                type="text"
                name="cep"
                value={dados.cep}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-box">
              <label>Número da Casa:</label>
              <input
                type="text"
                name="numeroCasa"
                value={dados.numeroCasa}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-box">
              <label>Senha Atual:</label>
              <input
                type="password"
                value={senhaAtual}
                onChange={(e) => setSenhaAtual(e.target.value)}
              />
            </div>
            <div className="input-box">
              <label>Nova Senha:</label>
              <input
                type="password"
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
              />
            </div>
          </div>
          <div className="continue-button button-container">
            <button type="submit" className="login-button">
              <a href="/">Salvar</a>
              {
                // Esse href eu deixei para voltar para o home ou alguma outra tela
              }
            </button>
            <button type="button" className="login-button">
              <a href="/">Cancelar</a>{" "}
              {
                // Esse href eu deixei para voltar para o home ou alguma outra tela
              }
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default AlteraUsuario;