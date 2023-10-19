import React, { useState } from 'react'
import { BiCommentAdd } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { postComment } from '../api/post_calls'
import { postCommentSlice } from '../features/post/postSlice'
import Button from './Button'

const CommentBox = (props) => {
    const dispatch = useDispatch()
    const { userInfo } = useSelector((store) => store.user)

    const { postId } = props
    const [commentText, setCommentText] = useState('')

    async function commentHandler(e) {
        const response = await postComment(postId, {
            peopleId: userInfo.peopleId,
            avatar: userInfo.avatar,
            first_name: userInfo.first_name,
            last_name: userInfo.last_name,
            commentText: commentText,
        })
        dispatch(postCommentSlice({ postId: postId, ...response.data }))
        setCommentText('')
    }

    return (
        <section className="comment-box" key={postId}>
            <textarea
                type="text"
                name="comment"
                id="comment"
                value={commentText}
                onChange={(e) => setCommentText(e.currentTarget.value)}
            />
            <Button
                clickHandler={commentHandler}
                buttonText={<div>Comment</div>}
                buttonIcon={<BiCommentAdd className="icon" />}
                className="button-sq"
                name="comment"
            />
        </section>
    )
}

export default CommentBox
