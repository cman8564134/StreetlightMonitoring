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
    loadingTicketTable: false,
    alertTableData: [],
    allRemarks: [],
    loadingModal: false,
    formIsValid: false,
    savingAlert: false,
    selectedTicketId: 0,
    alertStatusMasterCode: {},
    ticketElementArray: [
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
                    elementLabel: 'Majlis',
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
                        minLine: 1,
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
                // attended_by: {
                //     elementLabel: 'Attended By *',
                //     elementType: 'select',
                //     elementConfig: {
                //         type: "select",
                //         options: []
                //     },
                //     value: '',
                //     validation: {
                //         required: true
                //     },
                //     valid: false,
                //     touched: false,
                //     errorMessage: 'Please select an item in the list'
                // }
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
        ],
    searchFilters: [
            {
                categories: {
                    elementLabel: 'Categories:',
                    elementType: 'select',
                    elementConfig: {
                        type: "select",
                        options: []
                    },
                    value: '',
                    validation: {
                        required: false
                    },
                    valid: false,
                    touched: false,
                    errorMessage: ''
                }
            }
        ],
    ticketRemarks: []    
};

const fetchAlertAndRemarksOrderByDescStart = ( state, action ) => {
    return updateObject(state, {
        loadingTicketTable: action.loading
    });
}

const fetchAlertAndRemarksOrderByDescSuccess = ( state, action ) => {
    return updateObject(state, {
        loadingTicketTable: action.loading,
        alertTableData: action.alertTableData,
        allRemarks: action.allRemarks
    });
}

const fetchAlertAndRemarksOrderByDescFail = ( state, action ) => {
    return updateObject(state, {
        loadingTicketTable: action.loading
    });
}

const fetchTicketByIdStart = ( state, action ) => {
    return updateObject(state, {
        loadingModal: action.loading
    });
}

const fetchTicketByIdSuccess = ( state, action ) => {
    console.log("action", action);
    const ticket = action.ticket;
    const formElementArray = state.ticketElementArray;
    const updatedConcession = {value: ticket.concession_name};
    const updatedSection = {value: ticket.section_name};
    const updatedSubsection = {value: ticket.subsection_name};
    const updatedFeederPillarId = {value: ticket.pillar_id};
    const updatedLoggedTime = {value: ticket.created_at};
    const updatedEvent = {value: ticket.event};
    
    const updatedStatus ={value: ticket.status, valid: checkValidity(ticket.status, formElementArray[3]["status"]["validation"])}
    const arrayId = "ticketElementArray";

    const concessionSubElement = updateElementArraySubElement(state, arrayId, 0, "concession", updatedConcession);
    const sectionSubElement = updateElementArraySubElement(state, arrayId, 0, "section", updatedSection);
    const subsectionSubElement = updateElementArraySubElement(state, arrayId, 1, "subsection", updatedSubsection);
    const feederPillarSubElement = updateElementArraySubElement(state, arrayId, 1, "feeder_pillar", updatedFeederPillarId);
    const loggedTimeSubElement = updateElementArraySubElement(state, arrayId, 2, "loggedTime", updatedLoggedTime);
    const eventSubElement = updateElementArraySubElement(state, arrayId, 2, "event", updatedEvent);
    const statusSubElement = updateElementArraySubElement(state, arrayId, 3, "status", updatedStatus);

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
        status: statusSubElement
    });
    

    const updatedTicketElementObject = updateObject(state[arrayId], {
        0: firstRowObject,
        1: secondRowObject,
        2: thirdRowObject,
        3: forthRowObject
    })

    const updatedTicketElementObjectArray = Object.values(updatedTicketElementObject);

    return updateObject(state, {
        loadingModal: action.loading,
        selectedTicketId: action.ticketId,
        ticketElementArray: updatedTicketElementObjectArray,
        formIsValid: checkFormValidity(updatedTicketElementObjectArray),
        ticketRemarks: action.remarks
    });
}

const fetchTicketByIdFail = ( state, action ) => {
    return updateObject(state, {
        loadingModal: action.loading
    });
}

const fetchAlertStatusMasterCodeSuccess = ( state, action ) => {
    const updatedOption = {options: createMasterCodeOptions(action.masterCodeMap)};
    const updatedArray = updateElementOptionArray(state.ticketElementArray, 3, "status", "elementConfig", updatedOption);
    
    return updateObject(state, {
        ticketElementArray: Object.values(updatedArray),
        alertStatusMasterCode: action.masterCodeMap
    });
}

