import * as actionTypes from './actionTypes';

// import axios from '../../axios-backend';

export const fetchUserMasterStart = () => {
    return {
        type: actionTypes.FETCH_USER_MASTER_START,
        loading: true
    }
}

export const fetchUserMasterSuccess = (userMaster) => {
    return {
        type: actionTypes.FETCH_USER_MASTER_SUCCESS,
        loading: false,
        userMaster: userMaster
    }
}

export const fetchUserMasterFail = (error) => {
    return {
        type: actionTypes.FETCH_USER_MASTER_FAIL,
        loading: false,
        error: error
    }
}

export const fetchUserMaster  = () => {
    return dispatch => {
        fetchAllUserMaster(dispatch);
    }
    
}

const fetchAllUserMaster = (dispatch) => {
    dispatch(fetchUserMasterStart());

    // axios.get('/getUserMaster')
    //     .then(response => {
    //         dispatch(fetchUserMasterSuccess(response.data.userMaster));
    //     })
    //     .catch(error => {
    //         dispatch(fetchUserMasterFail(error));
    //     });
}

export const fetchUserMasterByIdStart = () => {
    return {
        type: actionTypes.FETCH_USER_MASTER_BY_ID_START,
        loading: true
    }
}

export const fetchUserMasterByIdSuccess = (userMaster, userMasterId) => {
    return {
        type: actionTypes.FETCH_USER_MASTER_BY_ID_SUCCESS,
        loading: false,
        userMaster: userMaster,
        userMasterId: userMasterId
    }
}

export const fetchUserMasterByIdFail = (error) => {
    return {
        type: actionTypes.FETCH_USER_MASTER_BY_ID_FAIL,
        loading: false,
        error: error
    }
}

export const fetchUserMasterById = (params) => {
    return dispatch => {
        dispatch(fetchUserMasterByIdStart());
        
        // axios.post('/getUserMasterById', params)
        //     .then(response => {
        //         dispatch(fetchUserMasterByIdSuccess(response.data.userMaster, params.id));


        //     })
        //     .catch(error => {
        //         dispatch(fetchUserMasterByIdFail(error));
        //     });
    }
}

export const pushPasswordIntoFormElementArray = () => {
    return dispatch => {
        dispatch({type: actionTypes.PUSH_PASSWORD_INTO_FORM_ELEMENT_ARRAY})
    }
}

export const clearUserFormElement = () => {
    return dispatch => {
        dispatch({type: actionTypes.CLEAR_USER_MASTER_FORM_ELEMENT_ARRAY})
    }
}

export const removePasswordFromFormElementArray = () => {
    return dispatch => {
        dispatch({type: actionTypes.REMOVE_PASSWORD_FROM_FORM_ELEMENT_ARRAY})
    }
}

export const saveUserMasterStart = () => {
    return {
        type: actionTypes.SAVE_USER_MASTER_START,
        loading: true
    }
}

export const saveUserMasterSuccess = (id) => {
    return {
        type: actionTypes.SAVE_USER_MASTER_SUCCESS,
        loading: false,
        id: id
    }
}

export const saveUserMasterFail = (error) => {
    return {
        type: actionTypes.SAVE_USER_MASTER_FAIL,
        loading: false,
        error: error
    }
}

export const saveUserMaster =  (params) => {
    return dispatch => {
        dispatch(saveUserMasterStart());

        // return axios.post('/saveUserMaster', params)
        //     .then(response => {
        //         console.log(response.data);
        //         dispatch(saveUserMasterSuccess(response.data.userMaster.id));
        //         fetchAllUserMaster(dispatch);

        //         return response.data
        //     })
        //     .catch(error => {
        //         console.log(error);

        //         if(error.response){
        //             console.log(error.response);
        //             dispatch(saveUserMasterFail(error.response.data.errors))
        //         }
                

        //         return error.response;
        //     });
    }
    
}

export const deleteUserMasterStart = () => {
    return {
        type: actionTypes.DELETE_USER_MASTER_START,
        loading: true
    }
}

export const deleteUserMasterSuccess = (message) => {
    return {
        type: actionTypes.DELETE_USER_MASTER_START,
        loading: false,
        message: message
    }
}

export const deleteUserMasterFail = (error) => {
    return {
        type: actionTypes.DELETE_USER_MASTER_FAIL,
        loading: false,
        error: error
    }
}

export const deleteUserMaster =  (params) => {
    return dispatch => {
        dispatch(deleteUserMasterStart());

        // return axios.post('/deleteUserMaster', params)
        //     .then(response => {
        //         console.log(response.data);
        //         dispatch(deleteUserMasterSuccess(response.data.messsage));
        //         fetchAllUserMaster(dispatch);

        //         return response.data
        //     })
        //     .catch(error => {
        //         console.log(error);

        //         if(error.response){
        //             console.log(error.response);
        //             dispatch(deleteUserMasterFail(error.response.data.errors))
        //         }
                
        //         return error.response;
        //     });
    }
    
}

export const fetchUsersSuccess = (type, users) => {
    return {
        type: type,
        users: users
    }
}

export const fetchUsers =  (type) => {
    return dispatch => {
        const response = {
            data: {
                userMap: {
                    "admin": "Admin"
                }
                
            }
        }
        dispatch(fetchUsersSuccess(type, response.data.userMap));
        // axios.get('/getUserMap')
        //     .then(response => {
        //         dispatch(fetchUsersSuccess(type, response.data.userMap));
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });
    }
    
}