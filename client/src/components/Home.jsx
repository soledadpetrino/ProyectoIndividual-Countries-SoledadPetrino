import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries, filterCountriesByContinent } from '../actions';
import { Link } from 'react-router-dom';
import Card from './Card.jsx';
import Paginado from './Paginado';




export default function Home() {
    
    const dispatch = useDispatch();
    const allCountries = useSelector((state) => state.countries);
    const[currentPage, setCurrentPage] = useState(1);
    const [countriesPerPage, setCountriesPerPage] = useState (10);
    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
    const currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountry);

    const paginated = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const pageValidation = (currentPage) => {
        if(currentPage ===1) {
            return setCountriesPerPage(9);
        } else {
            return setCountriesPerPage(10);
        }
    }

    useEffect( () => {
        pageValidation(currentPage);
    }, [currentPage])


    useEffect (()=>{
        dispatch(getCountries());
    },[dispatch])

    function handleClick (e) {
        e.preventDefault();
        dispatch(getCountries());
    }

    function handleFilterContinent(e) {
        dispatch(filterCountriesByContinent(e.target.value));                                                       //va a tomar como payload el valor de cada uno de los value de las option del select
    }

    

    return (
        <div>
            <Link to = '/activity'>Crear actividad</Link> 
            <h1>Elije tu destino y actividad turistica</h1>
            <button onClick={e=> {handleClick(e)}}>
               Volver a cargar todos los paises 
            </button>
            <div>
                <select> 
                    <option value = 'Asc'>Ascendente</option>  
                    <option value = 'Desc'>Descendente</option> 
                </select>
                <select> 
                    <option value = 'ascpop'>Población Ascendente</option>  
                    <option value = 'descpop'>Población Descendente</option> 
                </select>
                <select onChange={e => handleFilterContinent(e)}> 
                    <option value = 'All'>Todos</option>  
                    <option value = 'Africa'>África</option>
                    <option value = 'Americas'>América</option> 
                    <option value = 'Asia'>Asia</option> 
                    <option value = 'Europe'>Europa</option>
                    <option value = 'Oceania'>Oceania</option>  
                </select>
                <select> 
                <option value = ''>Filtrar por actividad</option> 
                </select> 
            <Paginado
            countriesPerPage = { countriesPerPage }
            allCountries = { allCountries.length }
            paginated = { paginated }
            /> 

        { currentCountries?.map((c) => {
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
   );
};





/* 
    [ ] Botones/Opciones para filtrar por continente y por tipo de actividad turística 
        (falta por tipo de actividad turistica)
    [ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente los países 
        por orden alfabético y por cantidad de población
    [ ] Paginado para ir buscando y mostrando los siguientes paises, 10 paises por pagina, mostrando 
        los primeros 9 en la primer pagina.

    Para el paginado, vamos a crear varios estados locales */
