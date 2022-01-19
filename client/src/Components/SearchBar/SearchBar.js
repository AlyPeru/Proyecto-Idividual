import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getNamePokemon } from "../../StoreFiles/Actions";

export default function SearchBar() {

    const dispatch = useDispatch();
    const [name, setName] = useState()


    function handleSubmit(e) {
        e.preventDefault();
        // if(name ===''){
        //     return alert('no puede estar vacio')
        // }
        const resp = name?.toLowerCase();
        dispatch(getNamePokemon(resp));
        setName("");
    }

    function handleSearch(e){
        e.preventDefault()

        if(e.target.value === ' '){
            
            setName(e.target.value)
        }else{

            setName(e.target.value)
        }

    }


    return (
        <div>
            <input type="text" placeholder="Buscar...." onChange={(e) => handleSearch(e) } value={name} />
            <button type='submit' onClick={(e) => handleSubmit(e)}>Buscar</button>
    
        </div>
    )
}