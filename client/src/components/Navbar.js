import React, { useCallback } from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const NavBar = () => {
    const handleNavClick = useCallback((evt) => {
        evt.preventDefault();
        const targetId = evt.target.getAttribute('href');
        if (targetId === '#') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        } else {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth',
                });
            }
        }
    }, []);

    return (
        <div className="container-fluid">
            <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark" fixed="top" className="p-3">
                <Navbar.Brand href="#" className="mr-5">Logo</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <div className="d-flex justify-content-between w-100">
                        <Nav onClick={handleNavClick}>
                            <Nav.Link href="#maps">Maps</Nav.Link>
                            <Nav.Link href="#weapons">Weapons</Nav.Link>
                            <Nav.Link href="#extras">Extras</Nav.Link>
                            <Nav.Link href="#contact">Contact</Nav.Link>
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
