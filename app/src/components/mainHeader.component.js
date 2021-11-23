import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import UserDataEmailThunk from '../../redux/actionCreators/UserDataEmailThunk';
import main from '../../public/assets/images/logo_nobg.jpeg';

export default function MainHeader() {
    const router = useRouter();
    const myRef = useRef();
    const dispatch = useDispatch();

    const [isRoute, setIsRoute] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const [projectCookie, setProjectCookie, removeProjectCookie] = useCookies([
        'email',
        'level'
    ]);

    const userData = useSelector(
        (state) => state.UserDataEmailReducer.userData ?? ''
    );

    useEffect(() => {
        setIsRoute(router.route);
    });

    useEffect(() => {
        if (projectCookie?.email) {
            dispatch(UserDataEmailThunk(projectCookie.email));
        }
    }, [projectCookie]);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.addEventListener('mousedown', handleClickOutside);
    });

    let changeRoute = (elementRoute) => {
        setIsRoute(elementRoute);
        if (elementRoute == '/') {
            removeProjectCookie('email', { path: '/' });
            removeProjectCookie('level', { path: '/' });
            window.location.href = elementRoute;
        } else {
            router.push(elementRoute);
        }
    };

    let changeOpen = (status) => {
        setIsOpen(status);
    };

    const handleClickOutside = (e) => {
        if (!myRef?.current?.contains(e.target)) {
            setIsOpen(false);
        }
    };

    return (
        <div className="main-header d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
            <a
                className="navbar-brand main-nav-brand"
                onClick={(e) => {
                    changeRoute('/caaas/home');
                    e.preventDefault();
                }}
            >
                <img src={main.src} alt="Main" />
            </a>
            <nav className="my-2 my-md-0 mr-md-3">
                <a
                    className="p-2 text-dark"
                    onClick={(e) => {
                        changeRoute('/caaas/check-score');
                        e.preventDefault();
                    }}
                >
                    Check Scores
                </a>
                <a
                    className="p-2 text-dark"
                    onClick={(e) => {
                        changeRoute('/caaas/add-record');
                        e.preventDefault();
                    }}
                >
                    Add Record
                </a>
                <span className="dropdown">
                    <a
                        className="dropdown-toggle dropdown-name"
                        onClick={(e) => {
                            changeOpen(!isOpen);
                            e.preventDefault();
                        }}
                        data-toggle="dropdown"
                    >
                        {userData?.firstName
                            ? 'Hello ' + userData?.firstName
                            : 'Hello'}
                        <span className="caret"></span>
                    </a>

                    <div
                        className="dropdown-menu"
                        ref={myRef}
                        style={{ display: isOpen ? 'block' : 'none' }}
                        aria-labelledby="dropdownMenuButton"
                    >
                        <a
                            className="dropdown-item"
                            onClick={(e) => {
                                changeRoute('/caaas/profile');
                                e.preventDefault();
                            }}
                        >
                            My Profile
                        </a>
                        <a
                            className="dropdown-item"
                            onClick={(e) => {
                                changeRoute('/');
                                e.preventDefault();
                            }}
                        >
                            Logout
                        </a>
                    </div>
                </span>
            </nav>
        </div>
    );
}
