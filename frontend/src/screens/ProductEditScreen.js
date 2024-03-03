import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';
import { listProductDetails, updateProduct,listCategories,createCategory } from '../actions/productActions';

function ProductEditScreen() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const match = useParams();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories, loading: categoryLoading, error: categoryError } = categoryList;

  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = productUpdate;

  const productId = match.id;
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!userInfo || (!userInfo.isAdmin && !userInfo.is_worker)) {
      navigate('/login');
    } else {
      dispatch(listCategories());
      if (successUpdate) {
        dispatch({ type: PRODUCT_UPDATE_RESET });
        navigate('/admin/productlist');
      } else {
        if (!product.name || product._id !== Number(productId)) {
          dispatch(listProductDetails(productId));
        } else {
          setName(product.name);
          setPrice(product.price);
          setImage(product.image);
          setBrand(product.brand);
          setCategory(product.category_name);
          setCountInStock(product.countInStock);
          setDescription(product.description);
        }
      }
    }
  }, [navigate, productId, product, userInfo, dispatch, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    );
  };

const uploadFileHandler = async (e) => {
  const file = e.target.files[0]
  const formData = new FormData()
  formData.append('image',file)
  formData.append('product_id',productId)
  setUploading(true)
  try{
    const config = {
      headers:{
        'Content-Type':'multipart/form-data'
      }
    }
    const {data} = await axios.post('/api/products/upload/',formData,config)
    setImage(data)
    setUploading(false)
  }catch(error) {
    console.log(error)
    setUploading(false)
  }
}

  return (
    <div>
      <br />
      <br />
      <Link to='/admin/productlist' className='btn btn-outline-primary my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control type='name' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control type='number' placeholder='Enter price' value={price} onChange={(e) => setPrice(e.target.value)} />
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control type='text' placeholder='Enter image' value={image} onChange={(e) => setImage(e.target.value)}></Form.Control>
              {/* <Form.File id='image-file' Label='Choose File' custom onChange={uploadFileHandler}></Form.File> */}
              <Form.Control
                type='file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></Form.Control>
              {uploading && <Loader/>}
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control type='text' placeholder='Enter brand' value={brand} onChange={(e) => setBrand(e.target.value)} />
            </Form.Group>

            {userInfo && userInfo.isAdmin && (
              <Form.Group controlId='countInStock'>
                <Form.Label>Stock</Form.Label>
                <Form.Control type='number' placeholder='Enter stock' value={countInStock} onChange={(e) => setCountInStock(e.target.value)} />
              </Form.Group>
            )}

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control as='select' value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value='' disabled>
                  Select a category
                </option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
}

export default ProductEditScreen;
