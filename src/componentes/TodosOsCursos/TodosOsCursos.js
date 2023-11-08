import React, { useState, useEffect } from "react";
import FavoritoButton from "./FavoritoButton";

const data = [
  { id: 1, title: "Curso 1", subtitle: "Descrição do Curso 1" },
  { id: 2, title: "Curso 2", subtitle: "Descrição do Curso 2" }
  // ... Outros cursos
];



const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    margin: "10px"
  },
  categoria: {
    marginBottom: "10px"
  },
  categoriaHeader: {
    display: "flex",
    alignItems: "center",
    marginBottom: "5px"
  },
  buttonCategoria: {
    marginRight: "10px",
    cursor: "pointer",
    position: "relative",
    width: "0",
    height: "0",
    fontSize: "20px",
  },
  categoriaButtonTriangle: {
    content: "",
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "0",
    height: "0",
    transform: "translate(-50%, -50%)",
    borderTop: "8px solid transparent",
    borderBottom: "8px solid transparent",
    borderLeft: "12px solid #66cdf4",
  },
  cardsContainer: {
    display: "flex",
    flexWrap: "wrap"
  },
  card: {
    display: "flex",
    alignItems: "center",
    background: "#F4F4F4",
    flexDirection: "column",
    marginRight: "10px",
    marginBottom: "10px",
    border: "1px solid #F4F4F4", // Define a borda com a mesma cor de fundo
    borderRadius: "5px",
    padding: "20px"
  },
  titleContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center", 
  },
  title: {
    color: "#E67347",
    fontSize: "1em",
    fontWeight: "bold",
  },
  spacer: {
    marginRight: '10px',
  },
  subtitle: {
    color: "#666",
    fontSize: "0.8em"
  },
  button: {
    padding: "8px 16px",
    fontSize: "0.8em",
    fontWeight: "bold",
    color: "white",
    background: "#2E4053",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginLeft: "10px", // Adicionado margem à esquerda do botão
  },
  categoriaButtonDown: {
    transform: "rotate(90deg)"
  },
};

const TodosOsCursos = () => {

    const categorias = [
        { id: 0, nome: "" },
        // ... Outras categorias
      ];
    
    const [categoriaAtualizadas, setCategoria] = useState(categorias)

    const [ObjCursos, setObjCursos] = useState([]);

    useEffect(() => {
        const encontrarCategoria = async () => {
          fetch("http://localhost:8080/aprendex/curso/findcat", {
            method: "GET",
          })
            .then((retorno) => retorno.json())
            .then((retorno_convertido) => {
              if (retorno_convertido.mensagem !== undefined) {
                alert(retorno_convertido.mensagem);
                window.location.href = "/home";
              } else {
                const categoriaAtualizadas = retorno_convertido.map((categoria,index) => {
                   return{
                    id:index + 1,
                    nome: categoria
                   }; 
                });
                setCategoria(categoriaAtualizadas);
              }
            });
        };
        encontrarCategoria();
      }, [])

      useEffect(() => {
        const encontrarCursos = async () => {
          fetch("http://localhost:8080/aprendex/curso/top", {
            method: "GET",
          })
            .then((retorno) => retorno.json())
            .then((retorno_convertido) => {
              if (retorno_convertido.mensagem !== undefined) {
                alert(retorno_convertido.mensagem);
                window.location.href = "/home";
              } else {
                setObjCursos(retorno_convertido);
              }
            });
        };
        encontrarCursos();
      }, [])

  const [categoriasVisiveis, setCategoriasVisiveis] = useState(
    categoriaAtualizadas.reduce((acc, categoria) => {
      acc[categoria.id] = true;
      return acc;
    }, {})
  );

  const toggleCategoria = (categoriaId) => {
    setCategoriasVisiveis((prev) => ({
      ...prev,
      [categoriaId]: !prev[categoriaId]
    }));
  };

  return (
    <div style={styles.container}>
      {categoriaAtualizadas.map((categoria) => (
        <div key={categoria.id} style={styles.categoria}>
          <div style={styles.categoriaHeader}>
            <div
              style={{
                ...styles.buttonCategoria,
                ...(categoriasVisiveis[categoria.id] && styles.categoriaButtonDown)
              }}
              onClick={() => toggleCategoria(categoria.id)}
            >
              <span style={styles.categoriaButtonTriangle}></span>
            </div>
            <h1>{categoria.nome}</h1>
          </div>
          {categoriasVisiveis[categoria.id] && (
            <div style={styles.cardsContainer}>
              {ObjCursos.map((item) => (
                <div key={item.id} style={styles.card}>
                  <div style={styles.titleContainer}>
                    <h1 style={styles.title}>{item.title}</h1>
                    <span style={styles.spacer}></span>
                    <FavoritoButton />
                  </div>
                  <h2 style={styles.subtitle}>{item.subtitle}</h2>
                  <button style={styles.button}>Inscreva-se</button>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TodosOsCursos;