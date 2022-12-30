import thunk from 'redux-thunk';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { authReducer } from './authReducer';
import { countriesReducer } from '@reducers';
import { personalDetailsReducer } from '@reducers';
import { phoneCodesReducer } from '@reducers';
import { positionsReducer } from '@reducers';
import { editModeReducer } from './editModeReducer';
import { linkIsClickedReducer } from './linkIsClickedReducer';

const appReducer = combineReducers({
  authReducer,
  countriesReducer,
  phoneCodesReducer,
  personalDetailsReducer,
  editModeReducer,
  positionsReducer,
  linkIsClickedReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

window.store = store;

export default store;
