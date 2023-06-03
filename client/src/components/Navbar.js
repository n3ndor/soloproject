// Navbar.js
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-scroll';

const NavBar = () => {
    return (
        <div className="container-fluid">
            <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark" fixed="top" className="p-3">
                <Navbar.Brand>
                    <Link to="carousel" smooth={true}>Logo</Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <div className="d-flex justify-content-between w-100">
                        <Nav>
                            <Nav.Link><Link to="maps" smooth={true}>Maps</Link></Nav.Link>
                            <Nav.Link><Link to="weapons" smooth={true}>Weapons</Link></Nav.Link>
                            <Nav.Link><Link to="extras" smooth={true}>Extras</Link></Nav.Link>
                            <Nav.Link><Link to="contact" smooth={true}>Contact</Link></Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="#login">Login</Nav.Link>
                        </Nav>
                    </div>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default NavBar;
