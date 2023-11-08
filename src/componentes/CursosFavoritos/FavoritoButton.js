import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import styled from "styled-components";

// Estilo personalizado para os ícones de coração
const HeartIcon = styled.div`
  font-size: 2.5em; /* Tamanho do ícone */
  color: red; /* Cor do ícone */
  padding-right: 0.5em;
`;

const StyledButton = styled.button`
  position: absolute;
  bottom: 20px; /* Ajuste conforme necessário */
  left: 20px; /* Ajuste conforme necessário */
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  transition: 0.3s;
`;

const FavoritoButtonCF = () => {
  const [favoritado, setFavoritado] = useState(false);

  const handleFavoritoClick = () => {
    setFavoritado(!favoritado);
  };

  return (
    <StyledButton onClick={handleFavoritoClick}>
      <HeartIcon>{favoritado ? <FaHeart /> : <FaRegHeart />}</HeartIcon>
    </StyledButton>
  );
};

export default FavoritoButtonCF;