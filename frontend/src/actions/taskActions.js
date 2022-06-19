import axios from 'axios'
import {
    TASK_LIST_REQUEST,
    TASK_LIST_SUCCESS,
    TASK_LIST_FAIL,

    TASK_DETAILS_REQUEST,
    TASK_DETAILS_SUCCESS,
    TASK_DETAILS_FAIL,

    TASK_CREATE_REQUEST,
    TASK_CREATE_SUCCESS,
    TASK_CREATE_FAIL,
    

    TASK_DELETE_REQUEST,
    TASK_DELETE_SUCCESS,
    TASK_DELETE_FAIL,

    TASK_UPDATE_REQUEST,
    TASK_UPDATE_SUCCESS,
    TASK_UPDATE_FAIL,

} from '../constants/taskConstants'

export const listTasks = (keyword='') => async (dispatch, getState) => {
    try {
        dispatch({ type: TASK_LIST_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/tasks${keyword}`, config)
        

        dispatch({
            type: TASK_LIST_SUCCESS,
            payload: data,
            

        })

    } catch (error) {
        dispatch({
            type: TASK_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listTaskDetails = (id) => async (dispatch,getState) => {
    try {
        dispatch({ type: TASK_DETAILS_REQUEST })

        

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/tasks/${id}`, config)

        dispatch({
            type: TASK_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: TASK_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const createTask = (task) => async (dispatch, getState) => {
    try {
        dispatch({
            type: TASK_CREATE_REQUEST
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
            '/api/tasks/create/',
            task,
            config
        )

        dispatch({
            type: TASK_CREATE_SUCCESS,
            payload: data
        })

        

    } catch (error) {
        dispatch({
            type: TASK_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const updateTasks = (tasks) => async (dispatch, getState) => {
    try {
        dispatch({
            type: TASK_UPDATE_REQUEST
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
            `/api/tasks/update/`,
            tasks,
            config
        )

        dispatch({
            type: TASK_UPDATE_SUCCESS,
        })

        dispatch({
            type: TASK_DETAILS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: TASK_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const deleteTask = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: TASK_DELETE_REQUEST
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

        const { data } = await axios.delete(
            `/api/tasks/delete/${id}/`,
            config
        )

        dispatch({
            type: TASK_DELETE_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: TASK_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


