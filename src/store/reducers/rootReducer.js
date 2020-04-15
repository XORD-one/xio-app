import { combineReducers } from "redux";
import layoutReducer from './layoutReducer';
import dashboardReducer from "./dashboardReducer"

const rootReducer = combineReducers({
    layoutReducer,
    dashboardReducer
})

export default rootReducer;