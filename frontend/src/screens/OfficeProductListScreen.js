import React, {useState,useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navigate, useNavigate,useParams } from 'react-router-dom'
import { Table,Button,Row,Col } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listOfficeProducts, deleteOfficeProduct,createOfficeProduct } from '../actions/officeProductActions'
import { OFFICE_PRODUCT_CREATE_RESET } from '../constants/officeProductConstants'

function OfficeProductListScreen() {
    const dispatch = useDispatch()
    const match = useParams()
    let navigate = useNavigate()

    const officeProductList = useSelector(state=> state.officeProductList)
    const {error,loading,officeProducts} = officeProductList
    
    const officeProductDelete = useSelector(state=> state.officeProductDelete)
    const {error:errorDelete,loading:loadingDelete,success:successDelete} = officeProductDelete

    const officeProductCreate = useSelector(state=> state.officeProductCreate)
    const {error:errorCreate,loading:loadingCreate,success:successCreate,officeProduct:createdProduct} = officeProductCreate

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    
    const deleteHandler = (id) => {
        if(window.confirm('Are you sure you want to delete this office product?')){
            dispatch(deleteOfficeProduct(id))
        }
    }

    const createOfficeProductHandler = (officeProduct) => {
        dispatch(createOfficeProduct())
    }

    useEffect(()=>{
        if (!userInfo && (!userInfo.isAdmin || !userInfo.is_worker)) {
            navigate('/login')    
        } else {
            dispatch({ type: OFFICE_PRODUCT_CREATE_RESET })
            if(successCreate){
                navigate(`/admin/office/product/${createdProduct._id}/edit`)
            } else {
                dispatch(listOfficeProducts())
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
                    <h1>Office products</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' size='sm' variant='outline-primary' onClick={createOfficeProductHandler}>
                        <i className='fas fa-plus'> Create Office product</i>
                    </Button>
                </Col>
            </Row>
            {loadingDelete && <Loader/>}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

            {loadingCreate && <Loader/>}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
            
            {officeProducts.length == 0
        ? <Message variant='danger'>No office products found in the dB</Message>
        :
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>QTY</th>
                    <th>CATEGORY</th>
                    <th>BRAND</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    {officeProducts.map(product => (
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.countInStock}</td>
                            <td>{product.catagory}</td>
                            <td>{product.brand}</td>

                            <td>
                                <LinkContainer to={`/admin/office/product/${product._id}/edit`}>
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

export default OfficeProductListScreen