const fetchAlertCodeMasterCodeSuccess = ( state, action ) => {
    const updatedOption = {options: createMasterCodeOptions(action.masterCodeMap)};
    const updatedArray = updateElementOptionArray(state.searchFilters, 0, "categories", "elementConfig", updatedOption);
    
    return updateObject(state, {
        searchFilters: Object.values(updatedArray),
        // alertStatusMasterCode: action.alertStatus
    });
}

const fetchUsersSuccess = ( state, action ) => {
    const updatedOption = {options: createMasterCodeOptions(action.users)}
    
    const updatedArray = updateElementOptionArray(state.ticketElementArray, 3, "attended_by", "elementConfig", updatedOption);
    
    return updateObject(state, {
        ticketElementArray: Object.values(updatedArray)
    });
}

const handleTicketInputChanged = ( state, action ) => {
    const value = action.value;
    const elementRowIndex = action.elementRowIndex;
    const elementId = action.elementId; 
    const validationRules = action.validationRules;
    const arrayId = "ticketElementArray";
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

const saveTicketStart = ( state, action ) => {
    return updateObject(state, {
        savingAlert: action.loading
    });
}

const saveTicketSuccess = ( state, action ) => {
    return updateObject(state, {
        savingAlert: action.loading,
        selectedTicketId: action.id
    });
}

const saveTicketFail = ( state, action ) => {
    return updateObject(state, {
        savingAlert: action.loading
    });
}

const fetchTicketByAlertCodeStart = ( state, action ) => {
    return updateObject(state, {
        loadingTicketTable: action.loading
    });
}

const fetchTicketByAlertCodeSuccess = ( state, action ) => {
    return updateObject(state, {
        loadingTicketTable: action.loading,
        alertTableData: action.alerts,
    });
}

const fetchTicketByAlertCodeFail = ( state, action ) => {
    return updateObject(state, {
        loadingTicketTable: action.loading
    });
}

const handleTicketSearchFilterChanged = ( state, action ) => {
    const value = action.value;
    const elementRowIndex = action.elementRowIndex;
    const elementId = action.elementId; 
    const validationRules = action.validationRules;
    const arrayId = "searchFilters";
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

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ALERT_AND_REMARKS_ORDER_BY_DESC_START:
            return fetchAlertAndRemarksOrderByDescStart( state, action );
        case actionTypes.FETCH_ALERT_AND_REMARKS_ORDER_BY_DESC_SUCCESS:
            return fetchAlertAndRemarksOrderByDescSuccess( state, action );
        case actionTypes.FETCH_ALERT_AND_REMARKS_ORDER_BY_DESC_FAIL:
            return fetchAlertAndRemarksOrderByDescFail( state, action );
        case actionTypes.FETCH_TICKET_BY_ID_START:
            return fetchTicketByIdStart( state, action );
        case actionTypes.FETCH_TICKET_BY_ID_SUCCESS:
            return fetchTicketByIdSuccess( state, action );
        case actionTypes.FETCH_TICKET_BY_ID_FAIL:
            return fetchTicketByIdFail( state, action );
        case actionTypes.FETCH_ALERT_STATUS_MASTER_CODE_SUCCESS:
            return fetchAlertStatusMasterCodeSuccess( state, action );
        case actionTypes.FETCH_ALERT_CODE_MASTER_CODE_SUCCESS:
            return fetchAlertCodeMasterCodeSuccess( state, action );
        case actionTypes.FETCH_ALERT_USERS_SUCCESS:
            return fetchUsersSuccess( state, action );
        case actionTypes.HANDLE_TICKET_INPUT_CHANGED_SUCCESS:
            return handleTicketInputChanged( state, action );
        case actionTypes.SAVE_ALERT_START:
            return saveTicketStart( state, action );
        case actionTypes.SAVE_ALERT_SUCCESS:
            return saveTicketSuccess( state, action );
        case actionTypes.SAVE_ALERT_FAIL:
            return saveTicketFail( state, action );
        case actionTypes.FETCH_TICKET_BY_ALERT_CODE_START:
            return fetchTicketByAlertCodeStart( state, action );
        case actionTypes.FETCH_TICKET_BY_ALERT_CODE_SUCCESS:
            return fetchTicketByAlertCodeSuccess( state, action );
        case actionTypes.FETCH_TICKET_BY_ALERT_CODE_FAIL:
            return fetchTicketByAlertCodeFail( state, action );
        case actionTypes.HANDLE_TICKET_SEARCH_FILTER_CHANGED_SUCCESS:
            return handleTicketSearchFilterChanged( state, action );
        default:
            return state;
    }
};

export default reducer;