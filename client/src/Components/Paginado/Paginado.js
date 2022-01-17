import React from "react";
import css from "./paginado.module.css";

export default function Paginado({allPokemons, paginado, pokePerPage}){
const numbPages = [];

    for(let i=1; i<=Math.ceil(allPokemons/pokePerPage); i++){
        numbPages.push(i)
    }

    return(
       <div>
           
               { numbPages && numbPages.map(num =>(
                       <div className={css.num_container} key= {num}>
                           <button className={css.button_page} onClick={() => paginado(num)}>{num}</button>
                       </div>
                   ))
               }
           
       </div> 
    )
}