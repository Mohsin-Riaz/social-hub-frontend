const backendURL = import.meta.env.VITE_NODE_ENV
    ? import.meta.env.VITE_BACKEND_SERVER_URL
    : import.meta.env.VITE_AWS_LAMBDA_BACKEND;

console.log(backendURL);

import axios from 'axios';
// axios.defaults.withCredentials = true
// axios.defaults.headers = { 'Content-Type': 'application/json' }

export async function auth_login({ email, password }) {
    return await axios({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        url: backendURL + `api/auth/login`,
        data: { email: email, password: password },
        withCredentials: true,
    })
        .then((response) => response)
        .catch((error) => console.log(error));
}

export async function auth_signup(data) {
    return await axios({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        url: backendURL + `api/people/`,
        data: { ...data },
        withCredentials: true,
    })
        .then((response) => response)
        .catch((error) => console.log(error));
}

export async function auth_logout() {
    return await axios({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        url: backendURL + `api/auth/logout`,
        withCredentials: true,
    })
        .then((response) => response)
        .catch((error) => console.log(error));
}
