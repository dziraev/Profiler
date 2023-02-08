import thunk from 'redux-thunk';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { authReducer } from './authReducer';
import { countriesReducer } from '@reducers';
import { personalDetailsReducer } from '@reducers';
import { phoneCodesReducer } from '@reducers';
import { positionsReducer } from '@reducers';
import { editModeReducer } from '@reducers/PersonalDetailsReducers/editModeReducer';
import { photoCabinetReducer } from '@reducers/PersonalDetailsReducers/photoCabinetReducer';
import { linkIsClickedReducer } from '@reducers/PersonalDetailsReducers/linkIsClickedReducer';
import { constructorCvReducer } from '@reducers/CVReducers/constructorCvReducer';
import { photoModalReducer } from '@reducers/CVReducers/photoModalReducer';
import { invalidUploadReducer } from '@reducers/CVReducers/invalidUploadReducer';
import { adviceReducer } from '@reducers/CVReducers/adviceReducer';
import { photoCVReducer } from '@reducers/CVReducers/photoCVReducer';
import { cvsReducer } from '@reducers/CVReducers/cvsReducer';
import { specificCvReducer } from '@reducers/CVReducers/specificCvReducer';
import { failedToSaveReducer } from '@reducers/CVReducers/failedToSaveReducer';

const appReducer = combineReducers({
  authReducer,
  countriesReducer,
  phoneCodesReducer,
  personalDetailsReducer,
  constructorCvReducer,
  editModeReducer,
  positionsReducer,
  linkIsClickedReducer,
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
