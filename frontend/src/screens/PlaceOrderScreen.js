import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { generatePublicUrl } from '../urlConfig';

export default function PlaceOrderScreen(props) {
  const cart = useSelector((state) => state.cart);
  if (!cart.paymentMethod) {
    props.history.push('/payment');
  }
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  // cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.shippingPrice=cart.shippingAddress.city === "ottawa"?toPrice(100) : toPrice(10);
  // cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);

  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
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
 <main>
       
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
                   <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                   <strong>Address: </strong> {cart.shippingAddress.address},
                   {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}
                   ,{cart.shippingAddress.country}
                 </p>
                    </div>
                  
                  </div>
                  <hr class="mb-4"/>
                
                 
  
                </div>
              </div>
  
              <div class="card mb-4">
                <div class="card-body">
  
                  <h5 class="mb-4">Payment</h5>
  
                  <p class="mb-0"> {cart.paymentMethod}</p>
                </div>
              </div>
  
              <div class="card mb-4">
              <div class="card-body">
  
  <h5 class="mb-4">
  Order Items</h5>
  {cart.cartItems.map((item) => (
    <>
  <div class="row mb-4">
    <div class="col-md-5 col-lg-3 col-xl-3">
      <div class="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
        <img class="small"
          src={generatePublicUrl(item.image)} alt={item.name}/>
       
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
  <hr class="mb-4"/>
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
                      <span>CA${cart.shippingPrice.toFixed(2)}</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                    Tax
                      <span>CA${cart.taxPrice.toFixed(2)}</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div>
                        <strong>Total </strong>
                      
                      </div>
                      <span><strong>${cart.totalPrice.toFixed(2)}</strong></span>
                    </li>
                  </ul>
  
                  <button type="button" class="btn btn-primary btn-block waves-effect waves-light" onClick={placeOrderHandler}
    
                disabled={cart.cartItems.length === 0}> Place Order</button>
                  {loading && <LoadingBox></LoadingBox>}
               {error && <MessageBox variant="danger">{error}</MessageBox>}
                </div>
              </div>
  
            
            </div>
          

          </div>
        </section>
  
      </div>
      
    </main>




    // <div>
    //         <div className="contain">

    //   <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
    //   </div>
    //   <div className="row top">
    //     <div className="col-2">
    //       <ul>
    //         <li>
    //           <div className="card card-body">
    //             <h2>Shipping</h2>
    //             <p>
    //               <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
    //               <strong>Address: </strong> {cart.shippingAddress.address},
    //               {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}
    //               ,{cart.shippingAddress.country}
    //             </p>
    //           </div>
    //         </li>
    //         <li>
    //           <div className="card card-body">
    //             <h2>Payment</h2>
    //             <p>
    //               <strong>Method:</strong> {cart.paymentMethod}
    //             </p>
    //           </div>
    //         </li>
    //         <li>
    //           <div className="card card-body">
    //             <h2>Order Items</h2>
    //             <ul>
    //               {cart.cartItems.map((item) => (
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
    //               <div>${cart.itemsPrice.toFixed(2)}</div>
    //             </div>
    //           </li>
    //           <li>
    //             <div className="row">
    //               <div>Shipping</div>
    //               <div>${cart.shippingPrice.toFixed(2)}</div>
    //             </div>
    //           </li>
    //           <li>
    //             <div className="row">
    //               <div>Tax</div>
    //               <div>${cart.taxPrice.toFixed(2)}</div>
    //             </div>
    //           </li>
    //           <li>
    //             <div className="row">
    //               <div>
    //                 <strong> Order Total</strong>
    //               </div>
    //               <div>
    //                 <strong>${cart.totalPrice.toFixed(2)}</strong>
    //               </div>
    //             </div>
    //           </li>
    //           <li>
    //             <button
    //               type="button"
    //               onClick={placeOrderHandler}
    //               className="primary block"
    //               disabled={cart.cartItems.length === 0}
    //             >
    //               Place Order
    //             </button>
    //           </li>
    //           {loading && <LoadingBox></LoadingBox>}
    //           {error && <MessageBox variant="danger">{error}</MessageBox>}
    //         </ul>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}