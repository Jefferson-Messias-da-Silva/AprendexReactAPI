import React from 'react';
import { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, DirectionsRenderer, DirectionsService } from '@react-google-maps/api';
import "./stylesMaps.css";
import {
    setDefaults,
    fromAddress,
} from "react-geocode";

function Maps(Curso) {


    const usuarioId = localStorage.getItem('usuarioSessao')

    const [ObjCurso, setObjCurso] = useState(Curso.Curso);

    const [ObjUsuario, setObjUsuario] = useState("");

    const [fetchConcluido, setFetchConcluido] = useState(false);

    const [requestSent, setRequestSent] = useState(false);

    const [travelMode, setTravelMode] = useState("DRIVING")

    const [response, setResponse] = useState(null);

    const [latCurso, setLatCurso] = useState(null);
    const [lngCurso, setLngCurso] = useState(null);

    const [latUsurario, setlatUsuario] = useState(null);
    const [lngUsuario, setlngUsuario] = useState(null);

    const handleModeChange = (e) => {
        setTravelMode(e.target.value);
        setRequestSent(false)
      };

    useEffect(() => {
        const encontrarUsuario = async () => {
            fetch("http://localhost:8080/aprendex/usuario/findbyid", {
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
                        window.location.href = "/home";
                    } else {
                        setObjUsuario(retorno_convertido);

                        fromAddress(retorno_convertido.endereco)
                            .then(({ results }) => {
                                const { lat, lng } = results[0].geometry.location;
                                setlatUsuario(lat);
                                setlngUsuario(lng);
                            });
                    }
                });
        };
        encontrarUsuario();
    }, [])

    setDefaults({
        key: "AIzaSyAbmfCU8Jp2TzLCzRxyLT66-oH7eWnFdyI", // Your API key here.
        language: "pt-br", // Default language for responses.
        region: "br", // Default region for responses.
    });

    fromAddress(ObjCurso.endereco)
        .then(({ results }) => {
            const { lat, lng } = results[0].geometry.location;
            setLatCurso(lat);
            setLngCurso(lng);
        });



    const positionCurso = {
        lat: latCurso,
        lng: lngCurso
    };

    const positionUsuario = {
        lat: latUsurario,
        lng: lngUsuario
    };

    const directionsCallback = (response) => {
        if (response !== null && response.status === 'OK' && requestSent === false) {
            setResponse(response);
            setRequestSent(true)
        }
    };

    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: 'AIzaSyAbmfCU8Jp2TzLCzRxyLT66-oH7eWnFdyI',
    });

    if (!isLoaded) {
        return (<div>Carregando...</div>);
    }
    return (
        <div className='maps'>


            <GoogleMap zoom={60} center={positionCurso} mapContainerClassName="map-container">
            <div id="floating-panel">
                <b>Modelo De Viagem:</b>
                <select id="mode" onChange={handleModeChange} value={travelMode}>
                    <option  value="DRIVING">Carro</option>
                    <option  value="WALKING">Caminhando</option>
                    <option  value="BICYCLING">Bicicleta</option>
                    <option  value="TRANSIT">Transporte Público</option>
                </select>
            </div>
                <Marker position={positionCurso} />
                <Marker position={positionUsuario} />
                <DirectionsService
                    options={{
                        origin: positionUsuario,
                        destination: positionCurso,
                        travelMode: travelMode
                    }}
                    callback={directionsCallback}
                ></DirectionsService>
                <DirectionsRenderer directions={response} />
            </GoogleMap>
        </div>

    );
}

export default Maps;