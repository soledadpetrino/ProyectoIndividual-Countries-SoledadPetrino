import React, {useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { postActivity, getActivities, getCountries } from '../actions/index';
import { useDispatch, useSelector } from 'react-redux';
import style from '../Styles/ActivityCreate.module.css'

export default function ActivityCreate() {
    const dispatch = useDispatch();
    const history = useHistory();
    const countries = useSelector((state) => state.countries);
    const[input, setInput] = useState({
        name: '',
        difficulty: '',
        duration: '',
        season: '',
        country: []
    })
    
    function handleChange(e) {                      //cada vez que se ejecuta handlechange, al estado input, 
        setInput({                                  //ademas de lo que tiene, se le agrega el target.value
            ...input,
            [e.target.name]: e.target.value
        })
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



    useEffect(() => {
        dispatch(getCountries());
    }, []);

    return (
        <div className={style.container}>
            <Link to = '/home'><button className={style.backButton}>Volver</button></Link>
            <h1 className={style.title}>Crea tu actividad</h1>
            <div>
                <form className={style.form} onSubmit={(e) => handleSubmit(e)}>
                    <div className={style.select}>
                        <label>Nombre:</label>
                        <input
                        type= 'text'
                        value= {input.name}
                        name = 'name'
                        onChange={(e) => handleChange(e)}
                        />
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
                        </select>
                    </div>
                    <div className={style.select}>
                        <label>Duración:</label>
                        <input
                            type= 'text'
                            value= {input.duration}
                            name = 'duration'
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className={style.select}>
                    <label>Estación:</label>
                        <select 
                            name='season' 
                            value={input.season} 
                            className={style.selectBox} 
                            onChange={(e) => handleChange(e)}>
                                <option value=''>Selecciona la estación</option>
                                <option value='Summer'>Summer</option>
                                <option value='Autumn'>Autumn</option>
                                <option value='Winter'>Winter</option>
                                <option value='Spring'>Spring</option>
                        </select>
                    </div>
                    <div className={style.select}>
                        <label>Pais:</label>
                            <select onChange={(e) => handleSelect(e)}>
                                {countries.map((country) => (
                                    <option value={country.name}>{country.name}</option>
                                ) )}
                            </select>
                            <div>
                                <ul><li>{input.country.map(el => el + " , ")}</li></ul>
                            </div>
                    </div>
                    <div>
                        <button className={style.submitButton} type='submit'>Crear actividad</button>
                    </div>
                </form>
            </div>
        </div>
    )
}



