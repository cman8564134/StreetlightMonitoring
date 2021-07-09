import * as actionTypes from './actionTypes';

import axios from '../../axios-backend';

import { updateObject } from '../../shared/utility';

export const fetchAlertAndRemarksOrderByDescStart = () => {
    return {
        type: actionTypes.FETCH_ALERT_AND_REMARKS_ORDER_BY_DESC_START,
        loading: true
    }
}

export const fetchAlertAndRemarksOrderByDescSuccess = (alertTableData, remarks) => {
    return {
        type: actionTypes.FETCH_ALERT_AND_REMARKS_ORDER_BY_DESC_SUCCESS,
        loading: false,
        alertTableData: alertTableData,
        allRemarks: remarks
    }
}

export const fetchAlertAndRemarksOrderByDescFail = (error) => {
    return {
        type: actionTypes.FETCH_ALERT_AND_REMARKS_ORDER_BY_DESC_FAIL,
        loading: false
    }
}

export const fetchAlertAndRemarksOrderByDesc = () => {
    return dispatch => {
        getAllTicketDataOrderByDescRequest(dispatch);   
    }
    
}

const getAllTicketDataOrderByDescRequest  = (dispatch) => {
    dispatch(fetchAlertAndRemarksOrderByDescStart());
    
    axios.get('/getAllAlertAndRemarksOrderByCreatedAtDesc')
        .then(response => {
            const data = response.data; 
            dispatch(fetchAlertAndRemarksOrderByDescSuccess(data.alerts, data.remarks));
        })
        .catch(error => {
            dispatch(fetchAlertAndRemarksOrderByDescFail(error));
        });
}

export const fetchTicketByIdStart = () => {
    return {
        type: actionTypes.FETCH_TICKET_BY_ID_START,
        loading: true
    }
}

export const fetchTicketByIdSuccess = (ticket, ticketId, remarks) => {
    return {
        type: actionTypes.FETCH_TICKET_BY_ID_SUCCESS,
        loading: false,
        ticket: ticket,
        ticketId: ticketId,
        remarks: remarks
    }
}

export const fetchTicketByIdFail = (error) => {
    return {
        type: actionTypes.FETCH_TICKET_BY_ID_FAIL,
        loading: false
    }
}

export const fetchTicketById = (params) => {
    return dispatch => {
        dispatch(fetchTicketByIdStart());

        axios.post('/getTicketById', params)
            .then(response => {
                const data = response.data;
                dispatch(fetchTicketByIdSuccess(data.ticket, params.id, data.remarks));


            })
            .catch(error => {
                console.log(error);
                dispatch(fetchTicketByIdFail(error));
            });
    }
    
}

export const saveTicketStart = () => {
    return {
        type: actionTypes.SAVE_TICKET_START,
        loading: true
    }
}

export const saveTicketSuccess = (id) => {
    return {
        type: actionTypes.SAVE_TICKET_SUCCESS,
        loading: false,
        id: id
    }
}

export const saveTicketFail = (error) => {
    return {
        type: actionTypes.SAVE_TICKET_FAIL,
        loading: false,
        error: error
    }
}

export const saveTicket =  (params) => {
    return dispatch => {
        dispatch(saveTicketStart());

        let state = localStorage["appState"];
        let updatedParams = {...params}; 

        if(state) {
            const appState = JSON.parse(state);
            if(appState.isLoggedIn) {
                const userId = appState.user.name;
                updatedParams = updateObject(updatedParams, {remarkBy: userId})
            }
        }

        return axios.post('/saveTicket', updatedParams)
            .then(response => {
                dispatch(saveTicketSuccess(response.data.alert.id));
                getAllTicketDataOrderByDescRequest(dispatch);

                return response.data
            })
            .catch(error => {
                console.log(error);
                dispatch(saveTicketFail(error))
            });
    }
    
}

export const fetchTicketByAlertCodeStart = () => {
    return {
        type: actionTypes.FETCH_TICKET_BY_ALERT_CODE_START,
        loading: true
    }
}

export const fetchTicketByAlertCodeSuccess = (alerts) => {
    return {
        type: actionTypes.FETCH_TICKET_BY_ALERT_CODE_SUCCESS,
        loading: false,
        alerts: alerts,
    }
}

export const fetchTicketByAlertCodeFail = (error) => {
    return {
        type: actionTypes.FETCH_TICKET_BY_ALERT_CODE_FAIL,
        loading: false
    }
}

export const fetchTicketByAlertCode = (params) => {
    return dispatch => {
        dispatch(fetchTicketByAlertCodeStart());
        
        axios.post('/getTicketByAlertCodeAndStatusCode', params)
            .then(response => {
                dispatch(fetchTicketByAlertCodeSuccess(response.data.alerts));
            })
            .catch(error => {
                console.log(error);
                dispatch(fetchTicketByAlertCodeFail(error));
            });
    }   
}
