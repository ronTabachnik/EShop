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

export const officeProductListReducer =(state={officeProducts:[]},action) => {
    switch(action.type){
        case OFFICE_PRODUCT_LIST_REQUEST:
            return {loading:true,officeProducts:[]}

        case OFFICE_PRODUCT_LIST_SUCCESS:
            return {loading:false,officeProducts: action.payload}
        
        case OFFICE_PRODUCT_LIST_FAIL:
            return {loading:false,error: action.payload}

        default:
            return state
    }
}

export const officeProductDetailsReducer =(state={officeProduct:{}},action) => {
    switch(action.type){
        case OFFICE_PRODUCT_DETAILS_REQUEST:
            return {loading:true,...state}

        case OFFICE_PRODUCT_DETAILS_SUCCESS:
            return {loading:false,officeProduct: action.payload}
        
        case OFFICE_PRODUCT_DETAILS_FAIL:
            return {loading:false,error: action.payload}

        default:
            return state
    }
}

export const officeProductDeleteReducer =(state={},action) => {
    switch(action.type){
        case OFFICE_PRODUCT_DELETE_REQUEST:
            return {loading:true}

        case OFFICE_PRODUCT_DELETE_SUCCESS:
            return {loading:false,success:true}
        
        case OFFICE_PRODUCT_DELETE_FAIL:
            return {loading:false,error: action.payload}

        default:
            return state
    }
}

export const officeProductCreateReducer =(state={},action) => {
    switch(action.type){
        case OFFICE_PRODUCT_CREATE_REQUEST:
            return {loading:true}

        case OFFICE_PRODUCT_CREATE_SUCCESS:
            return {loading:false,success:true,officeProduct:action.payload}
        
        case OFFICE_PRODUCT_CREATE_FAIL:
            return {loading:false,error: action.payload}

        case OFFICE_PRODUCT_CREATE_RESET:
            return {}

        default:
            return state
    }
}

export const officeProductUpdateReducer =(state={officeProducts:{}},action) => {
    switch(action.type){
        case OFFICE_PRODUCT_UPDATE_REQUEST:
            return {loading:true}

        case OFFICE_PRODUCT_UPDATE_SUCCESS:
            return {loading:false,success:true,officeProducts:action.payload}
        
        case OFFICE_PRODUCT_UPDATE_FAIL:
            return {loading:false,error: action.payload}

        case OFFICE_PRODUCT_UPDATE_RESET:
            return {products:{}}

        default:
            return state
    }
}