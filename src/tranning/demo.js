// import { createStore } from 'redux';

// var defaultState = {
//     status : false,
//     sort: {
//         by : 'name',
//         value: 1
//     }
// }

// var myReducer = (state = defaultState, action) => {
//     if(action.type === 'TOGGLE_STATUS') {
//         state.status = !state.status; 
//     }
//     if(action.type === 'SORT') {
//         return {
//             status : state.status,
//             sort: {
//                 by: action.sort.by,
//                 value: action.sort.value
//             }
//         }
        
       
//     }
//     return state;
// }
// const store = createStore(myReducer);
// console.log('Default: ',store.getState());

// var actionStatus = {type : 'TOGGLE_STATUS'};
// store.dispatch(actionStatus)

// console.log('New state 1: ',store.getState());

// var actionSort = {
//     type: 'SORT',
//     sort : {
//         by : 'name',
//         value : -1
//     }
// }
// store.dispatch(actionSort)
// console.log('New state 2: ',store.getState());

