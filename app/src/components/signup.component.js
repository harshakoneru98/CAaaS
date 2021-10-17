import React, { useState } from 'react';

export default function SignUp() {
    const [startDate, setStartDate] = useState(new Date());

    return (
        <form>
            <h3>Sign Up</h3>

            <div className="form-group">
                <label>First name</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="First name"
                />
            </div>

            <div className="form-group">
                <label>Last name</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Last name"
                />
            </div>

            <div className="form-group">
                <label>Date Of Birth</label>
                <input
                    type="date"
                    id="dob"
                    name="dob"
                    className="form-control"
                    placeholder="Pick DOB"
                ></input>
            </div>

            <div className="form-group">
                <label>State</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter State"
                />
            </div>

            <div className="form-group">
                <label>City</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter City"
                />
            </div>

            <div className="form-group">
                <label>Phone Number</label>
                <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Phone Number"
                    name="phoneNumber"
                    minLength="10"
                    maxLength="10"
                />
            </div>

            <div className="form-group">
                <label>Gender</label>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="male"
                        id="maleRadio"
                    />
                    <label className="form-check-label" htmlFor="maleRadio">
                        Male
                    </label>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="female"
                        id="femaleRadio"
                    />
                    <label className="form-check-label" htmlFor="femaleRadio">
                        Female
                    </label>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="others"
                        id="othersRadio"
                    />
                    <label className="form-check-label" htmlFor="othersRadio">
                        Others
                    </label>
                </div>
                <div className="form-group form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="noToSay"
                        id="noToSayRadio"
                    />
                    <label className="form-check-label" htmlFor="noToSayRadio">
                        Prefer not to say
                    </label>
                </div>
            </div>

            <div className="form-group">
                <label>Are you Hispanic or Latino?</label>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="yes"
                        id="yesRadio"
                    />
                    <label className="form-check-label" htmlFor="yesRadio">
                        Yes
                    </label>
                </div>
                <div className="form-group form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="no"
                        id="noRadio"
                    />
                    <label className="form-check-label" htmlFor="noRadio">
                        No
                    </label>
                </div>
            </div>

            <div className="form-group">
                <label>
                    Regardless of your answer to the prior question, please
                    indicate how you identify yourself
                </label>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        name="white"
                        id="whiteRadio"
                    />
                    <label className="form-check-label" htmlFor="whiteRadio">
                        White
                    </label>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        name="black"
                        id="blackRadio"
                    />
                    <label className="form-check-label" htmlFor="blackRadio">
                        Black or African American
                    </label>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        name="alaska"
                        id="alaskaRadio"
                    />
                    <label className="form-check-label" htmlFor="alaskaRadio">
                        American Indian or Alaska Native
                    </label>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        name="asian"
                        id="asianRadio"
                    />
                    <label className="form-check-label" htmlFor="asianRadio">
                        Asian
                    </label>
                </div>
                <div className="form-group form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        name="hawaiin"
                        id="hawaiinRadio"
                    />
                    <label className="form-check-label" htmlFor="hawaiinRadio">
                        Native Hawaiian or Other Pacific Islander
                    </label>
                </div>
            </div>

            <div className="form-group">
                <label>Email address</label>
                <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                />
            </div>

            <div className="form-group">
                <label>Confirm Password</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm password"
                />
            </div>

            <button type="submit" className="btn btn-primary btn-block">
                Sign Up
            </button>
            <p className="forgot-password text-right">
                Already registered <a href="#">sign in?</a>
            </p>
        </form>
    );
}
