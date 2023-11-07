import { useState, useEffect } from "react";
import "./stylesCadastroCurso.css";

function CadastroCurso() {

  function logado() {
    if (localStorage.getItem('usuarioSessao') === null) {
      alert('Para acessar essa página você precisa realizar o login!')
      window.location.href = "/home"
    }
  }

  logado();

  const usuarioId = localStorage.getItem('usuarioSessao');

  const curso = {
    nome: "",
    descricao: "",
    link: "",
    endereco: "",
    categoria: "",
    duracao: 0,
    email: "",
    valor: 0.0,
    vagas: 0,
    numero: "",
    cep: "",
    criador: {}
  };

  const [ObjFile, setObjFile] = useState('');
  const [ObjCurso, setObjCurso] = useState(curso);

  const [ObjUsuario, setObjUsuario] = useState();

  const aoDigitar = (e) => {
    setObjCurso({ ...ObjCurso, [e.target.name]: e.target.value });
  };

  function handleImage(e) {
    setObjFile(e.target.files[0])
  }

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
            if (retorno_convertido.perfil.tipo === 1 || retorno_convertido.perfil.tipo === 2) {
              setObjUsuario(retorno_convertido);
              ObjCurso.criador = retorno_convertido;
            } else {
              alert("O seu usuário não tem acesso a essa página");
              window.location.href = "/home";
            }
          }
        });
    };
    encontrarUsuario();
  }, [])

  const cadastrarCurso = (event) => {
    event.preventDefault();

    const data = new FormData();

    data.append('file', ObjFile)
    data.append('curso', JSON.stringify(ObjCurso))

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
          window.location.href = '/home'
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

  return (
    <div>
      <div className="bodyCadastroCurso">
        <div className="containerCadastroCurso">
          <div className="formCadastroCurso">
            <form className="formformCadastroCurso" onSubmit={cadastrarCurso}>
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
                    placeholder="Digite o CEP"
                    required
                    id="cep"
                    type="text"
                    name="cep"
                    onChange={aoDigitar}
                    onBlur={checkCEP}
                  />
                </div>
                <div className="input-box">
                  <label htmlFor="categoria">Categoria</label>
                  <input
                    placeholder="Digite a categoria"
                    required
                    id="categoria"
                    type="text"
                    name="categoria"
                    onChange={aoDigitar}
                  />
                </div>
              </div>
              <div className="input-group">
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
              </div>
              
              <div className="input-group">
              <div className="input-box">
                  <label htmlFor="descricao">Descrição do Curso</label>
                  <textarea
                    required
                    id="descricao"
                    name="descricao"
                    onChange={aoDigitar}
                    className="input-box"
                  />
                </div>
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
              <button
                className="inputLogin"
                type="submit"
              >Cadastrar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CadastroCurso;
