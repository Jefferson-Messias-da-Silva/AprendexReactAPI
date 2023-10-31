import React, { useState } from "react";
import "./stylesMudarSenha.css";
import AppNavbar from "../AppNavBar";

function MudarSenha() {

    const [senha, setSenha] = useState();

    const token = window.location.pathname.split('/').pop();

    console.log(token);

    const mudarSenha = () => {
        fetch(`http://localhost:8080/aprendex/usuario/mudarSenha/${token}`, {
            method: "post",
            body: senha,
            headers: {
                "Content-type": "application/json",
                Accept: "application/json"
            }
        })
            .then((retorno) => retorno.json())
            .then((retorno_convertido) => {
                alert(retorno_convertido.mensagem);
                window.location.href = "/home";
            }
            );
    };

    return (
        <div>
            <AppNavbar />
            <div className="bodyMudarSenha">
                <div className="containerMudarSenha">
                    <div className="formMudarSenha">
                        <form>
                            <div className="form-headerMudarSenha">
                                <div className="titleMudarSenha">
                                    <h1>Digite sua nova senha</h1>
                                </div>
                            </div>
                            <div className="input-box">
                                <label htmlFor="senha">Nova senha</label>
                                <input
                                    placeholder="Digite sua senha"
                                    required
                                    id="senha"
                                    type="password"
                                    name="senha"
                                    onChange={(e) => setSenha(e.target.value)}
                                />
                            </div>
                            <div className="continue-button">
                                <input
                                    className="inputCadastrar"
                                    type="button"
                                    value="Cadastrar"
                                    onClick={mudarSenha}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MudarSenha;