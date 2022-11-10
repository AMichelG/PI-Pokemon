import {
  GET_TYPES,
  GET_DETAIL,
  CLEAR_DETAIL,
  GET_POKEMON,
  GET_BY_NAME,
  FILTER_BY_TYPE,
  FILTER_BY_SOURCE,
  SORT_BY_NAME,
  SORT_BY_HP,
  SORT_BY_ATT,
  SORT_BY_SPA,
  SORT_BY_DEF,
  SORT_BY_SPD,
  SORT_BY_SPE,
  SORT_BY_HEI,
  SORT_BY_WEI,
  CLEAR_FILTER,
  FILTER_POKEMON,
} from "./actionTypes";

import axios from "axios";

const host = "http://localhost:3001/";

export const getTypes = () => {
  return async function (dispatch) {
    const typeInfo = await axios.get(`${host}type`);
    const types = typeInfo.data;
    dispatch({
      type: GET_TYPES,
      payload: types,
    });
  };
};

export const getDetail = (id) => {
  return async function (dispatch) {
    const detailInfo = await axios.get(`${host}pokemon/${id}`);
    const pokemonDetail = detailInfo.data;
    dispatch({
      type: GET_DETAIL,
      payload: pokemonDetail,
    });
  };
};

export const clearDetail = () => {
  return {
    type: CLEAR_DETAIL,
    payload: {},
  };
};

export const getPokemon = () => {
  return async function (dispatch) {
    const pokemonInfo = await axios.get(`${host}pokemon`);
    const pokemonList = pokemonInfo.data;
    dispatch({
      type: GET_POKEMON,
      payload: pokemonList,
    });
  };
};

export const getByName = (name) => {
  return async function (dispatch) {
    const pokemonByNameInfo = await axios.get(`${host}pokemon?name=${name}`);
    const pokemonByName = [pokemonByNameInfo.data];
    dispatch({
      type: GET_BY_NAME,
      payload: pokemonByName,
    });
  };
};

export const newPokemon = (payload) => {
  return async function (dispatch) {
    const newPokemon = await axios.post(`${host}pokemon`, payload);
    return newPokemon;
  };
};

/*export const filterByType = (payload) => {
  // console.log("log:", payload);
  return {
    type: FILTER_BY_TYPE,
    payload,
  };
};

export const filterBySource = (payload) => {
  // console.log("log:", payload);
  return {
    type: FILTER_BY_SOURCE,
    payload,
  };
};*/

export const filterPokemon = (payload) => {
  return {
    type: FILTER_POKEMON,
    payload,
  };
};

export const sortByName = (payload) => {
  return {
    type: SORT_BY_NAME,
    payload,
  };
};

export const sortByHp = (payload) => {
  return {
    type: SORT_BY_HP,
    payload,
  };
};

export const sortByAtt = (payload) => {
  return {
    type: SORT_BY_ATT,
    payload,
  };
};

export const sortBySpA = (payload) => {
  return {
    type: SORT_BY_SPA,
    payload,
  };
};

export const sortByDef = (payload) => {
  return {
    type: SORT_BY_DEF,
    payload,
  };
};

export const sortBySpD = (payload) => {
  return {
    type: SORT_BY_SPD,
    payload,
  };
};

export const sortBySpe = (payload) => {
  return {
    type: SORT_BY_SPE,
    payload,
  };
};

export const sortByHei = (payload) => {
  return {
    type: SORT_BY_HEI,
    payload,
  };
};

export const sortByWei = (payload) => {
  return {
    type: SORT_BY_WEI,
    payload,
  };
};

export const clearFilter = () => {
  return {
    type: CLEAR_FILTER,
    payload: {
      type: "allTypes",
      source: "all"
    },
  };
};
