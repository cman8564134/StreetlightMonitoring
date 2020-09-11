import * as actionTypes from './actionTypes';
import axios from '../../axios-backend';

export const fetchFeederPillarDetailsStart = () => {
    return {
        type: actionTypes.FETCH_FEEDER_PILLAR_DETAILS_START,
        loading: true
    }
}

export const fetchFeederPillarDetailsSuccess = (feederPillar, pillarId) => {
    return {
        type: actionTypes.FETCH_FEEDER_PILLAR_DETAILS_SUCCESS,
        loading: false,
        feederPillar: feederPillar,
        pillarId: pillarId
    }
}

export const fetchFeederPillarDetailsFail = (error) => {
    return {
        type: actionTypes.FETCH_FEEDER_PILLAR_DETAILS_FAIL,
        loading: false,
        error: error
    }
}

export const fetchFeederPillarDetails =  (params) => {
    return dispatch => {
        if(!params.isRefresh)
            dispatch(fetchFeederPillarDetailsStart());

        axios.post('/getFeederPillarMetricsByFeederPillarId', params)
        .then(response => {
            dispatch(fetchFeederPillarDetailsSuccess(response.data.feederPillar, params.feederPillarId));
        })
        .catch(error => {
            console.log(error);
            dispatch(fetchFeederPillarDetailsFail(error));
        });  
    }
}


export const fetchFeederPillarMetricChartsStart = () => {
    return {
        type: actionTypes.FETCH_FEEDER_PILLAR_METRIC_CHARTS_START,
        loading: true
    }
}

export const fetchFeederPillarMetricChartsSuccess = (chartsData) => {
    return {
        type: actionTypes.FETCH_FEEDER_PILLAR_METRIC_CHARTS_SUCCESS,
        loading: false,
        chartsData: chartsData
    }
}

export const fetchFeederPillarMetricChartsFail = (error) => {
    return {
        type: actionTypes.FETCH_FEEDER_PILLAR_METRIC_CHARTS_FAIL,
        loading: false,
        error: error
    }
}

export const fetchFeederPillarMetricCharts =  (params) => {
    return dispatch => {
        if(!params.isRefresh)
            dispatch(fetchFeederPillarMetricChartsStart());

        axios.post('/getFeederPillarChartData', params)
        .then(response => {
            dispatch(fetchFeederPillarMetricChartsSuccess(response.data.chartData));
        })
        .catch(error => {
            console.log(error);
            dispatch(fetchFeederPillarMetricChartsFail(error));
        });   
        
    }
}