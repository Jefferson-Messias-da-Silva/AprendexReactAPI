import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import styled from "styled-components";

// Estilo personalizado para os ícones de coração
const HeartIcon = styled.div`
  font-size: 1.5em; // tamanho do ícone
  color: red; // cor do ícone
  padding-right: 1.0em;
`;

const FavoritoButton = () => {
  const [favoritado, setFavoritado] = useState(false);

  const handleFavoritoClick = () => {
    setFavoritado(!favoritado);
  };

  return (
    <button
      onClick={handleFavoritoClick}
      style={{ background: "none", border: "none" }}
    >
      <HeartIcon>{favoritado ? <FaHeart /> : <FaRegHeart />}</HeartIcon>
    </button>
  );
};

export default FavoritoButton;