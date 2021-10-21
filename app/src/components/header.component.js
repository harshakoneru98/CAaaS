import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { setLevel } from '../../redux/actionCreators/SetLevel';
import main from '../../public/assets/logo_nobg.png';

export default function Header() {
    const dispatch = useDispatch();
    const router = useRouter();

    const [isRoute, setIsRoute] = useState('');

    const level = useSelector((state) => state.MainViewReducer.level ?? '');

    useEffect(() => {
        setIsRoute(router.route);
    });

    if (level == '') {
        dispatch(setLevel('personal'));
    }

    let changeLevel = (elementLevel) => {
        dispatch(setLevel(elementLevel));
    };

    let changeRoute = (elementRoute) => {
        setIsRoute(elementRoute);
        router.push(elementRoute);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top bg-white">
            <div className="container">
                <a
                    className="navbar-brand"
                    onClick={(e) => {
                        changeRoute('/');
                        e.preventDefault();
                    }}
                >
                    <img src={main.src} alt="Main" />
                </a>
                <div
                    className="collapse navbar-collapse"
                    id="navbarTogglerDemo02"
                >
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a
                                className={
                                    isRoute.includes('login')
                                        ? 'nav-link nav-highlight'
                                        : 'nav-link'
                                }
                                onClick={(e) => {
                                    changeRoute('/caaas/login');
                                    e.preventDefault();
                                }}
                            >
                                Login
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className={
                                    isRoute.includes('register')
                                        ? 'nav-link nav-highlight'
                                        : 'nav-link'
                                }
                                onClick={(e) => {
                                    changeRoute('/caaas/register');
                                    e.preventDefault();
                                }}
                            >
                                Register
                            </a>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a
                                className={
                                    level == 'personal'
                                        ? 'nav-link nav-highlight'
                                        : 'nav-link'
                                }
                                onClick={(e) => {
                                    changeLevel('personal');
                                    e.preventDefault();
                                }}
                            >
                                Personal
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className={
                                    level == 'organisation'
                                        ? 'nav-link nav-highlight'
                                        : 'nav-link'
                                }
                                onClick={(e) => {
                                    changeLevel('organisation');
                                    e.preventDefault();
                                }}
                            >
                                Organisation
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
