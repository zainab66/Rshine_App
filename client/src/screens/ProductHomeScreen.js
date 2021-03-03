import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Link } from "react-router-dom";
import { generatePublicUrl } from '../urlConfig';


export default function ProductHomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts({}));

  }, [dispatch]);
  return (
    <div class="container productList">
      <div class="row pt-4">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>) : (
              <>{products.length === 0 && <MessageBox>No Product Found</MessageBox>}
                {products.map((product) => {
                  return (
                    <div class="col-lg-4">
                      <Link id="productLink" to={`/${product.slug}/${product._id}/p`}>
                        <div class="img-hover-zoom">
                          <div class="view overlay">
                            <img class="" src={product.productPictures[0].img} alt={product.name} width="275" height="250" />
                            <div class="mask rgba-white-slight"></div>
                          </div>
                        </div>
                        <p class="productName">{product.name}</p>
                        <p class="productPrice">CA${product.price}</p>
                      </Link>
                    </div>
                  )
                })}
              </>)}
      </div>
    </div>
  )
}
