import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import * as data from '../../public/assets/files/stateCities';

export default function SignUp() {
    const router = useRouter();

    const [startDate, setStartDate] = useState(new Date());

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [organisation, setOrganisation] = useState('');
    const [gender, setGender] = useState('');
    const [ethnicty, setEthnicty] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [firstNameValid, setFirstNameValid] = useState(true);
    const [lastNameValid, setLastNameValid] = useState(true);
    const [dobValid, setDobValid] = useState(true);
    const [stateValid, setStateValid] = useState(true);
    const [cityValid, setCityValid] = useState(true);
    const [phoneNumberValid, setPhoneNumberValid] = useState(true);
    const [organisationValid, setOrganisationValid] = useState(true);
    const [genderValid, setGenderValid] = useState(true);
    const [ethnictyValid, setEthnictyValid] = useState(true);
    const [emailValid, setEmailValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    const [passwordMatchValid, setPasswordMatchValid] = useState(true);

    const nameRegrex = /[A-Za-z]/;
    const numberRegrex = /^\d{10}$/;
    const emailRegrex =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordRegrex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    let states = Object.keys(data.stateCities);
    let cityData = data.stateCities;
    let params;

    const level = useSelector((state) => state.MainViewReducer.level ?? '');

    useEffect(() => {
        setFirstName('');
        setLastName('');
        setDob('');
        setState('');
        setCity('');
        setPhoneNumber('');
        setOrganisation('');
        setGender('');
        setEthnicty('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setFirstNameValid(true);
        setLastNameValid(true);
        setDobValid(true);
        setStateValid(true);
        setCityValid(true);
        setPhoneNumberValid(true);
        setOrganisationValid(true);
        setGenderValid(true);
        setEthnictyValid(true);
        setEmailValid(true);
        setPasswordValid(true);
        setPasswordMatchValid(true);
    }, [level]);

    let changeRoute = (elementRoute) => {
        router.push(elementRoute);
    };

    let registerSubmit = async (params) => {
        await fetch('/api/postUser', {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        changeRoute('/caaas/login');
    };

    let register = () => {
        if (nameRegrex.test(firstName)) {
            setFirstNameValid(true);
        } else {
            setFirstNameValid(false);
        }

        if (nameRegrex.test(lastName)) {
            setLastNameValid(true);
        } else {
            setLastNameValid(false);
        }

        if (dob != '') {
            setDobValid(true);
        } else {
            setDobValid(false);
        }

        if (state != '') {
            setStateValid(true);
        } else {
            setStateValid(false);
        }

        if (city != '') {
            setCityValid(true);
        } else {
            setCityValid(false);
        }

        if (numberRegrex.test(phoneNumber)) {
            setPhoneNumberValid(true);
        } else {
            setPhoneNumberValid(false);
        }

        if (organisation != '') {
            setOrganisationValid(true);
        } else {
            setOrganisationValid(false);
        }

        if (gender != '') {
            setGenderValid(true);
        } else {
            setGenderValid(false);
        }

        if (ethnicty != '') {
            setEthnictyValid(true);
        } else {
            setEthnictyValid(false);
        }

        if (emailRegrex.test(email)) {
            setEmailValid(true);
        } else {
            setEmailValid(false);
        }

        if (passwordRegrex.test(password)) {
            setPasswordValid(true);
        } else {
            setPasswordValid(false);
        }

        if (password == confirmPassword) {
            setPasswordMatchValid(true);
        } else {
            setPasswordMatchValid(false);
        }

        if (level == 'organisation') {
            if (
                nameRegrex.test(firstName) &&
                nameRegrex.test(lastName) &&
                dob != '' &&
                state != '' &&
                city != '' &&
                numberRegrex.test(phoneNumber) &&
                organisation != '' &&
                gender != '' &&
                ethnicty != '' &&
                emailRegrex.test(email) &&
                passwordRegrex.test(password) &&
                password == confirmPassword
            ) {
                params = {
                    firstName: firstName,
                    lastName: lastName,
                    dob: dob,
                    state: state,
                    city: city,
                    phoneNumber: phoneNumber,
                    organisation: organisation,
                    gender: gender,
                    ethnicty: ethnicty,
                    email: email,
                    password: password
                };
                registerSubmit(params);
            }
        } else {
            if (
                nameRegrex.test(firstName) &&
                nameRegrex.test(lastName) &&
                dob != '' &&
                state != '' &&
                city != '' &&
                numberRegrex.test(phoneNumber) &&
                gender != '' &&
                ethnicty != '' &&
                emailRegrex.test(email) &&
                passwordRegrex.test(password) &&
                password == confirmPassword
            ) {
                params = {
                    firstName: firstName,
                    lastName: lastName,
                    dob: dob,
                    state: state,
                    city: city,
                    phoneNumber: phoneNumber,
                    organisation: 'self',
                    gender: gender,
                    ethnicty: ethnicty,
                    email: email,
                    password: password
                };
                registerSubmit(params);
            }
        }
    };

    return (
        <form className="form" id="form-id">
            <h3>Sign Up</h3>

            <div
                className={
                    !firstNameValid ? 'form-group form-error' : 'form-group'
                }
            >
                <label>First name</label>
                <span> *</span>
                <input
                    type="text"
                    className="form-control"
                    placeholder="First name"
                    onChange={(e) => {
                        setFirstName(e.target.value);
                    }}
                />
                {!firstNameValid && (
                    <label className="error">
                        Use only alphabetic characters
                    </label>
                )}
            </div>

            <div
                className={
                    !lastNameValid ? 'form-group form-error' : 'form-group'
                }
            >
                <label>Last name</label>
                <span> *</span>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Last name"
                    onChange={(e) => {
                        setLastName(e.target.value);
                    }}
                />
                {!lastNameValid && (
                    <label className="error">
                        Use only alphabetic characters
                    </label>
                )}
            </div>

            <div className={!dobValid ? 'form-group form-error' : 'form-group'}>
                <label>Date Of Birth</label>
                <span> *</span>
                <input
                    type="date"
                    id="dob"
                    name="dob"
                    className="form-control"
                    placeholder="Pick DOB"
                    onChange={(e) => {
                        setDob(e.target.value);
                    }}
                />
                {!dobValid && (
                    <label className="error">
                        Enter the date in mm/dd/yyyy format
                    </label>
                )}
            </div>

            <div
                className={!stateValid ? 'form-group form-error' : 'form-group'}
            >
                <label>State</label>
                <span> *</span>
                <select
                    className="form-control"
                    onChange={(e) => {
                        setState(e.target.value);
                    }}
                >
                    <option value="">Select State</option>
                    {states.map((data, index) => {
                        return (
                            <option key={index} value={data}>
                                {data}
                            </option>
                        );
                    })}
                </select>
                {!stateValid && (
                    <label className="error">Select atleast one state</label>
                )}
            </div>

            <div
                className={!cityValid ? 'form-group form-error' : 'form-group'}
            >
                <label>City</label>
                <span> *</span>
                <select
                    className="form-control"
                    onChange={(e) => {
                        setCity(e.target.value);
                    }}
                >
                    {!state && <option value="">Select Above State</option>}
                    {state && <option value="">Select City</option>}
                    {cityData[state]?.map((data, index) => {
                        return (
                            <option key={index} value={data}>
                                {data}
                            </option>
                        );
                    })}
                </select>
                {!cityValid && (
                    <label className="error">Select atleast one city</label>
                )}
            </div>

            <div
                className={
                    !phoneNumberValid ? 'form-group form-error' : 'form-group'
                }
            >
                <label>Phone Number</label>
                <span> *</span>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Phone Number"
                    name="phoneNumber"
                    minLength="10"
                    maxLength="10"
                    onChange={(e) => {
                        setPhoneNumber(e.target.value);
                    }}
                />
                {!phoneNumberValid && (
                    <label className="error">
                        Enter 10 digit valid phone number
                    </label>
                )}
            </div>

            {level == 'organisation' && (
                <div
                    className={
                        !organisationValid
                            ? 'form-group form-error'
                            : 'form-group'
                    }
                >
                    <label>Organisation</label>
                    <span> *</span>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Organisation name"
                        onChange={(e) => {
                            setOrganisation(e.target.value);
                        }}
                    />
                    {!organisationValid && (
                        <label className="error">Enter Organisation Name</label>
                    )}
                </div>
            )}

            <div
                className={
                    !genderValid ? 'form-group form-error' : 'form-group'
                }
            >
                <label>Gender</label>
                <span> *</span>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        id="Male"
                        onChange={(e) => {
                            setGender(e.target.id);
                        }}
                    />
                    <label className="form-check-label" htmlFor="Male">
                        Male
                    </label>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        id="Female"
                        onChange={(e) => {
                            setGender(e.target.id);
                        }}
                    />
                    <label className="form-check-label" htmlFor="Female">
                        Female
                    </label>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        id="Others"
                        onChange={(e) => {
                            setGender(e.target.id);
                        }}
                    />
                    <label className="form-check-label" htmlFor="Others">
                        Others
                    </label>
                </div>
                <div
                    className={
                        !genderValid ? 'form-check' : 'form-group form-check'
                    }
                >
                    <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        id="Prefer not to say"
                        onChange={(e) => {
                            setGender(e.target.id);
                        }}
                    />
                    <label
                        className="form-check-label"
                        htmlFor="Prefer not to say"
                    >
                        Prefer not to say
                    </label>
                </div>
                {!genderValid && (
                    <label className="error">
                        Select atleast one of the above options
                    </label>
                )}
            </div>

            <div
                className={
                    !ethnictyValid ? 'form-group form-error' : 'form-group'
                }
            >
                <label>How you identify yourself?</label>
                <span> *</span>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="ethnicty"
                        id="hol"
                        onChange={(e) => {
                            setEthnicty(e.target.id);
                        }}
                    />
                    <label className="form-check-label" htmlFor="hol">
                        Hispanic or Latino
                    </label>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="ethnicty"
                        id="White"
                        onChange={(e) => {
                            setEthnicty(e.target.id);
                        }}
                    />
                    <label className="form-check-label" htmlFor="White">
                        White
                    </label>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="ethnicty"
                        id="Black or African American"
                        onChange={(e) => {
                            setEthnicty(e.target.id);
                        }}
                    />
                    <label
                        className="form-check-label"
                        htmlFor="Black or African American"
                    >
                        Black or African American
                    </label>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="ethnicty"
                        id="American Indian or Alaska Native"
                        onChange={(e) => {
                            setEthnicty(e.target.id);
                        }}
                    />
                    <label
                        className="form-check-label"
                        htmlFor="American Indian or Alaska Native"
                    >
                        American Indian or Alaska Native
                    </label>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="ethnicty"
                        id="Asian"
                        onChange={(e) => {
                            setEthnicty(e.target.id);
                        }}
                    />
                    <label className="form-check-label" htmlFor="Asian">
                        Asian
                    </label>
                </div>
                <div
                    className={
                        !ethnictyValid ? 'form-check' : 'form-group form-check'
                    }
                >
                    <input
                        className="form-check-input"
                        type="radio"
                        name="ethnicty"
                        id="Native Hawaiian or Other Pacific Islander"
                        onChange={(e) => {
                            setEthnicty(e.target.id);
                        }}
                    />
                    <label
                        className="form-check-label"
                        htmlFor="Native Hawaiian or Other Pacific Islander"
                    >
                        Native Hawaiian or Other Pacific Islander
                    </label>
                </div>
                {!ethnictyValid && (
                    <label className="error">
                        Select atleast one of the above options
                    </label>
                )}
            </div>

            <div
                className={!emailValid ? 'form-group form-error' : 'form-group'}
            >
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
                {!emailValid && (
                    <label className="error">Enter valid email address</label>
                )}
            </div>

            <div
                className={
                    !passwordMatchValid || !passwordValid
                        ? 'form-group form-error'
                        : 'form-group'
                }
            >
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
                {!passwordValid && (
                    <label className="error">
                        Enter 8 minimum characters. Atleast 1 UpperCase, 1
                        LowerCase, 1 Number and 1 Special Character
                    </label>
                )}
            </div>

            <div
                className={
                    !passwordMatchValid ? 'form-group form-error' : 'form-group'
                }
            >
                <label>Confirm Password</label>
                <span> *</span>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm password"
                    onChange={(e) => {
                        setConfirmPassword(e.target.value);
                    }}
                />
                {!passwordMatchValid && (
                    <label className="error">Passwords doesn't match</label>
                )}
            </div>

            <a
                className="btn btn-primary btn-block"
                onClick={(e) => {
                    register();
                    e.preventDefault();
                }}
                role="button"
            >
                Sign Up
            </a>
            <p className="forgot-password text-right">
                Already registered{' '}
                <a
                    onClick={(e) => {
                        changeRoute('/caaas/login');
                        e.preventDefault();
                    }}
                >
                    sign in?
                </a>
            </p>
        </form>
    );
}
