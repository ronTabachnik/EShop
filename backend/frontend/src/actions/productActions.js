import { 
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,

    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,

    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_RESET,

    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_RESET,

    CATEGORY_LIST_REQUEST,
    CATEGORY_LIST_SUCCESS,
    CATEGORY_LIST_FAIL,

    CATEGORY_CREATE_REQUEST,
    CATEGORY_CREATE_SUCCESS,
    CATEGORY_CREATE_FAIL,

    CATEGORY_DELETE_REQUEST,
    CATEGORY_DELETE_SUCCESS,
    CATEGORY_DELETE_FAIL,

 } from '../constants/productConstants'
import axios from 'axios'

 export const listProducts = () => async (dispatch) => {
    try{
        dispatch({type: PRODUCT_LIST_REQUEST})
        const { data } = await axios.get('/api/products/')

        dispatch({
            type:PRODUCT_LIST_SUCCESS,
            payload: data
        })

    }catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.detail 
            ? error.response.data.detail
            : error.message,
        })
    }

 }

 export const listCategories = () => async (dispatch) => {
    try {
      dispatch({ type: CATEGORY_LIST_REQUEST });
      const { data } = await axios.get('/api/products/categories');
      dispatch({
        type: CATEGORY_LIST_SUCCESS,
        payload: data.categories,
      });
    } catch (error) {
      dispatch({
        type: CATEGORY_LIST_FAIL,
        payload: error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
      })
    }
  }

  export const createCategory = (category) => async (dispatch,getState) => {
    try{
        dispatch({type: CATEGORY_CREATE_REQUEST})
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
            `/api/products/categories/create/${category}/`,
            config
            )

        dispatch({
            type:CATEGORY_CREATE_SUCCESS,
            payload: data,
        })

    }catch (error) {
        dispatch({
            type: CATEGORY_CREATE_FAIL ,
            payload: error.response && error.response.data.detail 
            ? error.response.data.detail
            : error.message,
        })
    }

}

 export const listProductDetails = (id) => async (dispatch) => {
    try{
        dispatch({type: PRODUCT_DETAILS_REQUEST})
        const { data } = await axios.get(`/api/products/${id}`)

        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload: data
        })

    }catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.detail 
            ? error.response.data.detail
            : error.message,
        })
    }

 }

 export const deleteCategory = (category) => async (dispatch,getState) => {
    try{
        dispatch({type: CATEGORY_DELETE_REQUEST})
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
            `/api/products/categories/delete/${category}/`,
            config
            )

        dispatch({
            type:CATEGORY_DELETE_SUCCESS,
        })

        
    }catch (error) {
        dispatch({
            type: CATEGORY_DELETE_FAIL ,
            payload: error.response && error.response.data.detail 
            ? error.response.data.detail
            : error.message,
        })
    }

}

 export const deleteProduct = (id) => async (dispatch,getState) => {
    try{
        dispatch({type: PRODUCT_DELETE_REQUEST})
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
            `/api/products/delete/${id}`,
            config
            )

        dispatch({
            type:PRODUCT_DELETE_SUCCESS,
        })

        
    }catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL ,
            payload: error.response && error.response.data.detail 
            ? error.response.data.detail
            : error.message,
        })
    }

}

export const createProduct = () => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_CREATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.post(
            '/api/products/create/',
            {},  // Sending an empty object as the payload
            config
        )

        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const updateProduct = (product) => async (dispatch,getState) => {
    try{
        dispatch({type: PRODUCT_UPDATE_REQUEST})
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
            `/api/products/update/${product._id}/`,
            product,
            config
            )

        dispatch({
            type:PRODUCT_UPDATE_SUCCESS,
            payload: data,
        })

        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data
        })

    }catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL ,
            payload: error.response && error.response.data.detail 
            ? error.response.data.detail
            : error.message,
        })
    }

}