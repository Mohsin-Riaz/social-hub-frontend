import React, { useEffect, useState } from 'react';
import { FaRegSadTear } from 'react-icons/fa';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { getFriends, getPeopleById } from '../api/people_calls';
import PeopleCard from '../components/PeopleCard';

const Friends = () => {
    const { userInfo, userLoading } = useSelector((store) => store.user);

    // useEffect(() => {
    //     if (!isLoading) return
    //     let cancelled = false
    //     ;(async function fetchFriends() {
    //         setFriendsList(await getFriends(userInfo.friends))
    //     })()

    //     // if (!cancelled) {
    //     //     fetchFriends()
    //     // }
    //     return () => {
    //         cancelled = true
    //         setIsLoading(false)
    //     }
    // }, [])

    if (userLoading) return <div>Loading...</div>;

    return (
        <section className="friends">
            {!!userInfo && userInfo.friend?.length ? (
                userInfo.friends.map((friend) => {
                    return <PeopleCard {...friend} />;
                })
            ) : (
                <div>
                    <div
                        style={{
                            fontSize: '1.5em',
                            minWidth: '35dvw',
                            display: 'flex',
                            placeItems: 'center',
                            textAlign: 'center',
                            justifyContent: 'center',
                            padding: '1em',
                            gap: '1em',
                            flexDirection: 'column',
                        }}
                    >
                        <div>
                            You have no friends yet{' '}
                            <FaRegSadTear className="icon" />
                        </div>
                        <div>
                            <IoArrowBackCircleOutline className="icon" /> Try
                            adding someone
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Friends;
