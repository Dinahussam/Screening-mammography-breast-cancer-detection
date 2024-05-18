import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../../assets/Header.jpg'

const NavBar = () => {
    return (
        <>
            <Navbar expand="lg" className="" style={{ width: "100% !important", margin: "0", backgroundColor: "transperent", color: "white"}} sticky='true'>
                <Navbar.Brand href="#home">
                    <img src={logo} alt="" width={100} height={100} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default NavBar