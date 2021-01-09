import {combineReducers} from "redux";

import usersReducer from './usersReducer'
import postsReducer from './postsReducer'
import commentsReducer from './commentsReducer'

const reducers = combineReducers({
    users: usersReducer,
    posts: postsReducer,
    comments: commentsReducer
});

export default reducers