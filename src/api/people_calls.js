const backendURL = import.meta.env.VITE_NODE_ENV
    ? import.meta.env.VITE_BACKEND_SERVER_URL
    : import.meta.env.VITE_AWS_LAMBDA_BACKEND

import axios from 'axios'
// axios.defaults.withCredentials = true
// axios.defaults.headers = { 'Content-Type': 'application/json' ,'Authorization': 'Bearer TOKEN'}

export async function getPeople() {
    try {
        return await axios({
            method: 'GET',
            url: backendURL + `api/people/getall`,
        }).then((response) => response.data)
    } catch (error) {
        console.log(error)
    }
}

export async function getPeopleById({ peopleId }) {
    try {
        return await axios({
            method: 'get',
            url: backendURL + `api/people/getpeoplebyid/` + peopleId,
        }).then((response) => {
            return response.data
        })
    } catch (error) {
        console.log(error)
    }
}

export async function getUser() {
    return await axios({
        method: 'get',
        url: backendURL + `api/people/getuser/`,
    })
        .then((response) => {
            return response.data
        })
        .catch((err) => err)
}

export async function getFriends(friendsArray) {
    var responseArray = []
    for (const peopleId of friendsArray) {
        await axios({
            method: 'get',
            url: backendURL + `api/people/getpeoplebyid/` + peopleId,
        })
            .then((response) => {
                responseArray.push(response.data.data)
            })
            .catch((error) => error)
    }
    return responseArray
}

export async function addFriendApi(peopleId, friendData) {
    try {
        return await axios({
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            url: backendURL + `api/people/addfriend/` + peopleId,
            data: friendData,
            withCredentials: true,
        }).then((response) => response.data)
    } catch (error) {
        console.log(error)
    }
}

export async function removeFriendApi({ peopleId, friendId }) {
    try {
        return await axios({
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            url: backendURL + `api/people/removefriend/` + peopleId,
            data: { friendId: friendId },
            withCredentials: true,
        }).then((response) => response.data)
    } catch (error) {
        console.log(error)
    }
}

export async function createPeople(formData) {
    try {
        return await axios({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            url: backendURL + `api/people/createpeople/`,
            data: formData,
            withCredentials: true,
        }).then((response) => response.data)
    } catch (error) {
        console.log(error)
    }
}

export async function updatePeopleApi({ peopleId }, data) {
    console.log(data)
    try {
        return await axios({
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            url: backendURL + `api/people/updatepeople/` + peopleId,
            data: data,
        }).then((response) => response.data)
    } catch (error) {
        console.log(error)
    }
}

export async function deletePeople({ peopleId }) {
    try {
        return await axios({
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            url: backendURL + `api/people/deletepeople/` + peopleId,
        }).then((response) => response.data)
    } catch (error) {
        console.log(error)
    }
}
