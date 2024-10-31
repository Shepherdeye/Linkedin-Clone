import { combineReducers } from "redux";
import userReducer from "../Reducers/UserReducer";
import articleReducer from "../Reducers/ArticlesReducer"
const rootReducers = combineReducers({
    userState: userReducer,
    articlesState: articleReducer
})

export default rootReducers;