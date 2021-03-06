import * as actionTypes from './actionTypes';
import axios from '../../axios-backend';

export const fetchRoadByRoadIdStart = () => {
    return {
        type: actionTypes.FETCH_ROAD_BY_ROAD_ID_START,
        loading: true
    }
}

export const fetchRoadByRoadIdSuccess = (road) => {
    return {
        type: actionTypes.FETCH_ROAD_BY_ROAD_ID_SUCCESS,
        loading: false,
        road: road
    }
}

export const fetchRoadByRoadIdFail = (error) => {
    return {
        type: actionTypes.FETCH_ROAD_BY_ROAD_ID_FAIL,
        loading: false,
        error: error
    }
}

export const fetchRoadByRoadId =  (params) => {
    return dispatch => {
        if(!params.isRefresh)
            dispatch(fetchRoadByRoadIdStart());

        axios.post('/getRoadByRoadId', params)
            .then(response => {
                dispatch(fetchRoadByRoadIdSuccess(response.data.road));
            })
            .catch(error => {
                console.log(error);
                dispatch(fetchRoadByRoadIdFail(error));
            });   
        
        
    }
}

export const fetchFeederPillarsByRoadStart = () => {
    return {
        type: actionTypes.FETCH_FEEDER_PILLARS_BY_ROAD_START,
        loading: true
    }
}

export const fetchFeederPillarsByRoadSuccess = (feederPillars) => {
    return {
        type: actionTypes.FETCH_FEEDER_PILLARS_BY_ROAD_SUCCESS,
        loading: false,
        feederPillars: feederPillars
    }
}

export const fetchFeederPillarsByRoadFail = (error) => {
    return {
        type: actionTypes.FETCH_FEEDER_PILLARS_BY_ROAD_FAIL,
        loading: false,
        error: error
    }
}

export const fetchFeederPillarsByRoad =  (params) => {
    return dispatch => {
        dispatch(fetchFeederPillarsByRoadStart());

        axios.post('/getFeederPillarsMetricsByRoadId', params)
        .then(response => {
            dispatch(fetchFeederPillarsByRoadSuccess(response.data.feederPillars));
        })
        .catch(error => {
            console.log(error);
            dispatch(fetchFeederPillarsByRoadFail(error));
        });  
    }
}

export const fetchRoadMetricChartsStart = () => {
    return {
        type: actionTypes.FETCH_ROAD_METRIC_CHARTS_START,
        loading: true
    }
}

export const fetchRoadMetricChartsSuccess = (chartsData) => {
    return {
        type: actionTypes.FETCH_ROAD_METRIC_CHARTS_SUCCESS,
        loading: false,
        chartsData: chartsData
    }
}

export const fetchRoadMetricChartsFail = (error) => {
    return {
        type: actionTypes.FETCH_ROAD_METRIC_CHARTS_FAIL,
        loading: false,
        error: error
    }
}

export const fetchRoadMetricCharts =  (params) => {
    return dispatch => {
        if(!params.isRefresh)
            dispatch(fetchRoadMetricChartsStart());

        axios.post('/getRoadsChartData', params)
        .then(response => {
            dispatch(fetchRoadMetricChartsSuccess(response.data.chartData));
        })
        .catch(error => {
            console.log(error);
            dispatch(fetchRoadMetricChartsFail(error));
        });   
        
    }
}

export const fetchRoadDetailsStart = () => {
    return {
        type: actionTypes.FETCH_ROAD_DETAILS_START,
        loading: true
    }
}

export const fetchRoadDetailsSuccess = (road, chartsData) => {
    return {
        type: actionTypes.FETCH_ROAD_DETAILS_SUCCESS,
        loading: false,
        road: road,
        chartsData: chartsData
    }
}

export const fetchRoadDetailsFail = (error) => {
    return {
        type: actionTypes.FETCH_ROAD_DETAILS_FAIL,
        loading: false,
        error: error
    }
}

export const fetchRoadDetails =  (params) => {
    return dispatch => {
        if(!params.isRefresh)
            dispatch(fetchRoadDetailsStart());

        axios.post('/getRoadDetails', params)
            .then(response => {
                const data = response.data;
                dispatch(fetchRoadDetailsSuccess(data.road, data.chartsData));
            })
            .catch(error => {
                console.log(error);
                dispatch(fetchRoadDetailsFail(error));
            });   
        
        
    }
}