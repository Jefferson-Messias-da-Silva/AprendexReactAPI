import React, { useState, useEffect } from "react";
import "./certificadoStyles.css";

function Certificados() {

  const usuarioId = localStorage.getItem("usuarioSessao");

  const [fetchConcluido, setFetchConcluido] = useState(false);

  const [matriculas, setMatriculas] = useState("");

  useEffect(() => {
    const encontrarMatricula = async () => {
      fetch("http://localhost:8080/aprendex/matricula/findfim", {
        method: "post",
        body: usuarioId,
        headers: {
          "Content-type": "application/json",
          Accept: "application/json"
        }
      })
        .then((retorno) => retorno.json())
        .then((retorno_convertido) => {
          if (retorno_convertido.mensagem !== undefined) {
            alert(retorno_convertido.mensagem);
          } else {
            setMatriculas(retorno_convertido);
            setFetchConcluido(true)
          }
        });
    };
    encontrarMatricula();
  }, []);


  const handleDownloadPDF = async (matricula) => {
    try {
      // Faça uma requisição para o endpoint que gera o PDF
      const response = await fetch('http://localhost:8080/aprendex/pdf/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(matricula),
      });

      if (response.ok) {
        // Se a resposta da requisição for bem-sucedida, obtenha o blob do PDF
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        // Crie um link de download para o PDF
        const a = document.createElement('a');
        a.href = url;
        a.download = 'seu_pdf.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        console.error('Erro ao gerar o PDF');
      }
    } catch (error) {
      console.error('Erro ao baixar o PDF:', error);
    }
  };

  return (
    <div>
      <section>
        <div className="form-header">
          <div className="container">
            <h1 class="CTh1">Certificados</h1>
          </div>
            {fetchConcluido ? (
          <div className="cards">
            {matriculas.map((matricula, i) => (
              <div key={i} className="card">
                <h3 class="CTh3">{matricula.curso.nome}</h3>
                <button className="btn" onClick={() => handleDownloadPDF(matricula)}>
                  Download
                </button>
              </div>
            ))}
          </div>) : ('')}
        </div>
      </section>
    </div>
  );
}

export default Certificados;
