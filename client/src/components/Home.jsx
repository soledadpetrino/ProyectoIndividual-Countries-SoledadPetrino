import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries } from '../actions';
import { Link } from 'react-router-dom';
import Card from './Card.jsx'




export default function Home() {
    
    const dispatch = useDispatch();
    const allCountries = useSelector((state) => state.countries)

    useEffect (()=>{
        dispatch(getCountries());
    },[dispatch])

    function handleClick (e) {
        e.preventDefault();
        dispatch(getCountries());
    }

    return(
        <div>
            <Link to = '/activity'>Crear actividad</Link> 
            <h1>Elije tu destino y actividad turistica</h1>
            <button onClick={e=> {handleClick(e)}}>
               Volver a cargar todos los paises 
            </button>
            <div>
                <select> 
                    <option value = 'asc'>Ascendente</option>  
                    <option value = 'desc'>Descendente</option> 
                </select>
                <select> 
                    <option value = 'ascpop'>Población Ascendente</option>  
                    <option value = 'descpop'>Población Descendente</option> 
                </select>
                <select> 
                    <option value = 'All'>Todos</option>  
                    <option value = 'Africa'>África</option>
                    <option value = 'Americas'>América</option> 
                    <option value = 'Asia'>Asia</option> 
                    <option value = 'Europe'>Europa</option>
                    <option value = 'Oceania'>Oceania</option>  
                </select>
        {allCountries?.map((c) => {
            return(
                <fragment>
                    <Link to = { '/home/' + c.id }>
                        <Card name = { c.name } flag = { c.flag } region = { c.region } key = { c.id }/>
                    </Link>
                </fragment>

            )
        })}
            </div>
        </div>
    )
}




/* 
    [ ] Botones/Opciones para filtrar por continente y por tipo de actividad turística 
        (falta por tipo de actividad turistica)
    [ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente los países 
        por orden alfabético y por cantidad de población
    [ ] Paginado para ir buscando y mostrando los siguientes paises, 10 paises por pagina, mostrando 
        los primeros 9 en la primer pagina.
*/