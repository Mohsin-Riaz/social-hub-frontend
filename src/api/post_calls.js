const backendURL = import.meta.env.VITE_NODE_ENV
    ? import.meta.env.VITE_BACKEND_SERVER_URL
    : import.meta.env.VITE_AWS_LAMBDA_BACKEND;

const imageURL = import.meta.env.VITE_IMAGE_SERVER_URL;

import axios from 'axios';
axios.defaults.withCredentials = true;
export async function getPost() {
    try {
        return await axios({
            method: 'GET',
            url: backendURL + `api/post/`,
        }).then((response) => {
            return response.data;
        });
    } catch (error) {
        console.log(error);
    }
}

export async function getPostById({ postId }) {
    try {
        return await axios({
            method: 'GET',
            url: backendURL + `api/post/p/` + postId,
        }).then((response) => response);
    } catch (error) {
        console.log(error);
    }
}

export async function getPostByQuery(parameters) {
    try {
        return await axios({
            method: 'GET',
            url: backendURL + `api/post/pid/`,
            params: parameters,
        }).then((response) => {
            return response.data;
        });
    } catch (error) {
        console.log(error);
        return;
    }
}

export async function createPost(data) {
    try {
        return await axios({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            url: backendURL + `api/post/`,
            data: data,
        }).then((response) => response);
    } catch (error) {
        console.log(error);
    }
}

export async function updatePostApi({ postId }, data) {
    try {
        return await axios({
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            url: backendURL + `api/post/updatepost/` + postId,
            data: data,
        }).then((response) => response);
    } catch (error) {
        console.log(error);
    }
}

export async function likePost({ postId }) {
    try {
        return await axios({
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            url: backendURL + `api/post/likepost/` + postId,
        }).then((response) => response);
    } catch (error) {
        console.log(error);
    }
}

export async function deletePost({ postId }) {
    try {
        return await axios({
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            url: backendURL + `api/post/deletepost/` + postId,
        }).then((response) => response.data);
    } catch (error) {
        console.log(error);
    }
}

export async function postComment(postId, postData) {
    try {
        return await axios({
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            url: backendURL + `api/post/pc/` + postId,
            data: postData,
        }).then((response) => {
            return response.data;
        });
    } catch (error) {
        console.log(error);
    }
}

export async function deleteComment({ postId, peopleId, commentId }) {
    try {
        return await axios({
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            url: backendURL + `api/post/dc/` + postId,
            data: { postId: postId, commentId: commentId },
        }).then((res) => res.data);
    } catch (error) {
        console.log(error);
    }
}

export async function createPostImage({ postImage, postId }) {
    try {
        return await axios({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            url: imageURL + postId,
            data: { imageData: postImage, imageType: 'post' },
        }).then((response) => response.data);
    } catch (error) {
        console.log(error);
    }
}
