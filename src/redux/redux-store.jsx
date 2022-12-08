import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

let combinedReducers = combineReducers({
    form: formReducer
});

const store = createStore(combinedReducers);

window.store = store;

export default store;