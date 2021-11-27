import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import * as cacheStore from 'node-cache';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import GetGroupDataTableThunk from '../../../redux/actionCreators/GetGroupDataTableThunk';
import GetGroupDataImageThunk from '../../../redux/actionCreators/GetGroupDataImageThunk';

function CheckScoreView() {
    const dispatch = useDispatch();
    let myCache = new cacheStore();
    let columns = [];
    let groupTableData = [];
    let groupImageData = [];
    let defaultSorted = [];
    let pagination = paginationFactory({
        sizePerPage: 10,
        lastPageText: '>>',
        firstPageText: '<<',
        nextPageText: '>',
        prePageText: '<',
        showTotal: true,
        alwaysShowAllBtns: true
    });

    const { SearchBar, ClearSearchButton } = Search;

    const MyExportCSV = (props) => {
        const handleClick = () => {
            props.onExport();
        };
        return (
            <div>
                <button className="btn btn-success" onClick={handleClick}>
                    Export to CSV
                </button>
            </div>
        );
    };

    const [isSelection, setIsSelection] = useState('table');

    const [projectCookie, setProjectCookie] = useCookies(['email', 'level']);

    groupTableData = useSelector(
        (state) => state.GroupDataTableReducer.groupTableData ?? ''
    );

    groupImageData = useSelector(
        (state) => state.GroupDataImageReducer.groupImageData ?? ''
    );

    console.log('Table Data : ', groupTableData);

    console.log('Image Data : ', groupImageData);

    let linkFollow = (cell, row) => {
        return (
            <a
                className="btn btn-success"
                target="_blank"
                href={cell}
                download={row.name}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-download"
                    viewBox="0 0 16 16"
                >
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                </svg>
                &nbsp;&nbsp;
                {'Download'}
            </a>
        );
    };

    if (
        isSelection == 'table' &&
        groupTableData?.data?.length > 0 &&
        projectCookie?.level != 'organisation'
    ) {
        columns = [
            { dataField: 'time_created', text: 'Record Posted', sort: true },
            { dataField: 'hypertension', text: 'Hypertension', sort: true },
            {
                dataField: 'heart_disease',
                text: 'Heart Disease Status',
                sort: true
            },
            { dataField: 'ever_married', text: 'Marital Status', sort: true },
            { dataField: 'work_type', text: 'Work Type', sort: true },
            {
                dataField: 'Residence_type',
                text: 'Residence Type',
                sort: true
            },
            {
                dataField: 'avg_glucose_level',
                text: 'Average Glucose Level',
                sort: true
            },
            { dataField: 'bmi', text: 'BMI', sort: true },
            {
                dataField: 'smoking_status',
                text: 'Smoking Habbits',
                sort: true
            },
            { dataField: 'score', text: 'Risk Score', sort: true },
            {
                dataField: 'time_stamp',
                text: 'Time Stamp',
                sort: true,
                hidden: true
            }
        ];

        defaultSorted = [
            {
                dataField: 'time_stamp',
                order: 'desc'
            }
        ];
    } else if (
        isSelection == 'image' &&
        groupImageData?.data?.length > 0 &&
        projectCookie?.level != 'organisation'
    ) {
        columns = [
            { dataField: 'lastModified', text: 'Record Posted', sort: true },
            { dataField: 'name', text: 'File Name', sort: true },
            { dataField: 'size', text: 'size (KB)', sort: true },
            { dataField: 'score', text: 'Risk Score', sort: true },
            {
                dataField: 'url',
                text: 'Action',
                formatter: linkFollow,
                sort: true
            },
            {
                dataField: 'time_stamp',
                text: 'Time Stamp',
                sort: true,
                hidden: true
            }
        ];

        defaultSorted = [
            {
                dataField: 'time_stamp',
                order: 'desc'
            }
        ];
    } else if (
        isSelection == 'table' &&
        groupTableData?.data?.length > 0 &&
        projectCookie?.level == 'organisation'
    ) {
        columns = [
            { dataField: 'time_created', text: 'Record Posted', sort: true },
            { dataField: 'firstName', text: 'First Name', sort: true },
            { dataField: 'lastName', text: 'Last Name', sort: true },
            { dataField: 'age', text: 'Age', sort: true },
            { dataField: 'gender', text: 'Gender', sort: true },
            {
                dataField: 'avg_glucose_level',
                text: 'Average Glucose Level',
                sort: true
            },
            { dataField: 'bmi', text: 'BMI', sort: true },
            { dataField: 'score', text: 'Risk Score', sort: true },
            {
                dataField: 'hypertension',
                text: 'Hypertension',
                sort: true,
                hidden: true
            },
            {
                dataField: 'heart_disease',
                text: 'Heart Disease Status',
                sort: true,
                hidden: true
            },
            {
                dataField: 'ever_married',
                text: 'Marital Status',
                sort: true,
                hidden: true
            },
            {
                dataField: 'work_type',
                text: 'Work Type',
                sort: true,
                hidden: true
            },
            {
                dataField: 'Residence_type',
                text: 'Residence Type',
                sort: true,
                hidden: true
            },
            {
                dataField: 'smoking_status',
                text: 'Smoking Habbits',
                sort: true,
                hidden: true
            },
            {
                dataField: 'time_stamp',
                text: 'Time Stamp',
                sort: true,
                hidden: true
            }
        ];

        defaultSorted = [
            {
                dataField: 'time_stamp',
                order: 'desc'
            }
        ];
    } else if (
        isSelection == 'image' &&
        groupImageData?.data?.length > 0 &&
        projectCookie?.level == 'organisation'
    ) {
        columns = [
            { dataField: 'lastModified', text: 'Record Posted', sort: true },
            { dataField: 'firstName', text: 'First Name', sort: true },
            { dataField: 'lastName', text: 'Last Name', sort: true },
            { dataField: 'age', text: 'Age', sort: true },
            { dataField: 'gender', text: 'Gender', sort: true },
            { dataField: 'name', text: 'File Name', sort: true },
            { dataField: 'size', text: 'size (KB)', sort: true },
            { dataField: 'score', text: 'Risk Score', sort: true },
            {
                dataField: 'url',
                text: 'Action',
                formatter: linkFollow,
                sort: true
            },
            {
                dataField: 'time_stamp',
                text: 'Time Stamp',
                sort: true,
                hidden: true
            }
        ];

        defaultSorted = [
            {
                dataField: 'time_stamp',
                order: 'desc'
            }
        ];
    }
    useEffect(() => {
        if (isSelection == 'table') {
            dispatch(GetGroupDataTableThunk(projectCookie.email));
        } else if (isSelection == 'image') {
            dispatch(GetGroupDataImageThunk(projectCookie.email));
        }
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

            {groupTableData?.data?.length > 0 && isSelection == 'table' && (
                <ToolkitProvider
                    bootstrap4
                    keyField="SK"
                    data={groupTableData?.data}
                    columns={columns}
                    search
                    exportCSV
                >
                    {(props) => (
                        <div>
                            <SearchBar
                                {...props.searchProps}
                                style={{ width: '400px', height: '40px' }}
                            />
                            <ClearSearchButton {...props.searchProps} />
                            <hr />

                            <MyExportCSV {...props.csvProps} />

                            <BootstrapTable
                                bootstrap4
                                keyField="SK"
                                data={groupTableData?.data}
                                columns={columns}
                                defaultSorted={defaultSorted}
                                pagination={pagination}
                                noDataIndication="No records found, Please try different search."
                                {...props.baseProps}
                                striped
                                hover
                                condensed
                            />
                        </div>
                    )}
                </ToolkitProvider>
            )}

            {groupImageData?.data?.length > 0 && isSelection == 'image' && (
                <ToolkitProvider
                    bootstrap4
                    keyField="SK"
                    data={groupImageData?.data}
                    columns={columns}
                    search
                >
                    {(props) => (
                        <div>
                            <SearchBar
                                {...props.searchProps}
                                style={{ width: '400px', height: '40px' }}
                            />
                            <ClearSearchButton {...props.searchProps} />
                            <hr />

                            <BootstrapTable
                                bootstrap4
                                keyField="SK"
                                data={groupImageData?.data}
                                columns={columns}
                                defaultSorted={defaultSorted}
                                pagination={pagination}
                                noDataIndication="No records found, Please try different search."
                                {...props.baseProps}
                                striped
                                hover
                                condensed
                            />
                        </div>
                    )}
                </ToolkitProvider>
            )}

            {((groupTableData?.data?.length == 0 && isSelection == 'table') ||
                (groupImageData?.data?.length == 0 &&
                    isSelection == 'image')) && (
                <div>
                    <div className="noRecords">No Records found.</div>
                </div>
            )}
        </div>
    );
}

export default CheckScoreView;
