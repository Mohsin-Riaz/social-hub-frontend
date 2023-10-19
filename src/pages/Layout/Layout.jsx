import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header.jsx'
import Sidebar from './Sidebar'

const Layout = () => {
    return (
        <main className="Layout">
            <div className="Layout-sidebar">
                <Sidebar />
            </div>
            <div className="Layout-content">
                <div className="Layout-header">
                    <Header />
                </div>
                <div className="Layout-outlet">
                    <Outlet />
                </div>
            </div>
        </main>
    )
}

export default Layout
