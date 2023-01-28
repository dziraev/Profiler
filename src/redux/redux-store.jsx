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
import { personalInformationReducer } from '@reducers/CVReducers/personalInformationReducer';
import { photoModalReducer } from '@reducers/CVReducers/photoModalReducer';
import { invalidUploadReducer } from '@reducers/CVReducers/invalidUploadReducer';
import { adviceReducer } from '@reducers/CVReducers/adviceReducer';
import { photoCVReducer } from '@reducers/CVReducers/photoCVReducer';
import { cvReducer } from '@reducers/CVReducers/cvReducer';
import { specificCvReducer } from '@reducers/CVReducers/specificCvReducer';

const appReducer = combineReducers({
  authReducer,
  countriesReducer,
  phoneCodesReducer,
  personalDetailsReducer,
  personalInformationReducer,
  editModeReducer,
  positionsReducer,
  linkIsClickedReducer,
  photoModalReducer,
  invalidUploadReducer,
  adviceReducer,
  photoCabinetReducer,
  photoCVReducer,
  cvReducer,
  specificCvReducer
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
