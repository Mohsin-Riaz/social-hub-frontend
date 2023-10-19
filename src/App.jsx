// import {} from '@reduxjs/toolkit'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import LoadingContainer from './components/LoadingContainer';
import { getUserInfo } from './features/user/userSlice';
import './main.css';
import Layout from './pages/Layout/Layout';
import {
    About,
    Account,
    Chat,
    Friends,
    Home,
    Login,
    Logout,
    NotFound,
    Profile,
} from './pages/pages';

function App() {
    const { userInfo, userLoading } = useSelector((store) => store.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserInfo());
    }, []);

    if (userLoading) {
        return <LoadingContainer />;
    }

    return (
        <Routes>
            <Route i path="/" element={<Layout />}>
                <Route index to="/" element={<Home />} />
                <Route path="/profile" element={<Profile />}>
                    <Route path=":peopleId" element={<Profile />} />
                </Route>
                <Route path="/friends" element={<Friends />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/account" element={<Account />} />
                <Route path="/about" element={<About />} />
                <Route path="/chat" element={<Chat />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;
