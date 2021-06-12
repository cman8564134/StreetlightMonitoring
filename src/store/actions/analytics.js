import * as actionTypes from './actionTypes';

import axios from '../../axios-backend';

export const fetchImbalanceAmpereChartDataStart = () => {
    return {
        type: actionTypes.FETCH_IMBALANCE_AMPERE_START,
        loading: true
    }
}

export const fetchImbalanceAmpereChartDataSuccess = (chartsData, neutralCurrent, speedometerText) => {
    return {
        type: actionTypes.FETCH_IMBALANCE_AMPERE_SUCCESS,
        loading: false,
        chartsData: chartsData,
        neutralCurrent: neutralCurrent,
        speedometerText: speedometerText
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
                const data = response.data;
                dispatch(fetchImbalanceAmpereChartDataSuccess(data.chartsData, data.neutralCurrent, data.speedometerText))
                return Promise.resolve({isUnbalancedAmpere: response.data.isUnbalancedAmpere});
            })
            .catch(error => {
                console.log(error);
                dispatch(fetchImbalanceAmpereChartDataFail(error));
            });
    }   
}