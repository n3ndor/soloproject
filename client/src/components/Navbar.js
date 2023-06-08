import React, { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import LoginRegister from './LoginRegister';

const NavBar = () => {
    const [open, setOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // CHANGE FOR LOGGED IN (true) OR LOGGED OUT (false)

    const location = useLocation();

    return (
        <div>
            <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark" fixed="top" className="p-3">
                <Navbar.Brand>
                    <RouterLink to="/" style={{ cursor: "pointer", textDecoration: 'none', color: '#fff' }}><span>Galactical Paintball</span></RouterLink>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setOpen(!open)} />
                <Navbar.Collapse id="responsive-navbar-nav">
                    {location.pathname === '/' && (
                        <Nav>
                            {["welcome", "maps", "weapons", "extras", "contact"].map((section) => (
                                <Nav.Item key={section}>
                                    <ScrollLink
                                        activeClass="active-link"
                                        to={section}
                                        spy={true}
                                        smooth={true}
                                        offset={-50}
                                        duration={500}
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <span>{section.charAt(0).toUpperCase() + section.slice(1)}</span>
                                    </ScrollLink>
                                </Nav.Item>
                            ))}
                        </Nav>
                    )}
                    <Nav className="ml-auto d-sm-none">
                        <LoginRegister hamburgerOpen={open} isLoggedIn={isLoggedIn} />
                    </Nav>
                </Navbar.Collapse>
                <div className="d-none d-sm-block">
                    <LoginRegister hamburgerOpen={open} isLoggedIn={isLoggedIn} />
                </div>
            </Navbar>
        </div>
    );
}

export default NavBar;
