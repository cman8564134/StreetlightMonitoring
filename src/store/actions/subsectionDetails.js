import * as actionTypes from './actionTypes';
import axios from '../../axios-backend';

export const fetchSubsectionDetailsStart = () => {
    return {
        type: actionTypes.FETCH_SUBSECTION_DETAILS_START,
        loading: true
    }
}

export const fetchSubsectionDetailsSuccess = (subsection) => {
    return {
        type: actionTypes.FETCH_SUBSECTION_DETAILS_SUCCESS,
        loading: false,
        subsection: subsection
    }
}

export const fetchSubsectionDetailsFail = (error) => {
    return {
        type: actionTypes.FETCH_SUBSECTION_DETAILS_FAIL,
        loading: false,
        error: error
    }
}

export const fetchSubsectionDetails =  (params) => {
    return dispatch => {
        if(!params.isRefresh)
            dispatch(fetchSubsectionDetailsStart());

        axios.post('/getSubsectionBySubsectionId', params)
            .then(response => {
                dispatch(fetchSubsectionDetailsSuccess(response.data.subsection));
            })
            .catch(error => {
                console.log(error);
                dispatch(fetchSubsectionDetailsFail(error));
            });   
        
        
    }
}

export const fetchFeederPillarsBySubsectionStart = () => {
    return {
        type: actionTypes.FETCH_FEEDER_PILLARS_BY_SUBSECTION_START,
        loading: true
    }
}

export const fetchFeederPillarsBySubsectionSuccess = (feederPillars) => {
    return {
        type: actionTypes.FETCH_FEEDER_PILLARS_BY_SUBSECTION_SUCCESS,
        loading: false,
        feederPillars: feederPillars
    }
}

export const fetchFeederPillarsBySubsectionFail = (error) => {
    return {
        type: actionTypes.FETCH_FEEDER_PILLARS_BY_SUBSECTION_FAIL,
        loading: false,
        error: error
    }
}

export const fetchFeederPillarsBySubsection =  (params) => {
    return dispatch => {
        dispatch(fetchFeederPillarsBySubsectionStart());

        axios.post('/getFeederPillarsMetricsBySubsectionId', params)
        .then(response => {
            dispatch(fetchFeederPillarsBySubsectionSuccess(response.data.feederPillars));
        })
        .catch(error => {
            console.log(error);
            dispatch(fetchFeederPillarsBySubsectionFail(error));
        });  
    }
}


export const fetchSubsectionMetricChartsStart = () => {
    return {
        type: actionTypes.FETCH_SUBSECTION_METRIC_CHARTS_START,
        loading: true
    }
}

export const fetchSubsectionMetricChartsSuccess = (chartsData) => {
    return {
        type: actionTypes.FETCH_SUBSECTION_METRIC_CHARTS_SUCCESS,
        loading: false,
        chartsData: chartsData
    }
}

export const fetchSubsectionMetricChartsFail = (error) => {
    return {
        type: actionTypes.FETCH_SUBSECTION_METRIC_CHARTS_FAIL,
        loading: false,
        error: error
    }
}

export const fetchSubsectionMetricCharts =  (params) => {
    return dispatch => {
        if(!params.isRefresh)
            dispatch(fetchSubsectionMetricChartsStart());

        axios.post('/getSectionsChartData', params)
        .then(response => {
            dispatch(fetchSubsectionMetricChartsSuccess(response.data.chartData));
        })
        .catch(error => {
            console.log(error);
            dispatch(fetchSubsectionMetricChartsFail(error));
        });   
        
    }
}