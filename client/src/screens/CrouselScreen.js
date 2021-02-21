import React from 'react'
import { Carousel } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { generatePublicUrl } from '../urlConfig';

export default function CrouselScreen() {
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  return (
    <div className=" crousel">
      {/* {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
            <>{products.length === 0 && <MessageBox>No Product Found</MessageBox>}
              {products.map((product) => {
                return ( */}
                  <Carousel>
                    <Carousel.Item>
                      <img
                        className="d-block w-100"
                        // src={generatePublicUrl(product.productPictures[0].img)} alt="First slide"/>
                        src="https://mdbootstrap.com/img/Photos/Horizontal/Eco/img(22)-slide.jpg" alt="First slide"/>
                    </Carousel.Item>

                  </Carousel>
              {/* })}
            </>
          )} */}
    </div>
  )
}
