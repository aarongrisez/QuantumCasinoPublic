import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { lobbyReducer } from './lobby';

export const rootReducer = combineReducers({
  lobby: lobbyReducer,
  form: formReducer
});
