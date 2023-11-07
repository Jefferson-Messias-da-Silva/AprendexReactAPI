import React, { useState, useEffect } from "react";
import "./stylesAlteraCurso.css";

function AlteraCurso() {

    function logado() {
        if (localStorage.getItem('usuarioSessao') === null) {
            alert('Para acessar essa página você precisa realizar o login!')
            window.location.href = "/home"
        }
    }

    logado();


    const curso = {
        nome: "",
        descricao: "",
        link: "",
        endereco: "",
        categoria: "",
        duracao: "",
        email: "",
        valor: "",
        vagas: "",
        cep: "",
        numero: "",
        presencial: false,
        criador: {}
    };

    const [ObjCurso, setObjCurso] = useState(curso)

    const usuarioId = localStorage.getItem('usuarioSessao')

    const cursoId = window.location.pathname.split('/').pop();
    const aoDigitar = (e) => {
        setObjCurso({ ...ObjCurso, [e.target.name]: e.target.value });
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
                        console.log(retorno_convertido.criador)
                        if (retorno_convertido.criador.id !== usuarioId) {
                            alert("O seu usuário não tem permissão para acessar essa página")
                            window.location.href = "/home";
                        } else {
                            setObjCurso(retorno_convertido);
                        }
                    }
                });
        };
        encontrarCurso();
    }, [])


    const checkCEP = (e) => {
        const cep = e.target.value.replace(/\D/g, '')
        console.log(cep.length)
        if (cep.length === 8) {
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then(res => res.json())
                .then(data => {
                    if (!data.erro) {
                        ObjCurso.endereco = data.logradouro + ", " + ObjCurso.numero + " - " + data.bairro + " - " + data.localidade + " - " + data.uf
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

    const alterar = (event) => {
        event.preventDefault();
        fetch("http://localhost:8080/aprendex/curso/alter", {
            method: "post",
            body: JSON.stringify(ObjCurso),
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

    function home() {
        window.location.href = "/home"
    }

    return (
        <div className="bodyEditCurso">
            <div className="alteraCursocontainer">
                <div className="alteraCursoform">
                    <h2 className="alteraCursoform-header editcurso-header">Editar Curso</h2>
                    <form onSubmit={alterar}>
                        <div className="alteraCursoinput-group">
                            <div className="alteraCursoinput-box">
                                <label>Nome do Curso:</label>
                                <input
                                    type="text"
                                    value={ObjCurso.nome}
                                    onChange={aoDigitar}
                                    className="input-box"
                                    name="nome"
                                />
                            </div>
                            <div className="alteraCursoinput-box">
                                <label>Descrição do Curso:</label>
                                <textarea
                                    value={ObjCurso.descricao}
                                    onChange={aoDigitar}
                                    className="input-box"
                                    name="descricao"
                                />
                            </div>
                            <div className="alteraCursoinput-box">
                                <label>Link do Curso:</label>
                                <input
                                    type="text"
                                    value={ObjCurso.link}
                                    onChange={aoDigitar}
                                    className="input-box"
                                    name="link"
                                />
                            </div>
                            <div className="alteraCursoinput-box">
                                <label>Numero</label>
                                <input
                                    type="text"
                                    value={ObjCurso.numero}
                                    onChange={aoDigitar}
                                    className="input-box"
                                    name="numero"
                                />
                            </div>
                            <div className="alteraCursoinput-box">
                                <label>CEP</label>
                                <input
                                    type="text"
                                    value={ObjCurso.cep}
                                    onChange={aoDigitar}
                                    onBlur={checkCEP}
                                    className="input-box"
                                    name="cep"
                                />
                            </div>
                            <div className="alteraCursoinput-box">
                                <label>Categoria:</label>
                                <input
                                    type="text"
                                    value={ObjCurso.categoria}
                                    onChange={aoDigitar}
                                    className="input-box"
                                    name="categoria"
                                />
                            </div>
                            <div className="alteraCursoinput-box">
                                <label>Duração (carga horária):</label>
                                <input
                                    type="text"
                                    value={ObjCurso.duracao}
                                    onChange={aoDigitar}
                                    className="input-box"
                                    name="duracao"
                                />
                            </div>
                            <div className="alteraCursoinput-box">
                                <label>Email de Contato:</label>
                                <input
                                    type="email"
                                    value={ObjCurso.email}
                                    onChange={aoDigitar}
                                    className="input-box"
                                    name="email"
                                />
                            </div>
                            <div className="alteraCursoinput-box">
                                <label>Valor Total:</label>
                                <input
                                    type="text"
                                    value={ObjCurso.valor}
                                    onChange={aoDigitar}
                                    className="input-box"
                                    name="email"
                                />
                            </div>
                            <div className="alteraCursoinput-box">
                                <label>Quantidade de Vagas:</label>
                                <input
                                    type="number"
                                    value={ObjCurso.vagas}
                                    onChange={aoDigitar}
                                    className="input-box"
                                    name="vagas"
                                />
                            </div>
                        </div>
                        <div className="alteraCursocontinue-button alteraCursobutton-container">
                            <button
                                className="inputLogin"
                                type="submit"
                            >Alterar</button>
                            <input
                                type="button"
                                value="Cancelar"
                                className="alteraCursocontinue-input"
                                onClick={home}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AlteraCurso;