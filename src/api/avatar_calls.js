import axios from 'axios';
const url = import.meta.env.VITE_IMAGE_SERVER_URL;

export const getAvatar = async ({ avatarId }) => {
    try {
        return await axios({
            method: 'GET',
            url: url + avatarId,
        }).then((response) => response.data);
    } catch (error) {
        console.log(error);
    }
};

export const createAvatar = async ({ avatarImg, avatarId }) => {
    const imageData = new FormData();
    imageData.append('avatar', avatarImg);
    try {
        return await axios({
            method: 'POST',
            headers: {
                'content-type': 'multipart/form-data',
            },
            url: url + 'a/' + avatarId,
            data: imageData,
            // headers: { 'Content-Type': 'application/json' },
            // url: url + avatarId,
            // data: { imageData: avatarImg },
        }).then((response) => response.data);
    } catch (error) {
        console.log(error);
    }
};

export const updateAvatar = async ({ avatarImg, avatarId }) => {
    try {
        return await axios({
            method: 'PATCH',
            url: url + avatarId,
            data: { imageData: avatarImg },
        }).then((response) => response.data);
    } catch (error) {
        console.log(error);
    }
};

export const deleteAvatar = async ({ avatarId }) => {
    //avatarId same as postId

    try {
        return await axios({
            method: 'DELETE',
            url: url + avatarId,
        }).then((response) => response.data);
    } catch (error) {
        console.log(error);
    }
};
