// import {} from '@reduxjs/toolkit'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useSearchParams } from 'react-router-dom';
import { auth_google_login } from './api/auth_calls';
import LoadingContainer from './components/LoadingContainer';
import { getUserInfo } from './features/user/userSlice';
import './main.css';
import Layout from './pages/Layout/Layout';
import {
    About,
    Account,
    Chat,
    Friends,
    Google,
    Home,
    Login,
    Logout,
    NotFound,
    Profile,
} from './pages/pages';
function App() {
    const { userInfo, userLoading } = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const [search] = useSearchParams();

    useEffect(() => {
        if (!!userInfo) {
            const googleJWT = search.get('jwt');
            if (googleJWT) {
                (async function () {
                    const response = await auth_google_login(googleJWT);
                    if (response?.data?.success)
                        dispatch(getUserInfo(googleJWT));
                })();
            } else dispatch(getUserInfo());
        }
    }, []);

    if (userLoading) {
        return <LoadingContainer />;
    }

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index to="/" element={<Home />} />
                <Route path="/profile" element={<Profile />}>
                    <Route path=":peopleId" element={<Profile />} />
                </Route>
                <Route path="/friends" element={<Friends />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/account" element={<Account />} />
                <Route path="/about" element={<About />} />
                <Route path="/google" element={<Google />} />
            </Route>
            {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
    );
}

export default App;
