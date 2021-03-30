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
import CategoryAdminScreen from './screens/CategoryAdminScreen';
import { IoIosCart } from 'react-icons/io';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { getAllCategory } from './actions/categoryActions';
import ProductUserScreen from './screens/ProductUserScreen';
import ProductDetailsPage from './screens/ProductDetailsPage';
import Logo from './rshineLogo.png'
import CrouselAdminScreen from './screens/CrouselAdminScreen';
import AboutUsScreen from './screens/AboutUsScreen';
import { updateCart } from './actions/cartActions';
import CheckoutPage from './screens/CheckoutPageScreen';
import OrdersAdminScreen from './screens/OrdersAdminScreen';

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
    dispatch(updateCart());
  }, [dispatch,userInfo]);

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
              <Nav>
                <Nav.Link active className="adminLink" href="/Category">Category</Nav.Link>
                <Nav.Link active className="adminLink" href="/Productlist">Products</Nav.Link>
                <Nav.Link active className="adminLink" href="/CrouselImages">Crousel-Images</Nav.Link>
                <Nav.Link active className="adminLink" href="/Orders">Orders</Nav.Link>

              </Nav>
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
                      marginLeft: 18,
                            marginTop: -4   
                    }}>{Object.keys(cartItems).reduce((a, c) => a + cartItems[c].qty, 0)}</span>)}<IoIosCart size="22" style={{ color: "black" }} />  </Nav.Link>
                <Nav.Link active href="#" >Hello,{userInfo.name}</Nav.Link>
                <Nav.Link className="adminLin" href="#signout" onClick={signoutHandler}>Sign Out</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        // <Navbar collapseOnSelect fixed="top" expand="lg" bg="light" variant="light">
        //   <Container >
        //     <Navbar.Brand href="/"><img
        //       src={Logo}
        //       width="180"
        //       height="80"
        //       className="d-inline-block align-top imgStyle"
        //       alt="React Bootstrap logo"
        //     /></Navbar.Brand>
        //     <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        //     <Navbar.Collapse id="responsive-navbar-nav">
        //       <div class="input-group">
        //         <input type="text" class="form-control" placeholder="What are you looking for? " />
        //         <div class="input-group-append">
        //           <button class="btnSearch" type="button">
        //             <i class="fa fa-search"></i>
        //           </button>
        //         </div>
        //       </div>
        //       <Nav className="ml-auto">
        //         <Nav.Link href="/cart" className="cartBtn">
        //           {cartItems.length > 0 && (
        //             <span style={{
        //               position: "absolute",
        //               background: "#00bbcc",
        //               color: "black",
        //               width: "18px",
        //               height: "20px",
        //               borderRadius: "50px",
        //               fontSize: "12px",
        //               border: "2px solid #ffd480",
        //               textAlign: "center",
        //               alignSelf: "center",
        //               marginLeft: 50
        //             }}>{cartItems.reduce((a, c) => a + c.qty, 0)}</span>)}<IoIosCart size="22" style={{ color: "black", marginLeft: 30, marginRight: 25 }} />  </Nav.Link>
        //         <NavDropdown title={userInfo.name} id="collasible-nav-dropdown">
        //           <NavDropdown.Item href="/Home">Home</NavDropdown.Item>
        //           <NavDropdown.Item href="#signout" onClick={signoutHandler}>Sign Out</NavDropdown.Item>
        //         </NavDropdown>
        //       </Nav>
        //     </Navbar.Collapse>
        //   </Container>
        // </Navbar>
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
                    <Nav className="ml-auto pl-2">
                      <Nav.Link href="/cart" className="cartBtn">
                      {cartItems && (

                       
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
                            marginLeft: 28,
                            marginTop: 5
                          }}>{Object.keys(cartItems).reduce((a, c) => a + cartItems[c].qty, 0)}</span>)}<IoIosCart size="22" style={{ color: "black", marginBottom:8,marginTop:8, marginRight: 7, marginLeft: 7}} />  </Nav.Link>
                      {/* <NavDropdown title={userInfo.name} id="collasible-nav-dropdown" >
                        <NavDropdown.Item href="/Profile">User Profile</NavDropdown.Item>
                        <NavDropdown.Item href="/orderhistory">Order History</NavDropdown.Item>
                        <NavDropdown.Item href="#signout" onClick={signoutHandler}>Sign Out</NavDropdown.Item>
                      </NavDropdown> */}
                      </Nav>
                      <Nav>
                      <li class="nav-item avatar dropdown">
                        <button class="nav-link dropdown-toggle" id="navbarDropdownMenuLink-saju" data-toggle="dropdown"
                          aria-haspopup="true" aria-expanded="false">
                          <img src="https://mdbootstrap.com/img/Photos/Avatars/avatar-2.jpg" class="imgAvater rounded-circle z-depth-0"
                            alt="avatar" />
                        </button>
                        <div class="dropdown-menu dropdown-menu-lg-right dropdown"
                          aria-labelledby="navbarDropdownMenuLink-saju">
                          <NavDropdown.Item href="/Profile">User Profile</NavDropdown.Item>
                          <NavDropdown.Item href="/orderhistory">Order History</NavDropdown.Item>
                          <NavDropdown.Item href="#signout" onClick={signoutHandler}>Sign Out</NavDropdown.Item>
                        </div>
                      </li>
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
                    <Nav className="ml-auto pl-2">
                      <Nav.Link href="/cart" className="cartBtn">
                      {cartItems && (
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
                            marginLeft: 28,
                            marginTop: 5 }}>{Object.keys(cartItems).reduce((a, c) => a + cartItems[c].qty, 0)}</span>)}<IoIosCart size="22" style={{ color: "black",marginBottom:8, marginTop:8, marginRight: 7, marginLeft: 7  }} />  </Nav.Link>
                  
                      <Nav.Link href="/signin" className=" signinBtn " style={{ color: "black", margin: 10 }}>Sign<span className="pl-1">In</span>  </Nav.Link>
                      <Nav.Link href="/register" className="registerBtn " style={{ color: "black",marginLeft: 0,margin: 10}}>Register</Nav.Link>
                    </Nav>
                  </Navbar.Collapse>
                </Container>
              </Navbar>
            )
        )}

      {/* <AdminRoute path="/Home" component={AdminHomeScreen} exact /> */}
      <AdminRoute path="/Category" component={CategoryAdminScreen} />
      <AdminRoute path="/Productlist" component={ProductAdminScreen} />
      <AdminRoute path="/CrouselImages" component={CrouselAdminScreen} />
      <AdminRoute path="/Orders" component={OrdersAdminScreen} />

      <PrivateRoute path="/Profile" component={ProfileScreen}></PrivateRoute>
      <Route path="/" component={HomeScreen} exact></Route>
      <Route path="/cart" component={CartScreen} ></Route>
      <Route path="/CheckoutPage" component={CheckoutPage} ></Route>

      <Route path="/AboutUs" component={AboutUsScreen} exact></Route>
      <Route path="/signin" component={SigninScreen}></Route>
      <Route path="/register" component={RegisterScreen}></Route>
      <Route path="/shipping" component={ShippingAddressScreen}></Route>
      <Route path="/payment" component={PaymentMethodScreen}></Route>
      <Route path="/placeorder" component={PlaceOrderScreen}></Route>
      <Route path="/order/:id" component={OrderScreen}></Route>
      <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
      {/* <Route path="/cart/:id?" component={CartScreen} exact></Route> */}

      <Route path="/product/:id/edit" component={ProductEditScreen} exact></Route>
      <Route path="/:productSlug/:productId/p" component={ProductDetailsPage} exact ></Route>
      <Route path="/:slug" component={ProductUserScreen} exact></Route>
    </BrowserRouter>
  );
}

export default App;
