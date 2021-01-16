import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
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
import "./App.css";
import {
  IoIosCart,IoIosSearch} from 'react-icons/io'

import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { getAllCategory } from './actions/categoryActions';
import ProductUserScreen from './screens/ProductUserScreen';
import ProductDetailsPage from './screens/ProductDetailsPage';


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
<Navbar collapseOnSelect fixed="top" expand="lg" bg="light" variant="light" style={{zIndex:1}}>
                          <Container >

  <Navbar.Brand href="/home">Rshine</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  
  <Navbar.Collapse id="responsive-navbar-nav">
  <div className="searchInputContainer">
            <input
              className="searchInput"
              placeholder={"search for products, brands and more"}
            />
            <div className="searchIconContainer">
              <IoIosSearch
                style={{
                  color: "#2874f0",
                }}
              />
            </div>
          </div>
    <Nav className="ml-auto">
    <Nav>
      <Nav.Link href="/cart">    <div style={{ fontSize: "19px", position: "relative" }}>
{cartItems.length > 0 && (
<span style={{
          position: "absolute",
          background: "red",
          color:"white",
          width: "16px",
          height: "16px",
          borderRadius: "5px",
          fontSize: "10px",
          border: "1px solid #fff",
          textAlign: "center",
          alignSelf: "center",

        
        }}>{cartItems.length}</span> )}<IoIosCart size="25"/> Cart</div> </Nav.Link>
     
    </Nav>
    <NavDropdown className="dropDown " title={userInfo.name} id="collasible-nav-dropdown"> 
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
<Navbar collapseOnSelect fixed="top" expand="lg" bg="light" variant="light" style={{zIndex:1}}>
<Container >

  <Navbar.Brand href="#home">Rshine</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
  <div className="searchInputContainer">
            <input
              className="searchInput"
              placeholder={"search for products, brands and more"}
            />
            <div className="searchIconContainer">
              <IoIosSearch
                style={{
                  color: "#2874f0",
                }}
              />
            </div>
          </div>
    <Nav className="ml-auto">
    <Nav>
    <Nav.Link href="/cart">    <div style={{ fontSize: "19px", position: "relative" }}>
{cartItems.length > 0 && (
<span style={{
          position: "absolute",
          background: "red",
          color:"white",
          width: "16px",
          height: "16px",
          borderRadius: "5px",
          fontSize: "10px",
          border: "1px solid #fff",
          textAlign: "center",
          alignSelf: "center",

        
        }}>{cartItems.length}</span> )}<IoIosCart size="25"/> Cart</div> </Nav.Link>
     
    </Nav>
   
    <NavDropdown className="dropDown " title={userInfo.name} id="collasible-nav-dropdown"> 
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
<Navbar collapseOnSelect fixed="top" expand="lg"  bg="light" variant="light" style={{zIndex:1}}>
<Container >

  <Navbar.Brand href="#home">Rshine</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
  <div className="searchInputContainer">
            <input
              className="searchInput"
              placeholder={"search for products, brands and more"}
            />
            <div className="searchIconContainer">
              <IoIosSearch
                style={{
                  color: "#2874f0",
                }}
              />
            </div>
          </div>
    <Nav className="ml-auto">
    <Nav>
    <Nav.Link href="/cart">    <div style={{ fontSize: "19px", position: "relative" }}>
{cartItems.length > 0 && (
<span style={{
          position: "absolute",
          background: "red",
          color:"white",
          width: "16px",
          height: "16px",
          borderRadius: "5px",
          fontSize: "10px",
          border: "1px solid #fff",
          textAlign: "center",
          alignSelf: "center",

        
        }}>{cartItems.length}</span> )}<IoIosCart size="25"/> Cart</div> </Nav.Link>

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
<Route path="/cart/:id?" component={CartScreen} exact></Route>
<Route path="/product/:id/edit" component={ProductEditScreen} exact></Route> 
{/* <Route path="/:product/:id" component={ProductScreen} exact></Route> */}
<Route path="/" component={HomeScreen} exact></Route>
<Route path="/:productSlug/:productId/p" component={ProductDetailsPage} ></Route>
<Route path="/:slug" component={ProductUserScreen} exact></Route>


    </BrowserRouter>
    
  );
}

export default App;
