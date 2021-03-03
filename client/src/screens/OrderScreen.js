import Axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsOrder, payOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_PAY_RESET } from '../constants/orderConstants';
import { generatePublicUrl } from '../urlConfig';
import { Navbar, Container } from 'react-bootstrap';
import Logo from '../rshineLogo.png'
import CheckoutSteps from '../components/CheckoutSteps';
import FooterShippingScreen from './FooterShippingScreen'

export default function OrderScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const orderId = props.match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;

  const dispatch = useDispatch();
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await Axios.get('https://backend-rshine.herokuapp.com/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}&currency=CAD`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order || successPay || (order && order._id !== orderId)) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, order, orderId, sdkReady, successPay]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };

  return (
    <div className="orderScreen">
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
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
              <div class="container">
                <div className="container checkout"><CheckoutSteps step1 step2 step3 step4 ></CheckoutSteps></div>
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
                                  <strong class="text-dark">{order.shippingAddress.address},{order.shippingAddress.city},{order.shippingAddress.province},{order.shippingAddress.postalCode}</strong>
                                  <a class="text-info" href="/shipping">Change</a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="card mb-4">
                        <div class="card-body">
                          <h2 class="orderItemDetails mb-4">
                            Order Items</h2>
                          {order.orderItems.map((item) => (
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
                    </div>
                    <div class="col-lg-6">
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
                                    CA${order.orderItems.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2)}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="row mb-4">
                              <div class="col-md-7 col-lg-12">
                                <div class="d-flex justify-content-between">
                                  Shipping
                              <div class="orderItem ">CA${order.shippingPrice.toFixed(2)}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="row mb-4">
                              <div class="col-md-7 col-lg-12">
                                <div class="d-flex justify-content-between">
                                  Taxes
                          <div class="orderItem ">
                                    CA${order.taxPrice.toFixed(2)}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <hr class="shipping-hr mb-4 mt-0 d-inline-block mx-auto w-100" />
                            <div class="row mb-4">
                              <div class="col-md-7 col-lg-12">
                                <div class="d-flex justify-content-between">
                                  Total
                          <div class="orderItem ">CA${order.totalPrice.toFixed(2)} </div>
                                </div>
                              </div>
                            </div>
                          </ul>

                          {loading && <LoadingBox></LoadingBox>}
                          {error && <MessageBox variant="danger">{error}</MessageBox>}
                        </div>
                      </div>
                      <div class="card mb-4">
                        <div class="card-body">
                          <h2 class="orderMethod">Select a payment method</h2>  {order.isPaid && (
                            alert('Payment completed successfully')
                          )}
                          {!order.isPaid && (
                            <>
                              {!sdkReady ? (
                                <LoadingBox></LoadingBox>
                              ) : (
                                  <>
                                    {errorPay && (
                                      <MessageBox variant="danger">{errorPay}</MessageBox>
                                    )}
                                    {loadingPay && <LoadingBox></LoadingBox>}

                                    <PayPalButton
                                      amount={order.totalPrice}

                                      onSuccess={successPaymentHandler}
                                      options={{
                                        currency: "CAD"
                                      }}
                                    ></PayPalButton>
                                  </>
                                )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            )}
        <FooterShippingScreen />
      </>
    </div>
  )
}