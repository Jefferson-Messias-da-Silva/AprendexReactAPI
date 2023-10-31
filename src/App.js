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
import FileViewer from "./componentes/FileViewer/FileViewer";

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/usuario/altera/:id" element={<AlteraUsuario />} />
        <Route path="/curso/cadastro" element={<CadastroCurso />} />
        <Route path="/curso/:id" element={<Curso/>}/>
        <Route path="/usuario/esqueciAsenha" element={<EsqueceuASenha/>}/>
        <Route path="/usuario/mudarSenha/:token" element={<MudarSenha/>}/>
        <Route path="/teste" element={<FileViewer/>}/>
      </Routes>
    </Router>
  );
}

export default App;
