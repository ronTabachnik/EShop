import React, {useState,useEffect} from 'react'
import { useLocation,useNavigate } from 'react-router-dom'
import { Form,Button,Col } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

function PaymentScreen() {
    let navigate = useNavigate()
    const dispatch = useDispatch()
    const [paymentMethod,setPaymentMethod] = useState('PayPal')
    
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart
    
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    
    if(!shippingAddress.address){
        navigate('/shipping')
    }

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

    useEffect(() =>{
        if(!userInfo){
            navigate('/login')
        }
    },[dispatch,navigate,userInfo])

  return (
    <FormContainer>
        <br></br>
        <br></br>
        <CheckoutSteps step1 step3/>

        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type={'radio'}
                            label='Paypal or Credit Card'
                            id='paypal'
                            name='paymentMethod'
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
                    </Col>
            </Form.Group>
            <br></br>
            <Button type='submit' variant='primary'>
                Continue
            </Button>
        </Form>
    </FormContainer>
  )
}

export default PaymentScreen
