import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth_logout } from '../api/auth_calls';
const Logout = () => {
    const navigate = useNavigate();
    auth_logout().then(() => {
        // navigate('/', { replace: true });
        window.location.pathname = 'social-hub-frontend';
    });
    return <div>Logging out...</div>;
};

export default Logout;
