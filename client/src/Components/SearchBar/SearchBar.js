import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getNamePokemon } from "../../StoreFiles/Actions";

export default function SearchBar() {

    const dispatch = useDispatch();
    const [name, setName] = useState()


    function handleSubmit(e) {
        e.preventDefault();
        const resp = name?.toLowerCase()
        dispatch(getNamePokemon(resp));
        setName("");
    }

    return (
        <div>
            <input type="text" placeholder="Buscar...." onChange={(e) => setName(e.target.value)} value={name} />
            <button type='submit' onClick={(e) => handleSubmit(e)}>Buscar</button>
        </div>
    )
}