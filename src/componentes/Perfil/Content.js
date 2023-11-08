import React from 'react';
import './Content.css';

function Content(cursos) {

  return (
    <div className="content-container">
      {cursos.cursos.slice(0,3).map((curso,i) => (      
      <div key={i} className="content-item">
        <h2>{curso.nome}</h2>
        <p>{curso.descricao}</p>
        <button className="ver-mais">Ver Mais</button>
      </div>) )
      }
    </div>
      
  );
}

export default Content;
