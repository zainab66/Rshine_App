import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { generatePublicUrl } from '../urlConfig';
import { Navbar, Container } from 'react-bootstrap';
import Logo from '../rshineLogo.png'
import FooterShippingScreen from './FooterShippingScreen'


export default function PlaceOrderScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [formData, setFromData] = useState({ flexRadioDefault: "no" });
  const handleChanage = event => {
    const target = event.target
    const name = target.name
    const value = target.value
    setFromData({
      ...formData,
      [name]: value
    })
  }

  const cart = useSelector((state) => state.cart);
  if (!cart.paymentMethod) {
    props.history.push('/payment');
  }
  const { cartItems } = cart;
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );

  if (formData.flexRadioDefault !== 'yes') {
    cart.shippingPrice = cart.shippingAddress.country === "CA" ? toPrice(3.50) : cart.shippingAddress.country === "US" ? toPrice(8.5) : toPrice(16.5).toFixed(2);
  }

  if (formData.flexRadioDefault === 'yes') {
    cart.shippingPrice = cart.shippingAddress.country === "CA" && cart.shippingAddress.province === "Ontario" | cart.shippingAddress.province === "Quebec" ? toPrice(10.5) : toPrice(15.5).toFixed(2);
  }
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  if (formData.flexRadioDefault === 'no') {
    cart.totalPrice = cart.itemsPrice + 3.5 + cart.taxPrice;
  }

  if (formData.flexRadioDefault === 'yes') {
    cart.totalPrice = cart.shippingAddress.country === "CA" && cart.shippingAddress.province === "Ontario" | cart.shippingAddress.province === "Quebec" ? (cart.itemsPrice + 10.5 + cart.taxPrice) : (cart.itemsPrice + 15.5 + cart.taxPrice);
  }

  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };
  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, props.history, success]);
  return (
    <div className="placeOrder">
      <>
        <Navbar collapseOnSelect fixed="top" bg="light" expand="lg" variant="light" >
          <Container >
            <Navbar.Brand href="/"><img
              src={Logo}
              width="170"
              height="70"
              className="d-inline-block align-top imgStyle"
              alt="React Bootstrap logo"
            /></Navbar.Brand>
          </Container>
        </Navbar>
        <div class="container">
          <div className="container checkout"><CheckoutSteps step1 step2 step3  ></CheckoutSteps></div>
          <section class="mt-5 mb-4">
            <div class="row">
              <div class="col-lg-6">
                <div class="card wish-list mb-4">
                  <div class="card-body">
                    <div class=" bg-white rounded box-shadow">
                      <div class="media text-muted pt-1">
                        <div class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                          <div class="d-flex justify-content-between align-items-center w-100">
                            <strong class="text-gray-dark">Contact</strong>
                            <strong class="text-dark">{userInfo.email}</strong>
                            <a class="text-info" href="/shipping">Change</a>
                          </div>
                        </div>
                      </div>
                      <div class="media text-muted pt-3">
                        <div class="media-body pb-1 mb-0 small lh-125 ">
                          <div class="d-flex justify-content-between align-items-center w-100">
                            <strong class="text-gray-dark">Ship to</strong>
                            <strong class="text-dark">{cart.shippingAddress.address}</strong>
                            <a class="text-info" href="/shipping">Change</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card mb-4">
                  <div class="card-body">
                    <h2 class="shippingMethod">Choose your shipping options</h2>
                    <form>
                      <div class="checkbox checkbox-info checkbox-circle pt-4">
                        <div class="d-flex justify-content-between align-items-center w-100">
                          <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="no" onChange={handleChanage} checked={formData.flexRadioDefault === "no"} />
                          <label class="form-check-label" for="flexRadioDefault1">
                            Canada Regular Shipping with no tracking number</label>
                          {/* <strong class="priceShipping text-dark">CA$3.50</strong> */}
                        </div>
                      </div>
                      <div class="checkbox checkbox-info checkbox-circle pt-4">
                        <div class="d-flex justify-content-between align-items-center w-100">
                          <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4" value="yes" onChange={handleChanage} />
                          <label class="form-check-label" for="flexRadioDefault4">
                            Canada Shipping with Tracking
                         </label>
                          {/* <strong class="priceShipping text-dark">CA$10.5</strong> */}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="card mb-4">
                  <div class="card-body">
                    <h2 class="orderItemDetails mb-4">
                      Order Items</h2>
                    {cart.cartItems.map((item) => (
                      <>
                        <div class="row mb-4">
                          <div class="col-md-7 col-lg-12">
                            <div class="d-flex justify-content-between">
                              {item.qty && (
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
                                  marginLeft: 50,
                                  marginTop: -50
                                }}>{item.qty}</span>)}
                              <img class="small"
                                src={item.image} alt={item.name} />
                              <div className="orderItemName">
                                {item.name}
                              </div>
                              <div class="orderItem ">
                                CA${item.qty * item.price}
                              </div>
                            </div>
                          </div>
                        </div>
                      </>))}
                  </div>
                </div>
                <div class="card mb-4">
                  <div class="card-body">
                    <ul class="list-group list-group-flush">
                      <div class="card mb-4">
                        <div class="card-body">
                          <a class="discountCode d-flex justify-content-between" data-toggle="collapse" href="#collapseExample"
                            aria-expanded="false" aria-controls="collapseExample">
                            Add a discount code (optional)
                    <span><i class="fas fa-chevron-down pt-1"></i></span>
                          </a>
                          <div class="collapse" id="collapseExample">
                            <div class="mt-3">
                              <div class="md-form md-outline mb-0">
                                <input type="text" id="discount-code" class="form-control font-weight-light"
                                  placeholder="Enter discount code" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row mb-4">
                        <div class="col-md-7 col-lg-12">
                          <div class="d-flex justify-content-between">
                            Subtotal
                          <div class="orderItem ">
                              CA${cartItems.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row mb-4">
                        <div class="col-md-7 col-lg-12">
                          <div class="d-flex justify-content-between">
                            Shipping
                              <div class="orderItem ">CA${cart.shippingPrice.toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row mb-4">
                        <div class="col-md-7 col-lg-12">
                          <div class="d-flex justify-content-between">
                            Taxes
                          <div class="orderItem ">
                              CA${cart.taxPrice.toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr class="shipping-hr mb-4 mt-0 d-inline-block mx-auto w-100" />
                      <div class="row mb-4">
                        <div class="col-md-7 col-lg-12">
                          <div class="d-flex justify-content-between">
                            Total
                          <div class="orderItem ">CA${cart.totalPrice.toFixed(2)} </div>
                          </div>
                        </div>
                      </div>
                    </ul>
                    <button type="button" class="btnForAll  btn-block waves-effect waves-light" onClick={placeOrderHandler}
                      disabled={cart.cartItems.length === 0}> Continue to Payment</button>
                    {loading && <LoadingBox></LoadingBox>}
                    {error && <MessageBox variant="danger">{error}</MessageBox>}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <FooterShippingScreen />
      </>
    </div>
  );
}