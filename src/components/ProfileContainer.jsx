import { format, parseISO } from 'date-fns';
import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

//  Redux
import { useDispatch, useSelector } from 'react-redux';
import { addFriend, removeFriend } from '../features/user/userSlice';

//  Icons
import { AiOutlineMail } from 'react-icons/ai';
import { FaBirthdayCake } from 'react-icons/fa';
import { FiMap } from 'react-icons/fi';
import { IoPersonAdd, IoPersonRemove } from 'react-icons/io5';
import { MdAlternateEmail } from 'react-icons/md';

//  API Calls
import {
    addFriendApi,
    getPeopleById,
    removeFriendApi,
} from '../api/people_calls';

//  JSX Components
import Button from '../components/Button';
import PostsContainer from '../components/PostsContainer';
import LoadingContainer from './LoadingContainer';
import PostBox from './PostBox';
// import PeopleCard from '../components/PeopleCard'

const ProfileContainer = (peopleInfo) => {
    const { peopleId } = useParams();
    const { postItems, postLoading } = useSelector((store) => store.post);
    const { userInfo, userLoading } = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const isUserProfile = peopleInfo.peopleId === userInfo?.peopleId;
    const isFriend = userInfo?.friends.find(
        (person) => peopleId === person.peopleId
    );
    const birthdate =
        Date.parse(peopleInfo?.birthdate) &&
        format(parseISO(peopleInfo?.birthdate), 'LLLL - d - y');

    async function friendHandler(type) {
        if (type === 'add')
            await addFriendApi(userInfo.peopleId, {
                peopleId: peopleInfo.peopleId,
                avatar: peopleInfo.avatar,
                first_name: peopleInfo.first_name,
                last_name: peopleInfo.last_name,
            })
                .then((r) => r.success && dispatch(addFriend(r.data)))
                .catch((err) => console.log(err));

        if (type === 'remove') {
            await removeFriendApi({
                peopleId: userInfo.peopleId,
                friendId: peopleInfo.peopleId,
            }).then(
                (r) =>
                    r.success &&
                    dispatch(removeFriend({ peopleId: peopleInfo.peopleId }))
            );
        }
        return;
    }

    if (!peopleInfo) return <LoadingContainer />;

    const backgroundImage = `url(../../database/backgrounds/background0.webp`;
    return (
        <section className="profile-container">
            <div
                className="profile-info"
                style={{
                    backgroundImage: backgroundImage,
                }}
            >
                <div className="profile-info_grid1">
                    <div className="profile-info_avatar">
                        <img src={peopleInfo.avatar} alt="" loading="lazy" />
                    </div>
                    {!isUserProfile &&
                        (isFriend ? (
                            <div className="profile-button">
                                <Button
                                    buttonText="unfriend"
                                    buttonIcon={
                                        <IoPersonRemove className="icon" />
                                    }
                                    className="button-sq"
                                    clickHandler={() => friendHandler('remove')}
                                />
                            </div>
                        ) : (
                            <div className="profile-button">
                                <Button
                                    buttonText="Friend"
                                    buttonIcon={
                                        <IoPersonAdd className="icon" />
                                    }
                                    className="button-sq"
                                    clickHandler={() => friendHandler('add')}
                                />
                            </div>
                        ))}
                </div>
                <div className="profile-info_field">
                    <div className="profile-info_field_name">
                        {peopleInfo.first_name} {peopleInfo.last_name}
                    </div>
                    <div className="profile-info_field_text">
                        <MdAlternateEmail className="icon" />{' '}
                        {peopleInfo?.email}
                        <a href={`mailto:${peopleInfo?.email}`}>
                            <AiOutlineMail className="icon" />
                        </a>
                    </div>
                    <div className="profile-info_field_text">
                        <FiMap className="icon" />
                        {peopleInfo?.address || 'No where'}
                    </div>
                    <div className="profile-info_field_text">
                        <FaBirthdayCake className="icon" />
                        {!!birthdate ? birthdate : 'No birthdate!'}
                    </div>
                </div>
            </div>

            {!!postLoading ? (
                <LoadingContainer />
            ) : (
                <>
                    {isUserProfile && <PostBox />}
                    <h3>
                        {isUserProfile
                            ? 'Your Recent Posts'
                            : `${peopleInfo.first_name}'s Recent Posts`}
                    </h3>
                    <PostsContainer postItems={postItems} />
                </>
            )}
        </section>
    );
};

export default ProfileContainer;
