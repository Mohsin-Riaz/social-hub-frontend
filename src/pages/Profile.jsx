import { React, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { getPostItems } from '../features/post/postSlice';

import { getPeopleById } from '../api/people_calls';

import LoadingContainer from '../components/LoadingContainer';
import ProfileContainer from '../components/ProfileContainer';

const Profile = () => {
    const { peopleId } = useParams();
    const { userInfo, userLoading } = useSelector((store) => store.user);
    const [peopleInfo, setPeopleInfo] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        let cancelled;
        if (cancelled) return;

        async function fetchProfile() {
            if (peopleId && peopleId != userInfo?.peopleId) {
                await getPeopleById({ peopleId: peopleId })
                    .then((res) => {
                        setPeopleInfo(res.data);
                    })
                    .catch(() => {
                        navigate('/', { replace: true, relative: true });
                    });
                dispatch(getPostItems({ peopleId: peopleId }));
            } else {
                if (!userInfo)
                    navigate('/login', { replace: true, relative: true });
                setPeopleInfo({ ...userInfo });
                dispatch(getPostItems({ peopleId: userInfo?.peopleId }));
            }
        }

        fetchProfile();
        return () => {
            cancelled = true;
            setIsLoading(false);
        };
    }, []);

    if (!peopleInfo || userLoading || isLoading) return <LoadingContainer />;

    //USER PROFILE
    return <ProfileContainer {...peopleInfo} />;
};

export default Profile;
