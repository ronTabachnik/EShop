import React, {useState,useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navigate, useNavigate,useParams } from 'react-router-dom'
import { Table,Button,Row,Col } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProducts, deleteProduct,createProduct } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

function ProductListScreen() {
    const dispatch = useDispatch()
    const match = useParams()
    let navigate = useNavigate()

    const productList = useSelector(state=> state.productList)
    const {error,loading,products} = productList
    
    const productDelete = useSelector(state=> state.productDelete)
    const {error:errorDelete,loading:loadingDelete,success:successDelete} = productDelete

    const productCreate = useSelector(state=> state.productCreate)
    const {error:errorCreate,loading:loadingCreate,success:successCreate,product:createdProduct} = productCreate

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    
    const deleteHandler = (id) => {
        if(window.confirm('Are you sure you want to delete this product?')){
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = (product) => {
        dispatch(createProduct())
    }

    useEffect(()=>{
        if (!userInfo && ( !userInfo.isAdmin || !userInfo.is_worker )) {
            navigate('/login')    
        } else {
            dispatch({ type: PRODUCT_CREATE_RESET })
            if(successCreate){
                navigate(`/admin/product/${createdProduct._id}/edit`)
            } else {
                dispatch(listProducts())
            }
        }   
    },[dispatch,navigate,userInfo,successDelete,successCreate,createdProduct])

    return loading ? (<Loader/>) : error ? 
        <div>
        <br></br> 
        <br></br>
        <Message variant='danger'>{error}</Message>
        </div> 
        : (
        <div>    
            <br></br> 
            <br></br>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' size='sm' variant='outline-primary' onClick={createProductHandler}>
                        <i className='fas fa-plus'> Create Product</i>
                    </Button>
                </Col>
            </Row>
            {loadingDelete && <Loader/>}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

            {loadingCreate && <Loader/>}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

            {products.length == 0
            ? <Message variant='danger'>No products found in the dB</Message>
            : 
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>PRICE</th>
                    <th>QTY</th>
                    <th>CATEGORY</th>
                    <th>BRAND</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>{product.countInStock}</td>
                            <td>{product.category_name}</td>
                            <td>{product.brand}</td>

                            <td>
                                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                    <Button variant='light' className='btn-sm'>
                                        <i className='fas fa-edit'></i>
                                    </Button>
                                </LinkContainer>
                                <Button className='invisible'></Button>
                                <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
                                        <i className='fas fa-trash'></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            }

    </div>
  )
}

export default ProductListScreen
