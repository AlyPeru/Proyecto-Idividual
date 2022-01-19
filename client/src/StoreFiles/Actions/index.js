import axios from 'axios';

export function getPokemons() {
    return async function (dispatch) {
        var json = await axios.get('http://localhost:3001/pokemons', {});
        return dispatch({
            type: 'GET_POKEMONS',
            payload: json.data
        })
    }

}

export function getNamePokemon(name) {
    return async function (dispatch) {
        try {
            var json = await axios.get('http://localhost:3001/pokemons?name=' + name);
            return dispatch({
                type: 'GET_NAME_POKEMON',
                payload: json.data
            })
        } catch (error) {
            return dispatch({
                type: 'GET_NAME_POKEMON',
                payload: error
            })
        }
    };
}

export function getTypes() {
    return async function (dispatch) {
        var json = await axios.get('http://localhost:3001/types', {});
        return dispatch({
            type: 'GET_TYPES',
            payload: json.data
        })

    }
}

export function postPokemon(payload) {
    //console.log(payload)
    try {
        return async function (dispatch) {
            let response = await axios.post('http://localhost:3001/pokemons', payload)
            return response;
        }
    } catch (err) {
        console.log(err)
    }
}


export function getDetails(id) {
    return async function (dispatch) {
        try {
            let json = await axios.get('http://localhost:3001/pokemons/' + id)
            return dispatch({
                type: 'GET_DETAILS',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}
//ordenamietos
export function orderPokemonByAttack(payload) {
    return { type: 'ORDER_POKEMON_BY_ATTACK', payload }
}

export function orderByAZ(payload) { //FILTER_POQUEMON_BY_NAME
    return { type: 'ORDER_BY_AZ', payload }
}
//Filtros

export function filterPokemonByCreate(payload) {
    return { type: 'FILTER_POKEMON_BY_CREATE', payload }
}
//recibo un string o ['', '']
export function filterPokemonByType(type) {
    return {
        type: 'FILTER_POKEMON_BY_TYPE',
        payload: type
    }
}
export function cleanDetail() {
    return { type: 'CLEAN_DETAIL' }
}