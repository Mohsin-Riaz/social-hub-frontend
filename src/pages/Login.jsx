import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { auth_login } from '../api/auth_calls';
import { createAvatar } from '../api/avatar_calls';
import { createPeople } from '../api/people_calls';

import { FcGoogle } from 'react-icons/fc';

import Button from '../components/Button';
import FileUpload from '../components/FileUpload';
import InputText from '../components/InputText';
const Login = () => {
    // const { userInfo } = useSelector((store) => store.user);
    // const navigate = useNavigate();
    // !!userInfo && navigate('/')
    const [loginForm, setLoginForm] = useState(true);
    const [error, setError] = useState(false);
    const [info, setInfo] = useState({
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        avatar: '',
        address: '',
        birthdate: '',
    });

    async function loginHandler() {
        const response = await auth_login(info);
        if (response?.data?.success)
            // navigate('profile', { replace: true, relative: true });
            window.location.pathname = 'social-hub-frontend';
        else setError(true);
        return;
    }

    async function signUpHandler() {
        const personCreated = await createPeople({ ...info, avatar: null });
        if (!personCreated?.success) {
            setError(true);
            return;
        }

        const avatarCreated = await createAvatar({
            avatarImg: info.avatar,
            avatarId: personCreated.data.peopleId,
        });

        if (avatarCreated?.success)
            // navigate('/profile', { replace: true, relative: true });
            window.location.pathname = 'social-hub-frontend';
        setError(true);
        return;
    }

    function changeHandler(e) {
        const key = e.currentTarget.name;
        const value = e.currentTarget.value;

        setInfo({
            ...info,
            [key]: value,
        });

        setError(false);
    }

    function clickHandler(e) {
        setLoginForm(() => !loginForm);
        setInfo({ ...info, email: '', password: '' });
        setError(false);
    }

    function fileUploadFunc(image) {
        setInfo({ ...info, avatar: image });
    }

    function getGoogleOAuthURL() {
        const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';

        const backendURL = !!import.meta.env.VITE_NODE_ENV
            ? import.meta.env.VITE_BACKEND_SERVER_URL
            : import.meta.env.VITE_AWS_LAMBDA_BACKEND;

        const options = {
            redirect_uri: backendURL + 'api/auth/google',
            client_id: import.meta.env.VITE_OAUTH_ID,
            access_type: 'offline',
            response_type: 'code',
            prompt: 'consent',
            scope: [
                'https://www.googleapis.com/auth/userinfo.profile',
                'https://www.googleapis.com/auth/userinfo.email',
            ].join(' '),
        };
        const qs = new URLSearchParams(options);
        window.location = `${rootUrl}?${qs.toString()}`;
    }

    //LOGIN
    if (loginForm)
        return (
            <section key={'login'} className="login-page">
                <dialog open>
                    <p>
                        To use a demo account type "demo" without quotations
                        into the email and password fields!
                    </p>
                    <form method="dialog">
                        <button>OK</button>
                    </form>
                </dialog>
                <div className="button-wrapper">
                    <div className="button-wrapper_1">
                        <Button
                            clickHandler={clickHandler}
                            buttonText="Login"
                            disabled="true"
                        />
                    </div>
                    <div className="button-wrapper_2">
                        <Button
                            clickHandler={clickHandler}
                            buttonText="Sign Up"
                        />
                    </div>
                </div>

                <div className="login-form">
                    <span>{error ? 'INVALID CREDENTIALS' : ''}</span>
                    <InputText
                        type="text"
                        name="email"
                        id="email"
                        defaultValue=""
                        info={info}
                        setInfo={setInfo}
                        setError={setError}
                    />
                    <InputText
                        type="text"
                        name="password"
                        id="password"
                        defaultValue=""
                        info={info}
                        setInfo={setInfo}
                        setError={setError}
                    />
                </div>
                <div className="login-button">
                    <Button clickHandler={loginHandler} buttonText="LOGIN" />
                    or
                    <Button
                        buttonIcon={<FcGoogle className="icon" />}
                        buttonText={`Google Sign-In`}
                        clickHandler={() => getGoogleOAuthURL()}
                    />
                </div>
            </section>
        );
    //SIGNUP
    if (!loginForm)
        return (
            <section key={'signup'} className="signup-page">
                <div className="button-wrapper">
                    <div>
                        <Button
                            clickHandler={clickHandler}
                            buttonText="Login"
                        />
                    </div>
                    <div>
                        <Button
                            clickHandler={clickHandler}
                            buttonText="Sign Up"
                            disabled="true"
                        />
                    </div>
                </div>
                <div className="signup-form">
                    <span>{error ? 'INVALID CREDENTIALS' : ''}</span>

                    <h3>Required</h3>

                    <InputText
                        type="text"
                        name="email"
                        id="email"
                        defaultValue=""
                        info={info}
                        setInfo={setInfo}
                        setError={setError}
                    />
                    <InputText
                        type="text"
                        name="password"
                        id="password"
                        defaultValue=""
                        info={info}
                        setInfo={setInfo}
                        setError={setError}
                    />

                    <InputText
                        type="text"
                        name="first name"
                        id="first_name"
                        info={info}
                        setInfo={setInfo}
                        setError={setError}
                    />
                    <InputText
                        type="text"
                        name="last name"
                        id="last_name"
                        info={info}
                        setInfo={setInfo}
                        setError={setError}
                    />

                    <h3>Optional</h3>
                    <div>
                        <label for="Birthdate">Birthdate</label>
                        <input
                            type="date"
                            id="birthdate"
                            name="birthdate"
                            defaultValue="1990-01-01"
                            min="1900-01-01"
                            max="2005-06-30"
                            onChange={(e) => changeHandler(e)}
                            info={info}
                            setInfo={setInfo}
                            setError={setError}
                        />
                    </div>
                    <InputText
                        type="text"
                        name="address"
                        id="address"
                        info={info}
                        setInfo={setInfo}
                        setError={setError}
                    />

                    <div className="signup-fileupload">
                        <label>avatar</label>
                        <div className="signup-fileupload-area">
                            <FileUpload fileUploadFunc={fileUploadFunc} />
                        </div>
                    </div>
                </div>
                <div className="signup-button">
                    <Button clickHandler={signUpHandler} buttonText="SIGN UP" />
                </div>
            </section>
        );
};

export default Login;
