import React, { useState, useEffect, Fragment } from 'react';

import { connect } from 'react-redux';

import {
    faHome
} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import { Container, Button, Row, Col  } from 'reactstrap';



import {
    toast,
    ToastContainer
} from 'react-toastify';

import PerfectScrollbar from 'react-perfect-scrollbar';

import Layout from '../../hoc/Layout/Layout';
import PageTitle from '../../components/Layout/PageTitle/PageTitle';
import DataTable from '../../components/Tables/DataTable/DataTable';
import Modal from '../../components/Modal/Modal';
import FormContent from '../../components/Form/FormContent/FormContent';
import Loader from '../../components/Loader/BallClipRotateMultiple/BallClipRotateMultiple';
import TicketStageLegend from "../../components/Tickets/TicketStageLegend";

import * as actions from '../../store/actions/index';
import * as formInputActions from '../../store/actions/formInput';
import { 
    HANDLE_TICKET_INPUT_CHANGED_SUCCESS, 
    FETCH_ALERT_STATUS_MASTER_CODE_SUCCESS, 
    FETCH_ALERT_CODE_MASTER_CODE_SUCCESS,
    HANDLE_TICKET_SEARCH_FILTER_CHANGED_SUCCESS
} from '../../store/actions/actionTypes';
import SearchFilters from '../../components/SearchFilters/SearchFilters';



