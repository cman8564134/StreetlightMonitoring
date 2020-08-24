import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';

import {
    faHome
} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import { Container, Button } from 'reactstrap';

import {
    toast,
    ToastContainer
} from 'react-toastify';

import Layout from '../../hoc/Layout/Layout';
import PageTitle from '../../components/Layout/PageTitle/PageTitle';
import DataTable from '../../components/Tables/DataTable/DataTable';
import Modal from '../../components/Modal/Modal';
import FormContent from '../../components/Form/FormContent/FormContent';
import Loader from '../../components/Loader/BallClipRotateMultiple/BallClipRotateMultiple';

import * as actions from '../../store/actions/index';
import * as formInputActions from '../../store/actions/formInput';
import { HANDLE_ALERT_INPUT_CHANGED_SUCCESS, FETCH_ALERT_USERS_SUCCESS } from '../../store/actions/actionTypes';


const Alert = ( props ) => {
    const {
        onFetchAlertOrderByDesc,
        loadingAlertTable,
        alertTableData,
        alertElementArray,
        onFetchAlertById,
        loadingModal,
        onFetchAlertStatusMasterCode,
        onFetchUsers,
        onHandleInputChanged,
        formIsValid,
        onSaveAlert,
        savingAlert,
        selectedAlertId,
        onMarkAlertAsRead
    } = props;

    useEffect(() => {
        onFetchAlertOrderByDesc();
        // onMarkAlertAsRead();
    }, [
        onFetchAlertOrderByDesc,
        onMarkAlertAsRead
    ])

    const [ visible, setVisible ] = useState(false);

    const showOrHideModal = (id) => {
        setVisible(!visible);
        onFetchAlertStatusMasterCode({masterCode: 'ALERTSTATUS'});
        onFetchUsers(FETCH_ALERT_USERS_SUCCESS);
        onFetchAlertById({id: id})
    }

    const breadcrumbItems = [
        {
            title: "Alert",
            href: null,
            onClickHandler: null,
            children: (<span><FontAwesomeIcon icon={faHome}/> Alert</span> ),
            isActive: true
        }
    ]

    const alertTableColumns = [
        {
            columns: [
                {
                    Header: 'Concession',
                    accessor: 'concession_name'
                },
                {
                    Header: 'Section',
                    accessor: 'section_name'
                },
                {
                    Header: 'Subsection',
                    accessor: 'subsection_name'
                },
                {
                    Header: 'Feeder Pillar',
                    accessor: 'feeder_pillar_id'
                },
                {
                    Header: 'Event',
                    accessor: 'event'
                },
                {
                    Header: 'Logged Time',
                    accessor: 'created_at'
                },
                {
                    Header: 'Status',
                    accessor: 'alert_status_description',
                    width: 200,
                    Cell: row => {
                        let statusClassName = "";

                        switch(row.value){
                            case 'PENDING INVESTIGATION': 
                                statusClassName = "badge badge-danger"
                            break;
                            case 'INVESTIGATION IN PROGRESS': 
                                statusClassName = "badge badge-warning"
                            break;
                            case 'RESOLVING ISSUE': 
                                statusClassName = "badge badge-primary"
                            break;

                            case 'RESOLVED': 
                            default: 
                                statusClassName = "badge badge-success"
                        }

                        return (
                            <div className="d-block w-100 text-center">
                                <div className={statusClassName}>
                                    {row.value}
                                </div>     
                            </div>
                            
                        )
                    }
                        
                },
                {
                    Header: 'Attended By',
                    accessor: 'attended_by'
                },
                {
                    Header: 'Actions',
                    accessor: 'id',
                    Cell: row => (
                        <div className="d-block w-100 text-center">
                            <Button className="mb-2 mr-2 btn-icon btn-icon-only btn-pill" outline
                                    color="success" onClick={() => showOrHideModal(row.value)}>
                                <i className="pe-7s-pen btn-icon-wrapper"> </i>
                            </Button>
                        </div>
                        
                    )
                }
            ]
        }
    ];

    const subComponent = row => {
        console.log(row);
        return (
            <div style={{padding: "20px"}}>
                <em>
                    Remarks: {row.original.remarks}
                </em>
            </div>
        );
    }

    const inputChangedHandler = (event, elementRowIndex, elementId, validationRules) => {
        onHandleInputChanged(HANDLE_ALERT_INPUT_CHANGED_SUCCESS, event.target.value, elementRowIndex, elementId, validationRules);
    }

    const onSaveHandler = () => {
        const status = alertElementArray[2].status.value;
        const attendedBy = alertElementArray[2].attendedBy.value;
        const remarks = alertElementArray[3].remarks.value;
        
        onSaveAlert({id: selectedAlertId, status: status, attendedBy: attendedBy, remarks: remarks})
            .then(data => {
                showToast(data.message)
            });
    }

    const showToast = (message) => toast.success(message,{position: toast.POSITION.BOTTOM_RIGHT});
            

    let saveButton = <Button color="link" disabled={!formIsValid} onClick={onSaveHandler}>Save</Button> 

    if(savingAlert) {
        saveButton = <Loader/>
    }

    return (
        <Layout {...props}>
            <PageTitle
                heading = "Alert"
                icon = "pe-7s-home opacity-6"
                enableBreadcrumb
                breadcrumbItems = {breadcrumbItems}
            >
            </PageTitle>

            <Container fluid>
                <DataTable 
                    data={alertTableData}
                    columns={alertTableColumns}
                    pageSize={10}
                    header={null}
                    filterable
                    subComponentCallback={subComponent}
                    loading={loadingAlertTable}
                />

                <Modal 
                    modalWidth={1000}
                    modalForm={<FormContent formElementArray={alertElementArray} inputChangedHandler={inputChangedHandler}/>}
                    visible={visible}
                    showOrHideModal={showOrHideModal}
                    loading={loadingModal}
                    heading="Alert"
                >
                    {saveButton}

                    <ToastContainer autoClose={2000} />
                </Modal>
                
            </Container>
        </Layout>
    );
}

const mapStateToProps = state => {
    return {
        loadingAlertTable: state.Alert.loadingAlertTable,
        alertTableData: state.Alert.alertTableData,
        alertElementArray: state.Alert.alertElementArray,
        loadingModal: state.Alert.loadingModal,
        formIsValid: state.Alert.formIsValid,
        savingAlert: state.Alert.savingAlert,
        selectedAlertId: state.Alert.selectedAlertId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchAlertOrderByDesc: () => dispatch(actions.fetchAlertOrderByDesc()),
        onFetchAlertById: (params) => dispatch(actions.fetchAlertById(params)),
        onFetchAlertStatusMasterCode: (params) => dispatch(actions.fetchAlertStatusMasterCode(params)),
        onFetchUsers: (type) => dispatch(actions.fetchUsers(type)),
        onHandleInputChanged: (type, value, elementRowIndex, elementId, validationRules) => dispatch(formInputActions.handleInputChanged(type, value, elementRowIndex, elementId, validationRules)),
        onSaveAlert: (params) => dispatch(actions.saveAlert(params)),
        onMarkAlertAsRead: () => dispatch(actions.markAlertAsRead()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Alert);