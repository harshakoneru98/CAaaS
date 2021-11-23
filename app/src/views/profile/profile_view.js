import React from 'react';
import { useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';

function ProfileView() {
    const userData = useSelector(
        (state) => state.UserDataEmailReducer.userData ?? ''
    );

    const [projectCookie, setProjectCookie] = useCookies(['email', 'level']);

    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                <form className="form">
                    <h3>My Profile</h3>

                    <div className="form-group">
                        <label>First Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter First Name"
                            value={userData?.firstName}
                            readOnly
                        />
                    </div>

                    <div className="form-group">
                        <label>Last Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Last Name"
                            value={userData?.lastName}
                            readOnly
                        />
                    </div>

                    <div className="form-group">
                        <label>Date of Birth</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter DOB"
                            value={userData?.dob}
                            readOnly
                        />
                    </div>

                    <div className="form-group">
                        <label>City</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter City"
                            value={userData?.city}
                            readOnly
                        />
                    </div>

                    <div className="form-group">
                        <label>State</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter State"
                            value={userData?.state}
                            readOnly
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Email"
                            value={projectCookie?.email}
                            readOnly
                        />
                    </div>

                    {userData?.organisation != 'self' && (
                        <div className="form-group">
                            <label>Organisation</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Organisation"
                                value={userData?.organisation}
                                readOnly
                            />
                        </div>
                    )}

                    <div className="form-group">
                        <label>Phone Number</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Phone Number"
                            value={userData?.phoneNumber}
                            readOnly
                        />
                    </div>

                    <div className="form-group">
                        <label>Gender</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Gender"
                            value={userData?.gender}
                            readOnly
                        />
                    </div>

                    <div className="form-group">
                        <label>Ethnicty</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Ethnicty"
                            value={userData?.ethnicty}
                            readOnly
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ProfileView;
