import React from 'react'
import MenueHeader from './MenueHeader'
import ProductHomeScreen from './ProductHomeScreen'
import FootrScreen from './FootrScreen'
import CrouselHomeScreen from './CrouselHomeScreen'

export default function HomeScreen() {
    return (
        <div>
            <MenueHeader />
            <CrouselHomeScreen />
            <ProductHomeScreen />
            <FootrScreen />
        </div>


    )
}
