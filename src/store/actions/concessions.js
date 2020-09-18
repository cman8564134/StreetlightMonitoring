import * as actionTypes from './actionTypes';
import axios from '../../axios-backend';

export const fetchConcessionsStart = () => {
    return {
        type: actionTypes.FETCH_CONCESSIONS_START,
        loading: true
    }
}

export const fetchConcessionsSuccess = (concessions) => {
    return {
        type: actionTypes.FETCH_CONCESSIONS_SUCCESS,
        loading: false,
        concessions: concessions,
    }
}

export const fetchConcessionsFail = (error) => {
    return {
        type: actionTypes.FETCH_CONCESSIONS_FAIL,
        loading: false,
        error: error
    }
}

export const fetchConcessions =  (params) => {
    return dispatch => {
        if(!params.isRefresh)
            dispatch(fetchConcessionsStart());

        axios.get('/getConcessionsDetails')
            .then(response => {
                dispatch(fetchConcessionsSuccess(response.data.concessions));
            })
            .catch(error => {
                console.log(error);
                dispatch(fetchConcessionsFail());
            });
        
    }
}

export const fetchConcessionsSummaryStart = () => {
    return {
        type: actionTypes.FETCH_CONCESSIONS_SUMMARY_START,
        loading: true
    }
}

export const fetchConcessionsSummarySuccess = (summary) => {
    return {
        type: actionTypes.FETCH_CONCESSIONS_SUMMARY_SUCCESS,
        loading: false,
        summary: summary,
    }
}

export const fetchConcessionsSummaryFail = (error) => {
    return {
        type: actionTypes.FETCH_CONCESSIONS_SUMMARY_FAIL,
        loading: false,
        error: error
    }
}

export const fetchConcessionsSummary =  (params) => {
    return dispatch => {
        if(!params.isRefresh)
            dispatch(fetchConcessionsSummaryStart());

        axios.get('/getConcessionsSummary')
            .then(response => {
                dispatch(fetchConcessionsSummarySuccess(response.data.concessionsSummary));
            })
            .catch(error => {
                console.log(error);
                dispatch(fetchConcessionsSummaryFail());
            });
    }
}

export const fetchConcessionsPowerQualitySummaryChart =  (params) => {
    return dispatch => {

        getConcessionsChartData(dispatch, params);
        
    }
}

export const fetchConcessionsPowerUsageSummaryChart =  (params) => {
    return dispatch => {

        getConcessionsChartData(dispatch, params);
        
    }
}

export const getConcessionsChartDataStart = (type) => {
    return {
        type: type,
        loading: true
    }
}

export const getConcessionsChartDataSuccess = (chartsData, type) => {
    return {
        type: type,
        loading: false,
        chartsData: chartsData
    }
}

export const getConcessionsChartDataFail = (error, type) => {
    return {
        type: type,
        loading: false,
        error: error
    }
}

export const getConcessionsChartData = (dispatch, params) => {
    if(!params.isRefresh)
        dispatch(getConcessionsChartDataStart(params.startType));
        
    axios.post('/getConcessionsChartData', params)
        .then(response => {
            dispatch(getConcessionsChartDataSuccess(response.data.chartData, params.successType));
        })
        .catch(error => {
            console.log(error);
            dispatch(getConcessionsChartDataFail(error, params.failType));
        });
}

export const fetchConcessionsWeeklyElectricityBillChartStart = () => {
    return {
        type: actionTypes.FETCH_CONCESSIONS_WEEKLY_ELECTRICITY_BILL_CHART_START,
        loading: true
    }
}

export const fetchConcessionsWeeklyElectricityBillChartSuccess = (chartData) => {
    return {
        type: actionTypes.FETCH_CONCESSIONS_WEEKLY_ELECTRICITY_BILL_CHART_SUCCESS,
        loading: false,
        chartData: chartData
    }
}

export const fetchConcessionsWeeklyElectricityBillChartFail = (error) => {
    return {
        type: actionTypes.FETCH_CONCESSIONS_WEEKLY_ELECTRICITY_BILL_CHART_FAIL,
        loading: false,
        error: error
    }
}

export const fetchConcessionsWeeklyElectricityBillChart =  (params) => {
    return dispatch => {
        dispatch(fetchConcessionsWeeklyElectricityBillChartStart());

        axios.post('/getConcessionsElectricityBillChartData', params)
            .then(response => {
                dispatch(fetchConcessionsWeeklyElectricityBillChartSuccess(response.data.chartData));
            })
            .catch(error => {
                console.log(error);
                dispatch(fetchConcessionsWeeklyElectricityBillChartFail());
            });
    }
}