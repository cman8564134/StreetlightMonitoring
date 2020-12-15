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

export const fetchImbalanceAmpereChartData = () => {
    return dispatch => {
        dispatch(fetchImbalanceAmpereChartDataStart());

        const response = {data: {
            chartsData:{
                data: [[12.52],[83.16],[4.32]],
                labels: [""],
                series: ["R", "Y", "B"],
                ampere: [[3.33], [22.12], [1.15]]
            }
        }}

        dispatch(fetchImbalanceAmpereChartDataSuccess(response.data.chartsData));
        
        // axios.post('/getImbalanceAmpere', params)
        //     .then(response => {
        //         dispatch(fetchImbalanceAmpereChartDataSuccess(response.data.alerts));
        //     })
        //     .catch(error => {
        //         console.log(error);
        //         dispatch(fetchImbalanceAmpereChartDataFail(error));
        //     });
    }   
}