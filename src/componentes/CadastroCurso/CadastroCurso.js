import { useState } from "react";
import AppNavbar from "../AppNavBar";
import "./stylesCadastroCurso.css";

function CadastroCurso() {

  const curso = {
    nome: "",
    descricao: "",
    link: "",
    endereco: "",
    categoria: "",
    duracao: 0,
    email: "",
    valor: 0.0,
    vagas: 0
  };

  const [ObjFile, setObjFile] = useState('');
  const [ObjCurso, setObjCurso] = useState(curso);

  const aoDigitar = (e) => {
    setObjCurso({ ...ObjCurso, [e.target.name]: e.target.value });
  };

  function handleImage(e){
    setObjFile(e.target.files[0])
  }

  const cadastrarCurso = () => {

    const data =  new FormData();

    data.append('file',ObjFile)
    data.append('curso',JSON.stringify(ObjCurso))

    console.log(data)

    fetch("http://localhost:8080/aprendex/curso/save", {
      method: "post",
      body: data,
    })
      .then((retorno) => retorno.json())
      .then((retorno_convertido) => {
        if (retorno_convertido.mensagem !== undefined) {
          alert(retorno_convertido.mensagem);
        } else {
          alert("Curso cadastrado com sucesso");
        }
      });
  };

  return (
    <div>
      <AppNavbar />
      <div className="bodyCadastroCurso">
        <div className="containerCadastroCurso">
          <div className="formCadastroCurso">
            <form>
              <div className="form-headerCadastroCurso">
                <div className="title">
                  <h1>Cadastro de Curso</h1>
                </div>
              </div>
              <div className="input-group">
                <div className="input-box">
                  <label htmlFor="nome">Nome do curso</label>
                  <input
                    placeholder="Digite o nome do curso"
                    required
                    id="nome"
                    type="text"
                    name="nome"
                    onChange={aoDigitar}
                  />
                </div>

                <div className="input-box">
                  <label htmlFor="descricao">Descrição do Curso</label>
                  <input
                    placeholder="Digite a descrição do curso"
                    required
                    id="descricao"
                    type="text"
                    name="descricao"
                    onChange={aoDigitar}
                  />
                </div>
                <div className="input-box">
                  <label htmlFor="link">Link</label>
                  <input
                    placeholder="Digite o link do curso"
                    required
                    id="link"
                    type="text"
                    name="link"
                    onChange={aoDigitar}
                  />
                </div>
              </div>
              <div className="input-group">
                <div className="input-box">
                  <label htmlFor="endereco">Endereço</label>
                  <input
                    placeholder="Digite o endereço"
                    required
                    id="endereco"
                    type="string"
                    name="endereco"
                    onChange={aoDigitar}
                  />
                </div>
                <div className="input-box">
                  <label htmlFor="categoria">Categoria</label>
                  <input
                    placeholder="Digite a categoria"
                    required
                    id="categoria"
                    type="string"
                    name="categoria"
                    onChange={aoDigitar}
                  />
                </div>
                <div className="input-box">
                  <label htmlFor="duracao">Duração</label>
                  <input
                    placeholder="Digite a duração curso"
                    required
                    id="duracao"
                    type="number"
                    name="duracao"
                    onChange={aoDigitar}
                  />
                </div>
              </div>
              <div className="input-group">
                <div className="input-box">
                  <label htmlFor="email">Email</label>
                  <input
                    placeholder="Digite o email"
                    required
                    id="email"
                    type="email"
                    name="email"
                    onChange={aoDigitar}
                  />
                </div>
                <div className="input-box">
                  <label htmlFor="valor">Valor</label>
                  <input
                    placeholder="Digite o valor do curso"
                    required
                    id="valor"
                    type="text"
                    name="valor"
                    onChange={aoDigitar}
                  />
                </div>
                <div className="input-box">
                  <label htmlFor="vagas">Vagas</label>
                  <input
                    placeholder="Quantidade de vagas"
                    required
                    id="vagas"
                    type="number"
                    name="vagas"
                    onChange={aoDigitar}
                  />
                </div>
              </div>
              <div className="input-group">
                <div className="input-box">
                  <label htmlFor="imagem">Imagem</label>
                  <input
                    placeholder="imagem"
                    required
                    accept="image/*"
                    id="file"
                    type="file"
                    name="file"
                    onChange={handleImage}
                  />
                </div>
              </div>
              <div className="continue-button">
                <input
                  className="inputCadastrar"
                  type="button"
                  value="Cadastrar"
                  onClick={cadastrarCurso}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CadastroCurso;
