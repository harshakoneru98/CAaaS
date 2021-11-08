import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import main from '../../public/assets/images/logo_nobg.png';

export default function MainHeader() {
    const router = useRouter();

    const [isRoute, setIsRoute] = useState('');

    useEffect(() => {
        setIsRoute(router.route);
    });

    let changeRoute = (elementRoute) => {
        setIsRoute(elementRoute);
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
