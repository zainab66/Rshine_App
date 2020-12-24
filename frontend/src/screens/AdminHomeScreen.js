import React from 'react'
import { Row, Col, Container } from 'react-bootstrap';
import '../index.css';
import {NavLink} from 'react-router-dom';


export default function AdminHomeScreen(props) {
    return (
        
            <Container fluid>
            <Row>
                <Col md={2} className="sidebar">
                    <ul>
                        <li><NavLink to={'/Category'}>Category</NavLink></li>
                        <li><NavLink to={'/productlist'}>Products</NavLink></li>

                    </ul>
                </Col>
                <Col md={10} style={{marginLeft:"auto", paddingTop:'60px'}}></Col>

            </Row>
            </Container>
        
    )
}
