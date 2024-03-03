import React, { useState, useEffect } from 'react';
import { Button, Col, Row, Table,Form,InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { createCategory, deleteCategory, listCategories } from '../actions/productActions';

function CategoryListScreen() {
  const dispatch = useDispatch();

  const categoryList = useSelector((state) => state.categoryList);
  const { categories, loading: categoryLoading, error: categoryError } = categoryList;

  const categoryCreate = useSelector((state) => state.categoryCreate);
  const { error: errorCreate, loading: loadingCreate, success: successCreate } = categoryCreate;

  const categoryDelete = useSelector(state=> state.categoryDelete)
    const {error:errorDelete,loading:loadingDelete,success:successDelete} = categoryDelete

  const [newCategory, setNewCategory] = useState('');
 
  const deleteHandler = (id) => {
    if(window.confirm('Are you sure you want to delete this category?')){
        dispatch(deleteCategory(id))
       }
    }
  const createCategoryHandler = () => {
    dispatch(createCategory(newCategory));
    setNewCategory('')
  };

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch,successDelete,successCreate]);

  return (
    <div>
      <br />
      <br />
      <Row className='align-items-center'>
        <Col>
          <h1>Categories</h1>
        </Col>
        <Col>
        {/* New category creation input */}
     <div class="col-auto">
      <div class="input-group mb-2">
        <div class="input-group-prepend">
          <div class="input-group-text">
          <Button size='md' variant='clear' onClick={createCategoryHandler}>
            Create
          </Button>
          </div>
        </div>
        <input type="text" onChange={(e) => setNewCategory(e.target.value)} class="form-control" id="inlineFormInputGroup" placeholder="Create new category"/>
      </div>
    </div>
        </Col>
      </Row>

      {categoryLoading && <Loader />}
      {categoryError && <Message variant='danger'>{categoryError}</Message>}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

      {categories.length == 0
            ? <Message variant='danger'>No categories found in the dB</Message>
            : 
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                    <th>NAME</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(category => (
                        <tr key={category}>
                            <td>{category}</td>
                            <td>
                                {/* <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                    <Button variant='light' className='btn-sm'>
                                        <i className='fas fa-edit'></i>
                                    </Button>
                                </LinkContainer> */}
                                <Button className='invisible'></Button>
                                <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(category)}>
                                        <i className='fas fa-trash'></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            }
    </div>
  );
}

export default CategoryListScreen;
