import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'




function Product({ product }) {
  let navigate = useNavigate();
  
  const addToCartHandler = () =>{
    navigate(`/cart/${product._id}?qty=1`) 
  }

  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as='h4'>${product.price}</Card.Text>
        <Button onClick={addToCartHandler} className='btn-block' disabled={product.countInStock === 0 || product.countInStock < 0} type='button'> Add to Cart </Button>
      </Card.Body>
    </Card>
  );
}

export default Product;
