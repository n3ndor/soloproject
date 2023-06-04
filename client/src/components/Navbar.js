// Navbar.js
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-scroll';

const NavBar = () => {
    return (
        <div className="container-fluid">
            <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark" fixed="top" className="p-3">
                <Navbar.Brand>
                    <Link to="welcome" smooth={true} style={{ cursor: "pointer", textDecoration: 'none' }}><span>Galactical Paintball</span></Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <div className="d-flex justify-content-between w-100">
                        <Nav>
                            {["welcome", "maps", "weapons", "extras", "contact"].map((section) => (
                                <Nav.Link key={section}>
                                    <Link
                                        activeClass="active-link"
                                        to={section}
                                        spy={true}
                                        smooth={true}
                                        offset={-50}
                                        duration={500}
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <span>{section.charAt(0).toUpperCase() + section.slice(1)}</span>
                                    </Link>
                                </Nav.Link>
                            ))}
                        </Nav>
                        <Nav>
                            <Nav.Link href="#login" style={{ textDecoration: 'none' }}>Login</Nav.Link>
                        </Nav>
                    </div>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default NavBar;
