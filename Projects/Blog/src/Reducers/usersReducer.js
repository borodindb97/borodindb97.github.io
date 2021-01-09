const usersReducer = (state = {
    usersList: [],
    currentUser: {}
}, action) => {

    switch (action.type) {
        case 'GET_USERS_FULFILLED':
            return {
                usersList: action.payload,
                currentUser: {...state.currentUser}
            };
            break
        case 'GET_USER_FULFILLED':
            return{
                usersList: [...state.usersList],
                currentUser: action.payload
            };
            break
        case 'GET_USERS_PENDING':
            return state;
            break
        case 'GET_USER_PENDING':
            return state;
            break
        default :
            return state
    }

};

export default usersReducer

