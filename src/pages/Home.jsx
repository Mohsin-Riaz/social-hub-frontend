import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import LoadingContainer from '../components/LoadingContainer'

import { MdOutlineCancel, MdOutlineCheckCircle } from 'react-icons/md'
import Button from '../components/Button'
import Modal from '../components/Modal'
import PostBox from '../components/PostBox'
import PostsContainer from '../components/PostsContainer'
import { getPostItems } from '../features/post/postSlice'

const Home = () => {
    const dispatch = useDispatch()
    const { postItems, postLoading } = useSelector((store) => store.post)
    const { userInfo, userLoading } = useSelector((store) => store.user)

    useEffect(() => {
        dispatch(getPostItems())
    }, [])

    if (postLoading) return <LoadingContainer />

    return (
        <>
            {/* <dialog
                id='homeModal'
                style={{
                    // zIndex: '102',
                    // position: 'absolute',
                    // width: '90%',
                    // height: '90%',
                    // top: '5%',
                    // display: 'flex',
                    // flexDirection: 'column',
                    // opacity: '.95',
                    // color: 'white',
                    // alignItems: 'center',
                    // placeContent: 'center',
                    // backgroundColor: 'darkgrey',
                }}
            >
                <span>
                    <h3>Welcome to SocialHub</h3>
                    <h4>You are automatically logged in with a test user.</h4>
                    <h4>
                        You are able to log out, and create your own account to
                        post with!
                    </h4>
                </span>
                <Button buttonText="Okay Let Me In!" />
            </dialog> */}

            {!!userInfo && <PostBox />}
            <h3>Recent Posts</h3>
            <PostsContainer postItems={postItems} />
        </>
    )
}

export default Home
