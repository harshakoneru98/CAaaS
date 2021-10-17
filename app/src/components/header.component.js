import React, { Component } from 'react';
import main from '../../public/assets/logo_nobg.png';

export default class Header extends Component {
    render() {
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
                                    Sign up
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
}
