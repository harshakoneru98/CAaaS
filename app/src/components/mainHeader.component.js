import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import UserDataEmailThunk from '../../redux/actionCreators/UserDataEmailThunk';
import main from '../../public/assets/images/logo_nobg.png';

export default function MainHeader() {
    const router = useRouter();
    const dispatch = useDispatch();

    const [isRoute, setIsRoute] = useState('');

    const [emailCookie, setEmailCookie, removeEmailCookie] = useCookies([
        'email'
    ]);

    const userData = useSelector(
        (state) => state.UserDataEmailReducer.userData ?? ''
    );

    useEffect(() => {
        setIsRoute(router.route);
    });

    useEffect(() => {
        dispatch(UserDataEmailThunk(emailCookie.email));
    }, [emailCookie]);

    let changeRoute = (elementRoute) => {
        setIsRoute(elementRoute);
        if (elementRoute == '/') {
            removeEmailCookie('email', { path: '/' });
        }
        router.push(elementRoute);
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
                    Check Score
                </a>
                <a
                    className="p-2 text-dark"
                    onClick={(e) => {
                        changeRoute('/');
                        e.preventDefault();
                    }}
                >
                    Logout
                </a>
            </nav>
        </div>
    );
}
