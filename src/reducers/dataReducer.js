import {
  FETCH_HOMEWORLD, FETCH_SPECIES, FETCH_VEHICLES, RESET_STATE,
} from '../actions/types';

const INITIAL_STATE = {
  homeworld: newObj(10),
  species: newObj(10),
  vehicles: newObj(10, true),
  rokoko: newObj(10),
};

function newObj(count, arr) {
  const obj = {};
  for (let i = 0; i < count; i++) {
    arr ? (obj[i] = [{}]) : (obj[i] = {});
  }
  return obj;
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_HOMEWORLD:
      return {
        ...state,
        homeworld: { ...state.homeworld, [action.payload.rowN]: action.payload.data },
      };
    case FETCH_SPECIES:
      return {
        ...state,
        species: { ...state.species, [action.payload.rowN]: action.payload.data },
      };
    case FETCH_VEHICLES:
      return {
        ...state,
        vehicles: { ...state.vehicles, [action.payload.rowN]: action.payload.data },
      };
    case RESET_STATE:
      return (state = INITIAL_STATE);
    default:
      return state;
  }
}
