import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import * as cacheStore from 'node-cache';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import GetGroupDataThunk from '../../../redux/actionCreators/GetGroupDataThunk';

function CheckScoreView() {
    const dispatch = useDispatch();
    let myCache = new cacheStore();
    let columns = [];
    let groupData = [];
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

    groupData = useSelector((state) => state.GroupDataReducer.groupData ?? '');

    console.log('Data : ', groupData);

    let linkFollow = (cell, row) => {
        return (
            <a
                className="btn btn-primary"
                target="_blank"
                href={cell}
                download={row.name}
            >
                Download
            </a>
        );
    };

    if (isSelection == 'table' && groupData?.data?.length > 0) {
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
    } else if (isSelection == 'image' && groupData?.data?.length > 0) {
        columns = [
            { dataField: 'lastModified', text: 'Record Posted', sort: true },
            { dataField: 'name', text: 'File Name', sort: true },
            { dataField: 'size', text: 'size (KB)', sort: true },
            { dataField: 'score', text: 'Risk Score', sort: true },
            {
                dataField: 'url',
                text: 'Download',
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
        groupData = [];
        console.log(groupData);
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

            {groupData?.data?.length > 0 && isSelection == 'table' && (
                <ToolkitProvider
                    bootstrap4
                    keyField="SK"
                    data={groupData?.data}
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
                                data={groupData?.data}
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

            {groupData?.data?.length > 0 && isSelection == 'image' && (
                <ToolkitProvider
                    bootstrap4
                    keyField="SK"
                    data={groupData?.data}
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
                                data={groupData?.data}
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
        </div>
    );
}

export default CheckScoreView;
