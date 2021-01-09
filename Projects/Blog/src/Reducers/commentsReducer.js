const commentsReducer = (state = [], action) => {

    if (action.type === 'GET_COMMENTS_FULFILLED') {
        return action.payload
    } else {
        return state
    }
};

export default commentsReducer
