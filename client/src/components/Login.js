import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
        const response = await axios.post('/api/login', { userName: userName, password });
        localStorage.setItem('token', response.data.token);
    };

    return (
        <form onSubmit={handleLogin}>
            <label>
                UserName:
                <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <input type="submit" value="Login" />
        </form>
    );
};

export default Login;
