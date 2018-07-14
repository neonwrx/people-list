import { combineReducers } from 'redux';
import peopleReducer from './peopleReducer';
import dataReducer from './dataReducer';

export default combineReducers({
  peopleReducer: peopleReducer,
  dataReducer: dataReducer,
});
