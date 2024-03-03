import React, {useState,useEffect} from 'react'
import { useLocation,useNavigate,useParams } from 'react-router-dom'
import { Button,Col,Row,ListGroup,Image,Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails,payOrder,deliverOrder } from '../actions/orderActions'
import { PayPalButtons } from "@paypal/react-paypal-js";
import { ORDER_PAY_RESET,ORDER_DELIVER_RESET } from '../constants/orderConstants'
// PAYPAL PAYMENTS IS NOT WORKING!!!!
function OrderScreen() {
    const match = useParams()
    const orderId = match.id
    const dispatch = useDispatch()
    let navigate = useNavigate();
    
    // const [sdkReady,setSdkReady] = useState(false)
    
    const orderDetails = useSelector(state=>state.orderDetails)
    const {order,error,loading} = orderDetails  

    const orderPay = useSelector(state=>state.orderPay)
    const {loading:loadingPay,success:successPay} = orderPay  

    const orderDeliver  = useSelector(state=>state.orderDeliver)
    const {loading:loadingDeliver,success:successDeliver} = orderDeliver  

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    if(!loading && !error){
        order.itemsPrice = order.orderItems.reduce((acc,item)=> acc + item.price * item.qty,0).toFixed(2)
    }
    // AfWfQt1RJYO5WcSN2n1kgdNF8WelZcO4x9la1SSC2ASrwTw-2eX2q3slcErYorTy5DVR9ubd-aBCaP0M

    // const addPaypalScript = () => {
    //     const script = document.createElement('script')
    //     script.type = 'text/javascript'
    //     script.src = 'https://www.paypal.com/sdk/js?client-id=AfWfQt1RJYO5WcSN2n1kgdNF8WelZcO4x9la1SSC2ASrwTw-2eX2q3slcErYorTy5DVR9ubd-aBCaP0M&currency=USD'
    //     script.async = true
    //     script.onload = () =>{
    //         setSdkReady(true)
    //     }
    //     document.body.appendChild(script)
    // }
    useEffect(() => {
        if(!order || successPay || order._id !== Number(orderId) || successDeliver ){
            dispatch({type:ORDER_PAY_RESET})
            dispatch({type:ORDER_DELIVER_RESET})
            dispatch(getOrderDetails(orderId))
        } else if(!order.isPaid){
            // if(!window.paypal){
            //     addPaypalScript()
            // }else{
            //     setSdkReady(true)
            // }
        }
    },[dispatch,orderId,successPay,successDeliver])

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(order))
    }
    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }


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
        <h1>Order: {order._id}</h1>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {order.orderItems.length === 0 ? <Message variant='info'>
                            order is empty
                        </Message> : (
                            <ListGroup variant='flush'>
                                {order.orderItems.map((item,index)=> (
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={1}>
                                                <Image src={item.image} alt={item.name} fluid rounded/>
                                            </Col>
                                            <Col>
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </Col>
                                            <Col md={4}>
                                                {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
            <center><Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>
        
                        <ListGroup.Item>
                            <Row>
                                <Col>Items:</Col>
                                <Col>${order.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        {/* <ListGroup.Item>
                            <Row>
                                <Col>Shipping:</Col>
                                <Col>${order.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item> */}

                        {/* <ListGroup.Item>
                            <Row>
                                <Col>Tax:</Col>
                                <Col>${order.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item> */}
                        
                        <ListGroup.Item>
                            <Row>
                                <Col>Total:</Col>
                                <Col>${order.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                        <p><strong>Name: </strong>{order.user.name}</p>
                        <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                        {order.isPaid ? (
                            <Message variant='success'>Paid on {order.paidAt.substring(0,10)}</Message>
                        ) : (
                            <Message variant='warning'>Not Paid</Message>
                        )}
                        {order.isDelivered ? (
                            <Message variant='success'>Delivered on {order.deliveredAt.substring(0,10)}</Message>
                        ) : (
                            <Message variant='warning'>Not Delivered</Message>
                        )}
                        </ListGroup.Item>
                    </ListGroup>
                    {/* order.isPaid && */}
                    {userInfo && userInfo.isAdmin && !order.isDelivered && ( 
                        <ListGroup.Item>
                            <Button
                                type='button'
                                className='btn btn-block'
                                onClick={deliverHandler}
                            >
                                Mark As Deliver
                            </Button>
                        </ListGroup.Item>
                    )}
                    {userInfo && userInfo.isAdmin && !order.isPaid && ( 
                        <ListGroup.Item>
                            <Button
                                type='button'
                                className='btn btn-block'
                                onClick={successPaymentHandler}
                            >
                                Mark As Paid
                            </Button>
                        </ListGroup.Item>
                    )}
                </Card></center>
            </Col>
        </Row>
    </div>
  )
}

export default OrderScreen
