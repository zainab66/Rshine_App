import React from 'react'
import MenueHeader from './MenueHeader'
import ProductHomeScreen from './ProductHomeScreen'
import FootrScreen from './FootrScreen'
import CrouselScreen from './CrouselScreen'

export default function HomeScreen() {
    return (
        <div>
            <MenueHeader />
            <CrouselScreen />
            <ProductHomeScreen />
            <FootrScreen />
        </div>


    )
}
