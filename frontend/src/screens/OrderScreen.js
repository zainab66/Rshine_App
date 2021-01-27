import Axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrder, payOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_PAY_RESET } from '../constants/orderConstants';
import { generatePublicUrl } from '../urlConfig';

export default function OrderScreen(props) {
  const orderId = props.match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  console.log("hhhh", order)
  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;
  console.log("www", orderPay)

  const dispatch = useDispatch();
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await Axios.get('/api/config/paypal');
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
    <main >

      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
            <div class="container">

              <section class="mt-5 mb-4">

                <div class="row">

                  <div class="col-lg-8">

                    <div class="card wish-list mb-4">
                      <div class="card-body">

                        <h5 class="mb-4">
                          Shipping</h5>

                        <div class="row mb-4">
                          <div class="">
                            <p>
                              <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                              <strong>Address: </strong> {order.shippingAddress.address},
               {order.shippingAddress.city}, {order.shippingAddress.postalCode}
               ,{order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? (
                              <MessageBox variant="success">
                                Delivered at {order.deliveredAt}
                              </MessageBox>
                            ) : (
                                <MessageBox variant="danger">Not Delivered</MessageBox>
                              )}
                          </div>

                        </div>
                        <hr class="mb-4" />

                      </div>
                    </div>

                    <div class="card mb-4">
                      <div class="card-body">

                        <h5 class="mb-4">Payment</h5>
                        <div>
                          <p class="mb-0"> {order.paymentMethod}</p>

                          <div class="row mb-4">

                            {order.isPaid ? (
                              <MessageBox variant="success">
                                Paid at {order.paidAt}
                              </MessageBox>
                            ) : (
                                <MessageBox variant="danger">Not Paid</MessageBox>
                              )}</div></div>
                      </div>
                    </div>

                    <div class="card mb-4">
                      <div class="card-body">

                        <h5 class="mb-4">
                          Order Items</h5>
                        {order.orderItems.map((item) => (
                          <>
                            <div class="row mb-4">
                              <div class="col-md-5 col-lg-3 col-xl-3">
                                <div class="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
                                  <img class="small"
                                    src={generatePublicUrl(item.image)} alt={item.name} />

                                </div>
                              </div>
                              <div class="col-md-7 col-lg-9 col-xl-9">
                                <div>
                                  <div class="d-flex justify-content-between">
                                    <div>
                                      <h5>{item.name}</h5>

                                    </div>
                                    <div>
                                      <div class="orderItem ">



                                        {item.qty} x ${item.price} = ${item.qty * item.price}





                                      </div>

                                    </div>
                                  </div>

                                </div>
                              </div>
                            </div>
                            <hr class="mb-4" />
                          </>))}

                      </div>
                    </div>

                  </div>

                  <div class="col-lg-4">

                    <div class="card mb-4">
                      <div class="card-body">


                        <ul class="list-group list-group-flush">
                          <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                            Order Summary
                </li>
                          <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                            Delivery
                  <span>CA${order.shippingPrice.toFixed(2)}</span>
                          </li>
                          <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                            Tax
                  <span>CA${order.taxPrice.toFixed(2)}</span>
                          </li>
                          <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                            <div>
                              <strong>Total </strong>

                            </div>
                            <span><strong>${order.totalPrice.toFixed(2)}</strong></span>
                          </li>
                        </ul>
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

                        {loading && <LoadingBox></LoadingBox>}
                        {error && <MessageBox variant="danger">{error}</MessageBox>}
                      </div>
                    </div>


                  </div>


                </div>
              </section>

            </div>
            // <div>
            //   <h1>Order {order._id}</h1>
            //   <div className="row top">
            //     <div className="col-2">
            //       <ul>
            //         <li>
            //           <div className="card card-body">
            //             <h2>Shipping</h2>
            //             <p>
            //               <strong>Name:</strong> {order.shippingAddress.fullName} <br />
            //               <strong>Address: </strong> {order.shippingAddress.address},
            //               {order.shippingAddress.city},{' '}
            //               {order.shippingAddress.postalCode},
            //               {order.shippingAddress.country}
            //             </p>
            //             {order.isDelivered ? (
            //               <MessageBox variant="success">
            //                 Delivered at {order.deliveredAt}
            //               </MessageBox>
            //             ) : (
            //               <MessageBox variant="danger">Not Delivered</MessageBox>
            //             )}
            //           </div>
            //         </li>
            //         <li>
            //           <div className="card card-body">
            //             <h2>Payment</h2>
            //             <p>
            //               <strong>Method:</strong> {order.paymentMethod}
            //             </p>
            //             {order.isPaid ? (
            //               <MessageBox variant="success">
            //                 Paid at {order.paidAt}
            //               </MessageBox>
            //             ) : (
            //               <MessageBox variant="danger">Not Paid</MessageBox>
            //             )}
            //           </div>
            //         </li>
            //         <li>
            //           <div className="card card-body">
            //             <h2>Order Items</h2>
            //             <ul>
            //               {order.orderItems.map((item) => (
            //                 <li key={item.product}>
            //                   <div className="row">
            //                     <div>
            //                       {/* <img
            //                         src={item.image}
            //                         alt={item.name}
            //                         className="small"
            //                       ></img> */}
            //                     </div>
            //                     <div className="min-30">
            //                       <Link to={`/product/${item.product}`}>
            //                         {item.name}
            //                       </Link>
            //                     </div>

            //                     <div>
            //                       {item.qty} x ${item.price} = ${item.qty * item.price}
            //                     </div>
            //                   </div>
            //                 </li>
            //               ))}
            //             </ul>
            //           </div>
            //         </li>
            //       </ul>
            //     </div>
            //     <div className="col-1">
            //       <div className="card card-body">
            //         <ul>
            //           <li>
            //             <h2>Order Summary</h2>
            //           </li>
            //           <li>
            //             <div className="row">
            //               <div>Items</div>
            //               <div>${order.itemsPrice.toFixed(2)}</div>
            //             </div>
            //           </li>
            //           <li>
            //             <div className="row">
            //               <div>Shipping</div>
            //               <div>${order.shippingPrice.toFixed(2)}</div>
            //             </div>
            //           </li>
            //           <li>
            //             <div className="row">
            //               <div>Tax</div>
            //               <div>${order.taxPrice.toFixed(2)}</div>
            //             </div>
            //           </li>
            //           <li>
            //             <div className="row">
            //               <div>
            //                 <strong> Order Total</strong>
            //               </div>
            //               <div>
            //                 <strong>${order.totalPrice.toFixed(2)}</strong>
            //               </div>
            //             </div>
            //           </li>
            //           {!order.isPaid && (
            //             <li>
            //               {!sdkReady ? (
            //                 <LoadingBox></LoadingBox>
            //               ) : (
            //                 <>
            //                   {errorPay && (
            //                     <MessageBox variant="danger">{errorPay}</MessageBox>
            //                   )}
            //                   {loadingPay && <LoadingBox></LoadingBox>}

            //                   <PayPalButton
            //                     amount={order.totalPrice}

            //                     onSuccess={successPaymentHandler}
            //                     options={{
            //                       currency:"CAD"
            //                     }}
            //                   ></PayPalButton>
            //                 </>
            //               )}
            //             </li>
            //           )}
            //         </ul>
            //       </div>
            //     </div>
            //   </div>
            // </div>

          )}
    </main>)
}