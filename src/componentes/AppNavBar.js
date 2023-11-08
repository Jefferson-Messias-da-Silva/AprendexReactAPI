import React, { useState, useEffect } from "react";
import { Button } from "./Home/Button";
import { NavLink } from "reactstrap";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";

function Navbar() {
  var [busca, setBusca] = useState();

  const aoDigitar = (e) => {
    setBusca(e.target.value);
  };
  const navigate = useNavigate();
  const buscar = () => {
    navigate(`/curso/busca/${busca}`);
  };
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <NavLink to="/" className="navbar-logo" onClick={closeMobileMenu}>
            Aprendex
          </NavLink>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink href="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                href="/Cursos"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Cursos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                href="/Cursos"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Meus Cursos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                href="/favoritos"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Favoritos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                href="/favoritos"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Sobre-nós
              </NavLink>
            </li>
            <li>
              <NavLink
                href="/"
                className="nav-links-mobile"
                onClick={closeMobileMenu}
              >
                Cadastre-se
              </NavLink>
            </li>
          </ul>
          {button && <Button buttonStyle="btn--primary2">Cadastrar</Button>}
          <input value={busca} onChange={aoDigitar}></input>
          <input type="button" onClick={buscar} value="Buscar"></input>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

