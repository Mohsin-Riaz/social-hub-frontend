import React, { useState } from 'react';
import { BiCommentAdd } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createAvatar } from '../api/avatar_calls';
import { createPost, createPostImage, postComment } from '../api/post_calls';
import { createPostSlice } from '../features/post/postSlice';
import Button from './Button';
import FileUpload from './FileUpload';
import PeopleCard from './PeopleCard';

const PostBox = (props) => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector((store) => store.user);
    const { peopleId } = useParams();
    const [newPost, setNewPost] = useState({
        postTitle: '',
        postText: '',
        postImage: null,
        postImageData: '',
    });

    const enablePostBox = (function () {
        if (userInfo?.peopleId !== undefined) {
            if (userInfo?.peopleId === peopleId) return true;
            if (!peopleId) return true;
        }
        return false;
    })();

    if (!enablePostBox) return <></>;

    async function postHandler(e) {
        if (!newPost.postTitle?.length || !newPost.postText?.length)
            return alert(`A post title and text are required`);

        await createPost({
            peopleId: userInfo.peopleId,
            avatar: userInfo.avatar,
            first_name: userInfo.first_name,
            last_name: userInfo.last_name,
            postImage: newPost.postImage,
            postTitle: newPost.postTitle,
            postText: newPost.postText,
        })
            //Upload post image, update post state, update post slice
            .then(async (response) => {
                if (!response.data.success)
                    return console.log(`Error create post`);

                if (newPost.postImage) {
                    const imagePosted = await createPostImage({
                        postImage: newPost.postImageData,
                        postId: response.data.data.postId,
                    });

                    if (!imagePosted?.success)
                        return console.log(`Error post image not uploaded`);

                    setNewPost({
                        ...newPost,
                        postImage: response.data.data.postImage,
                    });
                }

                dispatch(createPostSlice(response.data.data));
            });

        //CLEANUP
        // const fileList =
        //     e.currentTarget.parentElement.parentElement.children[2].lastChild
        //         .value
        // if (fileList)
        //     e.currentTarget.parentElement.parentElement.children[2].lastChild.value =
        //         ''

        setNewPost({
            postTitle: '',
            postText: '',
            postImage: '',
            postImageData: '',
        });
    }

    function onChange(e) {
        const key = e.currentTarget.id;
        const value = e.currentTarget.value;

        setNewPost({
            ...newPost,
            [key]: value,
        });
    }

    function fileUploadFunc(image) {
        setNewPost({ ...newPost, postImage: true, postImageData: image });
    }

    return (
        <div className="post-box-container">
            <p>Create a New Post!</p>
            <section className="post-box">
                <PeopleCard {...userInfo} />
                <div>
                    <div className="post-box-title">
                        <label
                            className="post-box-title_label"
                            htmlFor="postTitle"
                        >
                            Title
                        </label>
                        <input
                            className="post-box-title_title"
                            type="text"
                            name="postTitle"
                            id="postTitle"
                            value={newPost.postTitle}
                            onChange={(e) => onChange(e)}
                        />
                    </div>

                    <div className="post-box-text">
                        <label
                            className="post-box-text_label"
                            htmlFor="postText"
                        >
                            Text
                        </label>
                        <textarea
                            className="post-box-text_text"
                            type="text"
                            name="postText"
                            id="postText"
                            value={newPost.postText}
                            onChange={(e) => onChange(e)}
                        />
                    </div>
                    <div className="post-box-image">
                        <label
                            className="post-box-image_label"
                            htmlFor="postText"
                        >
                            Image
                        </label>
                        <div className="post-box-image_image">
                            <FileUpload fileUploadFunc={fileUploadFunc} />
                        </div>
                    </div>
                    <div className="post-box-button">
                        <Button
                            clickHandler={(e) => postHandler(e)}
                            buttonText="Create Post"
                            buttonIcon={<BiCommentAdd className="icon" />}
                            name="post"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PostBox;
