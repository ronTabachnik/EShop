import axios from 'axios'
import { 
    OFFICE_ORDER_CREATE_REQUEST,
    OFFICE_ORDER_CREATE_SUCCESS,
    OFFICE_ORDER_CREATE_FAIL,

    OFFICE_ORDER_DETAILS_FAIL,
    OFFICE_ORDER_DETAILS_REQUEST,
    OFFICE_ORDER_DETAILS_SUCCESS,
    
    OFFICE_ORDER_LIST_MY_REQUEST,
    OFFICE_ORDER_LIST_MY_SUCCESS,
    OFFICE_ORDER_LIST_MY_FAIL,
    OFFICE_ORDER_LIST_MY_RESET
    } from '../constants/officeOrderConstants'

    export const createOfficeOrder = (officeOrder) => async (dispatch,getState) => {
        try{
            dispatch({type: OFFICE_ORDER_CREATE_REQUEST})
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
                '/api/order/office/add/',
                officeOrder,
                config
                )
    
            dispatch({
                type:OFFICE_ORDER_CREATE_SUCCESS,
                payload: data
            })
    
            
        }catch (error) {
            dispatch({
                type: OFFICE_ORDER_CREATE_FAIL ,
                payload: error.response && error.response.data.detail 
                ? error.response.data.detail
                : error.message,
            })
        }
    
    }

    export const getOfficeOrderDetails = (id) => async (dispatch,getState) => {
        try{
            dispatch({type: OFFICE_ORDER_DETAILS_REQUEST})
            const {
                userLogin: {userInfo},
            } = getState()
            const config = {
                headers:{
                    'Content-type':'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            const { data } = await axios.get(
                `/api/order/office/${id}`,
                config
                )
    
            dispatch({
                type:OFFICE_ORDER_DETAILS_SUCCESS,
                payload: data
            })

            
        }catch (error) {
            dispatch({
                type: OFFICE_ORDER_DETAILS_FAIL ,
                payload: error.response && error.response.data.detail 
                ? error.response.data.detail
                : error.message,
            })
        }
    
    }

    export const listMyOfficeOrders = () => async (dispatch,getState) => {
        try{
            dispatch({type: OFFICE_ORDER_LIST_MY_REQUEST})
            const {
                userLogin: {userInfo},
            } = getState()
            const config = {
                headers:{
                    'Content-type':'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            const { data } = await axios.get(
                `/api/order/office/myorders/`,
                config
                )
    
            dispatch({
                type:OFFICE_ORDER_LIST_MY_SUCCESS,
                payload: data
            })

            
        }catch (error) {
            dispatch({
                type: OFFICE_ORDER_LIST_MY_FAIL ,
                payload: error.response && error.response.data.detail 
                ? error.response.data.detail
                : error.message,
            })
        }
    
    }