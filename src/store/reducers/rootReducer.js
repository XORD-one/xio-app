import { combineReducers } from "redux";
import layoutReducer from './layoutReducer';
import dashboardReducer from "./dashboardReducer"
import stakeReducer from "./stakeReducer"
import unstakeReducer from "./unstakeReducer"

const rootReducer = combineReducers({
    layoutReducer,
    dashboardReducer,
    stakeReducer,
    unstakeReducer
})

export default rootReducer;