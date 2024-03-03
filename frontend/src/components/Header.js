import React from 'react'
import { Navbar,Nav,NavItem,NavLink,Container,Row, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import SearchBox from './SearchBox';
import {logout} from '../actions/userAction'
function Header() {
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const dispatch = useDispatch()
  const logoutHandler = () => {
    dispatch(logout())
  }
  return (
    <header>
        <Navbar fixed="top" bg="light" collapseOnSelect expand="lg">
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>TTECH</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <LinkContainer to='/cart'>
              <Nav.Link>Cart<i className='fas fa-shopping-cart'></i></Nav.Link>
            </LinkContainer>
            {userInfo ? (
              <NavDropdown title={userInfo.name} id='username'>
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>

                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
              </NavDropdown>
            ): (
              <LinkContainer to='/login'>
                <Nav.Link>Login <i className='fas fa-user'></i></Nav.Link>
              </LinkContainer>
            )}

            {userInfo && (userInfo.isAdmin ||  userInfo.is_worker) && (
              <NavDropdown title= {userInfo.isAdmin ? 'Admin' : 'Employee'} id='adminmenu'>
                {userInfo.isAdmin && (
                  <LinkContainer to='/admin/userlist'>
                  <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                )}

                <LinkContainer to='/admin/productlist'>
                  <NavDropdown.Item>Products</NavDropdown.Item>
                </LinkContainer>

                <LinkContainer to='/admin/categorylist'>
                  <NavDropdown.Item>Categories</NavDropdown.Item>
                </LinkContainer>
                
                <LinkContainer to='/admin/orderlist'>
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                </LinkContainer>
                
                <LinkContainer to='/admin/office/productlist'>
                  <NavDropdown.Item>Office products</NavDropdown.Item>
                </LinkContainer>

              </NavDropdown>
            )}
            
            </Nav>
            {/* <SearchBox/> */}
          </Navbar.Collapse>
          
        </Container>
      </Navbar>
    </header>
  )
}

export default Header