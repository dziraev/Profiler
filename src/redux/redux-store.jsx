import thunk from 'redux-thunk';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { authReducer } from './authReducer';
import { countriesReducer } from './countriesReducer';
import { personalDetailsReducer } from './personalDetailsReducer';

let combinedReducers = combineReducers({
  authReducer,
  countriesReducer,
  personalDetailsReducer
});

const store = createStore(
  combinedReducers,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

window.store = store;

export default store;
