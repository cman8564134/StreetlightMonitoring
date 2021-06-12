import * as actionTypes from './actionTypes';

import axios from '../../axios-backend';

export const authenticationStart = () => {
    return {
        type: actionTypes.AUTHENTICATION_START,
        loading: true
    }
}

export const authenticationSuccess = (userData) => {
    return {
        type: actionTypes.AUTHENTICATION_SUCCESS,
        loading: false,
        userData: userData,
        isLoggedIn: true
    }
}

export const authenticationFail = (error) => {
    return {
        type: actionTypes.AUTHENTICATION_FAIL,
        loading: false,
        isLoggedIn: false,
        error: error
    }
}

export const authentication =  (params) => {
    return dispatch => {
        dispatch(authenticationStart());

        return axios.post('/loginUser', params)
            .then(response => {
                if(response.data.success) {
                    const appState = setAppState(response);

                      // save app state with user date in local storage
                      localStorage["appState"] = JSON.stringify(appState);

                      dispatch(authenticationSuccess(response.data.data));
                        
                      return {isSuccess: true, concessionId: response.data.data.concession_id};
                } else {
                    dispatch(authenticationFail(response.data.data));
                    return {isSuccess: false};
                }
            })
            .catch(error => {
                console.log(error);

                if(error.response){
                    console.log(error.response);
                    dispatch(authenticationFail(error.response.data.errors))
                }
                return {isSuccess: false};
            });
    }
    
}

const setAppState = (response) => {
    let userData = {
        id: response.data.data.id,
        username: response.data.data.username,
        name: response.data.data.name,
        email: response.data.data.email,
        auth_token: response.data.data.auth_token,
        timestamp: new Date().toString(),
        roles: response.data.data.roles,
        concession_id: response.data.data.concession_id
      };
    let appState = {
    isLoggedIn: true,
    user: userData
    };

    return appState;
}

export const logout = () => {
    let appState = {
        isLoggedIn: false,
        user: {name: ''}
    };
    // save app state with user date in local storage
    localStorage["appState"] = JSON.stringify(appState);
    return {
        type:actionTypes.AUTHENTICATION_LOGOUT
    }
}

export const authCheckState = (data) => {
    return dispatch => {
        let state = localStorage["appState"];
        
        if(state) {
            const appState = JSON.parse(state);
            if(appState.isLoggedIn) {
                const concessionId = appState.user.concession_id;
                if(concessionId){
                    const pathName = data.pathname;
                    if(pathName === "/dashboard" || (pathName.startsWith("/dashboard") && !pathName.startsWith("/dashboard/" + concessionId))){
                        return Promise.resolve({isLoggedIn: true, isPageNotFound: true, concessionId: concessionId});
                    }
                    else{
                        return Promise.resolve({isLoggedIn: true, isPageNotFound: false, concessionId: concessionId});
                    }
                }
                else{
                    return Promise.resolve({isLoggedIn: true, isPageNotFound: false, concessionId: concessionId});
                }
            }else{
                dispatch(logout());
                return Promise.resolve({isLoggedIn: false, isPageNotFound: false, concessionId: null});
            }
        }else{
            dispatch(logout());
            return Promise.resolve({isLoggedIn: false, isPageNotFound: false, concessionId: null});
        }
    }
}

export const checkUserConcessionId = () => {
    return dispatch => {
        let state = localStorage["appState"];
        
        if(state) {
            const appState = JSON.parse(state);
            if(appState.isLoggedIn) {
                const concessionId = appState.user.concession_id;
                return Promise.resolve({isLoggedIn: true, concessionId: concessionId});
            }
        }else{
            return Promise.resolve({isLoggedIn: false, concessionId: null})
        }
    }
}

export const fetchUnreadNotificationSuccess = (unreadAlertCount, unreadAlert) => {
    return {
        type: actionTypes.FETCH_UNREAD_NOTIFICATION_SUCCESS,
        unreadAlertCount: unreadAlertCount,
        unreadAlert: unreadAlert
    }
}

export const fetchUnreadNotification =  (params) => {
    return dispatch => {
        // return axios.post('/getUnreadNotification', params)
        //     .then(response => {
        //         dispatch(fetchUnreadNotificationSuccess(response.data.notificationCount, response.data.unreadNotifications));
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });
    }
    
}


