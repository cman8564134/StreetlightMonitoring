import axios from '../../axios-backend';

export const fetchAlertStatusMasterCodeSuccess = (type, masterCodeMap) => {
    return {
        type: type,
        masterCodeMap: masterCodeMap
    }
}

export const fetchMasterCodeMapByMasterCode = ( params ) => {
    return dispatch => {
        axios.post('/getCodeAndDescByMasterCode', params)
            .then(response => {
                dispatch(fetchAlertStatusMasterCodeSuccess(params.type, response.data.masterCodeMap));
            })
            .catch(error => {
                console.log(error);
            });
    }
    
}