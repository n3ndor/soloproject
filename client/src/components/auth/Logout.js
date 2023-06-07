import React from 'react';

const Logout = () => {
    const handleLogout = () => {
        localStorage.removeItem('token');
    };

    return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
