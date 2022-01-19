import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { postPokemon, getTypes } from "../../StoreFiles/Actions";
import css from "./createPokemon.module.css";

export default function CreatePokemon() {

    const dispatch = useDispatch();
    const history = useHistory();
    const types = useSelector((state) => state.types);
    const [error, setError] = useState({});


    const initial = {
        name: '',
        hp: '',
        sprites: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/123.png',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        types: []
    };

    const [input, setInput] = useState(initial)
    // const resetState = () =>{
    //     setInput({
    //             name: '',
    //             hp: '',
    //             sprites: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/123.png',
    //             attack: '',
    //             defense: '',
    //             speed: '',
    //             height: '',
    //             weight: '',
    //             types: []
    //         });
    //         // history.push("/home")
    // };

    // ***********Expresiones Regulares y Validaciones***********

    let validateName = /^[a-z]+$/i;
    let validateNum = /^([0-9])*$/;
    let validateUrl = /^(ftp|http|https):\/\/[^ "]+$/;

    const validate = () => {
        let errors = {};
        if (!validateName.test(input.name)) {
            errors.name = "Name required and must be letters";
        }
        if (!validateNum.test(input.hp) ||
            input.hp < 1 ||
            input.hp > 300) {
            errors.hp =
                "HP is require and must be a number between 0 and 300";
        }
        if (!validateUrl.test(input.sprites)) {
            errors.sprites = "URL required";
        }
        if (!validateNum.test(input.attack) ||
            input.attack < 10 ||
            input.attack > 500) {
            errors.attack =
                "Attack is require and must be a number between 10 and 500";
        }
        if (!validateNum.test(input.defense) ||
            input.defense < 0 ||
            input.defense > 100
        ) {
            errors.defense =
                "Defense is require and must be a number between 0 and 100";
        }
        if (
            !validateNum.test(input.speed) ||
            input.speed < 10 ||
            input.speed > 500
        ) {
            errors.speed =
                "Speed is require and must be a number between 10 and 500";
        }
        if (
            !validateNum.test(input.height) ||
            input.height < 10 ||
            input.height > 300
        ) {
            errors.height =
                "Height is require and must be a number between 10 and 300";
        }
        if (
            !validateNum.test(input.weight) ||
            input.weight < 10 ||
            input.weight > 100
        ) {
            errors.weight =
                "Weight is require and must be a number between 10 and 100";
        }

        return errors;
    };
    // ****************SETEAAR EN EL ESTADO LOS VALORES DE LOS INPUT**********

    function handleInputChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        setError(
            validate({
                ...input,
                [e.target.name]: e.target.value,
            })
        );
    }

    function handleSelectChange(e) {
        setInput({
            ...input,
            types: [...input.types, e.target.value],

        });
    }

    function handleDelete(e) {
        setInput({
            ...input,
            types: input.types.filter(el => el !== e),
        });
    }

    function handleSubmit(e) {
        e.preventDefault()
        const error = validate(input);

        if (
            !error.name &&
            !error.hp &&
            !error.attack &&
            !error.defense &&
            !error.speed &&
            !error.heightt &&
            !error.weight &&
            !error.types
        ) {
            if (input.name.length !== 0
                && input.hp.length !== 0
            ) {
                dispatch(postPokemon(input));
                // resetState();
                alert("Successfully created pokemon !!!!!");
                setInput(initial)
                history.push("/home");
            } else {
                alert("The form is required");
            }
        } else {
            alert("The form is required");
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
                    <input
                        type="text"
                        value={input.name}
                        name="name"
                        onChange={(e) => handleInputChange(e)}
                    />
                    {
                        !error ? null : (
                            <span className={css.errorName}>{error.name}</span>
                        )
                    }

                </div>
                <div>
                    <label>Life: </label>
                    <input
                        type="text"
                        value={input.hp}
                        name="hp"
                        onChange={(e) => handleInputChange(e)}
                    />
                    {
                        !error ? null : (
                            <span className={css.errorName}>{error.hp}</span>
                        )
                    }
                </div>
                <div>
                    <label>Image: </label>
                    <input
                        type="text"
                        value={input.sprites}
                        name="sprites"
                        onChange={(e) => handleInputChange(e)}
                    />
                    {
                        !error ? null : (
                            <span className={css.errorName}>{error.sprites}</span>
                        )
                    }
                </div>
                <div>
                    <label>Attack: </label>
                    <input type="text"
                        value={input.attack}
                        name="attack"
                        onChange={(e) => handleInputChange(e)}
                    />
                    {
                        !error ? null : (
                            <span className={css.errorName}>{error.attack}</span>
                        )
                    }
                </div>
                <div>
                    <label>Defense</label>
                    <input type="text"
                        value={input.defense}
                        name="defense"
                        onChange={(e) => handleInputChange(e)}
                    />
                    {
                        !error ? null : (
                            <span className={css.errorName}>{error.defense}</span>
                        )
                    }
                </div>
                <div>
                    <label>Speed</label>
                    <input type="text"
                        value={input.speed}
                        name="speed"
                        onChange={(e) => handleInputChange(e)}
                    />
                    {
                        !error ? null : (
                            <span className={css.errorName}>{error.speed}</span>
                        )
                    }
                </div>
                <div>
                    <label>Height</label>
                    <input type="text"
                        value={input.height}
                        name="height"
                        onChange={(e) => handleInputChange(e)}
                    />
                    {
                        !error ? null : (
                            <span className={css.errorName}>{error.height}</span>
                        )
                    }
                </div>
                <div>
                    <label>Weight</label>
                    <input type="text"
                        value={input.weight}
                        name="weight"
                        onChange={(e) => handleInputChange(e)}
                    />
                    {
                        !error ? null : (
                            <span className={css.errorName}>{error.weight}</span>
                        )
                    }
                </div>
                <div>
                    <label>Choose the Type</label>
                    <select name="types"
                        onChange={(e) => handleSelectChange(e)}>
                        <option>All Types</option>
                        {
                            types.map((type, i) => {
                                return (
                                    <option value={type.name}
                                        key={i}>{type.name}</option>
                                );
                            })
                        }
                    </select>
                    {/* {
                        <ul><li>{input.types.map(el => el.name + ' ')}</li></ul>
                    } */}
                    {input.types.map((el, i) => {
                        return (
                            <div key={i}>
                                <button type="button" className="EliminateType" onClick={() => handleDelete(el)} >x</button>
                                <span >{el}</span>
                            </div>
                        )
                    })
                    // <button onClick={() => handleDeleteTemperament(el.name)} className={style.x}>X</button>

                    }
                </div>
                <button type='submit'>Create Pokemon</button>
            </form>
        </div>
    )
}