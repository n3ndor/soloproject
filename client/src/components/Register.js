import React, { useState } from 'react';
import axios from 'axios';

const Registration = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegistration = async (event) => {
        event.preventDefault();
        const response = await axios.post('/api/register', { userName, email, password });
        localStorage.setItem('token', response.data.token);
    };

    return (
        <form onSubmit={handleRegistration}>
            <label>
                Name:
                <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
            </label>
            <label>
                Email:
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <input type="submit" value="Register" />
        </form>
    );
};

export default Registration;
