import React, { useEffect, useState } from "react";


function FileViewer(cursoId){
    const [imageSrc,setImageSrc] = useState('');

    useEffect(() => {
        const acharImagem = async () => {
            const response = await fetch("http://localhost:8080/aprendex/arquivo/pegar", {
            method: "post",
            body: cursoId.cursoId,
            headers: {
              "Content-type": "application/json",
              Accept: "application/json"
            }
          });
          if(response.ok){
            const data = await response.blob();
            const imageURL = URL.createObjectURL(data);
            setImageSrc(imageURL);
          }
        };
        acharImagem();
      },[])
    
      return (
        <div>
          <img src={imageSrc} alt="Imagem do Google Drive" width="150"
                height="150"/>
        </div>
      );
    
}

export default FileViewer;