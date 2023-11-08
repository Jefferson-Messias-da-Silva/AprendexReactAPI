import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import styled from "styled-components";

// Estilo personalizado para os ícones de coração
const HeartIcon = styled.div`
  font-size: 2.5em; // tamanho do ícone
  color: red; // cor do ícone
  padding-right: 0.5em;
`;

const FavoritoButton = () => {

  const cursoId = window.location.pathname.split('/').pop();

  const usuarioId = localStorage.getItem('usuarioSessao')

  const [favoritado, setFavoritado] = useState(false);

  const requestData = {
    usuarioId: usuarioId,
    cursoId: cursoId
  };

  useEffect(() => {
    const favoritado = async () => {
      fetch("http://localhost:8080/aprendex/usuario/cursoFavoritado", {
        method: "post",
        body: JSON.stringify(requestData),
        headers: {
          "Content-type": "application/json",
          Accept: "application/json"
        }
      })
        .then((retorno) => retorno.json())
        .then((retorno_convertido) => {
          console.log(retorno_convertido);
            setFavoritado(retorno_convertido);
        });
    };
    favoritado();
  }, [])

  const favoritar = () => {
    if (usuarioId !== null) {
      fetch("http://localhost:8080/aprendex/usuario/favorita", {
        method: "post",
        body: JSON.stringify(requestData),
        headers: {
          "Content-type": "application/json",
          Accept: "application/json"
        }
      })
        .then((retorno) => retorno.json())
        .then((retorno_convertido) => {
          if(favoritado === false){
            alert("Favoritado com sucesso")
            setFavoritado(true)
          }else if(favoritado === true){
            alert("O curso foi removido da sua lista de favoritos")
            setFavoritado(false)
          }
        });
    } else {
      alert('É necessário estar logado para realizar essa ação!')
    }
  };

  return (
    <button
      onClick={favoritar}
      style={{ background: "none", border: "none" }}
    >
      <HeartIcon>{favoritado ? <FaHeart /> : <FaRegHeart />}</HeartIcon>
    </button>
  );
};

export default FavoritoButton;