import React from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCountryDetails } from '../actions/index';
import { useEffect } from "react";
import ActivityCard from './ActivityCard'

export default function Detail (props) {
    console.log(props) 
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(props)
        dispatch(getCountryDetails(props.match.params.id)); //con esto accedo al id 
    }, [dispatch]);

    const myCountry = useSelector ((state) => state.details)
    console.log(myCountry)

        return (
                <div>
                    {
                        <div>
                            <h1>Pais: {myCountry.name} ({myCountry.id})</h1>
                            <h2>Continente: {myCountry.region}</h2>
                            <h2>Población: {myCountry.population} habitantes</h2>
                            <h2>Capital: {myCountry.capital}</h2>
                            <h2>Área: {myCountry.area} km2</h2>
                            <h2>Subregión: {myCountry.subregion}</h2>
                            
                        </div>
                    } 
                    <Link to = '/home'> 
                        <button>Volver</button>
                    </Link>

{myCountry.activities?.map((e) => 
        <ActivityCard
        name={e.name}
        difficulty={e.difficulty}
        duration={e.duration}
        season={e.season}
        key={e.key}
       />)}
                </div>
    
)
    }
