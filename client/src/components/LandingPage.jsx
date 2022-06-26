import React from "react";
import { Link } from 'react-router-dom';
import style from '../Styles/HomeLanding.module.css';

export default function LandingPage() {
    return(
        <div className = { style.landing }>
          <h1 className = { style.welcome }>🌎Actividades turisticas por el mundo🌎</h1>
            <Link className = { style.link }to ='/home'>
                <button className = { style.lightbutton }>Ingresar</button> 
            </Link>  
        </div>
    )
}