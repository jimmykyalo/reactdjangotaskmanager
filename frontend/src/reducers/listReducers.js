import {
    LIST_LIST_REQUEST,
    LIST_LIST_SUCCESS,
    LIST_LIST_FAIL,

    LIST_DETAILS_REQUEST,
    LIST_DETAILS_SUCCESS,
    LIST_DETAILS_FAIL,
    LIST_DETAILS_RESET,

    LIST_CREATE_REQUEST,
    LIST_CREATE_SUCCESS,
    LIST_CREATE_FAIL,
    LIST_CREATE_RESET,

    LIST_DELETE_REQUEST,
    LIST_DELETE_SUCCESS,
    LIST_DELETE_FAIL,

    LIST_UPDATE_REQUEST,
    LIST_UPDATE_SUCCESS,
    LIST_UPDATE_FAIL,
    LIST_UPDATE_RESET,
    LIST_DELETE_RESET,
    

} from '../constants/listConstants'




export const listListReducer = (state = { lists: []}, action) => {
    switch (action.type) {
        case LIST_LIST_REQUEST:
            return { loading: true, lists: [] }

        case LIST_LIST_SUCCESS:
            
            return {
                loading: false,
                lists: action.payload,
            }

        case LIST_LIST_FAIL:
            return { loading: false, error: action.payload, lists:[] }

        default:
            return state
    }
}



export const listDetailsReducer = (state = { list: {tasks:[]} }, action) => {
    switch (action.type) {
        case LIST_DETAILS_REQUEST:
            return { loading: true, ...state, list: {tasks:[]}  }

        case LIST_DETAILS_SUCCESS:
            return { loading: false, list: action.payload }

        case LIST_DETAILS_FAIL:
            return { loading: false, error: action.payload, list: {tasks:[]} }
        
        case LIST_DETAILS_RESET:
            return { list: {tasks:[]} }

        default:
            return state
    }
}

export const listCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case LIST_CREATE_REQUEST:
            return { loading: true }

        case LIST_CREATE_SUCCESS:
            return { loading: false, list: action.payload, success:true }

        case LIST_CREATE_FAIL:
            return { loading: false, error: action.payload }

        case LIST_CREATE_RESET:
            return {}

        default:
            return state
    }
}

export const listDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case LIST_DELETE_REQUEST:
            return { loading: true }

        case LIST_DELETE_SUCCESS:
            return { loading: false, success: true }

        case LIST_DELETE_FAIL:
            return { loading: false, error: action.payload }
        
        case LIST_DELETE_RESET:
            return {}

        default:
            return state
    }
}

export const listUpdateReducer = (state = { list: {tasks:[]} }, action) => {
    switch (action.type) {
        case LIST_UPDATE_REQUEST:
            return { loading: true }

        case LIST_UPDATE_SUCCESS:
            return { loading: false, success: true }

        case LIST_UPDATE_FAIL:
            return { loading: false, error: action.payload }

        case LIST_UPDATE_RESET:
            return { list: {tasks:[]} }

        default:
            return state
    }
}


