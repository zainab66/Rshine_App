// import React, { useEffect,useState } from 'react';
// import { addToCart2, removeFromCart } from '../actions/cartActions';
// import { useDispatch, useSelector } from 'react-redux';
// import { generatePublicUrl } from '../urlConfig';
// import FootrScreen from './FootrScreen'
// import { useLocation } from 'react-router-dom';
// import MenueHeader from './MenueHeader'
// import { IoMdCart } from "react-icons/io";
// import { Link } from 'react-router-dom';


// export default function CartScreen(props) {
//   const productId = props.match.params.id;
//   const cart = useSelector((state) => state.cart);
//   //const  cartItems  = cart.cartItems;
//    const [cartItems, setCartItems] = useState(cart.cartItems);
//    const qty = props.location.search
//    ? Number(props.location.search.split('=')[1])
//    : 1;
//    const hh=Object.keys(cartItems).map((key, index) => (
 
//      cartItems[key].qty
     
//   ))
//   // const [qty, setQty] = useState(hh);
// console.log('uuu', props)
//   const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
//   // cart.itemsPrice = toPrice(
//   //   cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
//   // );
//   cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
//   cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
//   //cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (cart.cartItems) {
//       setCartItems(cart.cartItems)
//      // dispatch(addToCart2());
//     }
//   }, [dispatch,cart.cartItems]);

//   useEffect(() => {
//     if (productId) {
//       dispatch(addToCart2(productId, qty));
//     }
//   }, [dispatch, productId, qty]);;


//   const removeFromCartHandler = (id) => {
//     // delete action
//     dispatch(removeFromCart(id));
//   };

//   const checkoutHandler = () => {
//     props.history.push('/signin?redirect=shipping');
//   };
//   return (
//     <>
//       <MenueHeader />
//       <div className="cartDetails">
//         {cartItems.length === 0 ? (<>
//           <main role="main" class="container">
//             <div class="starter-template">
//               Your cart is empty<a href="/" class="btnForAll" ><IoMdCart size={25} style={{ paddingBottom: 4, paddingLeft: 4 }} /><span className="continueShopping ">Continue shopping</span></a>
//             </div>
//           </main></>
//         ) : (
//             <div class="container">
//               <section class="mt-5 mb-4">
//                 <div class="row">
//                   <div class="col-lg-8">
//                     <div class="card wish-list mb-4">
//                       <div class="card-body">
//                         {/* <h2 class="numItemTittle mb-4">
//                           <span>{cartItems.reduce((a, c) => a + c.qty, 0)}</span> items in your basket</h2> */}


//                           {Object.keys(cartItems).map((key,index)=>(
  
//                           <>
//                             <div class="row mb-4">
//                               <div class="col-md-5 col-lg-3 col-xl-3">
//                                 <div class="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
//                                   <Link id="productLink" to={`/${cartItems[key].name}/${cartItems[key]._id}/p`}>
//                                     <img class="img-fluid w-100"
//                                       src={generatePublicUrl(cartItems[key].img)} alt={cartItems[key].name} />
//                                   </Link>
//                                 </div>
//                               </div>
//                               <div class="col-md-7 col-lg-9 col-xl-9">
//                                 <div>
//                                   <div class="d-flex justify-content-between">
//                                     <div>
//                                       <h5 class="itemTittle">{cartItems[key].name}</h5>
//                                       {cartItems[key].option && (
//                                         <p class="mb-3 text-muted text-uppercase small">Options :{cartItems[key].option}</p>)}
                                        
//                                          {cartItems[key].sizeFirstOption && (
//                                         <p class="mb-3 text-muted text-uppercase small">Options :{cartItems[key].sizeFirstOption}</p>)}
                                    
//                                       {cartItems[key].colorOption && (
//                                         <p class="mb-2 text-muted text-uppercase small">Color: {cartItems[key].colorOption}</p>)}
//                                       {cartItems[key].sizeOption && (
//                                         <p class="mb-3 text-muted text-uppercase small">Size: {cartItems[key].sizeOption}</p>)}
//                                       <p class="mb-3 text-muted text-uppercase small">Personalisation: {cartItems[key].message}</p>

