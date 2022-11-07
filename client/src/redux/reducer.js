
import { GET_TYPES, GET_DETAIL, CLEAR_DETAIL, GET_POKEMON, GET_BY_NAME, FILTER_BY_TYPE, FILTER_BY_SOURCE, SORT_BY_HP, SORT_BY_NAME, SORT_BY_ATT, CLEAR_FILTER } from "./actionTypes";

const initialState = {
    pokemon: [],
    allPokemon: [],
    detail: {},
    types: [],
    loading: true
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TYPES:
            return {
                ...state,
                types: action.payload,
            };
        case GET_DETAIL:
            return {
                ...state,
                detail: action.payload,
            };
        case CLEAR_DETAIL:
            return {
                ...state,
                detail: {},
            };
        case GET_POKEMON:
            return {
                ...state,
                pokemon: action.payload,
                allPokemon: action.payload,
                loading: false
            }
        case GET_BY_NAME:
            return {
                ...state,
                pokemon: action.payload,
                loading: false
            }
        case FILTER_BY_TYPE:
            let filteredPokemon = state.allPokemon.filter((e) => {
                if (e.types?.includes(action.payload)) return e
            })
            if (action.payload === 'all') {
                filteredPokemon = state.allPokemon
            }
            return {
                ...state,
                pokemon: filteredPokemon
            }
        case FILTER_BY_SOURCE:
            const apiAndDb = state.allPokemon
            const dbPokemon = action.payload === 'db' ? apiAndDb.filter(pokemon => pokemon.created) : apiAndDb.filter(pokemon => !pokemon.created);
            return {
                ...state,
                pokemon: action.payload === 'all' ? state.allPokemon : dbPokemon
            }
        case SORT_BY_NAME:
            let sortByName = action.payload === 'asc' ? state.pokemon.sort((a, b) => {
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                } return 0;
            }) : state.pokemon.sort((a, b) => {
                if (a.name > b.name) {
                    return -1
                }
                if (a.name < b.name) {
                    return 1
                } return 0
            })
            return {
                ...state,
                pokemon: sortByName
            }
        case SORT_BY_HP:
            let sortedByHP = action.payload === 'lowest' ? state.pokemon.sort((a, b) => a.hp - b.hp)
                : state.pokemon.sort((a, b) => b.hp > a.hp)
            return {
                ...state,
                pokemon: sortedByHP
            }
        case SORT_BY_ATT:
            let sortByAttack = action.payload === 'lowest' ? state.pokemon.sort((a, b) => {
                if (a.attack > b.attack) {
                    return 1;
                }
                if (a.attack < b.attack) {
                    return -1;
                } return 0;
            }) : state.pokemon.sort((a, b) => {
                if (a.attack > b.attack) {
                    return -1
                }
                if (a.attack < b.attack) {
                    return 1
                } return 0
            })
            return {
                ...state,
                pokemon: sortByAttack
            }
        // FILTROS POR OTROS STATS PENDIENTES

        // case NEW_POKEMON:
        //     return {
        //         ...state
        //     }
        case CLEAR_FILTER:
            return {
                ...state,
                loading: true
            }
        default:
            return {
                ...state
            };
    }
};

export default rootReducer;
