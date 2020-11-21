import * as actionTypes from '../actions/actionTypes';
import { 
    updateObject, 
    updateElementArraySubElement, 
    createMasterCodeOptions, 
    updateElementOptionArray, 
    updateElementArray,
    checkValidity,
    checkFormValidity
} from '../../shared/utility';

const initialState = {
    loadingAlertTable: false,
    alertTableData: [],
    loadingModal: false,
    formIsValid: false,
    savingAlert: false,
    selectedAlertId: 0,
    alertStatusMasterCode: {},
    alertElementArray: [
            {
                concession: {
                    elementLabel: 'Concession',
                    elementType: 'input',
                    elementConfig:{
                        type: "text",
                        disabled: true
                    },
                    value: '',
                    validation: {
                        required: false
                    },
                    valid: true,
                    touched: false,
                    errorMessage: ''
                },
                section: {
                    elementLabel: 'Section',
                    elementType: 'input',
                    elementConfig:{
                        type: "text",
                        disabled: true
                    },
                    value: '',
                    validation: {
                        required: false
                    },
                    valid: true,
                    touched: false,
                    errorMessage: ''
                }
            },
            {
                subsection: {
                    elementLabel: 'Subsection',
                    elementType: 'input',
                    elementConfig:{
                        type: "text",
                        disabled: true
                    },
                    value: '',
                    validation: {
                        required: false
                    },
                    valid: true,
                    touched: false,
                    errorMessage: ''
                },
                feeder_pillar: {
                    elementLabel: 'Feeder Pillar',
                    elementType: 'input',
                    elementConfig:{
                        type: "text",
                        disabled: true
                    },
                    value: '',
                    validation: {
                        required: false
                    },
                    valid: true,
                    touched: false,
                    errorMessage: ''
                },
                
            },
            {
                loggedTime: {
                    elementLabel: 'Logged Time',
                    elementType: 'input',
                    elementConfig:{
                        type: "text",
                        disabled: true
                    },
                    value: '',
                    validation: {
                        required: false
                    },
                    valid: true,
                    touched: false,
                    errorMessage: ''
                },
                event: {
                    elementLabel: 'Event',
                    elementType: 'textArea',
                    elementConfig:{
                        type: "textArea",
                        minLine: 3,
                        maxLine: 6,
                        disabled: true
                    },
                    value: '',
                    validation: {
                        required: false
                    },
                    valid: true,
                    touched: false,
                    errorMessage: ''
                }
            },
            {
                status: {
                    elementLabel: 'Status *',
                    elementType: 'select',
                    elementConfig: {
                        type: "select",
                        options: []
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false,
                    errorMessage: 'Please select an item in the list'
                },
                attended_by: {
                    elementLabel: 'Attended By *',
                    elementType: 'select',
                    elementConfig: {
                        type: "select",
                        options: []
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false,
                    errorMessage: 'Please select an item in the list'
                }
            },
            {
                remarks: {
                    elementLabel: 'Remarks',
                    elementType: 'textArea',
                    elementConfig:{
                        type: "textArea",
                        minLine: 3,
                        maxLine: 6
                    },
                    value: '',
                    validation: {
                        required: false
                    },
                    valid: true,
                    touched: false,
                    errorMessage: ''
                }
            }
        ]
};

const fetchAlertOrderByDescStart = ( state, action ) => {
    return updateObject(state, {
        loadingAlertTable: action.loading
    });
}

const fetchAlertOrderByDescSuccess = ( state, action ) => {
    return updateObject(state, {
        loadingAlertTable: action.loading,
        alertTableData: action.alertTableData,
        alertStatusBadges: action.alertStatusBadges
    });
}

const fetchAlertOrderByDescFail = ( state, action ) => {
    return updateObject(state, {
        loadingAlertTable: action.loading
    });
}

const fetchAlertByIdStart = ( state, action ) => {
    return updateObject(state, {
        loadingModal: action.loading
    });
}

const fetchAlertByIdSuccess = ( state, action ) => {
    const alert = action.alert;
    const formElementArray = state.alertElementArray;
    const updatedConcession = {value: alert.concession_name};
    const updatedSection = {value: alert.section_name};
    const updatedSubsection = {value: alert.subsection};
    const updatedFeederPillarId = {value: alert.feeder_pillar_id};
    const updatedLoggedTime = {value: alert.created_at};
    const updatedEvent = {value: alert.event};
    
    const updatedStatus ={value: alert.status, valid: checkValidity(alert.status, formElementArray[3]["status"]["validation"])}
    const updatedAttendedBy = {value: alert.attended_by != null ? alert.attended_by : "", valid: checkValidity(alert.attended_by, formElementArray[3]["status"]["validation"])};
    const updatedRemarks = {value: alert.remarks != null ? alert.remarks : ""};
    const arrayId = "alertElementArray";

    const concessionSubElement = updateElementArraySubElement(state, arrayId, 0, "concession", updatedConcession);
    const sectionSubElement = updateElementArraySubElement(state, arrayId, 0, "section", updatedSection);
    const subsectionSubElement = updateElementArraySubElement(state, arrayId, 1, "subsection", updatedSubsection);
    const feederPillarSubElement = updateElementArraySubElement(state, arrayId, 1, "feeder_pillar", updatedFeederPillarId);
    const loggedTimeSubElement = updateElementArraySubElement(state, arrayId, 2, "loggedTime", updatedLoggedTime);
    const eventSubElement = updateElementArraySubElement(state, arrayId, 2, "event", updatedEvent);
    const statusSubElement = updateElementArraySubElement(state, arrayId, 3, "status", updatedStatus);
    const attendedBySubElement = updateElementArraySubElement(state, arrayId, 3, "attended_by", updatedAttendedBy);
    const remarksSubElement = updateElementArraySubElement(state, arrayId, 4, "remarks", updatedRemarks);

    const firstRowObject = updateObject(state[arrayId][0], {
        concession: concessionSubElement,
        section: sectionSubElement
    });
    
    const secondRowObject = updateObject(state[arrayId][1], {
        subsection: subsectionSubElement,
        feeder_pillar: feederPillarSubElement
    });
    
    const thirdRowObject = updateObject(state[arrayId][2], {
        loggedTime: loggedTimeSubElement,
        event: eventSubElement
    });
    
    const forthRowObject = updateObject(state[arrayId][3], {
        status: statusSubElement,
        attended_by: attendedBySubElement
    });
    
    const fifthRowObject = updateObject(state[arrayId][4], {
        remarks: remarksSubElement
    });

    const updatedAlertElementObject = updateObject(state[arrayId], {
        0: firstRowObject,
        1: secondRowObject,
        2: thirdRowObject,
        3: forthRowObject,
        4: fifthRowObject
    })

    const updatedAlertElementObjectArray = Object.values(updatedAlertElementObject);

    return updateObject(state, {
        loadingModal: action.loading,
        selectedAlertId: action.alertId,
        alertElementArray: updatedAlertElementObjectArray,
        formIsValid: checkFormValidity(updatedAlertElementObjectArray)
    });
}

const fetchAlertByIdFail = ( state, action ) => {
    return updateObject(state, {
        loadingModal: action.loading
    });
}

const fetchAlertStatusMasterCodeSuccess = ( state, action ) => {
    const updatedOption = {options: createMasterCodeOptions(action.alertStatus)};
    const updatedArray = updateElementOptionArray(state.alertElementArray, 3, "status", "elementConfig", updatedOption);
    
    return updateObject(state, {
        alertElementArray: Object.values(updatedArray),
        alertStatusMasterCode: action.alertStatus
    });
}

const fetchUsersSuccess = ( state, action ) => {
    const updatedOption = {options: createMasterCodeOptions(action.users)}
    
    const updatedArray = updateElementOptionArray(state.alertElementArray, 3, "attended_by", "elementConfig", updatedOption);
    
    return updateObject(state, {
        alertElementArray: Object.values(updatedArray)
    });
}

const handleAlertInputChanged = ( state, action ) => {
    const value = action.value;
    const elementRowIndex = action.elementRowIndex;
    const elementId = action.elementId; 
    const validationRules = action.validationRules;
    const arrayId = "alertElementArray";
    const isInputValid = checkValidity(value, validationRules);

    const udpatedObject = {
        value: value,
        touched: true,
        valid: isInputValid
    };
    const updatedArray = updateElementArray(state, arrayId, elementRowIndex, elementId, udpatedObject);
    const updatedObjectArray= Object.values(updatedArray);

    return updateObject(state, {
        [arrayId]: updatedObjectArray,
        formIsValid: checkFormValidity(updatedObjectArray)
    });
}

const saveAlertStart = ( state, action ) => {
    return updateObject(state, {
        savingAlert: action.loading
    });
}

const saveAlertSuccess = ( state, action ) => {
    return updateObject(state, {
        savingAlert: action.loading,
        selectedAlertId: action.id
    });
}

const saveAlertFail = ( state, action ) => {
    return updateObject(state, {
        savingAlert: action.loading
    });
}

const markAlertAsReadSuccess = ( state, action ) => {
    return state;
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ALERT_ORDER_BY_DESC_START:
            return fetchAlertOrderByDescStart( state, action );
        case actionTypes.FETCH_ALERT_ORDER_BY_DESC_SUCCESS:
            return fetchAlertOrderByDescSuccess( state, action );
        case actionTypes.FETCH_ALERT_ORDER_BY_DESC_FAIL:
            return fetchAlertOrderByDescFail( state, action );
        case actionTypes.FETCH_ALERT_BY_ID_START:
            return fetchAlertByIdStart( state, action );
        case actionTypes.FETCH_ALERT_BY_ID_SUCCESS:
            return fetchAlertByIdSuccess( state, action );
        case actionTypes.FETCH_ALERT_BY_ID_FAIL:
            return fetchAlertByIdFail( state, action );
        case actionTypes.FETCH_ALERT_STATUS_MASTER_CODE_SUCCESS:
            return fetchAlertStatusMasterCodeSuccess( state, action );
        case actionTypes.FETCH_ALERT_USERS_SUCCESS:
            return fetchUsersSuccess( state, action );
        case actionTypes.HANDLE_ALERT_INPUT_CHANGED_SUCCESS:
            return handleAlertInputChanged( state, action );
        case actionTypes.SAVE_ALERT_START:
            return saveAlertStart( state, action );
        case actionTypes.SAVE_ALERT_SUCCESS:
            return saveAlertSuccess( state, action );
        case actionTypes.SAVE_ALERT_FAIL:
            return saveAlertFail( state, action );
        case actionTypes.MARK_ALERT_NOTIFICATION_AS_READ_SUCCESS:
            return markAlertAsReadSuccess( state, action );
        default:
            return state;
    }
};

export default reducer;