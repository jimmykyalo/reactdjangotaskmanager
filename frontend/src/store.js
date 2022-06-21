import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateReducer,
   
} from './reducers/userReducers'

import {
    taskCreateReducer,
    taskDetailsReducer,
    taskListReducer,
    taskDeleteReducer,
    taskUpdateReducer,
   
} from './reducers/taskReducers'

import {
    listCreateReducer,
    listDetailsReducer,
    listListReducer,
    listDeleteReducer,
    listUpdateReducer,
   
} from './reducers/listReducers'

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,

    taskCreate: taskCreateReducer,
    taskDetails: taskDetailsReducer,
    taskList: taskListReducer,
    taskDelete: taskDeleteReducer,
    taskUpdate: taskUpdateReducer,

    listCreate: listCreateReducer,
    listDetails: listDetailsReducer,
    listList: listListReducer,
    listDelete: listDeleteReducer,
    listUpdate: listUpdateReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null


const initialState = {userLogin: { userInfo: userInfoFromStorage }}
const middleware = [thunk]

const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store