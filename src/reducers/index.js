import tasks from './tasks'

const { combineReducers } = require("redux");

const myReducer = combineReducers({
    tasks : tasks
});

export default myReducer;