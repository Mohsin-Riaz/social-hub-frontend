import { formatDistanceToNowStrict, parseISO } from 'date-fns';
import React, { useState } from 'react';
import { AiFillHeart, AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineCancel, MdOutlineCheckCircle } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { likePost, updatePostApi } from '../api/post_calls';
import { likePostSlice, updatePostSlice } from '../features/post/postSlice';
import Button from './Button';
import CommentBox from './CommentBox';
import Comments from './Comments';
import DeleteButton from './DeleteButton';
import InputText from './InputText';
import Modal from './Modal';
import PeopleCard from './PeopleCard';

const Post = (props) => {
    const [isEdit, setIsEdit] = useState(false);
    const [info, setInfo] = useState({ postTitle: '', postText: '' });
    const [openModal, setOpenModal] = useState(false);
    const { userInfo } = useSelector((store) => store.user);
    const dispatch = useDispatch();

    const {
        peopleId,
        avatar,
        first_name,
        last_name,
        postId,
        postImage,
        postTitle,
        postText,
        postLikes,
        postComments,
        createdAt,
    } = props;

    const postTime =
        parseISO(createdAt) &&
        formatDistanceToNowStrict(parseISO(createdAt), {
            addSuffix: true,
        });

    function likeHandler(e) {
        if (!userInfo) return;
        e.currentTarget.disabled = true;
        likePost({ postId: postId });
        dispatch(likePostSlice({ postId: postId }));
    }

    function editToggle() {
        setIsEdit(!isEdit);
    }

    function modalToggle() {
        setOpenModal(!openModal);
    }

    async function editHandler() {
        await updatePostApi(
            { postId: postId },
            { postTitle: info.postTitle, postText: info.postText }
        );
        dispatch(
            updatePostSlice({
                postId,
                postTitle: info.postTitle,
                postText: info.postText,
            })
        );

        setInfo({
            postTitle: info.postTitle || '',
            postText: info.postText || '',
        });
        setOpenModal(false);
        setIsEdit(false);
    }

    return (
        <article key={postId}>
            <Modal
                text="Save changes?"
                openModal={openModal}
                confirmButtonIcon={<MdOutlineCheckCircle className="icon" />}
                confirmButtonText="Confirm"
                confirmHandler={editHandler}
                cancelButtonIcon={<MdOutlineCancel className="icon" />}
                cancelButtonText="Cancel"
                cancelHandler={() => {
                    modalToggle();
                    editToggle();
                }}
            />
            <div className="post pad">
                <PeopleCard {...props} />
                <div className="post_content pad">
                    <div className="post_content_info">
                        <div className="post_content_info__content">
                            <div className="post_content_info__content_title">
                                {isEdit ? (
                                    <InputText
                                        className="post_content_info__content_input"
                                        id="postTitle"
                                        onChange={(e) => changeHandler(e)}
                                        setInfo={setInfo}
                                        info={info}
                                        placeholder={'Your title here...'}
                                        defaultValue={info.postTitle}
                                    />
                                ) : (
                                    <div>{postTitle}</div>
                                )}
                            </div>

                            {!!postImage && (
                                <div className="post_content_info__content_image">
                                    <img
                                        src={postImage}
                                        loading="lazy"
                                        style={{ background: '#000000f7' }}
                                    />
                                </div>
                            )}

                            {
                                <div className="post_content_info__content_text">
                                    {isEdit ? (
                                        <InputText
                                            className="post_content_info__content_input"
                                            id="postText"
                                            onChange={(e) => changeHandler(e)}
                                            setInfo={setInfo}
                                            info={info}
                                            placeholder={'Your text here...'}
                                            defaultValue={info.postText}
                                        />
                                    ) : (
                                        <div>{postText} </div>
                                    )}
                                </div>
                            }
                            <div className="post_content_info__stats_likes">
                                <Button
                                    buttonIcon={<AiFillHeart />}
                                    buttonText=""
                                    clickHandler={(e) => {
                                        likeHandler(e);
                                    }}
                                    className="like-button"
                                />
                                <div>{postLikes}</div>
                            </div>
                        </div>
                    </div>

                    <div className="post_content_sidebar">
                        {userInfo?.peopleId === peopleId ? (
                            <div className="post_content_buttons">
                                {isEdit ? (
                                    <Button
                                        buttonIcon={<AiOutlineEdit />}
                                        buttonText=""
                                        clickHandler={modalToggle}
                                        className="edit-button active"
                                        title="Edit"
                                    />
                                ) : (
                                    <Button
                                        buttonIcon={<AiOutlineEdit />}
                                        buttonText=""
                                        clickHandler={editToggle}
                                        className="edit-button"
                                        title="Edit"
                                    />
                                )}
                                <DeleteButton postId={postId} />
                            </div>
                        ) : (
                            <div></div>
                        )}

                        <div className="post_content_info__stats_time">
                            {postTime}
                        </div>
                    </div>
                </div>
            </div>

            <div className="post_comment">
                <CommentBox postId={postId} />
                <div className="comments-wrapper">
                    {!!postComments &&
                        postComments
                            // .slice()
                            // .reverse()
                            .map((c) => <Comments postId={postId} {...c} />)}
                </div>
            </div>
        </article>
    );
};

export default Post;
