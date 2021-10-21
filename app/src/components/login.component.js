import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

export default function Login() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [valid, setValid] = useState(true);

    const level = useSelector((state) => state.MainViewReducer.level ?? '');

    let changeRoute = (elementRoute) => {
        router.push(elementRoute);
    };

    let login = () => {
        if (email == '' || password == '') {
            setValid(false);
        } else {
            setValid(true);
            changeRoute('/caaas/home');
        }
    };

    return (
        <form className="form">
            <h3>Sign In</h3>

            <div className={!valid ? 'form-group form-error' : 'form-group'}>
                <label>Email address</label>
                <span> *</span>
                <input
                    type="email"
                    className="form-control"
                    placeholder={
                        level == 'organisation'
                            ? 'Enter organisation email'
                            : 'Enter email'
                    }
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
            </div>

            <div className={!valid ? 'form-group form-error' : 'form-group'}>
                <label>Password</label>
                <span> *</span>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
                {!valid && (
                    <label className="error">Enter valid credentials</label>
                )}
            </div>
            <a
                className="btn btn-primary btn-block"
                onClick={(e) => {
                    login();
                    e.preventDefault();
                }}
                role="button"
            >
                Log In
            </a>
            <p className="forgot-password text-right">
                Not registered{' '}
                <a
                    onClick={(e) => {
                        changeRoute('/caaas/register');
                        e.preventDefault();
                    }}
                >
                    sign up?
                </a>
            </p>
        </form>
    );
}
