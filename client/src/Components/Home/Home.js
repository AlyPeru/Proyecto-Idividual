import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, orderByName, filterPokemonByCreate, getTypes, filterPokemonByType, orderPokemonByAttack } from "../../StoreFiles/Actions";
// import { Link } from "react-router-dom";
import Pokemon from '../Pokemon/Pokemon';
import Paginado from "../Paginado/Paginado";
import NavBar from "../NavBar/NavBar";
// import SearchBar from "../SearchBar/SearchBar";

import css from './Home.module.css';

export default function Home() {
    var i = 1;
    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons);

    const types = useSelector((state) => state.types);
    // console.log(allPokemons)
    //*****************PAGINADO************************* */
    const [currentPage, setCurrentPage] = useState(1);
    const [pokePerPage, setPage] = useState(12);
    const idLastPokem = currentPage * pokePerPage;
    const idFirstPokem = idLastPokem - pokePerPage;
    const currentPokem = allPokemons.slice(idFirstPokem, idLastPokem)

    const paginado = (numPag) => {
        setCurrentPage(numPag)
    }
    const [order, setOrder] = useState('');

    useEffect(() => {
        dispatch(getTypes())
        dispatch(getPokemons())
    }, [dispatch])


    // *********************FILTRO TYPES*****************************
    function handleChangeTypes(e) {
        e.preventDefault()
        console.log(e.target.value)
        dispatch(filterPokemonByType(e.target.value))
        setCurrentPage(1)
        setOrder(`Ordenar ${e.target.value}`)
    }
    // console.log(allPokemons)
    // console.log(types)
     // ******************FILTROS CREATED***********************
     function handleCreated(e) {
        dispatch(filterPokemonByCreate(e.target.value))
    }

    // // ****************************BOTON HOME******************
    // function handleClickHome(e) {
    //     e.preventDefault()
    //     dispatch(getPokemons())
    //     setCurrentPage(1)
    //     setOrder(`Ordenar ${e.target.value}`)
    // }

    // ********************  ORDENAMIENTOS ********************
    function handleSort(e) {
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setOrder(`Ordenar ${e.target.value}`)
    };

    function handleAttack(e) {
        e.preventDefault()
        dispatch(orderPokemonByAttack(e.target.value))
        setCurrentPage(1)
        setOrder(`Ordenar ${e.target.value}`)
    }
   
    return (
        <div>
           
            <h1> <b>Pokemon Main Page</b></h1>
            {/* <button onClick={e => { handleClickHome(e) }}>Cargar la página nuevamente</button> */}
            <NavBar/>
            <div>

                {/* ******************FILTROS************************* */}
                <select name="types" onChange={(e) => { handleChangeTypes(e) }}>
                    <option value="AllTypes" >Todos los Tipos</option>
                    {
                        types.map((type) => {
                            return (
                                <option value={type.name} key={type.name} >{type.name}</option>
                            );
                        })
                    }
                </select>
                <select onChange={e => handleCreated(e)}>
                    <option value='All'>Todos</option>
                    <option value='created'>Creados</option>
                    <option value='api'>Existentes</option>
                </select>
                <br />
                {/* ********************ORDENAMIENTOS***************** */}
                <select onChange={e => handleSort(e)}>
                    <option value='asc'>A-Z</option>
                    <option value='desc'>Z-A</option>
                </select>
                <select onChange={e => handleAttack(e)}>
                    <option value='max'>Max</option>
                    <option value='min'>Min</option>
                </select>

                {/* <Paginado2 /> */}

                <Paginado allPokemons={allPokemons.length} paginado={paginado} pokePerPage={pokePerPage} />
                
                <div className={css.container_home}>
                    {allPokemons.length > 0 ?
    
                        currentPokem?.map((el,il) => {
                            return (
                                <div className={css.pokemon} key={il}>

                                    <Pokemon name={el.name} imagen={el.sprites} types={el.types } key={i++} id={el.id} createdInDb={el.createdInDb} />

                                </div>
                            );
                        }) :

                        <p>Loading....</p>

                    }
                </div>
            </div>
        </div>
    )
}