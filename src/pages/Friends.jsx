import React, { useEffect, useState } from 'react';
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
            {!!userInfo &&
                userInfo.friends.map((friend) => {
                    return <PeopleCard {...friend} />;
                })}
        </section>
    );
};

export default Friends;
