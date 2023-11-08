import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const ShareIconStyled = styled(FontAwesomeIcon)`
  color: black;
  font-size: 24px;
  cursor: pointer;
  transition: color 0.3s;
  font-size: 2em;
`;

function ShareButton(link) {

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Aprendex",
          text: "Confira este curso!",
          url: link.link
        });
      } catch (error) {
        console.error("Houve um erro ao tentar compartilhar", error);
      }
    } else {
      console.error("Compartilhamento não suportado");
    }
  };

  return <ShareIconStyled icon={faShareAlt} onClick={handleShare} />;
}

export default ShareButton;