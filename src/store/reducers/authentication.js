import * as actionTypes from '../actions/actionTypes';
import { 
    updateObject,
    checkValidity,
    updateElementArray
} from '../../shared/utility';

const initialState = {
    isLoggedIn: false,
    user: {name: 'Admin'},
    error: '',
    loading: false,
    unreadAlertCount: 0,
    unreadAlert: [],
    formElementArray:
        [
            {
                username: {
                    elementLabel: 'Username',
                    elementType: 'input',
                    elementConfig: {
                        type: "text"
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false,
                    errorMessage: 'The username field is required'
                },
                password: {
                    elementLabel: 'Password',
                    elementType: 'input',
                    elementConfig: {
                        type: "password"
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false,
                    errorMessage: 'The password field is required'
                }
            }
        ]
};

const authenticationStart = ( state, action ) => {
    return updateObject(state, {
        loading: action.loading
    });
}

const authenticationSuccess = ( state, action ) => {
    return updateObject(state, {
        loading: action.loading,
        user: action.userData,
        isLoggedIn: action.isLoggedIn,
        error: '',
        unreadAlert: action.userData.unreadNotificiations
    });
}

const authenticationFail = ( state, action ) => {
    return updateObject(state, {
        loading: action.loading,
        isLoggedIn: action.isLoggedIn,
        error: action.error
    });
}

const handleAlertInputChanged = ( state, action ) => {
    const value = action.value;
    const elementRowIndex = action.elementRowIndex;
    const elementId = action.elementId; 
    const validationRules = action.validationRules;
    const arrayId = "formElementArray";
    const isInputValid = checkValidity(value, validationRules);

    const udpatedObject = {
        value: value,
        touched: true,
        valid: isInputValid
    };
    const updatedArray = updateElementArray(state, arrayId, elementRowIndex, elementId, udpatedObject);
    const updatedObjectArray= Object.values(updatedArray);

    return updateObject(state, {
        [arrayId]: updatedObjectArray
    });
}

const authenticationLogout = (state, action) => {
    return updateObject(state, {
        isLoggedIn: false,
        user: {name: ''}
    });
}

const fetchUnreadNotificationSuccess = (state, action) => {
    return updateObject(state, {
        unreadAlertCount: action.unreadAlertCount,
        unreadAlert: action.unreadAlert
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTHENTICATION_START:
            return authenticationStart( state, action );
        case actionTypes.AUTHENTICATION_SUCCESS:
            return authenticationSuccess( state, action );
        case actionTypes.AUTHENTICATION_FAIL:
            return authenticationFail( state, action );
        case actionTypes.HANDLE_LOGIN_INPUT_CHANGED_SUCCESS:
            return handleAlertInputChanged( state, action );
        case actionTypes.AUTHENTICATION_LOGOUT:
            return authenticationLogout( state, action );
        case actionTypes.FETCH_UNREAD_NOTIFICATION_SUCCESS:
            return fetchUnreadNotificationSuccess( state, action );
        default:
            return state;
    }
};

export default reducer;