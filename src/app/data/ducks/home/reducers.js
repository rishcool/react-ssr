import { combineReducers } from "redux";
import types from "./types";
import createReducer from "../../utils/createReducer";

const countries = createReducer( [ ] )( {
    [ types.RECEIVE_COUNTRIES ]: ( state, action ) => action.payload,
} );

const country = createReducer( [ ] )( {
    [ types.RECEIVE_COUNTRY ]: ( state, action ) => action.payload[0],
} );

export default combineReducers( {
    countries,
    country
} );
