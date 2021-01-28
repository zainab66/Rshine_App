import React, { useEffect } from 'react';
import { addToCart,removeFromCart} from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import MessageBox from '../components/MessageBox';
import { Link } from 'react-router-dom';
import { generatePublicUrl } from '../urlConfig';
import { Form } from 'react-bootstrap';
import FootrScreen from './FootrScreen'
import { useLocation } from 'react-router-dom';

export default function CartScreen(props) {
  const{search} =useLocation()
  const searchParams = new URLSearchParams(search)
  const option=searchParams.get('option')
  const sizeOption=searchParams.get('sizeOption')
  const colorOption=searchParams.get('colorOption')
  const qty=Number(searchParams.get('qty'))

    const productId = props.match.params.id;
    // const qty = props.location.search
    // ? Number(props.location.search.split('=')[1])
    // : 1;
    
    //  const sizeOption = props.location.search
    //  ? String(props.location.search.split('=')[2])
    //  : "";
    //  const colorOption = props.location.search
    //  ? String(props.location.search.split('=')[3])
    //  : "";
    //  const option = props.location.search
    //  ? String(props.location.search.split('=')[4].split('%20') )
    //  : "";
    console.log("sizeOption",sizeOption)
    console.log("colorOption",colorOption)

    console.log("qty",qty)
    console.log("option",option)

    const cart = useSelector((state) => state.cart);
    const { cartItems, error } = cart;
    console.log("cart",cartItems)
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
          dispatch(addToCart(productId, qty,sizeOption,colorOption,option));
        }
      }, [dispatch, productId, qty,sizeOption,colorOption,option]);
    
      
    const removeFromCartHandler = (id) => {
    // delete action
    dispatch(removeFromCart(id));
    };

    const checkoutHandler = () => {
    props.history.push('/signin?redirect=shipping');
    };
    return (

      <main>
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        {cartItems.length === 0 ? (
           <MessageBox>
             Cart is empty. <Link to="/">Go Shopping</Link>
           </MessageBox>
         ) : (
      <div class="container">
  
        <section class="mt-5 mb-4">
  
          <div class="row">
          
            <div class="col-lg-8">
  
              <div class="card wish-list mb-4">
                <div class="card-body">
  
                  <h5 class="mb-4">
                  <span>{cartItems.reduce((a, c) => a + c.qty, 0)}</span> items in your basket</h5>
                  {cartItems.map((item) => (
                    <>
                  <div class="row mb-4">
                    <div class="col-md-5 col-lg-3 col-xl-3">
                      <div class="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
                        <img class="img-fluid w-100"
                          src={generatePublicUrl(item.image)} alt={item.name}/>
                       
                      </div>
                    </div>
                    <div class="col-md-7 col-lg-9 col-xl-9">
                      <div>
                        <div class="d-flex justify-content-between">
                          <div>
                            <h5>{item.name}</h5>
                            <p class="mb-3 text-muted text-uppercase small">Options :{option}</p>
                            <p class="mb-2 text-muted text-uppercase small">Color: {colorOption}</p>
                            <p class="mb-3 text-muted text-uppercase small">Size: {sizeOption}</p>
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






                              {/* <button onclick="this.parentNode.querySelector('input[type=number]').stepDown()"
                                class="minus"></button>
                              <input class="quantity" min="0" name="quantity" value="1" type="number"/>
                              <button onclick="this.parentNode.querySelector('input[type=number]').stepUp()"
                                class="plus"></button> */}
                            </div>
                            {/* <small id="passwordHelpBlock" class="form-text text-muted text-center">
                              (Note, 1 piece)
                            </small> */}
                          </div>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                          <div>
                            <a href="#!" type="button" class="card-link-secondary small text-uppercase mr-3" onClick={() => removeFromCartHandler(item.product)} ><i
                                class="fas fa-trash-alt mr-1"></i> Remove item </a>
                            <a href="#!" type="button" class="card-link-secondary small text-uppercase"><i
                                class="fas fa-heart mr-1"></i> Move to wish list </a>
                          </div>
                          <p class="mb-0"><span><strong>CA${item.price}</strong></span></p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr class="mb-4"/>
                </>))}
                  {/* <p class="text-primary mb-0"><i class="fas fa-info-circle mr-1"></i> Do not delay the purchase, adding
                    items to your cart does not mean booking them.</p> */}
  
                </div>
              </div>
  
              <div class="card mb-4">
                <div class="card-body">
  
                  <h5 class="mb-4">Expected shipping delivery</h5>
  
                  <p class="mb-0"> Thu., 12.03. - Mon., 16.03.</p>
                </div>
              </div>
  
              <div class="card mb-4">
                <div class="card-body">
  
                  <h5 class="mb-4">We accept</h5>
  
                  <img class="mr-2" width="80px"
                    src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                    alt="Visa"/>
                  <img class="mr-2" width="80px"
                    src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                    alt="American Express"/>
                  <img class="mr-2" width="80px"
                    src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                    alt="Mastercard"/>
                  <img class="mr-2" width="80px"
                    src="https://www.paypalobjects.com/webstatic/mktg/logo-center/PP_Acceptance_Marks_for_LogoCenter_150x94.png"
                    alt="PayPal acceptance mark"/>
                </div>
              </div>
  
            </div>
  
            <div class="col-lg-4">
  
              <div class="card mb-4">
                <div class="card-body">
                
  
                  <ul class="list-group list-group-flush">
                    {/* <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : $
                {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                    </li> */}
                    {/* <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                    Delivery
                      <span>CA${cart.shippingPrice.toFixed(2)}</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                    Tax
                      <span>CA${cart.taxPrice.toFixed(2)}</span>
                    </li> */}
                    <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div>
                        <strong>Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items)</strong>
                      
                      </div>
                      <span><strong>CA$
                {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}</strong></span>
                    </li>
                  </ul>
  
                  <button type="button" class="btnCart btn-block waves-effect waves-light" onClick={checkoutHandler}
                 disabled={cartItems.length === 0} >GO TO CHECKOUT
                    </button>
  
                </div>
              </div>
  
              <div class="card mb-4">
                <div class="card-body">
  
                  <a class="dark-grey-text d-flex justify-content-between" data-toggle="collapse" href="#collapseExample"
                    aria-expanded="false" aria-controls="collapseExample">
                    Add a discount code (optional)
                    <span><i class="fas fa-chevron-down pt-1"></i></span>
                  </a>
  
                  <div class="collapse" id="collapseExample">
                    <div class="mt-3">
                      <div class="md-form md-outline mb-0">
                        <input type="text" id="discount-code" class="form-control font-weight-light"
                          placeholder="Enter discount code"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
  
            </div>
          

          </div>
        </section>
  
      </div>
      )}
          <FootrScreen/>

    </main>
    //   <div className="row top">
    //   <div className="col-2">
    //     <h1>Shopping Cart</h1>
    //     {error && <MessageBox variant="danger">{error}</MessageBox>}
    //     {cartItems.length === 0 ? (
    //       <MessageBox>
    //         Cart is empty. <Link to="/">Go Shopping</Link>
    //       </MessageBox>
    //     ) : (
    //       <ul>
    //         {cartItems.map((item) => (
    //           <li key={item.product}>
    //             <div className="row">
    //               <div>
    //                 <img
    //                   src={item.image}
    //                   alt={item.name}
    //                   className="small"
    //                 ></img>
    //               </div>
    //               <div className="min-30">
    //                 <Link to={`/product/${item.product}`}>{item.name}</Link>
    //               </div>
    //               <div>
    //                 <select
    //                   value={item.qty}
    //                   onChange={(e) =>
    //                     dispatch(
    //                       addToCart(item.product, Number(e.target.value))
    //                     )
    //                   }
    //                 >
    //                   {[...Array(item.countInStock).keys()].map((x) => (
    //                     <option key={x + 1} value={x + 1}>
    //                       {x + 1}
    //                     </option>
    //                   ))}
    //                 </select>
    //               </div>
    //               <div>${item.price}</div>
    //               <div>
    //                 <button
    //                   type="button"
    //                   onClick={() => removeFromCartHandler(item.product)}
    //                 >
    //                   Delete
    //                 </button>
    //               </div>
    //             </div>
    //           </li>
    //         ))}
    //       </ul>
    //     )}
    //   </div>
    //   <div className="col-1">
    //     <div className="card card-body">
    //       <ul>
    //         <li>
    //           <h2>
    //             Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : $
    //             {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
    //           </h2>
    //         </li>
    //         <li>
    //           <button
    //             type="button"
    //             onClick={checkoutHandler}
    //             className="primary block"
    //             disabled={cartItems.length === 0}
    //           >
    //             Proceed to Checkout
    //           </button>
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    // </div>
  );
}