import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Form, Button, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from './UserContext';
import axios from './axiosInstance';

const LoginRegister = ({ setOpen, user }) => {
    const [showLogin, setShowLogin] = useState(true);
    const [formData, setFormData] = useState({});
    const [passwordError, setPasswordError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [nameError, setNameError] = useState(null);
    const [error, setError] = useState(null);
    const [confirmPasswordError, setConfirmPasswordError] = useState(null);
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        if (user) {
            setOpen(false);
            navigate("/");
        }
    }, [user, navigate, setOpen]);

    const toggleView = () => {
        setShowLogin(!showLogin);
        setHasSubmitted(false);
        setFormData({});
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

    const validateFormData = useCallback(() => {
        let errors = {};

        if (!formData.email) {
            errors.email = 'Email is required';
        }

        if (!formData.password || formData.password.length < 6) {
            errors.password = 'Password must have at least 6 characters';
        }

        if (!formData.password) {
            errors.password = 'Password is required';
        }

        if (!showLogin && !formData.userName) {
            errors.name = 'Name is required';
        }

        if (!showLogin && (!formData.confirmPassword || formData.password !== formData.confirmPassword)) {
            errors.confirmPassword = 'Passwords do not match';
        }

        setEmailError(errors.email || null);
        setPasswordError(errors.password || null);
        setConfirmPasswordError(errors.confirmPassword || null);
        setNameError(errors.name || null);

        return errors;
    }, [formData, showLogin]);

    useEffect(() => {
        if (hasSubmitted) {
            validateFormData();
        }
    }, [formData, hasSubmitted, validateFormData]);

    const handleFormSubmit = (event) => {
        event.preventDefault();

        setHasSubmitted(true);

        setEmailError(null);
        setPasswordError(null);
        setNameError(null);
        setConfirmPasswordError(null);

        const endpoint = showLogin ? "/api/login" : "/api/register";

        const errors = validateFormData()

        if (Object.keys(errors).length === 0) {
            submitForm(endpoint);
        }
    };

    const submitForm = async (endpoint) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}${endpoint}`, formData);

            if (response.data && response.data.token) {
                localStorage.setItem("usertoken", response.data.token);
                setUser(response.data);
                setOpen(false);
            } else {
                throw new Error('No token received');
            }
            setUser(response.data);
            setError(null);
            setOpen(false);
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    setError(error.response.data.error);
                } else if (error.response.data) {
                    const errors = error.response.data;
                    let errorMessages;
                    if (typeof errors === 'object' && Object.keys(errors).length > 1) {
                        errorMessages = Object.values(errors).join(', ');
                    } else {
                        errorMessages = errors[Object.keys(errors)[0]];
                    }
                    setError('An error occurred: ' + errorMessages);
                }
            } else {
                setError('An unknown error occurred. Please try again.');
            }
        }
    };

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
                            {hasSubmitted && !formData.email && emailError && <Form.Text className="text-danger">{emailError}</Form.Text>}
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" onChange={handleInputChange} placeholder="Password" />
                            {hasSubmitted && !formData.password && passwordError && <Form.Text className="text-danger">{passwordError}</Form.Text>}
                        </Form.Group>
                    </div>
                ) : (
                    <div>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="userName" onChange={handleInputChange} placeholder="Enter name" isInvalid={!!nameError} />
                            {hasSubmitted && !formData.userName && nameError && <Form.Text className="text-danger">{nameError}</Form.Text>}
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name="email" onChange={handleInputChange} placeholder="Enter email" isInvalid={!!emailError} />
                            {hasSubmitted && !formData.email && emailError && <Form.Text className="text-danger">{emailError}</Form.Text>}
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" onChange={handleInputChange} placeholder="Password" />
                            {hasSubmitted && passwordError && <Form.Text className="text-danger">{passwordError}</Form.Text>}
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword2">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" name="confirmPassword" onChange={handleInputChange} placeholder="Confirm Password" isInvalid={!!confirmPasswordError} />
                            <Form.Control.Feedback type='invalid'>{confirmPasswordError}</Form.Control.Feedback>
                        </Form.Group>
                    </div>
                )}
                {error && <Form.Text className="text-danger">{error}<br /></Form.Text>}

                <Button type="submit" className='mt-3' variant="success">Submit</Button>
                <Form.Text as="button" type="button" onClick={toggleView} style={{ border: 'none', color: "white", backgroundColor: 'transparent', cursor: 'pointer' }}>
                    {showLogin ? "Don't have an account? Register" : "Already have an account? Login"}
                </Form.Text>
            </Form>
        );
    }
}
export default LoginRegister;
