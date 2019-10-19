import {createStore, applyMiddleware, compose} from "redux";
import thunkMiddleware from "redux-thunk";

import rootReducer from './store';

// compose enhancers
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// create store
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

export default store;