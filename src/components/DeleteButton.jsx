import { CiCircleRemove } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import Button from './Button';

import React, { useState } from 'react';
import { MdOutlineCancel, MdOutlineCheckCircle } from 'react-icons/md';
import { deleteAvatar } from '../api/avatar_calls';
import { deleteComment, deletePost } from '../api/post_calls';
import {
    deleteCommentSlice,
    deletePostSlice,
} from '../features/post/postSlice';
import Modal from './Modal';

const DeleteButton = (props) => {
    const { postId, commentId } = props;
    const [openModal, setOpenModal] = useState(false);
    const dispatch = useDispatch();
    // const { userInfo } = useSelector((store) => store.user)

    function deleteHandler() {
        if (commentId) {
            deleteComment({ postId: postId, commentId: commentId }).then(
                (res) => {
                    if (res?.success)
                        dispatch(
                            deleteCommentSlice({
                                postId: postId,
                                commentId: commentId,
                            })
                        );
                }
            );
            return;
        }
        deletePost({ postId: postId }).then((res) => {
            if (res?.success) {
                deleteAvatar({ avatarId: postId });
                // .then((res) => {
                //     console.log(res) /// Needs to be changed on prod
                // })
                dispatch(
                    deletePostSlice({
                        postId: postId,
                        commentId: commentId,
                    })
                );
            }
        });
    }

    return (
        <>
            <Modal
                text="Delete?"
                openModal={openModal}
                confirmButtonIcon={<MdOutlineCheckCircle className="icon" />}
                confirmButtonText="Confirm"
                confirmHandler={deleteHandler}
                cancelButtonIcon={<MdOutlineCancel className="icon" />}
                cancelButtonText="Cancel"
                cancelHandler={() => setOpenModal(false)}
            />
            <Button
                className="delete-button"
                buttonIcon={<CiCircleRemove />}
                buttonText=""
                title="Delete"
                // clickHandler={deleteHandler}
                clickHandler={() => setOpenModal(true)}
            />
        </>
    );
};

export default DeleteButton;
