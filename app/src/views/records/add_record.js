import React, { useState } from 'react';

function AddRecord() {
    const [isSelection, setIsSelection] = useState('table');

    const [hyperTension, setHyperTension] = useState('');
    const [heartDisease, setHeartDisease] = useState('');
    const [evenMarried, setEvenMarried] = useState('');
    const [workType, setWorkType] = useState('');
    const [residenceType, setResidenceType] = useState('');
    const [avgGlucoseLevel, setAvgGlucoseLevel] = useState('');
    const [bmi, setBmi] = useState('');
    const [smokingStatus, setSmokingStatus] = useState('');

    let changeSelection = (status) => {
        setIsSelection(status);
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                <form className="form">
                    <h3>Add Record</h3>

                    <table>
                        <tbody>
                            <tr>
                                <th>
                                    <a
                                        className={
                                            isSelection == 'table'
                                                ? 'btn btn-primary active'
                                                : 'btn btn-primary'
                                        }
                                        onClick={(e) => {
                                            changeSelection('table');
                                            e.preventDefault();
                                        }}
                                    >
                                        Tabular Data
                                    </a>
                                </th>
                                <th>
                                    <a
                                        className={
                                            isSelection == 'ecg'
                                                ? 'btn btn-primary active'
                                                : 'btn btn-primary'
                                        }
                                        onClick={(e) => {
                                            changeSelection('ecg');
                                            e.preventDefault();
                                        }}
                                    >
                                        ECG Images
                                    </a>
                                </th>
                            </tr>
                        </tbody>
                    </table>

                    {isSelection == 'table' && (
                        <div>
                            <div className="form-group">
                                <label>Do you have Hyper Tension?</label>

                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="hyperTension"
                                        onChange={(e) => {
                                            setHyperTension(e.target.value);
                                        }}
                                        id="oneHyperTension"
                                        value="1"
                                        checked={
                                            hyperTension == '1' ? true : false
                                        }
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="oneHyperTension"
                                    >
                                        Yes
                                    </label>
                                </div>

                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="hyperTension"
                                        onChange={(e) => {
                                            setHyperTension(e.target.value);
                                        }}
                                        id="zeroHyperTension"
                                        value="0"
                                        checked={
                                            hyperTension == '0' ? true : false
                                        }
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="zeroHyperTension"
                                    >
                                        No
                                    </label>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Do you have any Heart Diseases?</label>

                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="heartDisease"
                                        onChange={(e) => {
                                            setHeartDisease(e.target.value);
                                        }}
                                        id="oneHeartDisease"
                                        value="1"
                                        checked={
                                            heartDisease == '1' ? true : false
                                        }
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="oneHeartDisease"
                                    >
                                        Yes
                                    </label>
                                </div>

                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="heartDisease"
                                        onChange={(e) => {
                                            setHeartDisease(e.target.value);
                                        }}
                                        id="zeroHeartDisease"
                                        value="0"
                                        checked={
                                            heartDisease == '0' ? true : false
                                        }
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="zeroHeartDisease"
                                    >
                                        No
                                    </label>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Have you ever been married?</label>

                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="evenMarried"
                                        onChange={(e) => {
                                            setEvenMarried(e.target.value);
                                        }}
                                        id="yesEvenMarried"
                                        value="Yes"
                                        checked={
                                            evenMarried == 'Yes' ? true : false
                                        }
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="yesEvenMarried"
                                    >
                                        Yes
                                    </label>
                                </div>

                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="evenMarried"
                                        onChange={(e) => {
                                            setEvenMarried(e.target.value);
                                        }}
                                        id="noEvenMarried"
                                        value="No"
                                        checked={
                                            evenMarried == 'No' ? true : false
                                        }
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="noEvenMarried"
                                    >
                                        No
                                    </label>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>What is your Work Type?</label>

                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="workType"
                                        onChange={(e) => {
                                            setWorkType(e.target.value);
                                        }}
                                        id="childrenWorkType"
                                        value="children"
                                        checked={
                                            workType == 'children'
                                                ? true
                                                : false
                                        }
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="childrenWorkType"
                                    >
                                        Children
                                    </label>
                                </div>

                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="workType"
                                        onChange={(e) => {
                                            setWorkType(e.target.value);
                                        }}
                                        id="govtWorkType"
                                        value="Govt_job"
                                        checked={
                                            workType == 'Govt_job'
                                                ? true
                                                : false
                                        }
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="govtWorkType"
                                    >
                                        Government Job
                                    </label>
                                </div>

                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="workType"
                                        onChange={(e) => {
                                            setWorkType(e.target.value);
                                        }}
                                        id="privateWorkType"
                                        value="Private"
                                        checked={
                                            workType == 'Private' ? true : false
                                        }
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="privateWorkType"
                                    >
                                        Private Job
                                    </label>
                                </div>

                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="workType"
                                        onChange={(e) => {
                                            setWorkType(e.target.value);
                                        }}
                                        id="selfWorkType"
                                        value="Self-employed"
                                        checked={
                                            workType == 'Self-employed'
                                                ? true
                                                : false
                                        }
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="selfWorkType"
                                    >
                                        Self Employed / Business
                                    </label>
                                </div>

                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="workType"
                                        onChange={(e) => {
                                            setWorkType(e.target.value);
                                        }}
                                        id="noWorkType"
                                        value="Never_worked"
                                        checked={
                                            workType == 'Never_worked'
                                                ? true
                                                : false
                                        }
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="noWorkType"
                                    >
                                        Not Working
                                    </label>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>What is your residence type?</label>

                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="residenceType"
                                        onChange={(e) => {
                                            setResidenceType(e.target.value);
                                        }}
                                        id="urbanResidenceType"
                                        value="Urban"
                                        checked={
                                            residenceType == 'Urban'
                                                ? true
                                                : false
                                        }
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="urbanResidenceType"
                                    >
                                        Urban
                                    </label>
                                </div>

                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="residenceType"
                                        onChange={(e) => {
                                            setResidenceType(e.target.value);
                                        }}
                                        id="ruralResidenceType"
                                        value="Rural"
                                        checked={
                                            residenceType == 'Rural'
                                                ? true
                                                : false
                                        }
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="ruralResidenceType"
                                    >
                                        Rural
                                    </label>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>
                                    What is the average glucose level in your
                                    blood?
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Average Glucose Level"
                                    onChange={(e) => {
                                        setAvgGlucoseLevel(e.target.value);
                                    }}
                                    value={avgGlucoseLevel}
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    What is your Body Mass Index(BMI)?
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="BMI"
                                    onChange={(e) => {
                                        setBmi(e.target.value);
                                    }}
                                    value={bmi}
                                />
                            </div>

                            <div className="form-group">
                                <label>What is your Smoking Status?</label>

                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="smokingStatus"
                                        onChange={(e) => {
                                            setSmokingStatus(e.target.value);
                                        }}
                                        id="formerSmokingStatus"
                                        value="formerly smoked"
                                        checked={
                                            smokingStatus == 'formerly smoked'
                                                ? true
                                                : false
                                        }
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="formerSmokingStatus"
                                    >
                                        Formerly Smoked
                                    </label>
                                </div>

                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="smokingStatus"
                                        onChange={(e) => {
                                            setSmokingStatus(e.target.value);
                                        }}
                                        id="neverSmokingStatus"
                                        value="never smoked"
                                        checked={
                                            smokingStatus == 'never smoked'
                                                ? true
                                                : false
                                        }
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="neverSmokingStatus"
                                    >
                                        Never Smoked
                                    </label>
                                </div>

                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="smokingStatus"
                                        onChange={(e) => {
                                            setSmokingStatus(e.target.value);
                                        }}
                                        id="smokesSmokingStatus"
                                        value="smokes"
                                        checked={
                                            smokingStatus == 'smokes'
                                                ? true
                                                : false
                                        }
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="smokesSmokingStatus"
                                    >
                                        Smokes
                                    </label>
                                </div>

                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="smokingStatus"
                                        onChange={(e) => {
                                            setSmokingStatus(e.target.value);
                                        }}
                                        id="unknownSmokingStatus"
                                        value="Unknown"
                                        checked={
                                            smokingStatus == 'Unknown'
                                                ? true
                                                : false
                                        }
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="unknownSmokingStatus"
                                    >
                                        Prefer not to say
                                    </label>
                                </div>
                            </div>

                            <a
                                className="btn btn-primary btn-block"
                                onClick={(e) => {
                                    e.preventDefault();
                                }}
                                role="button"
                            >
                                Submit the Record
                            </a>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default AddRecord;
