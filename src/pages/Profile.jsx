// import { format, parseISO } from 'date-fns'
import { React, useEffect, useState } from 'react';

// import { FaBirthdayCake } from 'react-icons/fa'
// import { FiMap } from 'react-icons/fi'
// import { MdAlternateEmail } from 'react-icons/md'

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
    addFriendApi,
    getPeopleById,
    removeFriendApi,
} from '../api/people_calls';
// import Button from '../components/Button'
// import PeopleCard from '../components/PeopleCard'
// import PostsContainer from '../components/PostsContainer'

import LoadingContainer from '../components/LoadingContainer';
import ProfileContainer from '../components/ProfileContainer';
import { getPostItems } from '../features/post/postSlice';
// import { addFriend, removeFriend } from '../features/user/userSlice'

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
                        navigate('/');
                    });
                dispatch(getPostItems({ peopleId: peopleId }));
            } else {
                if (!userInfo) navigate('/login');
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
