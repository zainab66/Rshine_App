import React from 'react'
import MenueHeader from './MenueHeader'
import ProductList from './ProductList'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import FootrScreen from './FootrScreen'
import CrouselScreen from './CrouselScreen'

export default function HomeScreen() {
    return (
        <div>
            <MenueHeader/>
            <CrouselScreen/>
            <Container>
          <ProductList/>
            </Container>
            <FootrScreen/>
        </div>


    )
}
