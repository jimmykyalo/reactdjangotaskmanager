import axios from 'axios'
import {
    LIST_LIST_REQUEST,
    LIST_LIST_SUCCESS,
    LIST_LIST_FAIL,

    LIST_DETAILS_REQUEST,
    LIST_DETAILS_SUCCESS,
    LIST_DETAILS_FAIL,

    LIST_CREATE_REQUEST,
    LIST_CREATE_SUCCESS,
    LIST_CREATE_FAIL,
    

    LIST_DELETE_REQUEST,
    LIST_DELETE_SUCCESS,
    LIST_DELETE_FAIL,

    LIST_UPDATE_REQUEST,
    LIST_UPDATE_SUCCESS,
    LIST_UPDATE_FAIL,

} from '../constants/listConstants'

export const listLists = (keyword='') => async (dispatch, getState) => {
    try {
        dispatch({ type: LIST_LIST_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/lists${keyword}`, config)
        

        dispatch({
            type: LIST_LIST_SUCCESS,
            payload: data,
            

        })

    } catch (error) {
        dispatch({
            type: LIST_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listListDetails = (id) => async (dispatch,getState) => {
    try {
        dispatch({ type: LIST_DETAILS_REQUEST })

        

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/lists/${id}`, config)

        dispatch({
            type: LIST_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: LIST_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const createList = (list) => async (dispatch, getState) => {
    try {
        dispatch({
            type: LIST_CREATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            '/api/lists/create/',
            list,
            config
        )

        dispatch({
            type: LIST_CREATE_SUCCESS,
            payload: data
        })

        

    } catch (error) {
        dispatch({
            type: LIST_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const updateLists = (lists) => async (dispatch, getState) => {
    try {
        dispatch({
            type: LIST_UPDATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/lists/update/`,
            lists,
            config
        )

        dispatch({
            type: LIST_UPDATE_SUCCESS,
        })

        dispatch({
            type: LIST_DETAILS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: LIST_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const deleteLists = (lists) => async (dispatch, getState) => {
    
    try {
        dispatch({
            type: LIST_DELETE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/lists/delete/`,
            lists,
            config
        )

        dispatch({
            type: LIST_DELETE_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: LIST_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


