import { 
    OFFICE_PRODUCT_LIST_REQUEST,
    OFFICE_PRODUCT_LIST_SUCCESS,
    OFFICE_PRODUCT_LIST_FAIL,

    OFFICE_PRODUCT_DETAILS_REQUEST,
    OFFICE_PRODUCT_DETAILS_SUCCESS,
    OFFICE_PRODUCT_DETAILS_FAIL,

    OFFICE_PRODUCT_DELETE_REQUEST,
    OFFICE_PRODUCT_DELETE_SUCCESS,
    OFFICE_PRODUCT_DELETE_FAIL,

    OFFICE_PRODUCT_CREATE_REQUEST,
    OFFICE_PRODUCT_CREATE_SUCCESS,
    OFFICE_PRODUCT_CREATE_FAIL,
    OFFICE_PRODUCT_CREATE_RESET,

    OFFICE_PRODUCT_UPDATE_REQUEST,
    OFFICE_PRODUCT_UPDATE_SUCCESS,
    OFFICE_PRODUCT_UPDATE_FAIL,
    OFFICE_PRODUCT_UPDATE_RESET,

 } from '../constants/officeProductConstants'
import axios from 'axios'

 export const listOfficeProducts = () => async (dispatch) => {
    try{
        dispatch({type: OFFICE_PRODUCT_LIST_REQUEST})
        const { data } = await axios.get('/api/products/office/')

        dispatch({
            type:OFFICE_PRODUCT_LIST_SUCCESS,
            payload: data
        })

    }catch (error) {
        // console.log(error)
        dispatch({
            type: OFFICE_PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.detail 
            ? error.response.data.detail
            : error.message,
        })
    }

 }


 export const listOfficeProductDetails = (id) => async (dispatch) => {
    try{
        dispatch({type: OFFICE_PRODUCT_DETAILS_REQUEST})
        const { data } = await axios.get(`/api/products/office/${id}`)

        dispatch({
            type:OFFICE_PRODUCT_DETAILS_SUCCESS,
            payload: data
        })

    }catch (error) {
        dispatch({
            type: OFFICE_PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.detail 
            ? error.response.data.detail
            : error.message,
        })
    }

 }

 export const deleteOfficeProduct = (id) => async (dispatch,getState) => {
    try{
        dispatch({type: OFFICE_PRODUCT_DELETE_REQUEST})
        const {
            userLogin: {userInfo},
        } = getState()
        const config = {
            headers:{
                'Content-type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.delete(
            `/api/products/office/delete/${id}/`,
            config
            )

        dispatch({
            type:OFFICE_PRODUCT_DELETE_SUCCESS,
        })

        
    }catch (error) {
        dispatch({
            type: OFFICE_PRODUCT_DELETE_FAIL ,
            payload: error.response && error.response.data.detail 
            ? error.response.data.detail
            : error.message,
        })
    }

}

export const createOfficeProduct = () => async (dispatch,getState) => {
    try{
        dispatch({type: OFFICE_PRODUCT_CREATE_REQUEST})
        const {
            userLogin: {userInfo},
        } = getState()
        const config = {
            headers:{
                'Content-type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post(
            `/api/products/office/create/`,
            {},
            config
            )
        dispatch({
            type: OFFICE_PRODUCT_CREATE_SUCCESS,
            payload: data,
        })

        
    }catch (error) {
        dispatch({
            type: OFFICE_PRODUCT_CREATE_FAIL ,
            payload: error.response && error.response.data.detail 
            ? error.response.data.detail
            : error.message,
        })
    }

}

export const updateOfficeProduct = (officeProduct) => async (dispatch,getState) => {
    try{
        dispatch({type: OFFICE_PRODUCT_UPDATE_REQUEST})
        const {
            userLogin: {userInfo},
        } = getState()
        const config = {
            headers:{
                'Content-type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(
            `/api/products/office/update/${officeProduct._id}/`,
            officeProduct,
            config
            )

        dispatch({
            type:OFFICE_PRODUCT_UPDATE_SUCCESS,
            payload: data,
        })

        dispatch({
            type:OFFICE_PRODUCT_DETAILS_SUCCESS,
            payload:data
        })

    }catch (error) {
        dispatch({
            type: OFFICE_PRODUCT_UPDATE_FAIL ,
            payload: error.response && error.response.data.detail 
            ? error.response.data.detail
            : error.message,
        })
    }

}