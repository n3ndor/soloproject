import React, { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-scroll';
import LoginRegister from './LoginRegister';

const NavBar = () => {
    const [open, setOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // CHANGE FOR LOGGED IN (true) OR LOGGED OUT (false)

    return (
        <div>
            <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark" fixed="top" className="p-3">
                <Navbar.Brand>
                    <Link to="welcome" smooth={true} style={{ cursor: "pointer", textDecoration: 'none' }}><span>Galactical Paintball</span></Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setOpen(!open)} />
                <Navbar.Collapse id="responsive-navbar-nav">
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
