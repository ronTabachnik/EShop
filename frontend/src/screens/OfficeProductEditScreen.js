import React, {useState,useEffect} from 'react'
import { Link,useLocation,useNavigate,useParams } from 'react-router-dom'
import { Form,Button,Row,Col } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { OFFICE_PRODUCT_UPDATE_RESET } from '../constants/officeProductConstants'
import { listOfficeProductDetails,updateOfficeProduct } from '../actions/officeProductActions'

function OfficeProductEditScreen() {
    const dispatch = useDispatch()
    let navigate = useNavigate()
    const match = useParams()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const officeProductDetails = useSelector(state => state.officeProductDetails)
    const {error,loading,officeProduct} = officeProductDetails

    const officeProductUpdate = useSelector(state => state.officeProductUpdate)
    const {error: errorUpdate,loading:loadingUpdate,success:successUpdate} = officeProductUpdate
    
    const productId = match.id
    const [name,setName] = useState('')
    const [image,setImage] = useState('')
    const [brand,setBrand] = useState('')
    const [catagory,setCatagory] = useState('')
    const [countInStock,setCountInStock] = useState('')
    const [description,setDescription] = useState('')
    
    
    useEffect(() =>{
        if(!userInfo && (!userInfo.isAdmin || !userInfo.is_worker)){
            navigate('/login')
        } else {
            if(successUpdate){
                dispatch({type:OFFICE_PRODUCT_UPDATE_RESET})
                navigate('/admin/office/productlist')
            } else {
                if(!officeProduct.name || officeProduct._id !== Number(productId)){
                    dispatch(listOfficeProductDetails(productId))
                } else {
                    setName(officeProduct.name)
                    setImage(officeProduct.image)
                    setBrand(officeProduct.brand)
                    setCatagory(officeProduct.catagory)
                    setCountInStock(officeProduct.countInStock)
                    setDescription(officeProduct.description) 
                } 
            }     
        }
    },[navigate,productId,officeProduct,userInfo,dispatch,successUpdate])

    const submitHandler = (e) => {
    e.preventDefault()
        dispatch(updateOfficeProduct({
            _id:productId,
            name,
            image,
            brand,
            catagory,
            countInStock,
            description
        }))
    }
    return (
        <div>
            <br></br>
            <br></br>
            <Link to='/admin/office/productlist' className='btn btn-outline-primary my-3'>
                Go Back
            </Link>
            <FormContainer>
            <h1>Edit Office Product</h1>
            {loadingUpdate && <Loader/>}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : 
            (
                <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='name'
                        placeholder='Enter name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>    

                <Form.Group controlId='image'>
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter image'
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>    

                <Form.Group controlId='brand'>
                    <Form.Label>Brand</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter brand'
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>    

                {userInfo && userInfo.isAdmin && (
                    <Form.Group controlId='countInStock'>
                    <Form.Label>Stock</Form.Label>
                    <Form.Control
                        type='number'
                        placeholder='Enter stock'
                        value={countInStock}
                        onChange={(e) => setCountInStock(e.target.value)}
                    />
                    </Form.Group>
                )}

                <Form.Group controlId='catagory'>
                    <Form.Label>Catagory</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter catagory'
                        value={catagory}
                        onChange={(e) => setCatagory(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>    

                <Form.Group controlId='description'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>    
                
        
                <Button type='submit' variant='primary'>Update</Button>
                </Form>
            )}
        </FormContainer>
        </div>
  )
}
export default OfficeProductEditScreen
