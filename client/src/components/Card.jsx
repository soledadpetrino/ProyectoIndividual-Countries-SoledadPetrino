import React from 'react';


export default function Card({ name, flag, region }) {
    return (
        <div>
            <h3>{ name }</h3>
            <h5>{ region }</h5>
            <img src = { flag }  alt = 'Imagen no encontrada' width = '150px' height = '100px'/>
        </div>
    );
}



