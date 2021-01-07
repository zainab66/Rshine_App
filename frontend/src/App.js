import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import { signout } from './actions/userActions';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import { BrowserRouter, Route } from 'react-router-dom';
import ProfileScreen from './screens/ProfileScreen';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import ProductAdminScreen from './screens/ProductAdminScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import CategoryScreen from './screens/CategoryScreen';
import AdminHomeScreen from './screens/AdminHomeScreen';

import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { getAllCategory } from './actions/categoryActions';
import ProductUserScreen from './screens/ProductUserScreen';

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(signout());
  };


  useEffect(() => {
    dispatch(getAllCategory());
  }, []);


  return (
    <BrowserRouter>
{userInfo && userInfo.isAdmin ? (
<Navbar collapseOnSelect fixed="top" expand="lg" bg="dark" variant="dark" style={{zIndex:1}}>
                          <Container fluid>

  <Navbar.Brand href="/home">Rshine</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="ml-auto">
    <Nav>
      <Nav.Link href="/cart">Cart {cartItems.length > 0 && (
<span className="badge">{cartItems.length}</span> )}</Nav.Link>
     
    </Nav>
      <NavDropdown title="Admin Dashboard" id="collasible-nav-dropdown"><i className="fa fa-caret-down"></i>
      <NavDropdown.Item href="/home">Home</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#signout" onClick={signoutHandler}>Sign Out</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    
  </Navbar.Collapse>
  </Container>

</Navbar>

):
(
userInfo ? (
<>
<Navbar collapseOnSelect fixed="top" expand="lg" bg="dark" variant="dark">
<Container fluid>

  <Navbar.Brand href="#home">Rshine</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="ml-auto">
    <Nav>
      <Nav.Link href="/cart">Cart {cartItems.length > 0 && (
<span className="badge">{cartItems.length}</span> )}</Nav.Link>
     
    </Nav>
   
    <NavDropdown title={userInfo.name} id="collasible-nav-dropdown"> <i className="fa fa-caret-down"></i>{' '}
        <NavDropdown.Item href="/profile">User Profile</NavDropdown.Item>
        <NavDropdown.Item href="/orderhistory">Order History</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#signout" onClick={signoutHandler}>Sign Out</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    
  </Navbar.Collapse>
  </Container>

</Navbar>

</>
) :(
<Navbar collapseOnSelect fixed="top" expand="lg" bg="dark" variant="dark">
<Container fluid>

  <Navbar.Brand href="#home">Rshine</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="ml-auto">
    <Nav>
      <Nav.Link href="/cart">Cart {cartItems.length > 0 && (
<span className="badge">{cartItems.length}</span> )}</Nav.Link>

</Nav>
<Nav>
      <Nav.Link href="/signin">Signin</Nav.Link>

</Nav>

    </Nav>
    
  </Navbar.Collapse>
  </Container>

</Navbar>

)
)}

        <AdminRoute path="/home" component={AdminHomeScreen} exact/>
        <AdminRoute path="/category" component={CategoryScreen} />
        <AdminRoute path="/productlist" component={ProductAdminScreen} />
      


        <PrivateRoute path="/profile" component={ProfileScreen}></PrivateRoute>

<Route path="/signin" component={SigninScreen}></Route>
<Route path="/register" component={RegisterScreen}></Route>
<Route path="/shipping" component={ShippingAddressScreen}></Route>
<Route path="/payment" component={PaymentMethodScreen}></Route>
<Route path="/placeorder" component={PlaceOrderScreen}></Route>
<Route path="/order/:id" component={OrderScreen}></Route>
<Route path="/orderhistory" component={OrderHistoryScreen}></Route>
<Route path="/cart/:id?" component={CartScreen}></Route>
<Route path="/product/:id/edit" component={ProductEditScreen} exact></Route> 
<Route path="/product/:id" component={ProductScreen} exact></Route>
<Route path="/" component={HomeScreen} exact></Route>   
<Route path="/:slug" component={ProductUserScreen} exact></Route>


    </BrowserRouter>
    
  );
}

export default App;
