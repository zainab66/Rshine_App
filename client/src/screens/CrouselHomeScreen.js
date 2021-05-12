import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { Carousel } from 'react-bootstrap';
import { generatePublicUrl } from '../urlConfig';
import { listCrousels } from '../actions/crouselActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function CrouselHomeScreen() {
  const crouselList = useSelector((state) => state.crouselList);
  const { loading, error, crousels } = crouselList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listCrousels());
  }, [dispatch]);

  return (
    <div className="crousel">
      <div class="">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (<>
          <Carousel showArrows autoPlay showThumbs={false} showIndicators={false} showStatus={false}>
            {crousels.map((crousel) => (
              <div key={crousel._id}>
                <Link to="">
                  {crousel.crouselPictures.map(picture =>
                    <img src={generatePublicUrl(picture.img)}  alt="" />
                  
               )}
                </Link>
              </div>
            ))}
          </Carousel>

          {/*          
        <Carousel>
        <Carousel.Item>
        {crousels.map((crousel) => (
          <>
        {crousel.crouselPictures.map(picture => 
            <img
              className="d-block w-100"
              src={generatePublicUrl(picture.img)} alt="" />
              )} </> ))}
              </Carousel.Item>
        </Carousel>
      
        */}
        </>)}
      </div>
    </div>
  )
}
