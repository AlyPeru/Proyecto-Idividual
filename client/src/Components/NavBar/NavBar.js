import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPokemons} from "../../StoreFiles/Actions";
// import css from "./paginado2.module.css";
import Logo  from "../../img/Logo.png"
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import css from "../NavBar/navBar.module.css"

export default function NavBar(){
    const dispatch = useDispatch();

    // ****************************BOTON Reload******************
    function handleClickReload(e) {
        e.preventDefault()
        dispatch(getPokemons())
    }

    useEffect(() => {
        dispatch(getPokemons());
      }, [dispatch]);

    return(
       <div className={css.contenedor}>
           <img src={Logo} className={css.img} alt="Logo"></img>
           <button className ={css.button} onClick={e => { handleClickReload(e) }}>Reload</button>
           <SearchBar className={css.SearchBar} />
            <Link to='/pokemon' className={css.create}>Crea un nuevo Pokemon</Link>
           
               
           
       </div> 
    )
}