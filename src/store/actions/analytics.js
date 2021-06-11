import * as actionTypes from './actionTypes';

import axios from '../../axios-backend';

export const fetchImbalanceAmpereChartDataStart = () => {
    return {
        type: actionTypes.FETCH_IMBALANCE_AMPERE_START,
        loading: true
    }
}

export const fetchImbalanceAmpereChartDataSuccess = (chartsData) => {
    return {
        type: actionTypes.FETCH_IMBALANCE_AMPERE_SUCCESS,
        loading: false,
        chartsData: chartsData,
    }
}

export const fetchImbalanceAmpereChartDataFail = (error) => {
    return {
        type: actionTypes.FETCH_IMBALANCE_AMPERE_FAIL,
        loading: false
    }
}

export const fetchImbalanceAmpereChartData = (params) => {
    return dispatch => {
        dispatch(fetchImbalanceAmpereChartDataStart());
        
        return axios.post('/getImbalanceAmpereChartData', params)
            .then(response => {
                return Promise.resolve(dispatch(fetchImbalanceAmpereChartDataSuccess(response.data.chartsData)));
            })
            .catch(error => {
                console.log(error);
                dispatch(fetchImbalanceAmpereChartDataFail(error));
            });
    }   
}