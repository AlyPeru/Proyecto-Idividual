import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { postPokemon, getTypes } from "../../StoreFiles/Actions";

function validate(input) {
    let errors = {};

    if (!input.name) {
        errors.name = "Dont Forget My Name";
    }
    if (!input.hp) {
        errors.hp = "Dont Forget My Hp";
    }
    if (!input.attack) {
        errors.attack = "Dont Forget My Attack";
    }

    if (!input.types.length) {
        errors.types = "Dont Forget My Type";
    }

    return errors;
}

export default function CreatePokemon() {

    const dispatch = useDispatch()
    const history = useHistory()
    const types = useSelector((state) => state.types)


    const [input, setInputs] = useState({
        name: '',
        hp: '',
        sprites: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/123.png',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        types: []
    });
    // ****************SETEAAR EN EL ESTADO LOS VALORES DE LOS INPUT**********
    //guardar lo que el usuario escribe en el input en mi estado input
    function handleInputChange(e) {
        setInputs(
            {
                ...input,
                [e.target.name]: e.target.value
            }
        )
    }

    function handleSelectChange(e) {
        setInputs({
            ...input,
            types: [...input.types, e.target.value],
            //guarda uno solo_ muestra uno // y undefined cuando lo renderizaen la pag 
            //types: [...input.types, { name: e.target.value} ]
            // types: [{...input.types,  name: e.target.value} ]
             //types: [...input.types,{...input.types,  name: e.target.value} ]//crea arroja el problema pero si lo guarda sin types 
        //    types: [...input.types, {name : e.target.value}]//undefine
        });
    }

    function handleSubmit(e) {
        e.preventDefault()
        const error = validate(input);

        if (!Object.keys(error).length) {
            dispatch(postPokemon(input))
            alert("Successfully created pokemon !!!!!")
            setInputs({
                name: '',
                hp: '',
                sprites: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/123.png',
                attack: '',
                defense: '',
                speed: '',
                height: '',
                weight: '',
                types: []
            })
            history.push("/home")
        } else {
            alert("The Name, Hp , Attack and Type are obligatory!!");
        }
    }

    useEffect(() => {
        dispatch(getTypes())
    }, [dispatch])
    // ********************** FORM******************

    return (
        <div>
            <Link to="/home"> <button>Back</button></Link>
            <h1>CREATE POKEMON</h1><br />
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Name: </label>
                    <input type="text" value={input.name} name="name" onChange={(e) => handleInputChange(e)} />
                </div>
                <div>
                    <label>Life: </label>
                    <input type="text" value={input.hp} name="hp" onChange={(e) => handleInputChange(e)} />
                </div>
                <div>
                    <label>Image: </label>
                    <input type="text" value={input.sprites} name="sprites" onChange={(e) => handleInputChange(e)} />
                </div>
                <div>
                    <label>Attack: </label>
                    <input type="text" value={input.attack} name="attack" onChange={(e) => handleInputChange(e)} />
                </div>
                <div>
                    <label>Defense</label>
                    <input type="text" value={input.defense} name="defense" onChange={(e) => handleInputChange(e)} />
                </div>
                <div>
                    <label>Speed</label>
                    <input type="text" value={input.speed} name="speed" onChange={(e) => handleInputChange(e)} />
                </div>
                <div>
                    <label>Height</label>
                    <input type="text" value={input.height} name="height" onChange={(e) => handleInputChange(e)} />
                </div>
                <div>
                    <label>Weight</label>
                    <input type="text" value={input.weight} name="weight" onChange={(e) => handleInputChange(e)} />
                </div>
                <div>
                    <label>Choose the Type</label>
                    <select name="types" onChange={(e) => handleSelectChange(e)}>
                        <option>All Types</option>
                        {
                            types.map((type, i) => {
                                return (
                                    <option value={type.name} key={i}>{type.name}</option>
                                );
                            })
                        }
                    </select>
                    {
                        <ul><li>{input.types.map(el => el.type.name + ' ')}</li></ul>
                    }
                </div>
                <button type='submit'>Create Pokemon</button>
            </form>
        </div>
    )
}