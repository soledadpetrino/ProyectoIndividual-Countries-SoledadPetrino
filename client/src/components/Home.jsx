import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries, filterCountriesByContinent, orderByName, filterByPopulation } from '../actions';
import { Link } from 'react-router-dom';
import Card from './Card.jsx';
import Paginado from './Paginado';
import SearchBar from './SearchBar'; 




export default function Home() {
    
    const dispatch = useDispatch();
    const allCountries = useSelector((state) => state.countries);
    const[orden, setOrden] = useState ('');
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

    function handleSort (e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1); // cuando hago el ordenamiento lo hago desde la pagina 1, 
        setOrden(`Ordenado ${e.target.value}`) // setOrden es un estado local que en un inicio va a estar vacio, para cuando seteo en la pagina 1, me modifica el estado local y renderiza
    };

    function handleSortPop (e) {
        e.preventDefault();
        dispatch(filterByPopulation(e.target.value));
        setCurrentPage(1); // cuando hago el ordenamiento lo hago desde la pagina 1, 
        setOrden(`Ordenado ${e.target.value}`) // setOrden es un estado local que en un inicio va a estar vacio, para cuando seteo en la pagina 1, me modifica el estado local y renderiza
    };
    


    return (
        <div>
            <Link to = '/activity'>Crear actividad</Link> 
            <h1>Elije tu destino y actividad turistica</h1>
            <button onClick={e=> {handleClick(e)}}>
               Volver a cargar todos los paises 
            </button>
            <div>
                <select onChange={e => handleSort(e)}> 
                    <option hiddend>Orden alfabéticamente</option>
                    <option value = 'asc'>A-Z</option>  
                    <option value = 'desc'>Z-A</option> 
                </select>
                <select onChange={e => handleSortPop(e)}> 
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
            <SearchBar /> 

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
