import React, { useState, Component } from "react";
import ReactDOM from 'react-dom';
import logo from "./img/LogoVetorizada.png";
import "./stylesNavBar.css";

import {
  Button,
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink
} from "reactstrap";
import { Link } from "react-router-dom";
const AppNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const logout = () => {
    localStorage.clear();
  };

  return (
    <Navbar color="dark" dark expand="md">
      <NavbarBrand tag={Link} to="/">
        <img src={logo} width="100px" height="50px" />
      </NavbarBrand>
      <Collapse isOpen={isOpen} navbar>
        <Nav
          className="justify-content-center"
          style={{ width: "100%" }}
          navbar
        >
          <NavItem>
            <NavLink href="/">Home</NavLink>
          </NavItem>
          {localStorage.getItem("usuario") ? (
            <NavItem></NavItem>
          ) : (
            <NavItem>
              <NavLink href="/login">Login</NavLink>
            </NavItem>
          )}
          <NavItem>
            <NavLink href="/cadastro">Cadastrar-se</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/sobre">Sobre</NavLink>
          </NavItem>
          <NavItem>
          <Button variant="danger" onClick={logout} href="/home">
            Sair
          </Button>
        </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default AppNavbar;
