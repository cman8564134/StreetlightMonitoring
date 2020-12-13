import * as actionTypes from '../actions/actionTypes';
import { 
    updateObject, basePolarChartOptions, baseChartSeries
 } from '../../shared/utility';

import {darkRYB} from '../../shared/colors';

const initialState = {
    imbalanceAmpereChartData: {loading: false, chart_options: updateObject(basePolarChartOptions(), {colors: darkRYB}), chart_series: baseChartSeries()},
};

const fetchImbalanceAmpereChartDataStart = ( state, action ) => {
    return updateObject(state, {
        loadingImbalanceAmpere: action.loading
    });
}

const fetchImbalanceAmpereChartDataSuccess = ( state, action ) => {
    console.log('action', action);
    const chart = action.chartsData;
    const updatedChartOptions = updateObject(state.imbalanceAmpereChartData.chart_options, {labels: chart.labels});
    const updatedChartSeries = updateObject(state.imbalanceAmpereChartData.chart_series[0], {data: chart.series});
    const updatedChartSeriesAtIndex = updateObject(state.imbalanceAmpereChartData.chartSeries, Object.values(updatedChartSeries));
    const updatedImbalanceAmpereChartData = updateObject(state.imbalanceAmpereChartData, {
        loading: action.loading,
        chart_options: updatedChartOptions,
        chart_series: chart.series
    })

    // console.log('updatedChartOptions', updatedChartOptions);
    console.log('updatedImbalanceAmpereChartData', updatedImbalanceAmpereChartData);
    return updateObject(state, {
        imbalanceAmpereChartData: updatedImbalanceAmpereChartData
        
    });
}

const fetchImbalanceAmpereChartDataFail = ( state, action ) => {
    return updateObject(state, {
        loadingImbalanceAmpere: action.loading
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_IMBALANCE_AMPERE_START: 
            return fetchImbalanceAmpereChartDataStart(state, action);
        case actionTypes.FETCH_IMBALANCE_AMPERE_SUCCESS: 
            return fetchImbalanceAmpereChartDataSuccess(state, action);
        case actionTypes.FETCH_IMBALANCE_AMPERE_FAIL: 
            return fetchImbalanceAmpereChartDataFail(state, action);
        default:
            return state;
    }
};

export default reducer;