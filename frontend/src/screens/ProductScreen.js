import React,{useState,useEffect} from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row,Col,Image,ListGroup,Button,Card,Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch,useSelector } from 'react-redux'
import axios from 'axios'
import { listProductDetails } from '../actions/productActions'


function ProductScreen() {
    let navigate = useNavigate();
    const [qty,setQty] = useState(1)
    const match = useParams()
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const {loading,error,product} = productDetails
    useEffect(()=>{
        dispatch(listProductDetails(match.id))
    },[dispatch,match.id])
    
    const addToCartHandler = () =>{
        navigate(`/cart/${match.id}?qty=${qty}`) 
    }
        
    return (
    <div>
        <br></br>
        <br></br>
        <Link to='/' className='btn btn-outline-primary my-3'>Go Back</Link>
        {loading ?
            <Loader/>
            :error
                ? <Message variant='danger'>{error}</Message>
            :(
                <Row>
            <Col md={6}>
                <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
                <ListGroup variant='flush'>
                    <ListGroup.Item align="center">
                        <h3>{product.name}</h3>
                    </ListGroup.Item>
                    {/* <ListGroup.Item> */}
                        {/* <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} /> */}
                    {/* </ListGroup.Item> */}
                    <ListGroup.Item>
                        Price: ${product.price}
                    </ListGroup.Item>
                    <ListGroup.Item align="justify">
                        <strong>Description:</strong> {product.description}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={3}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <Row>
                                <Col>Price:</Col>
                                <Col>
                                    <strong>${product.price}</strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Status:</Col>
                                <Col>
                                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'} 
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        {product.countInStock > 0 && (
                            <ListGroup.Item >
                                <Row>
                                    <Col>Qty</Col>
                                    <Col xs='auto' className='my-1'>
                                        <Form.Control  
                                            as="select"
                                            value={qty}
                                            onChange={(e) => setQty(Number(e.target.value))}
                                        >
                                            {
                                                [...Array(product.countInStock).keys()].map((x) =>(
                                                    <option key={x+1} value={x+1}>
                                                        {x+1}
                                                    </option>
                                                ))
                                            }
                                        </Form.Control>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        )}
                        <ListGroup.Item>
                            <center><Button onClick={addToCartHandler} className='btn-block' disabled={product.countInStock === 0 || product.countInStock < 0} type='button'> Add to Cart </Button></center>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
                </Row>
            )
        }
        
    </div>
  )
}

export default ProductScreen