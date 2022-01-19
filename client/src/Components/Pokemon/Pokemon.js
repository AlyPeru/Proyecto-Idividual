import React from 'react';
import { NavLink } from 'react-router-dom';
import css from './pokemon.module.css';

export default function Pokemon({ name, imagen, types, id, createdInDb }) {

    let typesDb = createdInDb ?
        types.map((el,id) => {
            const nameType = el.name;
            //console.log(nameType)
            return <h3 key={id }>{nameType }</h3>
        })
        : types.map((el,id) => {
            return <h3 key={id}>{el }</h3>
        })

    return (
        <div className={css.pokemon}>
        <NavLink to={"/detail/" + id}>
            <div className={css.info}>
                {/* ojo aqui llamaria completo la tarjeta */}
                <h1 className={css.name}>{name}</h1>
            </div>
            <div className={css.typeContainer}>{typesDb }</div>
            <img className={css.img} src={imagen} alt='img not found' width='200px' height='250px' />
        </NavLink>
        </div>
    )
}