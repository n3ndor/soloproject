import React, { useState, useEffect } from 'react';
import { Form, Button, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginRegister = ({ open, setOpen, user, setUser }) => {
    const [showLogin, setShowLogin] = useState(true);
    const [formData, setFormData] = useState({});
    const [passwordError, setPasswordError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [nameError, setNameError] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setOpen(false);
            navigate("/");
        }
    }, [user, navigate, setOpen]);

    const toggleView = () => {
        setShowLogin(!showLogin);
    }

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("usertoken");
        navigate("/");
    };

    const validateFormData = () => {
        if (!formData.email) {
            setEmailError('Email is required');
            return false;
        }

        if (!formData.password) {
            setPasswordError('Password is required');
            return false;
        } else if (!showLogin && formData.password !== formData.confirmPassword) {
            setPasswordError('Passwords do not match');
            return false;
        }

        if (!showLogin && !formData.userName) {
            setNameError('Name is required');
            return false;
        }

        return true;
    }

    const submitForm = async (endpoint) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}${endpoint}`, formData);
            localStorage.setItem("usertoken", response.data.token);
            setUser(response.data);
            setError(null);
            setOpen(false);
        } catch (error) {
            if (error.response) {
                setError('An error occurred: ' + error.response.data);
            }
        }
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        setEmailError(null);
        setPasswordError(null);
        setNameError(null);

        if (!validateFormData()) {
            return;
        }

        const endpoint = showLogin ? "/api/login" : "/api/register";
        submitForm(endpoint);
    }

    if (user) {
        return (
            <Nav className="ml-auto">
                <Link to="/new-booking" className="nav-link" style={{ textDecoration: 'none', color: '#fff' }}>New Booking</Link>
                <Nav.Link>Old Bookings</Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </Nav>
        );
    } else {
        return (
            <Form onSubmit={handleFormSubmit}>
                {showLogin ? (
                    <div>
                        <Form.Group>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name="email" onChange={handleInputChange} placeholder="Enter email" />
                            {emailError && <Form.Text className="text-danger">{emailError}</Form.Text>}
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" onChange={handleInputChange} placeholder="Password" />
                            {passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}
                        </Form.Group>
                    </div>
                ) : (
                    <div>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="userName" onChange={handleInputChange} placeholder="Enter name" />
                            {nameError && <div style={{ color: 'red' }}>{nameError}</div>}
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name="email" onChange={handleInputChange} placeholder="Enter email" />
                            {emailError && <Form.Text className="text-danger">{emailError}</Form.Text>}
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" onChange={handleInputChange} placeholder="Password" />
                            {passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" name="confirmPassword" onChange={handleInputChange} placeholder="Confirm Password" />

                            {error && <div style={{ color: 'red' }}>{error}</div>}
                        </Form.Group>
                    </div>
                )}
                <Button type="submit" className='mt-3' variant="success">Submit</Button>
                <Form.Text as="button" onClick={toggleView} style={{ border: 'none', color: "white", backgroundColor: 'transparent', cursor: 'pointer' }}>
                    {showLogin ? "Don't have an account? Register" : "Already have an account? Login"}
                </Form.Text>
            </Form>
        );
    }
}
export default LoginRegister;
