import React from "react";
import style from '../Styles/Pagination.module.css';

export default function Paginado ({ countriesPerPage, allCountries, paginated }) {
    const pageNumbers = [];
    const pageSecToFinish = allCountries - 9;
    pageNumbers.push(1);
    
    for (let i=2; i<=Math.ceil(pageSecToFinish/10); i++) {
        pageNumbers.push(i);
    }
    return(
        <nav>
            <ul className={style.footer}>
                { pageNumbers && 
                pageNumbers.map(number => (
                    <li className='number' key={number}>      
                        <button className={style.paginationButton} onClick={() => paginated(number)}>{number}</button> 
                    </li> 
                ))}
            </ul>
        </nav>
    )
}