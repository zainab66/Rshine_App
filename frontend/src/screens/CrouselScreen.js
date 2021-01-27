import React from 'react'
import { Carousel} from 'react-bootstrap';

export default function CrouselScreen() {
    return (
        <div className="container pt-4">
            
        <Carousel>
  <Carousel.Item>
    <img
      className="imgcas d-block w-100"
      src="https://i.etsystatic.com/18653180/r/il/b6a7a8/2196626375/il_794xN.2196626375_hg0o.jpg"       alt="First slide"
    />
   
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="imgcas d-block w-100"
      src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/12a.jpg"       alt="Third slide"
    />

   
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="imgcas d-block w-100"
      src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/12a.jpg"       alt="Third slide"
    />

   
  </Carousel.Item>
</Carousel>
  
        </div>
    )
}
