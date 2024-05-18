import React from 'react'
import './Header.css'
import { Row, Col } from 'react-bootstrap'
import HeaderImage from '../../../assets/Header.jpg'

const Header = () => {
    return (
        <>
            <Row style={{margin: "0px !important"}}>
                <Col xs={6}>
                    <h1 className="header">Welcome to the Home Page</h1>
                </Col>
                <Col xs={6}>
                    <div style={{ display: "flex", justifyContent: "center"}}>
                        <img
                            src={HeaderImage}
                            className='header-img'
                        />
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default Header