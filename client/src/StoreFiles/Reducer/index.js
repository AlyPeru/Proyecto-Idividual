

const initialState = {
    pokemons: [],
    allPokemons: [],

    types: [],
    details: []
}

function rootReducer(state = initialState, action) {

    switch (action.type) {
        case 'GET_POKEMONS':
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload

            }
        case 'GET_NAME_POKEMON':
            return {
                ...state,
                pokemons: action.payload
            }
        case 'GET_TYPES':
            return {
                ...state,
                types: action.payload
            }
        case 'POST_POKEMON':
            return {
                ...state,
            }
        case 'GET_DETAILS':
            return {
                ...state,
                details: action.payload
            }
        case 'ORDER_POKEMON_BY_ATTACK':
            const sortAttack = action.payload === 'min' ?

                state.allPokemons.sort(function (a, b) {
                    if (a.attack > b.attack) {
                        return 1;
                    }
                    if (b.attack > a.attack) {
                        return -1;
                    }
                }) :

                state.allPokemons.sort(function (a, b) {
                    if (a.attack > b.attack) {
                        return -1;
                    }
                    if (b.attack > a.attack) {
                        return 1;
                    }
                })
            return {
                ...state,
                pokemons: sortAttack
            }
        case 'ORDER_BY_NAME':
            const sortName = action.payload === 'asc' ?
                state.pokemons.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (b.name > a.name) {
                        return -1;
                    }
                    return 0;//si son iguales los deja como estan
                }) :
                state.pokemons.sort(function (a, b) {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (b.name > a.name) {
                        return 1;
                    }
                })
            return {
                ...state,
                pokemons: sortName
            }
        case 'FILTER_POKEMON_BY_CREATE':
            const filterCreate = action.payload === 'created' ? state.allPokemons.filter(el => el.createdInDb) :
                state.allPokemons.filter(el => !el.createdInDb)
            return {
                ...state,
                pokemons: action.payload === 'All' ? state.pokemons : filterCreate
            }
        //filtrarlos y mandarlos a un nuevo array 
        //filterType[i] vendria a ser cada uno de los obj {
        //     id: 31,
        //     name: 'nidoqueen',
        //     hp: 90,
        //     attack: 92,
        //     defense: 87,
        //     speed: 76,
        //     sprites: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/31.svg',
        //     height: 13,
        //     weight: 600,
        //     type: [ 'poison ', 'ground ' ]
        //   },

        //se transforma a "types": [
        //     {
        //         "name": "flying"
        //     },
        //     {
        //         "name": "bug"
        //     }
        // ]

        case 'FILTER_POKEMON_BY_TYPE':
            //db yo debo enviar ['',''] y lo recupera [{}, {}]
          
            let res =
            action.payload === "AllTypes"
              ? state.allPokemons
              : state.allPokemons.filter((p) =>
                  p.types.some(
                    (t) => t === action.payload || t.name === action.payload
                  )
                );
          return {
            ...state,
            pokemons: res,
            }
        default:
            return state;
    }

}
export default rootReducer;