import React, { useEffect, useState } from 'react';
import Rating from '../components/Rating';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { detailsProduct } from '../actions/productActions';
import { IoIosArrowForward, IoIosStar, IoMdCart } from "react-icons/io";
import { generatePublicUrl } from '../urlConfig';
import HomeScreen from './MenueHeader';
import { AiFillThunderbolt } from "react-icons/ai";

export default function ProductDetailsPage(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.productId;
  const [qty, setQty] = useState(1);

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);

  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };
  return (
    <div>
      <HomeScreen />

      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
            <div className="productDescriptionContainer">
              <div className="flexRow">
                <div className="verticalImageStack">
                  {product.productPictures.map((thumb, index) => (
                    <div className="thumbnail">
                      <img src={generatePublicUrl(thumb.img)} alt={thumb.img} />
                    </div>
                  ))}
                </div>
                <div className="productDescContainer">
                  <div className="productDescImgContainer">
                    <img
                      src={generatePublicUrl(product.productPictures[0].img)}
                      alt={`${product.productPictures[0].img}`}
                    />
                  </div>

                  {/* action buttons */}
                  <div className="flexRow">
                    <button className="btnAddtoCart" onClick={addToCartHandler}
                      style={{
                        marginRight: "5px"
                      }}><IoMdCart /> <span>ADD TO CART</span></button>

                    <button className="btnBuyNow"
                      style={{ marginLeft: "5px" }}
                    ><AiFillThunderbolt /><span>BUY NOW</span></button>
                  </div>
                </div>
              </div>
              <div>
                {/* home > category > subCategory > productName */}
                <div className="breed">
                  <ul>
                    <li>
                      <a href="#">Home</a>
                      <IoIosArrowForward />
                    </li>
                    <li>
                      <a href="#">Mobiles</a>
                      <IoIosArrowForward />
                    </li>
                    <li>
                      <a href="#">Samsung</a>
                      <IoIosArrowForward />
                    </li>
                    <li>
                      <a href="#">{product.name}</a>
                    </li>
                  </ul>
                </div>
                {/* product description */}
                <div className="productDetails">
                  <p className="productTitle">{product.name}</p>
                  <div>
                    <span className="ratingCount">
                      4.3 <IoIosStar />
                    </span>
                    <span className="ratingNumbersReviews">
                      72,234 Ratings & 8,140 Reviews
              </span>
                  </div>
                  <div className="extraOffer">
                    Extra CA$
              4500 off{" "}
                  </div>
                  <div className="flexRow priceContainer">
                    <span className="price">
                    CA${product.price}
                    </span>
                    <span className="discount" style={{ margin: "0 10px" }}>
                      22% off
              </span>
                    {/* <span>i</span> */}
                  </div>
                  <div>
                    <p
                      style={{
                        color: "#212121",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      Available Offers
                      <div>
                        {product.countInStock > 0 ? (
                          <span className="success">In Stock</span>
                        ) : (
                          <span className="danger">Unavailable</span>
                        )}
                      </div>
                      {product.countInStock > 0 && (
                    <>
                      <li>
                        <div className="row">
                          <div>Qty</div>
                          <div>
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        </div>
                      </li>
                     
                     
                    </>
                  )}
              </p>
              
                    <p style={{ display: "flex" }}>
                      <span
                        style={{
                          width: "100px",
                          fontSize: "12px",
                          color: "#878787",
                          fontWeight: "600",
                          marginRight: "20px",
                        }}
                      >
                        Description
                </span>
                      <span
                        style={{
                          fontSize: "12px",
                          color: "#212121",
                        }}
                      >
                        {product.description}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

          )}
    </div>

  )
}