const Tickets = ( props ) => {
    const {
        onFetchAlertOrderByDesc,
        loadingTicketTable,
        alertTableData,
        allRemarks,
        ticketElementArray,
        onFetchTicketById,
        loadingModal,
        onFetchMasterCodeMapByMasterCode,
        onHandleInputChanged,
        formIsValid,
        onSaveTicket,
        savingAlert,
        selectedTicketId,
        onMarkAlertAsRead,
        alertStatusMasterCode,
        searchFilters,
        onFetchTicketByAlertCode,
        ticketRemarks,
    } = props;

    useEffect(() => {
        onFetchAlertOrderByDesc();
        onFetchMasterCodeMapByMasterCode({masterCode: 'ALERTSTATUS', type: FETCH_ALERT_STATUS_MASTER_CODE_SUCCESS});
        onFetchMasterCodeMapByMasterCode({masterCode: 'ALERTCODE', type: FETCH_ALERT_CODE_MASTER_CODE_SUCCESS});
        // onMarkAlertAsRead();
    }, [
        onFetchAlertOrderByDesc,
        onMarkAlertAsRead,
        onFetchMasterCodeMapByMasterCode
    ])

    const [ visible, setVisible ] = useState(false);

    const showOrHideModal = (id) => {
        setVisible(!visible);
        onFetchMasterCodeMapByMasterCode({masterCode: 'ALERTSTATUS', type: FETCH_ALERT_STATUS_MASTER_CODE_SUCCESS});
        onFetchTicketById({id: id})
    }

    const breadcrumbItems = [
        {
            title: "Ticket",
            href: null,
            onClickHandler: null,
            children: (<span><FontAwesomeIcon icon={faHome}/> Ticket</span> ),
            isActive: true
        }
    ]

    const alertTableColumns = [
        {
            columns: [
                {
                    Header: 'Address',
                    width: 300,
                    Cell: row => {
                        return (
                            <div className="d-block w-100 text-center">
                                <div>
                                    {row.original.concession_name + ", " + row.original.section_name + ", " + row.original.subsection_name + ", " + row.original.road_name}
                                </div>     
                            </div>
                            
                        )
                    }
                },
                {
                    Header: 'Feeder Pillar',
                    accessor: 'pillar_id'
                },
                {
                    Header: 'Event',
                    width: 400,
                    accessor: 'event'
                },
                {
                    Header: 'Stage',
                    accessor: 'stage'
                },
                {
                    Header: 'Logged Time',
                    accessor: 'created_at'
                },
                {
                    Header: 'Status',
                    accessor: 'status',
                    width: 200,
                    Cell: row => {
                        let statusClassName = "";
                        const value = alertStatusMasterCode[row.value];

                        switch(row.value){
                            case 'PI': 
                                statusClassName = "badge badge-danger"
                            break;
                            case 'IIP': 
                                statusClassName = "badge badge-warning"
                            break;
                            case 'RI': 
                                statusClassName = "badge badge-primary"
                            break;
                            
                            case 'C': 
                                statusClassName = "badge badge-secondary"
                            break;

                            case 'R': 
                            default: 
                                statusClassName = "badge badge-success"
                        }

                        return (
                            <div className="d-block w-100 text-center">
                                <div className={statusClassName}>
                                    {/* {row.value} */} {value}
                                </div>     
                            </div>
                            
                        )
                    }
                        
                },
                // {
                //     Header: 'Attended By',
                //     accessor: 'attended_by'
                // },
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

    const remarksTableColumn = [
        {
            columns: [
                {
                    Header: 'Created At',
                    accessor: 'created_at'
                },
                {
                    Header: 'Remark',
                    accessor: 'remarks'
                },
                {
                    Header: 'Remark By',
                    accessor: 'remark_by'
                }
            ]
        }
    ];


    const subComponent = row => {
        const alertId = row.original.id;
        const remarksTableData = allRemarks[alertId];
        return (
            
            <div style={{padding: "20px"}}>
                <DataTable 
                    data={remarksTableData}
                    columns={remarksTableColumn}
                    pageSize={3}
                    header={null}
                    filterable
                    loading={false}
                />
            </div>
        );
    }

    const inputChangedHandler = (event, elementRowIndex, elementId, validationRules) => {
        onHandleInputChanged(HANDLE_TICKET_INPUT_CHANGED_SUCCESS, event.target.value, elementRowIndex, elementId, validationRules);
    }

    const onSaveHandler = () => {
        const status = ticketElementArray[3].status.value;
        const remarks = ticketElementArray[4].remarks.value;
        
        onSaveTicket({id: selectedTicketId, status: status, remarks: remarks})
            .then(data => {
                showToast(data.message)
            });
    }

    const showToast = (message) => toast.success(message,{position: toast.POSITION.BOTTOM_RIGHT});
            

    let saveButton = <Button color="link" disabled={!formIsValid} onClick={onSaveHandler}>Save</Button> 

    if(savingAlert) {
        saveButton = <Loader/>
    }

    const onApplyFilterHandler = () => {
            onFetchTicketByAlertCode({
                alertCode:searchFilters[0].categories.value
            });            
            
    };

    const searchFilterChangedHandler = (event, elementRowIndex, elementId, validationRules) => {
        onHandleInputChanged(HANDLE_TICKET_SEARCH_FILTER_CHANGED_SUCCESS, event.target.value, elementRowIndex, elementId, validationRules);
    }

    const ticketModalForm =  (
            <Fragment>
                <div className="scroll-area-lg">
                    <PerfectScrollbar>
                        <FormContent formElementArray={ticketElementArray} inputChangedHandler={inputChangedHandler}/>

                        <DataTable 
                                data={ticketRemarks}
                                columns={remarksTableColumn}
                                pageSize={3}
                                header={null}
                                filterable
                                loading={false}
                            />
                    </PerfectScrollbar>
                </div>
                
                
            </Fragment>
            
        )
    

    return (
        <Layout {...props}>
            <PageTitle
                heading = "Tickets"
                icon = "pe-7s-home opacity-6"
                enableBreadcrumb
                breadcrumbItems = {breadcrumbItems}
            >
            </PageTitle>

            <Container fluid>
                <Row>
                    <Col md="12" lg="12">
                        <TicketStageLegend/>
                    </Col>
                </Row>

                <SearchFilters 
                    filterElementArray={searchFilters}
                    inputChangedHandler={searchFilterChangedHandler}
                    loading={false}
                    onApplyFilterHandler={onApplyFilterHandler}
                    isSearchFilterValid={true}
                />

                <DataTable 
                    data={alertTableData}
                    columns={alertTableColumns}
                    pageSize={10}
                    header={null}
                    filterable
                    subComponentCallback={subComponent}
                    loading={loadingTicketTable}
                />

                <Modal 
                    modalWidth={1000}
                    modalForm={ticketModalForm}
                    visible={visible}
                    showOrHideModal={showOrHideModal}
                    loading={loadingModal}
                    heading="Ticket"
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
        loadingTicketTable: state.Ticket.loadingTicketTable,
        alertTableData: state.Ticket.alertTableData,
        allRemarks: state.Ticket.allRemarks,
        userMap: state.User.userMap,
        ticketElementArray: state.Ticket.ticketElementArray,
        loadingModal: state.Ticket.loadingModal,
        formIsValid: state.Ticket.formIsValid,
        savingAlert: state.Ticket.savingAlert,
        selectedTicketId: state.Ticket.selectedTicketId,
        alertStatusMasterCode: state.Alert.alertStatusMasterCode,
        searchFilters: state.Ticket.searchFilters,
        ticketRemarks: state.Ticket.ticketRemarks
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchAlertOrderByDesc: () => dispatch(actions.fetchAlertAndRemarksOrderByDesc()),
        onFetchTicketById: (params) => dispatch(actions.fetchTicketById(params)),
        onFetchMasterCodeMapByMasterCode: (params) => dispatch(actions.fetchMasterCodeMapByMasterCode(params)),
        onHandleInputChanged: (type, value, elementRowIndex, elementId, validationRules) => dispatch(formInputActions.handleInputChanged(type, value, elementRowIndex, elementId, validationRules)),
        onSaveTicket: (params) => dispatch(actions.saveTicket(params)),
        // onMarkAlertAsRead: () => dispatch(actions.markAlertAsRead()),
        onFetchTicketByAlertCode: (params) => dispatch(actions.fetchTicketByAlertCode(params)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tickets);