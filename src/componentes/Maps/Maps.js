import React from 'react';
import { useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, DirectionsRenderer, DirectionsService } from '@react-google-maps/api';
import "./stylesMaps.css";
import {
    setDefaults,
    fromAddress,
} from "react-geocode";

var count = 0;

function Maps(enderecoCurso, enderecoUsario) {

    const [response, setResponse] = useState(null);

    const [latCurso, setLatCurso] = useState(null);
    const [lngCurso, setLngCurso] = useState(null);

    const [latUsurario, setlatUsuario] = useState(null);
    const [lngUsuario, setlngUsuario] = useState(null);

    setDefaults({
        key: "AIzaSyAbmfCU8Jp2TzLCzRxyLT66-oH7eWnFdyI", // Your API key here.
        language: "pt-br", // Default language for responses.
        region: "br", // Default region for responses.
    });

    fromAddress("Fatec Diadema")
        .then(({ results }) => {
            const { lat, lng } = results[0].geometry.location;
            setLatCurso(lat);
            setLngCurso(lng);
        });

    fromAddress("198 rua glauber rocha - serraria - Diadema, SP.")
        .then(({ results }) => {
            const { lat, lng } = results[0].geometry.location;
            setlatUsuario(lat);
            setlngUsuario(lng);
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
        if (response !== null && response.status === 'OK' && count === 0) {
            count = count + 1;
            setResponse(response);
            console.log(response);
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
        <GoogleMap zoom={15} center={positionCurso} mapContainerClassName="map-container">
            <Marker position={positionCurso} />
            <Marker position={positionUsuario} />
            <DirectionsService
                options={{
                    origin: positionUsuario,
                    destination: positionCurso,
                    travelMode: 'DRIVING'
                }}
                callback={directionsCallback}
            ></DirectionsService>
            <DirectionsRenderer directions={response} />
        </GoogleMap>


    );
}

export default Maps;