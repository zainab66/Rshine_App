import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MenueHeader from './MenueHeader';
import { getProductsBySlug } from '../actions/productActions';
import { generatePublicUrl } from '../urlConfig';
import { Link } from "react-router-dom";
import MessageBox from '../components/MessageBox';

export default function ProductUserScreen(props) {
    const productSlug = useSelector((state) => state.productSlug);
    const { produ } = productSlug;
    const dispatch = useDispatch();

    useEffect(() => {
        const { match } = props;
        dispatch(getProductsBySlug(match.params.slug));
    }, [dispatch,props]);

    return (<>
    {produ.length !== 0 && 
        <MenueHeader />}

        <div class="container productList">
      <div class="row pt-4">
       
              
                {produ.map((product) => {
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
            
      </div>
    </div>
    </>
       
    )
}
