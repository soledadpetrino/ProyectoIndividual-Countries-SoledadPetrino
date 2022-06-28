import React, {useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { postActivity, getActivities, getCountries } from '../actions/index';
import { useDispatch, useSelector } from 'react-redux';
import style from '../Styles/ActivityCreate.module.css'

function validate(input) {
    let errors = {};
    if(!input.name || input.name.length < 3 || !input.name.match( (/^[A-Za-z]+$/))) {
        errors.name =  'Se requiere que ingrese un nombre para la actividad';
    } else if (!input.difficulty) {
        errors.difficulty = 'Se requiere que ingrese una dificultad para la actividad';
    } else if (!input.duration) {
        errors.duration = 'Se requiere que ingrese una duración para la actividad'
    } else if (!input.season) {
        errors.season = 'Se requiere que ingrese una estación para la actividad';
    } else if (!input.country) {
        errors.country = 'Se requiere que ingrese un pais para la actividad'
    }
    return errors;
}

export default function ActivityCreate() {
    const dispatch = useDispatch();
    const history = useHistory();
    const countries = useSelector((state) => state.countries);
    const[errors, setErrors] = useState({})
    const[input, setInput] = useState({
        name: '',
        difficulty: '',
        duration: '',
        season: '',
        country: []
    })

    function handleDelete(el) {
        setInput({
            ...input,
            country: input.country.filter( country => country !==el) // me devuelve el estado nuevo, que es un array, sin el elemento que clickee
        })
    }

    useEffect(() => {
        dispatch(getCountries());
    }, []);
    
    function handleChange(e) {                      //cada vez que se ejecuta handlechange, al estado input, 
        setInput({                                  //ademas de lo que tiene, se le agrega el target.value
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
        console.log(input);
    }

    function handleSelect(e) {                      // cuando mando el country, traigo lo que ya habia en el estado y le concateno el target value
        setInput({
            ...input,
            country: [...input.country, e.target.value]
        })
    }

    function handleSubmit(e) {                
        e.preventDefault();
        console.log(input);
        dispatch(postActivity(input));
        alert('Actividad creada con éxito');
        setInput({
        name: '',
        difficulty: '',
        duration: '',
        season: '',
        country: []
        })
        history.push('/home');
    }
    //useHistory método del router, lo que hace es redirigirme a la ruta que yo le diga 

    
    
    return (
        <div className={style.container}>
            <Link to = '/home'><button className={style.backButton}>Volver</button></Link>
            <h1 className={style.title}>Crea tu actividad</h1>
            <div>
                <form className={style.form} onSubmit={(e) => handleSubmit(e)}>
                    <div className={style.select}>
                        <label >Nombre de la actividad:</label>
                        <input
                        type= 'text'
                        value= {input.name}
                        name = 'name'
                        autocomplete='off'
                        onChange={(e) => handleChange(e)}
                        placeholder='Ingresar nombre de actividad'
                        />
                        {errors.name && (
                           <p className='error'>{errors.name}</p> 
                        )}
                    </div>
                    <div className={style.select}>
                    <label>Dificultad:</label>
                        <select 
                            name='difficulty' 
                            value={input.difficulty} 
                            className={style.selectBox} 
                            onChange={(e) => handleChange(e)}>
                                <option value=''>Selecciona la dificultad</option>
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                                <option value='5'>5</option>
                                {errors.difficulty && (
                           <p className='error'>{errors.difficulty}</p> 
                        )}
                        </select>
                    </div>
                    <div className={style.select}>
                        <label>Duración:</label>
                        <input
                            type= 'time'
                            value= {input.duration}
                            name = 'duration'
                            autocomplete='off'
                            min='0'
                            onChange={(e) => handleChange(e)}
                            placeholder='Ingresar tiempo de duración'
                        />
                        {errors.duration && (
                           <p className='error'>{errors.duration}</p> 
                        )}
                    </div>
                    <div className={style.select}>
                    <label>Estación:</label>
                        <select 
                            name='season' 
                            value={input.season} 
                            onChange={(e) => handleChange(e)}>
                                <option value=''>Selecciona la estación</option>
                                <option value='Summer'>Summer</option>
                                <option value='Autumn'>Autumn</option>
                                <option value='Winter'>Winter</option>
                                <option value='Spring'>Spring</option>
                                {errors.season && (
                           <p className='error'>{errors.season}</p> 
                        )}
                        </select>
                    </div>
                    <div className={style.select}>
                        <label>Pais:</label>
                            <select onChange={(e) => handleSelect(e)}>
                                {countries.map((country) => (
                                    <option value={country.name}>{country.name}</option>
                                ))}
                            </select>
                    </div>
                    <br/>
                        <button className={style.submitButton} type='submit'>Crear actividad</button>   
                </form>
                {input.country.map(el => 
                   <div className={style.countryContainer}>
                        <div className={style.country}>{el}</div>
                        <button className={style.deleteButton} onClick = { () => handleDelete(el)}>X</button>    
                   </div> )}
            </div>
        </div>
    )
                                }
                            

  
