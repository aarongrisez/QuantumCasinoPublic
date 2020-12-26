import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { roomReducer } from './room';
import { errorReducer } from './error';

export const rootReducer = combineReducers({
  room: roomReducer,
  error: errorReducer,
  form: formReducer
});
