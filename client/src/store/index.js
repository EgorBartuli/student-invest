import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducers } from './reducers';
import thunk from "redux-thunk";

const composeEnhancer = composeWithDevTools(applyMiddleware(thunk)); // импорт reduxDevTools

export const store = createStore(reducers, composeEnhancer);
