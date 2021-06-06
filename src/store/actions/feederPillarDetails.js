import * as actionTypes from './actionTypes';
import axios from '../../axios-backend';

export const fetchFeederPillarByFeederPillarIdStart = () => {
    return {
        type: actionTypes.FETCH_FEEDER_PILLAR_BY_FEEDER_PILLAR_ID_START,
        loading: true
    }
}

export const fetchFeederPillarByFeederPillarIdSuccess = (feederPillar, pillarId) => {
    return {
        type: actionTypes.FETCH_FEEDER_PILLAR_BY_FEEDER_PILLAR_ID_SUCCESS,
        loading: false,
        feederPillar: feederPillar,
        pillarId: pillarId
    }
}

export const fetchFeederPillarByFeederPillarIdFail = (error) => {
    return {
        type: actionTypes.FETCH_FEEDER_PILLAR_BY_FEEDER_PILLAR_ID_FAIL,
        loading: false,
        error: error
    }
}

export const fetchFeederPillarByFeederPillarId =  (params) => {
    return dispatch => {
        if(!params.isRefresh)
            dispatch(fetchFeederPillarByFeederPillarIdStart());

            console.log("params.feederPillarId", params.feederPillarId);
        axios.post('/getFeederPillarMetricsByFeederPillarId', params)
        .then(response => {
            dispatch(fetchFeederPillarByFeederPillarIdSuccess(response.data.feederPillar, params.feederPillarId));
        })
        .catch(error => {
            console.log(error);
            dispatch(fetchFeederPillarByFeederPillarIdFail(error));
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

export const fetchFeederPillarDetailsStart = () => {
    return {
        type: actionTypes.FETCH_FEEDER_PILLAR_DETAILS_START,
        loading: true
    }
}

export const fetchFeederPillarDetailsSuccess = (feederPillar, pillarId, chartsData, streetlightStatus, radialBarChartData, electricityBill) => {
    return {
        type: actionTypes.FETCH_FEEDER_PILLAR_DETAILS_SUCCESS,
        loading: false,
        feederPillar: feederPillar,
        pillarId: pillarId,
        chartsData: chartsData,
        streetlightStatus: streetlightStatus,
        radialBarChartData: radialBarChartData,
        electricityBill: electricityBill
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

        axios.post('/getFeederPillarDetails', params)
        .then(response => {
            const data = response.data;
            const {
                feederPillar,
                chartsData,
                streetlightStatusByPhase,
                radialBarChartData,
                electricityBill
            } = data;

            dispatch(fetchFeederPillarDetailsSuccess(feederPillar, params.feederPillarId, chartsData, streetlightStatusByPhase, radialBarChartData, electricityBill));
        })
        .catch(error => {
            console.log(error);
            dispatch(fetchFeederPillarDetailsFail(error));
        });  
    }
}