import React, { useEffect, useState } from 'react';
import Rating from '../components/Rating';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { createReview, detailsProduct } from '../actions/productActions';
import { IoIosArrowForward, IoIosStar, IoMdCart } from "react-icons/io";
import MenueHeader from './MenueHeader';
import { PRODUCT_REVIEW_CREATE_RESET } from '../constants/productConstants';
import ProductImage from './ProductImage';
import FootrScreen from './FootrScreen'


export default function ProductDetailsPage(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.productId;
  const [qty, setQty] = useState(1);
  const [sizeOption, setSizeOption] = useState("");
  const [sizeFirstOption, setSizeFirstOption] = useState("");

  const [colorOption, setColorOption] = useState("");
  const [option, setOption] = useState("");
  const [message, setMessage] = useState("");

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = productReviewCreate;

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (successReviewCreate) {
      window.alert('Review Submitted Successfully');
      setRating('');
      setComment('');
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    }
    dispatch(detailsProduct(productId));
  }, [dispatch, productId, successReviewCreate]);

  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}&sizeOption=${sizeOption}&sizeFirstOption=${sizeFirstOption}&colorOption=${colorOption}&option=${option}&message=${message}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        createReview(productId, { rating, comment, name: userInfo.name })
      );
    } else {
      alert('Please enter comment and rating');
    }
  };

  return (
    <div>
      <MenueHeader />
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
            <div className="productDetails">
              <div class="container">
                <div className="breed">
                  <ul>
                    <li>
                      <a href="/">Home</a>
                      <IoIosArrowForward />
                    </li>
                    <li>
                      <a className="pathCategoryName" href="#"> {product.category}</a>
                      <IoIosArrowForward />
                    </li>
                    <li>
                      <a className="pathProductName" href="#"> {product.name}</a>
                    </li>
                  </ul>
                </div>
                <section class="mb-5">
                  <div class="row">
                    <div class="col mb-1 mb-md-0">
                      <div id="mdb-lightbox-ui"></div>
                      <div class="mdb-lightbox">
                        <div class="row product-gallery mx-1">
                          <ProductImage detail={product} />
                        </div>
                      </div>
                    </div>
                    <div class="col-md-5">
                      <h5 className="productName">{product.name}</h5>
                      <p class="mb-2 text-muted small">{product.category}</p>
                      <Rating
                        rating={product.rating}
                      ></Rating>
                      {!option &&
                        (sizeOption === product.sizeOption1 && product.discountPrice ? (<>
                          <p><span class="mr-1"><strong className="discount"> CA${(product.priceSizeOption1 - product.priceSizeOption1 * product.discountPrice).toFixed(2)}</strong><strong className="price"> CA${product.priceSizeOption1}</strong></span></p>
                          <p className="priceSaved">You save CA${(product.priceSizeOption1 * product.discountPrice).toFixed(2)}({(product.discountPrice * 100)}%)</p></>) : (
                            sizeOption === product.sizeOption2 && product.discountPrice ? (<>
                              <p><span class="mr-1"><strong className="discount"> CA${(product.priceSizeOption2 - product.priceSizeOption2 * product.discountPrice).toFixed(2)}</strong><strong className="price"> CA${product.priceSizeOption2}</strong></span></p>
                              <p className="priceSaved">You save CA${(product.priceSizeOption2 * product.discountPrice).toFixed(2)}({(product.discountPrice * 100)}%)</p></>
                            ) : (sizeOption === product.sizeOption1 ? (<p><span class="mr-1"><strong> CA${product.priceSizeOption1}</strong></span></p>)
                              : (sizeOption === product.sizeOption2 ? (<p><span class="mr-1"><strong> CA${product.priceSizeOption2}</strong></span></p>)
                                :
                                (product.discountPrice ? (<>
                                  <p><span class="mr-1"><strong className="discount"> CA${(product.price - product.price * product.discountPrice).toFixed(2)}</strong><strong className="price"> CA${product.price}</strong></span></p>
                                  <p className="priceSaved">You save CA${(product.price * product.discountPrice).toFixed(2)}({(product.discountPrice * 100)}%)</p></>)
                                  : (<p><span class="mr-1"><strong> CA${product.price}</strong></span></p>))

                              ))))}

                      {option &&
                        (sizeFirstOption === product.sizefirstOption1 && product.discountPrice ? (<>
                          <p><span class="mr-1"><strong className="discount"> CA${(product.priceSizefirstOption1 - product.priceSizefirstOption1 * product.discountPrice).toFixed(2)}</strong><strong className="price"> CA${product.priceSizefirstOption1}</strong></span></p>
                          <p className="priceSaved">You save CA${(product.priceSizefirstOption1 * product.discountPrice).toFixed(2)}({(product.discountPrice * 100)}%)</p></>) : (

                            sizeFirstOption === product.sizefirstOption2 && product.discountPrice ? (<>
                              <p><span class="mr-1"><strong className="discount"> CA${(product.priceSizefirstOption2 - product.priceSizefirstOption2 * product.discountPrice).toFixed(2)}</strong><strong className="price"> CA${product.priceSizefirstOption2}</strong></span></p>
                              <p className="priceSaved">You save CA${(product.priceSizeOption2 * product.discountPrice).toFixed(2)}({(product.discountPrice * 100)}%)</p></>
                            ) : (sizeFirstOption === product.sizefirstOption1 ? (<p><span class="mr-1"><strong> CA${product.priceSizefirstOption1}</strong></span></p>)
                              : (sizeFirstOption === product.sizefirstOption2 ? (<p><span class="mr-1"><strong> CA${product.priceSizefirstOption2}</strong></span></p>)
                                : (product.discountPrice ? (<>
                                  <p><span class="mr-1"><strong className="discount"> CA${(product.priceFirstOption - product.priceFirstOption * product.discountPrice).toFixed(2)}</strong><strong className="price"> CA${product.priceFirstOption}</strong></span></p>
                                  <p className="priceSaved">You save CA${(product.priceFirstOption * product.discountPrice).toFixed(2)}({(product.discountPrice * 100)}%)</p></>)
                                  : (<p><span class="mr-1"><strong> CA${product.priceFirstOption}</strong></span></p>))))))}

                      <p className="instock">
                        {product.countInStock > 0 ? (
                          <span><i class="fa fa-check" aria-hidden="true"></i>
                                In Stock</span>
                        ) : (
                            <span className="danger">Unavailable</span>
                          )}
                      </p>
                      <form onSubmit={addToCartHandler}>
                        <div class="table-responsive">
                          {product.colorOption1 && (<>
                            <label for="color">Color</label>
                            <select class="custom-select d-block w-100 mb-1" id="color" value={colorOption}
                              onChange={(e) => setColorOption(e.target.value)} required>
                              <option value="">Select an option</option>
                              <option>{product.colorOption1}</option>
                              <option> {product.colorOption2}</option>
                              <option> {product.colorOption3}</option>
                              <option> {product.colorOption4}</option>
                            </select>
                          </>)}
                          {product.sizefirstOption1 && (<>
                            <label for="option">Options</label>
                            <select class="custom-select d-block w-100 mb-1" id="option" value={option}
                              onChange={(e) => setOption(e.target.value)} required>
                              <option value="">Select an option</option>
                              <option>{product.firstOption}</option>
                              {/* <option> {product.option2}</option> */}
                            </select>
                          </>
                          )}
                          {option ? (<>
                            <label for="size">Size</label>
                            <select class="custom-select d-block w-100 mb-1" id="size" value={sizeFirstOption}
                              onChange={(e) => setSizeFirstOption(e.target.value)} required>
                              <option value="">Select an option</option>
                              <option>{product.sizefirstOption1}</option>
                              <option>{product.sizefirstOption2}</option>
                            </select></>) : (product.sizeOption1 && (<>
                              <label for="size">Size</label>
                              <select class="custom-select d-block w-100 mb-1" id="size" value={sizeOption}
                                onChange={(e) => setSizeOption(e.target.value)} required>
                                <option value="">Select an option</option>
                                <option>{product.sizeOption1}</option>
                                <option> {product.sizeOption2}</option>
                              </select>
                            </>))}
                          <label>Add your personalisation </label>
                          <p className="addYourPersonalisation">{product.addYourPersonalisation}</p>
                          <textarea class="form-control" rows="3" id="comment1" value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
                          {product.countInStock > 0 && (<>
                            <label for="option">Quantity</label>
                            <select class="custom-select d-block w-100 mb-3" id="option" value={qty}
                              onChange={(e) => setQty(e.target.value)} required>
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </>)}
                        </div>
                        <button type="submit" class="btnForAll btn-block waves-effect waves-light " ><IoMdCart size={28} style={{ paddingBottom: 4 }} /><span className="textCart">Add to Cart</span></button>
                      </form>
                    </div>
                  </div>
                </section>
                <div class="classic-tabs">
                  <ul class="nav  nav-justified pb-4" id="advancedTab" role="tablist">
                    <li class="nav-item">
                      <a class="nav-link active show" id="description-tab" data-toggle="tab" href="#description" role="tab"
                        aria-controls="description" aria-selected="true">Description</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" id="info-tab" data-toggle="tab" href="#info" role="tab" aria-controls="info"
                        aria-selected="false">Hightlights</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" id="reviews-tab" data-toggle="tab" href="#reviews" role="tab" aria-controls="reviews"
                        aria-selected="false">Reviews ({product.numReviews})</a>
                    </li>
                  </ul>
                  <hr class="divider-hr" />

                  <div class="tab-content" id="advancedTabContent">
                    <div class="tab-pane fade show active" id="description" role="tabpanel" aria-labelledby="description-tab">
                      <p className="tittleDescription">Product Description</p>
                      <p class="small text-muted  mb-2">{product.category}</p>
                      <Rating
                        rating={product.rating}
                      ></Rating>

                      <p class="productDescription pt-1">{product.description}</p>
                    </div>
                    <div class="tab-pane fade" id="info" role="tabpanel" aria-labelledby="info-tab">
                      <table class="table table-striped table-bordered mt-3">
                        <thead>
                          <tr>
                            <th scope="row" class="w-150 dark-grey-text madeByText">Made By</th>
                            <td className="madeByText">{product.madeBy && (
                              <i class="fa fa-hand-stop-o" ></i>)}{product.madeBy}</td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row" class="w-150 dark-grey-text materialText">Material</th>
                            <td className="materialText"> {product.material && (
                              <svg className="material" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18.1 6c.7 1.7.9 3.6.4 5.6-.8 3.4-3.5 6.1-6.9 6.9-2 .5-3.9.2-5.6-.4v1.4L7.5 21h12l1.5-1.5v-12L19.5 6h-1.4z"></path><path d="M9.5 2C5.4 2 2 5.4 2 9.5S5.4 17 9.5 17 17 13.6 17 9.5 13.6 2 9.5 2zM7.8 15c-.6-.2-1.2-.5-1.7-.9l8-8c.4.5.7 1.1.9 1.7L7.8 15zm3.4-11c.6.2 1.2.5 1.7.9l-8 8c-.4-.5-.7-1.1-.9-1.7L11.2 4zM9 3.8L3.8 9C4 6.2 6.2 4 9 3.8zm1 11.4l5.2-5.2c-.2 2.8-2.4 5-5.2 5.2z"></path></svg>

                            )} {product.material}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div class="tab-pane fade" id="reviews" role="tabpanel" aria-labelledby="reviews-tab">
                      {product.reviews.length === 0 && (
                        <MessageBox><p className="reviewSignin">There is no review</p></MessageBox>
                      )}

                      {product.reviews.map((review) => (<>
                        <h5><span>{product.numReviews}</span> review for <span>{product.name}</span></h5>

                        <div class="media mt-3 mb-4">
                          <img class="d-flex mr-3 z-depth-1" src="https://mdbootstrap.com/img/Photos/Others/placeholder1.jpg"
                            width="62" alt="" />
                          <div class="media-body">
                            <div class="d-flex justify-content-between">


                              <p class="mt-1 mb-2">

                                <strong>{review.name}</strong>
                                <Rating rating={review.rating} ></Rating>

                                <span>{review.createdAt.substring(0, 10)}</span>
                              </p>


                            </div>
                            <p class="mb-0">{review.comment}</p>
                          </div>
                        </div>   </>))}
                      <hr />
                      {userInfo ? (<form className="form" onSubmit={submitHandler}>
                        <p class="mt-4">Write a review</p>
                        {/* <p>Your email address will not be published.</p> */}
                        <div class="my-3">
                          <div>
                            {/* <label htmlFor="rating">Rating</label> */}
                            {[...Array(5)].map((star, i) => {
                              const ratingValue = i + 1;
                              return (
                                <label>
                                  <input className="rattingInput" type="radio" name="rating" value={ratingValue}
                                    onClick={() => setRating(ratingValue)}
                                  />

                                  <IoIosStar className="star" color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"} size={25}
                                    onMouseEnter={() => setHover(ratingValue)}
                                    onMouseLeave={() => setHover(null)} /></label>);
                            })}

                          </div>
                        </div>
                        <div>
                          <div class=" msgReview md-form md-outline">
                            <textarea class="md-textarea form-control pr-6" rows="4" id="comment" value={comment}
                              onChange={(e) => setComment(e.target.value)}></textarea>
                            {/* <label for="comment">Your review</label> */}
                          </div>
                          {/* <div class="md-form md-outline">
                  <input type="text" id="form75" class="form-control pr-6" />
                  <label for="form75">Name</label>
                </div>
                <div class="md-form md-outline">
                  <input type="email" id="form77" class="form-control pr-6" />
                  <label for="form77">Email</label>
                </div> */}
                          <div class="text-right pb-2">
                            <button type="submit" class="btnReview">Add a review</button>
                            <div>
                              {loadingReviewCreate && <LoadingBox></LoadingBox>}
                              {errorReviewCreate && (
                                <MessageBox variant="danger">
                                  {errorReviewCreate}
                                </MessageBox>
                              )}
                            </div>
                          </div>
                        </div></form>
                      ) : (<MessageBox>
                        <p className="reviewSignin">Please <Link className="linkSigninReview" to="/signin">Sign In</Link> to write a review</p>
                      </MessageBox>)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
      <FootrScreen />
    </div>

  )
}
