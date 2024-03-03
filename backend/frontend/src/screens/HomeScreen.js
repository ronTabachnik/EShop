import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Dropdown } from 'react-bootstrap';
import Product from '../components/Product';
import { listProducts } from '../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listCategories } from '../actions/productActions';

function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products: allProducts } = productList;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories, loading: categoryLoading, error: categoryError } = categoryList;

  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(listCategories());
    dispatch(listProducts());
  }, [dispatch]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = allProducts.filter((product) => {
    const matchCategory = !selectedCategory || product.category_name === selectedCategory;
    const matchName = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchDescription = product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && (matchName || matchDescription);
  });

  return (
    <div>
      <br />
      <br />
      <h1>Latest Products</h1>

      <Row className="align-items-center">
        <Col xs={12} sm={12} md={6} lg={3} className="text-center mb-2 mb-md-0">
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="categoryDropdown">
              {selectedCategory || 'Filter by Category'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {categories.map((category, index) => (
                <Dropdown.Item key={index} onClick={() => handleCategorySelect(category)}>
                  {category}
                </Dropdown.Item>
              ))}
              <Dropdown.Item onClick={() => handleCategorySelect('')}>Show All</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col xs={12} sm={12} md={6} lg={9} className="text-center">
          <div className="d-inline-block w-100">
            <Form.Control
              type="text"
              placeholder="Search by name or description"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </Col>
      </Row>

      {loading || categoryLoading ? (
        <Loader />
      ) : error || categoryError ? (
        <Message variant="danger">{error || categoryError}</Message>
      ) : filteredProducts.length === 0 ? (
        <Message variant="info">No items found for the selected category.</Message>
      ) : (
        <Row>
          {filteredProducts.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default HomeScreen;
