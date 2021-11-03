import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import * as cacheStore from 'node-cache';

export default function Login() {
    const router = useRouter();
    let myCache = new cacheStore();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [valid, setValid] = useState(true);

    const level = useSelector((state) => state.MainViewReducer.level ?? '');

    useEffect(() => {
        setEmail('');
        setPassword('');
    }, [level, valid]);

    useEffect(() => {
        setValid(true);
    }, [level]);

    let changeRoute = (elementRoute) => {
        router.push(elementRoute);
    };

    let checkLogin = async (params) => {
        await fetch('/api/checkLogin', {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((data) => {
                myCache.mset([
                    { key: 'checkStatus', val: data.data, ttl: 10000 }
                ]);
            });

        let checkStatus = myCache.mget(['checkStatus']).checkStatus;
        console.log('Status : ', checkStatus);

        if (checkStatus == 'Valid') {
            setValid(true);
            changeRoute('/caaas/home');
        } else {
            setValid(false);
        }
    };

    let login = () => {
        if (email == '' || password == '') {
            setValid(false);
        } else {
            let params = {
                email: email,
                password: password,
                organisationType: level == 'organisation' ? 'org' : 'self'
            };
            checkLogin(params);
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
                    value={email}
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
                    value={password}
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
