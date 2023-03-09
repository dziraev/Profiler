import thunk from 'redux-thunk';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { authReducer } from '@reducers/authReducer';
import {
  statusCodeReducer,
  countriesReducer,
  personalDetailsReducer,
  phoneCodesReducer,
  positionsReducer,
  editModeReducer,
  photoCabinetReducer,
  constructorCvReducer,
  photoModalReducer,
  invalidUploadReducer,
  adviceReducer,
  photoCVReducer,
  cvsReducer,
  specificCvReducer,
  linkIsClickedReducer,
  failedToSaveReducer
} from '@reducers';

const appReducer = combineReducers({
  authReducer,
  statusCodeReducer,
  linkIsClickedReducer,
  countriesReducer,
  phoneCodesReducer,
  personalDetailsReducer,
  constructorCvReducer,
  editModeReducer,
  positionsReducer,
  photoModalReducer,
  invalidUploadReducer,
  adviceReducer,
  photoCabinetReducer,
  photoCVReducer,
  cvsReducer,
  specificCvReducer,
  failedToSaveReducer
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
    applyMiddleware(thunk)
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
