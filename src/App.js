import Home from "./Home";
import "bootstrap/dist/css/bootstrap.min.css";
import Cadastro from "./componentes/Cadastro/Cadastro";
import Login from "./componentes/Login/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CadastroCurso from "./componentes/CadastroCurso/CadastroCurso";
import "./styles.css";
import AlteraUsuario from "./componentes/AlteraUsuario/AlteraUsuario";
import Curso from "./componentes/Curso/Curso";
import EsqueceuASenha from "./componentes/EsqueceuASenha/EsqueceuASenha";
import MudarSenha from "./componentes/MudarSenha/MudarSenha";
import AppNavBar from "./componentes/AppNavBar"
import Perfil from "./componentes/Perfil/Perfil";
import AlteraCurso from "./componentes/AlteraCurso/AlteraCurso";
import TodosOsCursos from "./componentes/TodosOsCursos/TodosOsCursos";
import Certificados from "./componentes/Certificados/Certificados";
import Busca from "./componentes/Busca/Busca"
import CursoFavorita from "./componentes/CursosFavoritos/CursoFavorita";
import GerenciaMatricula from "./componentes/GerenciaMatriculas/GerenciaMatriculas";

function App() {
  return (
    <Router>
      <AppNavBar/>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/usuario/altera" element={<AlteraUsuario />} />
        <Route path="/curso/cadastro" element={<CadastroCurso />} />
        <Route path="/curso/exibeCurso/:id" element={<Curso/>}/>
        <Route path="/usuario/esqueciAsenha" element={<EsqueceuASenha/>}/>
        <Route path="/usuario/mudarSenha/:token" element={<MudarSenha/>}/>
        <Route path="/usuario/perfil" element={<Perfil/>}/>
        <Route path="/curso/altera/:id" element={<AlteraCurso/>} />
        <Route path="/curso/todos" element={<TodosOsCursos/>} />
        <Route path="/certificados" element={<Certificados/>}/>
        <Route path="/curso/busca/:nome" element={<Busca/>} />
        <Route path="/curso/favoritos" element={<CursoFavorita/>} />
        <Route path="/curso/matricula" element={<GerenciaMatricula/>}/>
      </Routes>
    </Router>
  );
}

export default App;
