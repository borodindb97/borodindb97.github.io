const postsReducer = (state = [], action) => {

    if (action.type === 'GET_POSTS_FULFILLED') {
        return action.payload
    } else {
        return state
    }
};

export default postsReducer