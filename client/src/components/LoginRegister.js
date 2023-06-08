import React, { useState } from 'react';
import { Dropdown, Form, Button, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

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

        if (!showLogin && !formData.userName) {
            setNameError('Name is required');
            return;
        } else {
            setNameError(null);
        }

        try {
            const endpoint = showLogin ? "/api/login" : "/api/register";
            const response = await axios.post(`http://localhost:8000${endpoint}`, formData);
            // Store the user token in local storage
            localStorage.setItem("usertoken", response.data.token);
            // Redirect to the new booking page
            navigate("/new-booking");
        } catch (error) {
            // Show error message
            if (error.response) {
                console.log(error.response);
                // The request was made and the server responded with a status code outside of the range 2xx
                alert('An error occurred: ' + error.response.data);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received:', error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error', error.message);
            }
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
                                    <Form.Control type="text" name="userName" onChange={handleInputChange} placeholder="Enter name" />
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