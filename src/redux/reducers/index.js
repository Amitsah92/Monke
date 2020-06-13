import { combineReducers } from "redux";
import LogInUser from './logInReducer';

const rootReducer = combineReducers({
    LogInUser : LogInUser
});

export default rootReducer;