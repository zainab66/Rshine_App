import React from 'react'
import { Link } from "react-router-dom";

export default function FootrScreen() {
  return (

    <footer class="page-footer font-small elegant-color">
      <div class="color-socialMedia">
        <div class="container">
          <div class="row py-4 d-flex align-items-center">
            <div class="col-md-6 col-lg-5 text-center text-md-left mb-4 mb-md-0">
              <h6 class="mb-0">Get connected with us on social networks!</h6>
            </div>
            <div class="col-md-6 col-lg-7 text-center text-md-right">

              <a href="https://www.facebook.com/CustomPartiesAndGifts/" class="fb-ic">
                <i class="fab fa-facebook-f mr-4"> </i>
              </a>
              <a href="https://www.instagram.com/rshinegraphics/?hl=en" class="fb-ic">
                <i class="fab fa-instagram mr-4"></i>
              </a>
              <a href="https://www.youtube.com/channel/UCBhsveCL1hrNoFcQdJgskkw?view_as=subscriber" class="tw-ic">
                <i class="fab fa-youtube mr-4"></i>
              </a>

              <a href="https://www.pinterest.ca/rshineg/" class="gplus-ic">
                <i class="fab fa-pinterest mr-4"></i>
              </a>

            </div>

          </div>

        </div>
      </div>

      <div class="container text-center text-md-left pt-4 pt-md-5">

        <div class="row mt-1 mt-md-0 mb-4 mb-md-0">

          <div class="col-md-3 mx-auto mt-3 mt-md-0 mb-0 mb-md-4">

            <h5>Questions?</h5>
            <hr class="color-hr mb-4 mt-0 d-inline-block mx-auto w-60" />

            <ul class="list-unstyled foot-desc">
              <li class="mb-2">
                <a href="/AboutUs">About us</a>
              </li>
              <li class="mb-2">
                <a href="#!">Shipping & Delivery</a>
              </li>
              <li class="mb-2">
                <a href="#!">Returns & Refunds</a>
              </li>
              <li class="mb-2">
                <a href="#!">Privacy & Security</a>
              </li>
            </ul>
          </div>

          {/* <hr class="clearfix w-100 d-md-none" />

          <div class="col-md-3 mx-auto mt-3 mt-md-0 mb-0 mb-md-4">

            <h5>Products</h5>
            <hr class="color-hr mb-4 mt-0 d-inline-block mx-auto w-60"/>

            <ul class="list-unstyled foot-desc">
              <li class="mb-2">
                <a href="#!">MDBootstrap</a>
              </li>
              <li class="mb-2">
                <a href="#!">MDWordPress</a>
              </li>
              <li class="mb-2">
                <a href="#!">BrandFlow</a>
              </li>
              <li class="mb-2">
                <a href="#!">Bootstrap Angular</a>
              </li>
            </ul>

          </div> */}

          {/* <hr class="clearfix w-100 d-md-none" />
          <div class="col-md-3 mx-auto mt-3 mt-md-0 mb-0 mb-md-4">

            <h5>Useful links</h5>
            <hr class="color-hr mb-4 mt-0 d-inline-block mx-auto w-60"/>

            <ul class="list-unstyled foot-desc">
              <li class="mb-2">
                <a href="#!">Your Account</a>
              </li>
              <li class="mb-2">
                <a href="#!">Become an Affiliate</a>
              </li>
              <li class="mb-2">
                <a href="#!">Shipping Rates</a>
              </li>
              <li class="mb-2">
                <a href="#!">Help</a>
              </li>
            </ul>

          </div> */}

          <hr class="clearfix w-100 d-md-none" />

          <div class="col-md-3 mx-auto mt-3 mt-md-0 mb-0 mb-md-4">

            <h5>Contacts</h5>
            <hr class="color-hr mb-4 mt-0 d-inline-block mx-auto w-60" />

            <ul class="fa-ul foot-desc ml-4">
              <li class="mb-2"><span class="fa-li"><i class="far fa-map"></i></span>Montreal Qc, Canada</li>
              <li class="mb-2"><span class="fa-li"><i class="fas fa-phone-alt"></i></span>514-430-7957</li>
              <li class="mb-2"><span class="fa-li"><i class="far fa-envelope"></i></span><a href="/Contact">r.shinegraphics@gmail.com</a></li>
            </ul>

          </div>

        </div>

      </div>

      <div class="footer-copyright text-center py-3">© 2023 Copyright:
  <a href="https://mdbootstrap.com/"> R Shine</a>
      </div>

    </footer>

  )
}
