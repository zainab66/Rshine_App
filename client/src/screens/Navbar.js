import React from 'react'

export default function Navbar() {
    return (
        //social-link-and-phone-number
        <nav>
            <div className="social-call">
                <div className="social">
                    <a href="#"><i class="fab fa-facebook-f"> </i></a>
                    <a href="#"><i class="fab fa-instagram"> </i></a>
                    <a href="#"><i class="fab fa-youtube"> </i></a>
                    <a href="#"><i class="fab fa-pinterest"> </i></a>

                </div>
                
                <div className="phone">
                    <span>Call 514-430-7957</span>

                </div>


            </div>
        </nav>
    )
}
