import React, { useState } from 'react';
import { Dropdown, Form, Button, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const LoginRegister = ({ hamburgerOpen, isLoggedIn }) => {
    const [showLogin, setShowLogin] = useState(true);
    const [formData, setFormData] = useState({});
    const [passwordError, setPasswordError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [nameError, setNameError] = useState(null);
    const navigate = useNavigate();

    const toggleView = () => {
        setShowLogin(!showLogin);
    }
    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // Validation
        if (!formData.email) {
            setEmailError('Email is required');
            return;
        } else {
            setEmailError(null);
        }

        if (!formData.password) {
            setPasswordError('Password is required');
            return;
        } else if (!showLogin && formData.password !== formData.confirmPassword) {
            setPasswordError('Passwords do not match');
            return;
        } else {
            setPasswordError(null);
        }

        if (!showLogin && !formData.fullName) {
            setNameError('Name is required');
            return;
        } else {
            setNameError(null);
        }
        const endpoint = showLogin ? "/api/login" : "/api/register";

        const response = await fetch(endpoint, {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            const message = await response.text();
            alert('An error occurred: ' + message);
            return;
        }

        const data = await response.json();

        if (response.ok) {
            // Store the user token in local storage
            localStorage.setItem("usertoken", data.token);

            // Redirect to the new booking page
            navigate("/new-booking");
        } else {
            // Show error message
            alert(data.message);
        }
    }
    if (isLoggedIn) {
        return (
            <Nav className="ml-auto">
                <Link to="/new-booking" className="nav-link" style={{ textDecoration: 'none', color: '#fff' }}>New Booking</Link>

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
                            <Form onSubmit={handleFormSubmit}>
                                <Form.Group>
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" name="email" onChange={handleInputChange} placeholder="Enter email" />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" name="password" onChange={handleInputChange} placeholder="Password" />
                                </Form.Group>

                                <Button type="submit" className='mt-3' variant="success">Submit</Button>

                                <Form.Text as="button" onClick={toggleView} style={{ border: 'none', color: "white", backgroundColor: 'transparent', cursor: 'pointer' }}>
                                    Don't have an account? Register
                                </Form.Text>
                            </Form>
                        </div>
                    ) : (
                        <div>
                            <Form onSubmit={handleFormSubmit}>
                                <Form.Group>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" name="fullName" onChange={handleInputChange} placeholder="Enter name" />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" name="email" onChange={handleInputChange} placeholder="Enter email" />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" name="password" onChange={handleInputChange} placeholder="Password" />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control type="password" name="confirmPassword" onChange={handleInputChange} placeholder="Confirm Password" />
                                    {emailError && <div style={{ color: 'red' }}>{emailError}</div>}
                                    {passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}
                                    {nameError && <div style={{ color: 'red' }}>{nameError}</div>}
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