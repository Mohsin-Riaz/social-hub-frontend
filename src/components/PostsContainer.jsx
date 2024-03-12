import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Post from './Post';
import PostBox from './PostBox';

const PostsContainer = ({ postItems }) => {
    // const [posts,setPosts] = useState([])
    // const { userInfo } = useSelector((store) => store.user);
    // const { peopleId } = useParams();
    // const enablePostBox = (function () {
    //     if (userInfo?.peopleId !== undefined) {
    //         if (userInfo?.peopleId === peopleId) return true;
    //         if (!peopleId) return true;
    //     }
    //     return false;
    // })();

    return (
        <div key={postItems}>
            {/* {enablePostBox && <PostBox />} */}
            {!postItems?.length ? (
                <div style={{ paddingBottom: '1em' }}>No Posts Yet!</div>
            ) : (
                postItems.toReversed().map((p) => {
                    return <Post {...p} />;
                })
            )}
        </div>
    );
};

export default PostsContainer;
