import { FETCH_HOMEWORLD, FETCH_SPECIES, FETCH_VEHICLES, RESET_STATE } from '../actions/types';

const INITIAL_STATE = {
  homeworld: { 0: {}, 1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {}, 7: {}, 8: {}, 9: {}, 10: {} },
  species : { 0: {}, 1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {}, 7: {}, 8: {}, 9: {}, 10: {} },
  vehicles : { 0: [{}], 1: [{}], 2: [{}], 3: [{}], 4: [{}], 5: [{}], 6: [{}], 7: [{}], 8: [{}], 9: [{}], 10: [{}] }
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_HOMEWORLD:
      return { ...state, homeworld: {...state.homeworld, [action.payload.rowN]: action.payload.data }};
    case FETCH_SPECIES:
      return { ...state, species: {...state.species, [action.payload.rowN]: action.payload.data }};
    case FETCH_VEHICLES:
      return { ...state, vehicles: {...state.vehicles, [action.payload.rowN]: action.payload.data }};
    case RESET_STATE:
      return state = INITIAL_STATE;
    default:
      return state;
  }
}
