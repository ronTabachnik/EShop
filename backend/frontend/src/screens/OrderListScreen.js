import React, {useState,useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'

import { Table,Button, Col,Row, Container } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listOrders,exportOrders } from '../actions/orderActions'

function OrderListScreen() {
    const dispatch = useDispatch()
    let navigate = useNavigate()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const orderList = useSelector(state => state.orderList)
    const {loading,error,orders} = orderList

    useEffect(() => {
        if(userInfo && (userInfo.isAdmin || userInfo.is_worker)){
            dispatch(listOrders())
            // dispatch(exportOrders())
        } else {
            navigate('/login')
        }
        
    },[dispatch,navigate,userInfo])

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
            <Row xs={1} md={2}>
                <Col><h1>List Orders</h1></Col>
                {/* <Col><Button variant="outline-info" onClick={exportOrders()}>Export</Button></Col> */}
            </Row>
            
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>USER</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Paid</th>
                    <th>Delivered</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.user.name}</td>
                            <td>{order.createAt.substring(0,10)}</td>
                            <td>${order.totalPrice}</td>
                            <td>{order.isPaid ? order.paidAt.substring(0,10) : (
                                <i className='fas fa-times' style={{color: 'red'}}></i>
                            )}</td>
                            <td>{order.isDelivered ? order.deliveredAt.substring(0,10) : (
                                <i className='fas fa-times' style={{color:'red'}}></i>
                            )}</td>
                            <td>
                                <LinkContainer to={`/order/${order._id}`}>
                                    <Button className='btn-sm'>Details</Button>
                                </LinkContainer>
                          </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
    </div>
  )
}

export default OrderListScreen
