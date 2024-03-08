import Cookies from 'js-cookie';
import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
const Google = () => {
    const { search } = useLocation();
    const url = new URL(
        '/social-hub-frontend',
        import.meta.env.VITE_CLIENT_URL
    );
    const jwt = search.slice(1).split('=');
    Cookies.set(jwt[0], jwt[1], { expires: 7 });
    window.location = url;
    return <div>Redirecting...</div>;
};

export default Google;
Google;
