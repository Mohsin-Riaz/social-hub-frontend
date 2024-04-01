import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import {
    useLocation,
    useNavigate,
    useParams,
    useSearchParams,
} from 'react-router-dom';
import { auth_google_login } from '../api/auth_calls';
const Google = () => {
    const [search] = useSearchParams();
    const googleJWT = search.get('jwt');
    // Cookies.set('jwt', googleJWT, { expires: 7 });
    const url = new URL(
        '/social-hub-frontend',
        import.meta.env.VITE_CLIENT_URL
    );
    useEffect(() => {
        (async function loginGoogle() {
            const response = await auth_google_login(googleJWT);
            if (response?.data?.success) window.location = url;
        })();
    }, []);

    return <div>Redirecting...</div>;
};

export default Google;
Google;
