import axios from 'axios';

import { FETCH_PEOPLE, FETCH_HOMEWORLD, FETCH_SPECIES, FETCH_VEHICLES, RESET_STATE } from './types';

export const fetchPeople = (page) => async dispatch => {
  const res = await axios.get(`https://swapi.co/api/people/?page=${page}&format=json`);

  dispatch({type: FETCH_PEOPLE, payload: res.data});
};

export const fetchHomeworld = (query, rowN) => async dispatch => {
  const res = await axios.get(`${query}?format=json`);
  const data = res.data;

  dispatch({type: FETCH_HOMEWORLD, payload: {data, rowN}});
};

export const fetchSpecies = (query, rowN) => async dispatch => {
  const res = await axios.get(`${query}?format=json`);
  const data = res.data;

  dispatch({type: FETCH_SPECIES, payload: {data, rowN}});
};

export const fetchVehicles = (query, length, rowN) => async dispatch => {
  let data = [];
  for (let i=0; i<length; i++) {
    const res = await axios.get(`${query[i]}?format=json`);
    data = [...data, res.data];
  }

  dispatch({type: FETCH_VEHICLES, payload: {data, rowN}});
};

export const resetState = () => {
  return {
    type: RESET_STATE,
    payload: ''
  };
}
