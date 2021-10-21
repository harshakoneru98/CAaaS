import React, { useEffect, useState } from 'react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [valid, setValid] = useState(true);

    let login = () => {
        if (email == '' || password == '') {
            setValid(false);
        } else {
            setValid(true);
            window.location.href = '/caaas/home';
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
                    placeholder="Enter email"
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
                Not registered <a href="/caaas/register">sign up?</a>
            </p>
        </form>
    );
}
