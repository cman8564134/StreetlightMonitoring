import * as actionTypes from '../actions/actionTypes';
import { 
    updateObject, basePolarChartOptions, baseChartSeries, baseChartOptions, updateCharts, generateChartSeriesObject, generateChartSeriesArray
 } from '../../shared/utility';

import {darkRYB} from '../../shared/colors';

const initialState = {
    // imbalanceAmpereChartData: [{
    //     imbalanceAmpere: {
    //         title: "Unbalanced Cable Stress", 
    //         loading: false, 
    //         chart_options: updateObject(baseChartOptions(), {colors: darkRYB, xaxis: {}}), 
    //         chart_series: baseChartSeries(),
    //         chart_type: "bar"
    //     }
    // }]
    imbalanceAmpereChartData: {
            title: "Unbalanced Cable Stress", 
            loading: false, 
            chart_options: updateObject(baseChartOptions(), {colors: darkRYB, xaxis: {}}), 
            chart_series: baseChartSeries(),
            chart_type: "bar"
    }

};

const fetchImbalanceAmpereChartDataStart = ( state, action ) => {
    return updateObject(state, {
        loadingImbalanceAmpere: action.loading
    });
}

const fetchImbalanceAmpereChartDataSuccess = ( state, action ) => {
    const chart = action.chartsData;
    const updatedChartOptions = updateObject(state.imbalanceAmpereChartData.chart_options, 
        {
            labels: chart.labels, 
            tooltip: {
                y: {
                    formatter: function (y) {
                        if(typeof y !== "undefined") {
                            return  y.toFixed(2) + "%";
                        }
                        return y;

                    }
                }       
            } ,
            dataLabels: {
                formatter: function(val, opt) {
                    return val + "%"
                }
            }
              
        }
    );
    const updatedChartSeries = generateChartSeriesArray(chart.data, chart.series, state.imbalanceAmpereChartData.chart_type, chart.labels, false);
    
    const updatedImbalanceAmpereChartData = updateObject(state.imbalanceAmpereChartData, {
        loading: action.loading,
        chart_options: updatedChartOptions,
        // chart_series: chart.series
        chart_series: updatedChartSeries
    })
    return updateObject(state, {
        loadingImbalanceAmpere: action.loading,
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