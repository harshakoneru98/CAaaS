import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import moment from 'moment';
import * as cacheStore from 'node-cache';
import { useDropzone } from 'react-dropzone';

function AddRecord() {
    const [isSelection, setIsSelection] = useState('table');
    const [isStatus, setIsStatus] = useState(true);

    const [hyperTension, setHyperTension] = useState('');
    const [heartDisease, setHeartDisease] = useState('');
    const [evenMarried, setEvenMarried] = useState('');
    const [workType, setWorkType] = useState('');
    const [residenceType, setResidenceType] = useState('');
    const [avgGlucoseLevel, setAvgGlucoseLevel] = useState('');
    const [bmi, setBmi] = useState('');
    const [smokingStatus, setSmokingStatus] = useState('');

    const [hyperTensionValid, setHyperTensionValid] = useState(true);
    const [heartDiseaseValid, setHeartDiseaseValid] = useState(true);
    const [evenMarriedValid, setEvenMarriedValid] = useState(true);
    const [workTypeValid, setWorkTypeValid] = useState(true);
    const [residenceTypeValid, setResidenceTypeValid] = useState(true);
    const [avgGlucoseLevelValid, setAvgGlucoseLevelValid] = useState(true);
    const [bmiValid, setBmiValid] = useState(true);
    const [smokingStatusValid, setSmokingStatusValid] = useState(true);

    const [showPopUp, setShowPopUp] = useState(false);
    const [recordStatus, setRecordStatus] = useState('');

    const numberRegrex = /^(?=.+)(?:[1-9]\d*|0)?(?:\.\d+)?$/;
    let params;
    let myCache = new cacheStore();

    const [projectCookie, setProjectCookie] = useCookies(['email', 'level']);

    const [files, setFiles] = useState([]);

    const userData = useSelector(
        (state) => state.UserDataEmailReducer.userData ?? ''
    );

    useEffect(() => {
        setHyperTension('');
        setHeartDisease('');
        setEvenMarried('');
        setWorkType('');
        setResidenceType('');
        setAvgGlucoseLevel('');
        setBmi('');
        setSmokingStatus('');

        setHyperTensionValid(true);
        setHeartDiseaseValid(true);
        setEvenMarriedValid(true);
        setWorkTypeValid(true);
        setResidenceTypeValid(true);
        setAvgGlucoseLevelValid(true);
        setBmiValid(true);
        setSmokingStatusValid(true);
    }, [isStatus, isSelection]);

    let changeSelection = (status) => {
        setIsSelection(status);
    };

    let addRecord = async (params) => {
        setIsStatus(!isStatus);
        console.log('Params : ', params);
        await fetch('/api/postTabularRecord', {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((data) => {
                // myCache.mset([
                //     { key: 'userStatus', val: data.data, ttl: 10000 }
                // ]);
            });
        // let userStatus = myCache.mget(['userStatus']).userStatus;
    };

    let addRecordSubmit = () => {
        if (hyperTension != '') {
            setHyperTensionValid(true);
        } else {
            setHyperTensionValid(false);
        }

        if (heartDisease != '') {
            setHeartDiseaseValid(true);
        } else {
            setHeartDiseaseValid(false);
        }

        if (evenMarried != '') {
            setEvenMarriedValid(true);
        } else {
            setEvenMarriedValid(false);
        }

        if (workType != '') {
            setWorkTypeValid(true);
        } else {
            setWorkTypeValid(false);
        }

        if (residenceType != '') {
            setResidenceTypeValid(true);
        } else {
            setResidenceTypeValid(false);
        }

        if (numberRegrex.test(avgGlucoseLevel)) {
            setAvgGlucoseLevelValid(true);
        } else {
            setAvgGlucoseLevelValid(false);
        }

        if (numberRegrex.test(bmi)) {
            setBmiValid(true);
        } else {
            setBmiValid(false);
        }

        if (smokingStatus != '') {
            setSmokingStatusValid(true);
        } else {
            setSmokingStatusValid(false);
        }

        if (
            hyperTension != '' &&
            heartDisease != '' &&
            evenMarried != '' &&
            workType != '' &&
            residenceType != '' &&
            numberRegrex.test(avgGlucoseLevel) &&
            numberRegrex.test(bmi) &&
            smokingStatus != ''
        ) {
            params = {
                gender: userData?.gender,
                age: moment()
                    .diff(moment(userData?.dob, 'YYYY-MM-DD'), 'years')
                    .toString(),
                hypertension: hyperTension,
                heart_disease: heartDisease,
                even_married: evenMarried,
                work_type: workType,
                Residence_type: residenceType,
                avg_glucose_level: avgGlucoseLevel,
                bmi: bmi,
                smoking_status: smokingStatus,
                email: projectCookie.email,
                time_created: moment().format('MMMM Do YYYY, h:mm:ss a')
            };
            addRecord(params);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/jpeg',
        onDrop: (acceptedFiles) => {
            setFiles(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file)
                    })
                )
            );
        }
    });

    const images = files.map((file) => (
        <div key={file.name}>
            <div>
                <img
                    src={file.preview}
                    style={{ width: '380px' }}
                    alt="preview"
                    className="previewImage"
                />
            </div>
        </div>
    ));

    let uploadFile = async () => {
        if (files[0]) {
            const formData = new FormData();

            const myNewFile = new File(
                [files[0]],
                moment().valueOf() + '-' + files[0].name,
                {
                    type: files[0].type
                }
            );

            formData.append('file', myNewFile);
            formData.append('fileName', myNewFile.name);
            formData.append('size', myNewFile.size);
            formData.append(
                'lastModified',
                moment(myNewFile.lastModifiedDate).format(
                    'MMMM Do YYYY, h:mm:ss a'
                )
            );
            formData.append('level', projectCookie?.level);
            formData.append('email', projectCookie?.email);

            await fetch('http://localhost:8080/api/record/create/image/', {
                method: 'POST',
                body: formData
            })
                .then((res) => res.json())
                .then((data) => {
                    myCache.mset([
                        { key: 'recordStatus', val: data.data, ttl: 10000 }
                    ]);
                });
            let recordStatus = myCache.mget(['recordStatus']).recordStatus;

            setFiles([]);
            setShowPopUp(true);
            setRecordStatus(myCache.mget(['recordStatus']).recordStatus);
            window.scrollTo(0, 0);
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                <form className="form">
                    <h3>Add Record</h3>

                    <table className="mainTable">
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
                            <div
                                className={
                                    !hyperTensionValid
                                        ? 'form-group form-error'
                                        : 'form-group'
                                }
                            >
                                <label>Do you have Hyper Tension?</label>
                                <span> *</span>

                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="hyperTension"
                                        onChange={(e) => {
                                            setHyperTension(e.target.value);
                                        }}
                                        id="oneHyperTension"
                                        value="Yes"
                                        checked={
                                            hyperTension == 'Yes' ? true : false
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
                                        value="No"
                                        checked={
                                            hyperTension == 'No' ? true : false
                                        }
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="zeroHyperTension"
                                    >
                                        No
                                    </label>
                                </div>

                                {!hyperTensionValid && (
                                    <label className="error">
                                        Select atleast one of the above options
                                    </label>
                                )}
                            </div>

                            <div
                                className={
                                    !heartDiseaseValid
                                        ? 'form-group form-error'
                                        : 'form-group'
                                }
                            >
                                <label>Do you have any Heart Diseases?</label>
                                <span> *</span>

                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="heartDisease"
                                        onChange={(e) => {
                                            setHeartDisease(e.target.value);
                                        }}
                                        id="oneHeartDisease"
                                        value="Yes"
                                        checked={
                                            heartDisease == 'Yes' ? true : false
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
                                        value="No"
                                        checked={
                                            heartDisease == 'No' ? true : false
                                        }
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="zeroHeartDisease"
                                    >
                                        No
                                    </label>
                                </div>

                                {!heartDiseaseValid && (
                                    <label className="error">
                                        Select atleast one of the above options
                                    </label>
                                )}
                            </div>

                            <div
                                className={
                                    !evenMarriedValid
                                        ? 'form-group form-error'
                                        : 'form-group'
                                }
                            >
                                <label>Have you ever been married?</label>
                                <span> *</span>

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

                                {!evenMarriedValid && (
                                    <label className="error">
                                        Select atleast one of the above options
                                    </label>
                                )}
                            </div>

                            <div
                                className={
                                    !workTypeValid
                                        ? 'form-group form-error'
                                        : 'form-group'
                                }
                            >
                                <label>What is your Work Type?</label>
                                <span> *</span>

                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="workType"
                                        onChange={(e) => {
                                            setWorkType(e.target.value);
                                        }}
                                        id="childrenWorkType"
                                        value="Children"
                                        checked={
                                            workType == 'Children'
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
                                        value="Government Job"
                                        checked={
                                            workType == 'Government Job'
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
                                        value="Private Job"
                                        checked={
                                            workType == 'Private Job'
                                                ? true
                                                : false
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
                                        value="Self Employed / Business"
                                        checked={
                                            workType ==
                                            'Self Employed / Business'
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
                                        value="Not Working"
                                        checked={
                                            workType == 'Not Working'
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

                                {!workTypeValid && (
                                    <label className="error">
                                        Select atleast one of the above options
                                    </label>
                                )}
                            </div>

                            <div
                                className={
                                    !residenceTypeValid
                                        ? 'form-group form-error'
                                        : 'form-group'
                                }
                            >
                                <label>What is your residence type?</label>
                                <span> *</span>

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

                                {!residenceTypeValid && (
                                    <label className="error">
                                        Select atleast one of the above options
                                    </label>
                                )}
                            </div>

                            <div
                                className={
                                    !avgGlucoseLevelValid
                                        ? 'form-group form-error'
                                        : 'form-group'
                                }
                            >
                                <label>
                                    What is the average glucose level in your
                                    blood?
                                </label>
                                <span> *</span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Average Glucose Level"
                                    onChange={(e) => {
                                        setAvgGlucoseLevel(e.target.value);
                                    }}
                                    value={avgGlucoseLevel}
                                />

                                {!avgGlucoseLevelValid && (
                                    <label className="error">
                                        Enter valid Average Glucose level values
                                    </label>
                                )}
                            </div>

                            <div
                                className={
                                    !bmiValid
                                        ? 'form-group form-error'
                                        : 'form-group'
                                }
                            >
                                <label>
                                    What is your Body Mass Index(BMI)?
                                </label>
                                <span> *</span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="BMI"
                                    onChange={(e) => {
                                        setBmi(e.target.value);
                                    }}
                                    value={bmi}
                                />
                                {!bmiValid && (
                                    <label className="error">
                                        Enter valid BMI values
                                    </label>
                                )}
                            </div>

                            <div
                                className={
                                    !smokingStatusValid
                                        ? 'form-group form-error'
                                        : 'form-group'
                                }
                            >
                                <label>What is your Smoking Status?</label>
                                <span> *</span>

                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="smokingStatus"
                                        onChange={(e) => {
                                            setSmokingStatus(e.target.value);
                                        }}
                                        id="formerSmokingStatus"
                                        value="Formerly Smoked"
                                        checked={
                                            smokingStatus == 'Formerly Smoked'
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
                                        value="Never Smoked"
                                        checked={
                                            smokingStatus == 'Never Smoked'
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
                                        value="Smokes"
                                        checked={
                                            smokingStatus == 'Smokes'
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
                                        value="Prefer not to say"
                                        checked={
                                            smokingStatus == 'Prefer not to say'
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

                                {!smokingStatusValid && (
                                    <label className="error">
                                        Select atleast one of the above options
                                    </label>
                                )}
                            </div>

                            <a
                                className="btn btn-primary btn-block"
                                onClick={(e) => {
                                    addRecordSubmit();
                                    e.preventDefault();
                                }}
                                role="button"
                            >
                                Submit the Record
                            </a>
                        </div>
                    )}

                    {isSelection != 'table' && (
                        <div className="wrapper">
                            <div className="container">
                                <h4>Upload a image file</h4>
                                <div className="upload-container">
                                    <div className="border-container">
                                        <div {...getRootProps()}>
                                            <input {...getInputProps()} />
                                            <p>
                                                Drag and drop a file here, or
                                                click
                                            </p>
                                            <p className="fileNames">
                                                Only .jpeg files allowed
                                            </p>
                                        </div>
                                        <div>{images}</div>
                                    </div>
                                </div>

                                <table>
                                    <tbody>
                                        <tr>
                                            <th>
                                                <a
                                                    className={
                                                        files[0]?.name
                                                            ? 'btn btn-success'
                                                            : 'btn btn-success is-diabled'
                                                    }
                                                    onClick={(e) => {
                                                        uploadFile();
                                                        e.preventDefault();
                                                    }}
                                                >
                                                    Upload
                                                </a>
                                            </th>
                                            <th>
                                                <a
                                                    className="btn btn-danger"
                                                    onClick={(e) => {
                                                        setFiles([]);
                                                        e.preventDefault();
                                                    }}
                                                >
                                                    Clear
                                                </a>
                                            </th>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </form>
            </div>
            {showPopUp ? (
                <div className="popup">
                    <div className="popup_inner rounded">
                        <p>
                            <b>{recordStatus}</b>
                        </p>
                        <a
                            onClick={(e) => {
                                setShowPopUp(false);
                                setRecordStatus('');
                                e.preventDefault();
                            }}
                            className="btn btn-danger"
                        >
                            Close
                        </a>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}

export default AddRecord;
