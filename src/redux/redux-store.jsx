import { createStore, combineReducers } from 'redux';
//import { reducer as formReducer } from 'redux-form';
import { authReducer } from './authReducer';

let combinedReducers = combineReducers({
  //form: formReducer,
  authReducer
});

const store = createStore(combinedReducers);

window.store = store;

export default store;