//                                     </div>

                                   
//                                     <div>
//                                       <div class="selectedQty ">

//                                         <select className="browser-default custom-select"
//                                           value={qty}
//                                           //onChange={(e) => setQty(e.target.value)} 
//                                           onChange={(e) =>
//                                             dispatch(
//                                               addToCart2(cartItems[key]._id, Number(e.target.value))
//                                             )
//                                           }
//                                         >
//                                           {[...Array(cartItems[key].countInStock).keys()].map((x) => (
//                                             <option key={x + 1} value={x + 1}>
//                                             {x + 1}    </option>
//                                           ))}
//                                         </select>
//                                       </div>
//                                     </div>
//                                   </div>
//                                   <div class="d-flex justify-content-between align-items-center">
//                                     <div>
//                                       <button class="removeBtn small text-uppercase mr-3" onClick={() => removeFromCartHandler(cartItems[key]._id)} ><i
//                                         class="fas fa-trash-alt mr-1"></i> Remove item </button>
//                                       {/* <a href="#!" type="button" class="card-link-secondary small text-uppercase"><i
//                                       class="fas fa-heart mr-1"></i> Move to wish list </a> */}
//                                     </div>
//                                     {/* <p class="mb-0"><span className="itemPriceCart">CA${cartItems[key].price.toFixed(2)}</span></p> */}
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                             <hr class="mb-4" />
//                           </>))}
//                       </div>
//                     </div>
//                     <div class="card mb-4">
//                       <div class="card-body">
//                         <h2 class="weAccept mb-4">We accept</h2>
//                         <img class="mr-2" width="80px"
//                           src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
//                           alt="Visa" />
//                         <img class="mr-2" width="80px"
//                           src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
//                           alt="American Express" />
//                         <img class="mr-2" width="80px"
//                           src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
//                           alt="Mastercard" />
//                         <img class="mr-2" width="80px"
//                           src="https://www.paypalobjects.com/webstatic/mktg/logo-center/PP_Acceptance_Marks_for_LogoCenter_150x94.png"
//                           alt="PayPal acceptance mark" />
//                       </div>
//                     </div>
//                   </div>
//                   <div class="col-lg-4">
//                     <div class="card mb-4">
//                       <div class="card-body">
//                         <ul class="list-group list-group-flush">
//                           <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
//                             {/* <div className="Subtotal">
//                               Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items)
//                             </div> */}
//                             {/* <span className="Subtotal">CA$
//                         {cartItems.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2)}</span> */}
//                           </li>
//                         </ul>
//                         <button type="button" class="btnForAll  btn-block waves-effect waves-light" onClick={checkoutHandler}
//                           disabled={cartItems.length === 0} >Checkout
//                     </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </section>

//             </div>
//           )}
//         <FootrScreen />
//       </div>
//     </>

//   );
// }



import React, { useEffect } from 'react';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { generatePublicUrl } from '../urlConfig';
import FootrScreen from './FootrScreen'
import { useLocation } from 'react-router-dom';
import MenueHeader from './MenueHeader'
import { IoMdCart } from "react-icons/io";
import { Link } from 'react-router-dom';


