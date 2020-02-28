import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { lobbyReducer } from './lobby';
import { errorReducer } from './error';

export const rootReducer = combineReducers({
  lobby: lobbyReducer,
  error: errorReducer,
  form: formReducer
});
