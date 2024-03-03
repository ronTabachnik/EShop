import { 
    OFFICE_ORDER_CREATE_REQUEST,
    OFFICE_ORDER_CREATE_SUCCESS,
    OFFICE_ORDER_CREATE_FAIL,
    OFFICE_ORDER_CREATE_RESET,

    OFFICE_ORDER_DETAILS_REQUEST,
    OFFICE_ORDER_DETAILS_SUCCESS,
    OFFICE_ORDER_DETAILS_FAIL,

    OFFICE_ORDER_LIST_MY_REQUEST,
    OFFICE_ORDER_LIST_MY_SUCCESS,
    OFFICE_ORDER_LIST_MY_FAIL,
    OFFICE_ORDER_LIST_MY_RESET, } from '../constants/officeOrderConstants'

export const officeOrderCreateReducer = (state={},action) => {
    switch(action.type){
        case OFFICE_ORDER_CREATE_REQUEST:
            return{
                loading: true
            }
        case OFFICE_ORDER_CREATE_SUCCESS:
            return{
                loading: false,
                success: true,
                kitchenOrder: action.payload
            }
        case OFFICE_ORDER_CREATE_FAIL:
            return{
                loading: false,
                error: action.payload
            }

        case OFFICE_ORDER_CREATE_RESET:
            return{}
        default:
            return state
    }
}

export const officeOrderDetailsReducer = (state={loading:true,officeOrderItems:[]},action) => {
    switch(action.type){
        case OFFICE_ORDER_DETAILS_REQUEST:
            return{
                ...state,
                loading: true
            }
        case OFFICE_ORDER_DETAILS_SUCCESS:
            return{
                loading: false,
                officeOrder: action.payload
            }
        case OFFICE_ORDER_DETAILS_FAIL:
            return{
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}

export const officeOrderListMyReducer = (state={officeOrders:[]},action) => {
    switch(action.type){
        case OFFICE_ORDER_LIST_MY_REQUEST:
            return{
                loading: true
            }
        case OFFICE_ORDER_LIST_MY_SUCCESS:
            return{
                loading: false,
                officeOrders: action.payload
            }
        case OFFICE_ORDER_LIST_MY_FAIL:
            return{
                loading: false,
                error: action.payload
            }
        case OFFICE_ORDER_LIST_MY_RESET:
            return{
                officeOrders:[]
            }
            
        default:
            return state
    }
}