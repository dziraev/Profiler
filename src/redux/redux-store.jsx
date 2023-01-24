import thunk from 'redux-thunk';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { authReducer } from './authReducer';
import { countriesReducer } from '@reducers';
import { personalDetailsReducer } from '@reducers';
import { phoneCodesReducer } from '@reducers';
import { positionsReducer } from '@reducers';
import { editModeReducer } from '@reducers/PersonalDetailsReducers/editModeReducer';
import { linkIsClickedReducer } from '@reducers/PersonalDetailsReducers/linkIsClickedReducer';
import { personalInformationReducer } from '@reducers/CVReducers/PersonalInformationReducer';
import { photoModalReducer } from '@reducers/photoModalReducer';
import { adviceReducer } from '@reducers/CVReducers/adviceReducer';

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
  adviceReducer
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

export default store;
