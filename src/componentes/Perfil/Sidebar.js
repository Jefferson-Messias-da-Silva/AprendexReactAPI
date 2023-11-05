import React from 'react';
import img from '../img/imgPerfil.png'
import './Sidebar.css';

function Sidebar(usuario) {


  
  return (
    <div className="sidebar">
      <div className="profile">
      <img src={img} alt="Foto de Perfil" />
        <p className ="usuario">Nome: {usuario.usuario.nome} {usuario.usuario.sobrenome}</p>
      </div>
      <div className="info">
        <p className="info-item">Usuario: {usuario.usuario.login}</p>
        <p className="info-item">Email: {usuario.usuario.email}</p>
        <p className="info-item">Endereço: {usuario.usuario.endereco}</p>
        <p className="info-item">CEP: {usuario.usuario.cep}</p>
        <p className="info-item">Telefone{usuario.usuario.telefone}</p>
        <p className="info-item">CPF: {usuario.usuario.cpf}</p>
        <p className="info-item">CNPJ: {usuario.usuario.cnpj}</p>
      </div>
      <ul>
      <a href='/usuario/altera' style={{textDecoration: 'none'}}><li className="alterar-dados">Alterar Dados</li></a>
      </ul>
    </div>
  );
}

export default Sidebar;




