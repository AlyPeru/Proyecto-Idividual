import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails, cleanDetail } from "../../StoreFiles/Actions/index";
// import NavBar from "../navBar/navBar";
import css from "./details.module.css";

export default function Details(props) {
    //console.log(props)
    const id = props.match.params.id
    ///console.log(props)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(cleanDetail());
        dispatch(getDetails(id));
    }, [dispatch,id])

    // useEffect(() => {
    //     return ()=>{
    //         {setTimeout(dispatch(cleanDetail()),500)}
    //     }
    // },[])

    const myPokemon = useSelector((state) => state.details)
    



    //console.log(myPokemon)
    return (
        <div className={css.pokemon}>
            {/*<NavBar/> */}
            {
                myPokemon.length > 0 ?
                    <div className={css.container}>
                        
                        <h1> Name:  {myPokemon[0].name}</h1>
                        <img className={css.img}src={ myPokemon[0].sprites} alt="Img not Found" width="300px" height="500px"  />
                        <h4 className={css.info}>Life:  {myPokemon[0].hp}</h4>
                        <h4 className={css.info}>Attack: {myPokemon[0].attack}</h4>
                        <h4 className={css.info}>Defense: {myPokemon[0].defense}</h4>
                        <h4 className={css.info}>Speed: {myPokemon[0].speed}</h4>
                        <h4 className={css.info}>Height: {myPokemon[0].height}</h4>
                        <h4 className={css.info}>Weight: {myPokemon[0].weight}</h4>
                        <h3 className={css.typeContainer}>Type:{myPokemon[0].createdInDb? myPokemon[0]?.types?.map(el =><div>{el.name}</div>):myPokemon[0]?.types.map(el =>el)}</h3>
                       
                    </div> :
                    <p>Loading....</p>

            }
            <Link to='/home' ><button>Back</button></Link>

        </div>
    )


}

// {currentDog.length === 0 ? <img  alt= {"Loading"} src={carga}/>: carga es como lo importo guardo en img