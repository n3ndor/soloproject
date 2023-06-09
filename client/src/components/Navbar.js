import React, { useState, useContext } from 'react';
import UserContext from "../UserContext";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import Dropdown from 'react-bootstrap/Dropdown';
import LoginRegister from './LoginRegister';

const NavBar = () => {

    const [open, setOpen] = useState(false);
    const currentLocation = useLocation();
    const { user, setUser } = useContext(UserContext);

    return (
        <div>
            <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark" fixed="top" className="p-3">
                <Navbar.Brand>
                    <RouterLink to="/" style={{ cursor: "pointer", textDecoration: 'none', color: '#fff' }}><span>Galactical Paintball</span></RouterLink>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setOpen(!open)} />
                <Navbar.Collapse id="responsive-navbar-nav">
                    {currentLocation.pathname === '/' && (
                        <Nav>
                            {["welcome", "maps", "weapons", "extras", "contact"].map((section) => (
                                <Nav.Item key={section} className="nav-item">
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
                    <Nav className="ml-auto">
                        <Dropdown className='ml-auto d-none d-sm-block'>
                            <Dropdown.Toggle as="a" style={{ textDecoration: 'none', color: 'white' }}>
                                Login
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="bg-dark m-1 p-3 border-success custom-dropdown" style={{ minWidth: '300px' }}>
                                <LoginRegister user={user} setUser={setUser} setOpen={setOpen} />
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default NavBar;
