import * as actionTypes from './actionTypes';

// import axios from '../../axios-backend';

export const fetchAlertOrderByDescStart = () => {
    return {
        type: actionTypes.FETCH_ALERT_ORDER_BY_DESC_START,
        loading: true
    }
}

export const fetchAlertOrderByDescSuccess = (alertTableData) => {
    return {
        type: actionTypes.FETCH_ALERT_ORDER_BY_DESC_SUCCESS,
        loading: false,
        alertTableData: alertTableData
    }
}

export const fetchAlertOrderByDescFail = (error) => {
    return {
        type: actionTypes.FETCH_ALERT_ORDER_BY_DESC_FAIL,
        loading: false
    }
}

export const fetchAlertOrderByDesc = () => {
    return dispatch => {
        getAllAlertDataOrderByDescRequest(dispatch);   
    }
    
}

const getAllAlertDataOrderByDescRequest  = (dispatch) => {
    dispatch(fetchAlertOrderByDescStart());
    const response = {
        data: {
            alerts: [
                {id: 1, concession_name: "ABC Sdn Bhd", section_name: "Section 1", subsection: "Section 1/1", feeder_pillar_id: "1", event: "Door is opened", created_at: "2020-07-01 00:00:00", status: "PI", alert_status_description: "PENDING INVESTIGATION", attended_by: "", remarks: ""}
            ]
        }
    }
    dispatch(fetchAlertOrderByDescSuccess(response.data.alerts));
    // axios.get('/getAllAlertDataOrderByDesc')
    //     .then(response => {
    //         dispatch(fetchAlertOrderByDescSuccess(response.data.alerts));
    //     })
    //     .catch(error => {
    //         dispatch(fetchAlertOrderByDescFail(error));
    //     });
}

export const fetchAlertByIdStart = () => {
    return {
        type: actionTypes.FETCH_ALERT_BY_ID_START,
        loading: true
    }
}

export const fetchAlertByIdSuccess = (alert, alertId) => {
    return {
        type: actionTypes.FETCH_ALERT_BY_ID_SUCCESS,
        loading: false,
        alert: alert,
        alertId: alertId
    }
}

export const fetchAlertByIdFail = (error) => {
    return {
        type: actionTypes.FETCH_ALERT_BY_ID_FAIL,
        loading: false
    }
}

export const fetchAlertById = (params) => {
    return dispatch => {
        dispatch(fetchAlertByIdStart());

        const response = {data: {
            alert: {id: 1, concession_name: "ABC Sdn Bhd", section_name: "Section 1", subsection: "Section 1/1", feeder_pillar_id: "1", event: "Door is opened", created_at: "2020-07-01 00:00:00", status: "PI", alert_status_description: "PENDING INVESTIGATION", attended_by: "", remarks: ""}
        }}
        dispatch(fetchAlertByIdSuccess(response.data.alert, params.id));
        // axios.post('/findAlertById', params)
        //     .then(response => {
        //         dispatch(fetchAlertByIdSuccess(response.data.alert, params.id));


        //     })
        //     .catch(error => {
        //         console.log(error);
        //         dispatch(fetchAlertByIdFail(error));
        //     });
    }
    
}

export const fetchAlertStatusMasterCodeSuccess = (alertStatus) => {
    return {
        type: actionTypes.FETCH_ALERT_STATUS_MASTER_CODE_SUCCESS,
        alertStatus: alertStatus
    }
}

export const fetchAlertStatusMasterCode = ( data ) => {
    return dispatch => {
        const response = {
            data: {
                "masterCodeMap": {
                    "IIP": "INVESTIGATION IN PROGRESS",
                    "PI": "PENDING INVESTIGATION",
                    "R": "RESOLVED",
                    "RI": "RESOLVING ISSUE"
                }
            }
        }
        dispatch(fetchAlertStatusMasterCodeSuccess(response.data.masterCodeMap));
        // axios.post('/getCodeAndDescByMasterCode', data)
        //     .then(response => {
        //         dispatch(fetchAlertStatusMasterCodeSuccess(response.data.masterCodeMap));
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });
    }
    
}

export const saveAlertStart = () => {
    return {
        type: actionTypes.SAVE_ALERT_START,
        loading: true
    }
}

export const saveAlertSuccess = (id) => {
    return {
        type: actionTypes.SAVE_ALERT_SUCCESS,
        loading: false,
        id: id
    }
}

export const saveAlertFail = (error) => {
    return {
        type: actionTypes.SAVE_ALERT_FAIL,
        loading: false,
        error: error
    }
}

export const saveAlert =  (params) => {
    return dispatch => {
        dispatch(saveAlertStart());

        // return axios.post('/saveAlert', params)
        //     .then(response => {
        //         console.log(response.data);
        //         dispatch(saveAlertSuccess(response.data.alert.id));
        //         getAllAlertDataOrderByDescRequest(dispatch);

        //         return response.data
        //     })
        //     .catch(error => {
        //         console.log(error);
        //         dispatch(saveAlertFail(error))
        //     });
    }
    
}

export const markAlertAsReadSuccess = () => {
    return {
        type: actionTypes.MARK_ALERT_NOTIFICATION_AS_READ_SUCCESS
    }
}

export const markAlertAsRead =  () => {
    return dispatch => {
        let state = localStorage["appState"];
        
        if(state) {
            const appState = JSON.parse(state);
            if(appState.isLoggedIn) {
                const params = {auth_token: appState.user.auth_token};
                // return axios.post('/markAlertAsRead', params)
                //     .then(response => {
                //         dispatch(markAlertAsReadSuccess())
                //         console.log(response);
                //     })
                //     .catch(error => {
                //         console.log(error);
                //     });
            }
        }
        
    }
    
}