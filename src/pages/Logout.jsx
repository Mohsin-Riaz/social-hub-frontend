import React from 'react'
import { auth_logout } from '../api/auth_calls'

const Logout = () => {
    auth_logout().then(() => {
        window.location.href = '/'
    })
    return <div>Logging out...</div>
}

export default Logout
