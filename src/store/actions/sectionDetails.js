import * as actionTypes from './actionTypes';
import axios from '../../axios-backend';

export const fetchSectionDetailsStart = () => {
    return {
        type: actionTypes.FETCH_SECTION_DETAILS_START,
        loading: true
    }
}

export const fetchSectionDetailsSuccess = (section) => {
    return {
        type: actionTypes.FETCH_SECTION_DETAILS_SUCCESS,
        loading: false,
        section: section
    }
}

export const fetchSectionDetailsFail = (error) => {
    return {
        type: actionTypes.FETCH_SECTION_DETAILS_FAIL,
        loading: false,
        error: error
    }
}

export const fetchSectionDetails =  (params) => {
    return dispatch => {
        if(!params.isRefresh)
            dispatch(fetchSectionDetailsStart());

        axios.post('/getSectionBySectionId', params)
        .then(response => {
            dispatch(fetchSectionDetailsSuccess(response.data.section));
        })
        .catch(error => {
            console.log(error);
            dispatch(fetchSectionDetailsFail(error));
        });   
        
    }
}

export const fetchSubsectionsBySectionStart = () => {
    return {
        type: actionTypes.FETCH_SUBSECTIONS_BY_SECTION_START,
        loading: true
    }
}

export const fetchSubsectionsBySectionSuccess = (subsections) => {
    return {
        type: actionTypes.FETCH_SUBSECTIONS_BY_SECTION_SUCCESS,
        loading: false,
        subsections: subsections
    }
}

export const fetchSubsectionsBySectionFail = (error) => {
    return {
        type: actionTypes.FETCH_SUBSECTIONS_BY_SECTION_FAIL,
        loading: false,
        error: error
    }
}

export const fetchSubsectionsBySection =  (params) => {
    return dispatch => {
        dispatch(fetchSubsectionsBySectionStart());

        axios.post('/getSubsectionsMetricsBySectionId', params)
        .then(response => {
            dispatch(fetchSubsectionsBySectionSuccess(response.data.subsections));
        })
        .catch(error => {
            console.log(error);
            dispatch(fetchSubsectionsBySectionFail(error));
        });   
        
    }
}


export const fetchSectionMetricChartsStart = () => {
    return {
        type: actionTypes.FETCH_SECTION_METRIC_CHARTS_START,
        loading: true
    }
}

export const fetchSectionMetricChartsSuccess = (chartsData) => {
    return {
        type: actionTypes.FETCH_SECTION_METRIC_CHARTS_SUCCESS,
        loading: false,
        chartsData: chartsData
    }
}

export const fetchSectionMetricChartsFail = (error) => {
    return {
        type: actionTypes.FETCH_SECTION_METRIC_CHARTS_FAIL,
        loading: false,
        error: error
    }
}

export const fetchSectionMetricCharts =  (params) => {
    return dispatch => {
        if(!params.isRefresh)
            dispatch(fetchSectionMetricChartsStart());

        axios.post('/getSectionsChartData', params)
        .then(response => {
            dispatch(fetchSectionMetricChartsSuccess(response.data.chartData));
        })
        .catch(error => {
            console.log(error);
            dispatch(fetchSectionMetricChartsFail(error));
        });   
    }
}