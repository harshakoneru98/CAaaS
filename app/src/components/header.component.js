import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import main from '../../public/assets/logo_nobg.png';

export default function Header() {
    const dispatch = useDispatch();
    const [isLevel, setIsLevel] = useState('');
    const level = useSelector((state) => state.MainViewReducer.level ?? '');

    // const authentication = (elementLevel) => {
    //     dispatch(setLevel(elementLevel));
    //     window.location.href = '/caaas/login';
    // };

    useEffect(() => {
        setIsLevel(level);
    }, [level]);

    console.log(isLevel);

    return (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top bg-white">
            <div className="container">
                <a className="navbar-brand" href="/">
                    <img src={main.src} alt="Main" />
                </a>
                <div
                    className="collapse navbar-collapse"
                    id="navbarTogglerDemo02"
                >
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/caaas/login">
                                Login
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/caaas/register">
                                Register
                            </a>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/caaas/login">
                                Personal
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/caaas/register">
                                Organisation
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
