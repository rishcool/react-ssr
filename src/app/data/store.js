import { applyMiddleware, createStore, compose, combineReducers } from "redux";
import * as reducers from "./ducks";
import reduxThunk from "redux-thunk";
import { apiService, createLogger } from "./middlewares";

let composeEnhancers = compose;
let preloadedState = {};

if (typeof window !== 'undefined') {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    preloadedState = window.INITIAL_STATE || {};
    delete window.INITIAL_STATE;
}

const rootReducer = combineReducers( reducers );
export default createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(
        applyMiddleware(
            apiService,
            reduxThunk,
            //createLogger( true ),
        ),
    ),
);