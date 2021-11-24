import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import * as cacheStore from 'node-cache';
import GetGroupDataThunk from '../../../redux/actionCreators/GetGroupDataThunk';

function CheckScoreView() {
    const dispatch = useDispatch();
    let myCache = new cacheStore();

    const [isSelection, setIsSelection] = useState('table');

    const [projectCookie, setProjectCookie] = useCookies(['email', 'level']);

    const groupData = useSelector(
        (state) => state.GroupDataReducer.groupData ?? ''
    );

    console.log('Data : ', groupData);

    useEffect(() => {
        dispatch(GetGroupDataThunk(projectCookie.email, isSelection));
    }, [isSelection]);

    let changeSelection = (status) => {
        setIsSelection(status);
    };

    return (
        <div className="check-score">
            <h3>Check Scores</h3>

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
                                    isSelection == 'image'
                                        ? 'btn btn-primary active'
                                        : 'btn btn-primary'
                                }
                                onClick={(e) => {
                                    changeSelection('image');
                                    e.preventDefault();
                                }}
                            >
                                ECG Images
                            </a>
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default CheckScoreView;
