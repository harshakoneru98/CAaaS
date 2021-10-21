import React, { useState } from 'react';

export default function SignUp() {
    const [startDate, setStartDate] = useState(new Date());

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('');
    const [ethnicty1, setEthnicty1] = useState('');
    const [ethnicty2, setEthnicty2] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [firstNameValid, setFirstNameValid] = useState(true);
    const [lastNameValid, setLastNameValid] = useState(true);
    const [dobValid, setDobValid] = useState(true);
    const [phoneNumberValid, setPhoneNumberValid] = useState(true);
    const [genderValid, setGenderValid] = useState(true);
    const [ethnicty1Valid, setEthnicty1Valid] = useState(true);
    const [ethnicty2Valid, setEthnicty2Valid] = useState(true);

    let register = () => {
        // console.log('State: ', state);
        // console.log('City: ', city);
        // console.log('Email: ', email);
        // console.log('Password: ', password);
        // console.log('Confirm Password: ', confirmPassword);

        if (/[A-Za-z]/.test(firstName)) {
            setFirstNameValid(true);
        } else {
            setFirstNameValid(false);
        }

        if (/[A-Za-z]/.test(lastName)) {
            setLastNameValid(true);
        } else {
            setLastNameValid(false);
        }

        if (dob != '') {
            setDobValid(true);
        } else {
            setDobValid(false);
        }

        if (/^\d{10}$/.test(phoneNumber)) {
            setPhoneNumberValid(true);
        } else {
            setPhoneNumberValid(false);
        }

        if (gender != '') {
            setGenderValid(true);
        } else {
            setGenderValid(false);
        }

        if (ethnicty1 != '') {
            setEthnicty1Valid(true);
        } else {
            setEthnicty1Valid(false);
        }

        if (ethnicty2 != '') {
            setEthnicty2Valid(true);
        } else {
            setEthnicty2Valid(false);
        }
    };

    return (
        <form className="form">
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
                        Fill the date in mm/dd/yyyy format
                    </label>
                )}
            </div>

            <div className="form-group">
                <label>State</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter State"
                    onChange={(e) => {
                        setState(e.target.value);
                    }}
                />
            </div>

            <div className="form-group">
                <label>City</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter City"
                    onChange={(e) => {
                        setCity(e.target.value);
                    }}
                />
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
                    !ethnicty1Valid ? 'form-group form-error' : 'form-group'
                }
            >
                <label>Are you Hispanic or Latino?</label>
                <span> *</span>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="ethnicty1"
                        id="Yes"
                        onChange={(e) => {
                            setEthnicty1(e.target.id);
                        }}
                    />
                    <label className="form-check-label" htmlFor="Yes">
                        Yes
                    </label>
                </div>
                <div
                    className={
                        !ethnicty1Valid ? 'form-check' : 'form-group form-check'
                    }
                >
                    <input
                        className="form-check-input"
                        type="radio"
                        name="ethnicty1"
                        id="No"
                        onChange={(e) => {
                            setEthnicty1(e.target.id);
                        }}
                    />
                    <label className="form-check-label" htmlFor="No">
                        No
                    </label>
                </div>
                {!ethnicty1Valid && (
                    <label className="error">
                        Select atleast one of the above options
                    </label>
                )}
            </div>

            <div
                className={
                    !ethnicty2Valid ? 'form-group form-error' : 'form-group'
                }
            >
                <label>How you identify yourself?</label>
                <span> *</span>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="ethnicty2"
                        id="White"
                        onChange={(e) => {
                            setEthnicty2(e.target.id);
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
                        name="ethnicty2"
                        id="Black or African American"
                        onChange={(e) => {
                            setEthnicty2(e.target.id);
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
                        name="ethnicty2"
                        id="American Indian or Alaska Native"
                        onChange={(e) => {
                            setEthnicty2(e.target.id);
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
                        name="ethnicty2"
                        id="Asian"
                        onChange={(e) => {
                            setEthnicty2(e.target.id);
                        }}
                    />
                    <label className="form-check-label" htmlFor="Asian">
                        Asian
                    </label>
                </div>
                <div
                    className={
                        !ethnicty2Valid ? 'form-check' : 'form-group form-check'
                    }
                >
                    <input
                        className="form-check-input"
                        type="radio"
                        name="ethnicty2"
                        id="Native Hawaiian or Other Pacific Islander"
                        onChange={(e) => {
                            setEthnicty2(e.target.id);
                        }}
                    />
                    <label
                        className="form-check-label"
                        htmlFor="Native Hawaiian or Other Pacific Islander"
                    >
                        Native Hawaiian or Other Pacific Islander
                    </label>
                </div>
                {!ethnicty2Valid && (
                    <label className="error">
                        Select atleast one of the above options
                    </label>
                )}
            </div>

            <div className="form-group">
                <label>Email address</label>
                <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
            </div>

            <div className="form-group">
                <label>Confirm Password</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm password"
                    onChange={(e) => {
                        setConfirmPassword(e.target.value);
                    }}
                />
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
                Already registered <a href="#">sign in?</a>
            </p>
        </form>
    );
}
