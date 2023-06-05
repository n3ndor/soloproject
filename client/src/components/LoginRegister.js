import React, { useState } from 'react';
import { Dropdown, Form, Button, Nav } from 'react-bootstrap';

const LoginRegister = ({ hamburgerOpen, isLoggedIn }) => {
    const [showLogin, setShowLogin] = useState(true);

    const toggleView = () => {
        setShowLogin(!showLogin);
    }

    if (isLoggedIn) {
        return (
            <Nav className="ml-auto">
                <Nav.Link>New Booking</Nav.Link>
                <Nav.Link>Old Bookings</Nav.Link>
                <Nav.Link>Logout</Nav.Link>
            </Nav>
        );
    } else {
        return (
            <Dropdown>
                <Dropdown.Toggle as="a" style={{ textDecoration: 'none', color: 'white' }}>
                    Login
                </Dropdown.Toggle>

                <Dropdown.Menu className="bg-dark m-1 p-3 border-success" style={{ right: !hamburgerOpen ? 0 : 'auto', left: 'auto', width: "300px", position: 'absolute' }}>
                    {showLogin ? (
                        <div>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" />
                                </Form.Group>

                                <Button type="submit" className='mt-3' variant="success">Submit</Button>

                                <Form.Text as="button" onClick={toggleView} style={{ border: 'none', color: "white", backgroundColor: 'transparent', cursor: 'pointer' }}>
                                    Don't have an account? Register
                                </Form.Text>
                            </Form>
                        </div>
                    ) : (
                        <div>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter name" />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control type="password" placeholder="Confirm Password" />
                                </Form.Group>

                                <Button type="submit" className='mt-3' variant="success">Submit</Button>

                                <Form.Text as="button" onClick={toggleView} style={{ border: 'none', color: "white", backgroundColor: 'transparent', cursor: 'pointer' }}>
                                    Already have an account? Login
                                </Form.Text>
                            </Form>
                        </div>
                    )}
                </Dropdown.Menu>
            </Dropdown>
        );
    }
}
export default LoginRegister;
