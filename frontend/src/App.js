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
import { IoIosCart } from 'react-icons/io';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { getAllCategory } from './actions/categoryActions';
import ProductUserScreen from './screens/ProductUserScreen';
import ProductDetailsPage from './screens/ProductDetailsPage';
import Logo from './rshineLogo.png'
import CrouselAdminScreen from './screens/CrouselAdminScreen';
import AboutUsScreen from './screens/AboutUsScreen';

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
  }, [dispatch]);

  return (
    <BrowserRouter>
      {userInfo && userInfo.isAdmin ? (
        <Navbar collapseOnSelect fixed="top" expand="lg" bg="light" variant="light">
          <Container >
            <Navbar.Brand href="/"><img
              src={Logo}
              width="180"
              height="80"
              className="d-inline-block align-top imgStyle"
              alt="React Bootstrap logo"
            /></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <div class="input-group">
                <input type="text" class="form-control" placeholder="What are you looking for? " />
                <div class="input-group-append">
                  <button class="btnSearch" type="button">
                    <i class="fa fa-search"></i>
                  </button>
                </div>
              </div>
              <Nav className="ml-auto">
                <Nav.Link href="/cart" className="cartBtn">
                  {cartItems.length > 0 && (
                    <span style={{
                      position: "absolute",
                      background: "#00bbcc",
                      color: "black",
                      width: "18px",
                      height: "20px",
                      borderRadius: "50px",
                      fontSize: "12px",
                      border: "2px solid #ffd480",
                      textAlign: "center",
                      alignSelf: "center",
                      marginLeft: 50
                    }}>{cartItems.reduce((a, c) => a + c.qty, 0)}</span>)}<IoIosCart size="22" style={{ color: "black", marginLeft: 30, marginRight: 25 }} />  </Nav.Link>
                <NavDropdown title={userInfo.name} id="collasible-nav-dropdown">
                  <NavDropdown.Item href="/Home">Home</NavDropdown.Item>
                  <NavDropdown.Item href="#signout" onClick={signoutHandler}>Sign Out</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      ) :
        (
          userInfo ? (
            <>
              <Navbar collapseOnSelect fixed="top" bg="light" expand="lg" variant="light" >
                <Container >
                  <Navbar.Brand href="/"><img
                    src={Logo}
                    width="180"
                    height="80"
                    className="d-inline-block align-top imgStyle"
                    alt="React Bootstrap logo"
                  /></Navbar.Brand>
                  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                  <Navbar.Collapse id="responsive-navbar-nav">
                    <div class="input-group ">
                      <input type="text" class="form-control" placeholder="What are you looking for?" />
                      <div class="input-group-append">
                        <button class=" btnSearch" type="button">
                          <i class="fa fa-search"></i>
                        </button>
                      </div>
                    </div>
                    <Nav className=" ml-auto">
                      <Nav.Link href="/cart" className="cartBtn">
                      
                        {cartItems.length > 0 && (
                          <span style={{
                            position: "absolute",
                            background: "#00bbcc",
                            color: "black",
                            width: "18px",
                            height: "20px",
                            borderRadius: "50px",
                            fontSize: "12px",
                            border: "2px solid #ffd480",
                            textAlign: "center",
                            alignSelf: "center",
                            marginLeft: 50
                          }}>{cartItems.reduce((a, c) => a + c.qty, 0)}</span>)}<IoIosCart size="22" style={{ color: "black", marginLeft: 30, marginRight: 25 }} />  </Nav.Link>
                      <NavDropdown title={userInfo.name} id="collasible-nav-dropdown" >
                        <NavDropdown.Item href="/Profile">User Profile</NavDropdown.Item>
                        <NavDropdown.Item href="/orderhistory">Order History</NavDropdown.Item>
                        <NavDropdown.Item href="#signout" onClick={signoutHandler}>Sign Out</NavDropdown.Item>
                      </NavDropdown>
                    </Nav>
                  </Navbar.Collapse>
                </Container>
              </Navbar>
            </>
          ) : (
              <Navbar collapseOnSelect fixed="top" expand="lg" bg="light" variant="light">
                <Container >
                  <Navbar.Brand href="/"><img
                    src={Logo}
                    width="180"
                    height="80"
                    className="d-inline-block align-top imgStyle"
                    alt="React Bootstrap logo"
                  /></Navbar.Brand>
                  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                  <Navbar.Collapse id="responsive-navbar-nav">
                    <div class="input-group">
                      <input type="text" class="form-control" placeholder="What are you looking for? " />
                      <div class="input-group-append">
                        <button class="btnSearch" type="button">
                          <i class="fa fa-search"></i>
                        </button>
                      </div>
                    </div>
                    <Nav className="ml-auto">
                      <Nav>
                        <Nav.Link href="/cart" className="cartBtn">
                          {cartItems.length > 0 && (
                            <span style={{
                              position: "absolute",
                              background: "#00bbcc",
                              color: "black",
                              width: "18px",
                              height: "20px",
                              borderRadius: "50px",
                              fontSize: "12px",
                              border: "1px solid #ffd480",
                              textAlign: "center",
                              alignSelf: "center",
                              marginLeft: 50
                            }}>{cartItems.reduce((a, c) => a + c.qty, 0)}</span>)}<IoIosCart size="22" style={{ color: "black", marginLeft: 30, marginRight: 25 }} />  </Nav.Link>
                        <Nav.Link href="/signin" className=" signinBtn " style={{ color: "black", fontSize: "14px", paddingTop: 11 }}>Sign<span className="pl-1">In</span>  </Nav.Link>
                        <Nav.Link href="/register" className="registerBtn " style={{ color: "black", fontSize: "14px", paddingTop: 11 }}>Register</Nav.Link>
                      </Nav>
                    </Nav>
                  </Navbar.Collapse>
                </Container>
              </Navbar>
            )
        )}

      <AdminRoute path="/Home" component={AdminHomeScreen} exact />
      <AdminRoute path="/Category" component={CategoryScreen} />
      <AdminRoute path="/Productlist" component={ProductAdminScreen} />
      <AdminRoute path="/CrouselImages" component={CrouselAdminScreen} />
      <PrivateRoute path="/Profile" component={ProfileScreen}></PrivateRoute>
      <Route path="/" component={HomeScreen} exact></Route>
      <Route path="/AboutUs" component={AboutUsScreen} exact></Route>
      <Route path="/signin" component={SigninScreen}></Route>
      <Route path="/register" component={RegisterScreen}></Route>
      <Route path="/shipping" component={ShippingAddressScreen}></Route>
      <Route path="/payment" component={PaymentMethodScreen}></Route>
      <Route path="/placeorder" component={PlaceOrderScreen}></Route>
      <Route path="/order/:id" component={OrderScreen}></Route>
      <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
      <Route path="/cart/:id?" component={CartScreen} exact></Route>
      <Route path="/product/:id/edit" component={ProductEditScreen} exact></Route>
      <Route path="/:productSlug/:productId/p" component={ProductDetailsPage} exact ></Route>
      <Route path="/:slug" component={ProductUserScreen} exact></Route>
    </BrowserRouter>
  );
}

export default App;
