import { React, useState } from 'react'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { BiSliderAlt } from 'react-icons/bi'
import { FaHome, FaUserCircle, FaUserFriends } from 'react-icons/fa'
import { IoMdLogIn, IoMdLogOut } from 'react-icons/io'
import { IoSettingsOutline } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

function NavigationLink(props) {
    return (
        <NavLink
            to={props.href}
            className={({ isActive, isPending }) =>
                isActive
                    ? `${props.className} active`
                    : `${props.className} inactive`
            }
        >
            {props.icon || ''} {props.text || 'Link'}
        </NavLink>
    )
}

const Sidebar = () => {
    const { userInfo } = useSelector((store) => store.user)
    const [openDropDown, setOpenDropDown] = useState(false)

    return (
        //First Nav for mobile, second for tablet++
        <>
            <nav className="sidebar-smallscreen">
                <NavigationLink
                    text="home"
                    href="/"
                    icon={<FaHome className="icon" />}
                    className="sidebar-smallscreen-link"
                />

                {!!userInfo ? (
                    <>
                        <NavigationLink
                            text="profile"
                            href="/profile"
                            icon={<FaUserCircle className="icon" />}
                            className="sidebar-smallscreen-link"
                        />

                        <NavigationLink
                            text="friends"
                            href="/friends"
                            icon={<FaUserFriends className="icon" />}
                            className="sidebar-smallscreen-link"
                        />
                        <div
                            className={
                                openDropDown ? 'dropdown active' : 'dropdown'
                            }
                            onClick={() => setOpenDropDown(!openDropDown)}
                        >
                            <div className="dropdown-icon">
                                <IoSettingsOutline className="icon" />
                            </div>

                            <div
                                className={
                                    openDropDown
                                        ? 'dropdown_links open'
                                        : 'dropdown_links'
                                }
                            >
                                <NavigationLink
                                    text="account"
                                    href="/account"
                                    icon={<BiSliderAlt className="icon" />}
                                    className="dropdown-link"
                                />
                                <NavigationLink
                                    text="logout"
                                    href="/logout"
                                    icon={<IoMdLogOut className="icon" />}
                                    className="dropdown-link"
                                />
                                <NavigationLink
                                    text="about"
                                    href="/about"
                                    icon={
                                        <AiOutlineInfoCircle className="icon" />
                                    }
                                    className="dropdown-link"
                                />
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <NavigationLink
                            text="login"
                            href="/login"
                            icon={<IoMdLogIn className="icon" />}
                            className="sidebar-smallscreen-link"
                        />
                        <NavigationLink
                            text="about"
                            href="/about"
                            icon={<AiOutlineInfoCircle className="icon" />}
                            className="sidebar-smallscreen-link"
                        />
                    </>
                )}
            </nav>

            <nav className="sidebar">
                <NavigationLink
                    text="home"
                    href="/"
                    icon={<FaHome className="icon" />}
                    className="sidebar-link"
                />

                {!!userInfo ? (
                    <>
                        <NavigationLink
                            text="profile"
                            href="/profile"
                            icon={<FaUserCircle className="icon" />}
                            className="sidebar-link"
                        />

                        <NavigationLink
                            text="friends"
                            href="/friends"
                            icon={<FaUserFriends className="icon" />}
                            className="sidebar-link"
                        />

                        <NavigationLink
                            text="account"
                            href="/account"
                            icon={<BiSliderAlt className="icon" />}
                            className="sidebar-link"
                        />

                        <NavigationLink
                            text="logout"
                            href="/logout"
                            icon={<IoMdLogOut className="icon" />}
                            className="sidebar-link"
                        />
                    </>
                ) : (
                    <NavigationLink
                        text="login"
                        href="/login"
                        icon={<IoMdLogIn className="icon" />}
                        className="sidebar-link"
                    />
                )}
                <NavigationLink
                    text="about"
                    href="/about"
                    icon={<AiOutlineInfoCircle className="icon" />}
                    className="sidebar-link"
                />
            </nav>
        </>
    )
}

export default Sidebar
