import React from 'react'
import MenueHeader from './MenueHeader'
import FootrScreen from './FootrScreen'


export default function AboutUsScreen() {
    return (
        <>
            <MenueHeader />
            <main role="main" class="container">
                <h5 class="aboutUs mb-5">Welcome to RShine!!!</h5>
                <p >The <span class="aboutUsParagragh">RShine</span> team is here for you! Here you can find all of your printing needs, whether it is for a special event or for your business. From <span class="aboutUsParagragh">birthday parties</span>, to <span class="aboutUsParagragh">specialized gifts</span>, to <span class="aboutUsParagragh">corporate printing needs</span>, we can help you with everything! </p>
                <p>We are a small but powerful team, and we have been working in the field for 10 years. Our goal is to deliver you quality printed products and a service that you will not forget!</p>
                <p>Also, we specialize in <span class="aboutUsParagragh">personalized</span> and <span class="aboutUsParagragh">custom </span>requests, take a look around, if you don't find what you need, go to the Contact Us page and send us your requests, we will be here for you!</p>
                <p>Looking forward to work with you very soon!</p>

            </main>
            <FootrScreen />

        </>
    )
}
