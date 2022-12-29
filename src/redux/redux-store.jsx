import thunk from 'redux-thunk';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { authReducer } from './authReducer';
import { countriesReducer } from './countriesReducer';
import { personalDetailsReducer } from './personalDetailsReducer';
import { phoneCodesReducer } from './phoneCodesReducer';
import { editModeReducer } from './editModeReducer';
import { positionsReducer } from './positionsReducer';
import { linkIsClickedReducer } from './linkIsClickedReducer';

let combinedReducers = combineReducers({
  authReducer,
  countriesReducer,
  phoneCodesReducer,
  personalDetailsReducer,
  editModeReducer,
  positionsReducer,
  linkIsClickedReducer
});

const store = createStore(combinedReducers, compose(applyMiddleware(thunk)));

window.store = store;

export default store;
