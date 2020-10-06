import * as actionTypes from './actionTypes';
import axios from '../../axios-backend';

export const fetchSubsectionBySubsectionIdStart = () => {
    return {
        type: actionTypes.FETCH_SUBSECTION_BY_SUBSECTION_ID_START,
        loading: true
    }
}

export const fetchSubsectionBySubsectionIdSuccess = (subsection) => {
    return {
        type: actionTypes.FETCH_SUBSECTION_BY_SUBSECTION_ID_SUCCESS,
        loading: false,
        subsection: subsection
    }
}

export const fetchSubsectionBySubsectionIdFail = (error) => {
    return {
        type: actionTypes.FETCH_SUBSECTION_BY_SUBSECTION_ID_FAIL,
        loading: false,
        error: error
    }
}

export const fetchSubsectionBySubsectionId =  (params) => {
    return dispatch => {
        if(!params.isRefresh)
            dispatch(fetchSubsectionBySubsectionIdStart());

        axios.post('/getSubsectionBySubsectionId', params)
            .then(response => {
                dispatch(fetchSubsectionBySubsectionIdSuccess(response.data.subsection));
            })
            .catch(error => {
                console.log(error);
                dispatch(fetchSubsectionBySubsectionIdFail(error));
            });   
        
        
    }
}

export const fetchRoadsBySubsectionStart = () => {
    return {
        type: actionTypes.FETCH_ROADS_BY_SUBSECTION_START,
        loading: true
    }
}

export const fetchRoadsBySubsectionSuccess = (roads) => {
    return {
        type: actionTypes.FETCH_ROADS_BY_SUBSECTION_SUCCESS,
        loading: false,
        roads: roads
    }
}

export const fetchRoadsBySubsectionFail = (error) => {
    return {
        type: actionTypes.FETCH_ROADS_BY_SUBSECTION_FAIL,
        loading: false,
        error: error
    }
}

export const fetchRoadsBySubsection =  (params) => {
    return dispatch => {
        dispatch(fetchRoadsBySubsectionStart());

        axios.post('/getRoadsMetricsBySubsectionId', params)
        .then(response => {
            dispatch(fetchRoadsBySubsectionSuccess(response.data.roads));
        })
        .catch(error => {
            console.log(error);
            dispatch(fetchRoadsBySubsectionFail(error));
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

        axios.post('/getSubsectionsChartData', params)
        .then(response => {
            dispatch(fetchSubsectionMetricChartsSuccess(response.data.chartData));
        })
        .catch(error => {
            console.log(error);
            dispatch(fetchSubsectionMetricChartsFail(error));
        });   
        
    }
}

export const fetchSubsectionDetailsStart = () => {
    return {
        type: actionTypes.FETCH_SUBSECTION_DETAILS_START,
        loading: true
    }
}

export const fetchSubsectionDetailsSuccess = (subsection, chartsData) => {
    return {
        type: actionTypes.FETCH_SUBSECTION_DETAILS_SUCCESS,
        loading: false,
        subsection: subsection,
        chartsData: chartsData
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

        axios.post('/getSubsectionDetails', params)
            .then(response => {
                const data = response.data;
                dispatch(fetchSubsectionDetailsSuccess(data.subsection, data.chartsData));
            })
            .catch(error => {
                console.log(error);
                dispatch(fetchSubsectionDetailsFail(error));
            });   
        
        
    }
}