import React, { useState } from "react";
import "./stylesEsqueceuASenha.css";
import AppNavbar from "../AppNavBar";

function EsqueceuASenha() {
    const [email, setEmail] = useState();

    const enviarEmail = () => {
        fetch("http://localhost:8080/aprendex/usuario/resetSenha", {
            method: "post",
            body: email,
            headers: {
                "Content-type": "application/json",
                Accept: "application/json"
            }
        })
            .then((retorno) => retorno.json())
            .then((retorno_convertido) => {
                window.location.href = "/home";
                alert(retorno_convertido.mensagem);
            }
            );
    };


    return (
        <div>
            <AppNavbar />
            <div className="bodyEsqueceuASenha">
                <div className="containerEsqueceuAsenha">
                    <div className="formEsqueceuASenha">
                        <form>
                            <div className="form-headerEsqueceuASenha">
                                <div className="title">
                                    <h1>Esqueceu a senha</h1>
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
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="continue-button">
                                <input className="inputCadastrar"
                                    value="Continuar"
                                    type="button"
                                    onClick={enviarEmail} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EsqueceuASenha;