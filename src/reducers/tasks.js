import * as types from './../constants/ActionTypes'

var initialState = JSON.parse(sessionStorage.getItem("works"));

var myReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.LIST_ALL:
            return state;
        case types.ADD_TASK:
            return action.task;
        default: return state
    }
}

export default myReducer;