export default function CartScreen(props) {
  const { search } = useLocation()
  const searchParams = new URLSearchParams(search)
  const option = searchParams.get('option')
  const sizeOption = searchParams.get('sizeOption')
  const colorOption = searchParams.get('colorOption')
  const qty = Number(searchParams.get('qty'))
  const message = searchParams.get('message')
  const productId = props.match.params.id;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log("cart", cartItems)
  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty, sizeOption, colorOption, option, message));
    }
  }, [dispatch, productId, qty, sizeOption, colorOption, option, message]);


  const removeFromCartHandler = (id) => {
    // delete action
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    props.history.push('/signin?redirect=shipping');
  };
  return (
    <>
      <MenueHeader />
      <div className="cartDetails">
        {cartItems.length === 0 ? (<>
          <main role="main" class="container">
            <div class="starter-template">
              Your cart is empty<a href="/" class="btnForAll" ><IoMdCart size={25} style={{ paddingBottom: 4, paddingLeft: 4 }} /><span className="continueShopping ">Continue shopping</span></a>
            </div>
          </main></>
        ) : (
            <div class="container">
              <section class="mt-5 mb-4">
                <div class="row">
                  <div class="col-lg-8">
                    <div class="card wish-list mb-4">
                      <div class="card-body">
                        <h2 class="numItemTittle mb-4">
                          <span>{cartItems.reduce((a, c) => a + c.qty, 0)}</span> items in your basket</h2>
                        {cartItems.map((item) => (
                          <>
                            <div class="row mb-4">
                              <div class="col-md-5 col-lg-3 col-xl-3">
                                <div class="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
                                  <Link id="productLink" to={`/${item.name}/${item.product}/p`}>
                                    <img class="img-fluid w-100"
                                      src={generatePublicUrl(item.image)} alt={item.name} />
                                  </Link>
                                </div>
                              </div>
                              <div class="col-md-7 col-lg-9 col-xl-9">
                                <div>
                                  <div class="d-flex justify-content-between">
                                    <div>
                                      <h5 class="itemTittle">{item.name}</h5>
                                      {option && (
                                        <p class="mb-3 text-muted text-uppercase small">Options :{option}</p>)}
                                      {colorOption && (
                                        <p class="mb-2 text-muted text-uppercase small">Color: {colorOption}</p>)}
                                      {sizeOption && (
                                        <p class="mb-3 text-muted text-uppercase small">Size: {sizeOption}</p>)}
                                      <p class="mb-3 text-muted text-uppercase small">Personalisation: {message}</p>

                                    </div>
                                    <div>
                                      <div class="selectedQty ">

                                        <select className="browser-default custom-select"
                                          value={item.qty}
                                          onChange={(e) =>
                                            dispatch(
                                              addToCart(item.product, Number(e.target.value))
                                            )
                                          }
                                        >
                                          {[...Array(item.countInStock).keys()].map((x) => (
                                            <option key={x + 1} value={x + 1}>
                                              {x + 1}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                      <button class="removeBtn small text-uppercase mr-3" onClick={() => removeFromCartHandler(item.product)} ><i
                                        class="fas fa-trash-alt mr-1"></i> Remove item </button>
                                      {/* <a href="#!" type="button" class="card-link-secondary small text-uppercase"><i
                                      class="fas fa-heart mr-1"></i> Move to wish list </a> */}
                                    </div>
                                    <p class="mb-0"><span className="itemPriceCart">CA${item.price.toFixed(2)}</span></p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <hr class="mb-4" />
                          </>))}
                      </div>
                    </div>
                    <div class="card mb-4">
                      <div class="card-body">
                        <h2 class="weAccept mb-4">We accept</h2>
                        <img class="mr-2" width="80px"
                          src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                          alt="Visa" />
                        <img class="mr-2" width="80px"
                          src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                          alt="American Express" />
                        <img class="mr-2" width="80px"
                          src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                          alt="Mastercard" />
                        <img class="mr-2" width="80px"
                          src="https://www.paypalobjects.com/webstatic/mktg/logo-center/PP_Acceptance_Marks_for_LogoCenter_150x94.png"
                          alt="PayPal acceptance mark" />
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4">
                    <div class="card mb-4">
                      <div class="card-body">
                        <ul class="list-group list-group-flush">
                          <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                            <div className="Subtotal">
                              Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items)
                            </div>
                            <span className="Subtotal">CA$
                        {cartItems.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2)}</span>
                          </li>
                        </ul>
                        <button type="button" class="btnForAll  btn-block waves-effect waves-light" onClick={checkoutHandler}
                          disabled={cartItems.length === 0} >Checkout
                    </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

            </div>
          )}
        <FootrScreen />
      </div>
    </>

  );
}