import * as actionTypes from '../actions/actionTypes';
import { 
    updateObject,
    baseChartOptions,
    baseChartSeries,
    updateCharts
 } from '../../shared/utility';

const initialState = {
    feederPillar: {},
    pillarId: '',
    loadingHighlights: false,
    loadingFeederPillarMetricChart: false,
    feederPillarMetricCharts:[
        {
            "powerUsage": {title: "Power Usage", chart_options: baseChartOptions(), chart_series: baseChartSeries(), chart_type: "line"},
            "electricityBill": {title: "Electricity Bill", chart_options: baseChartOptions(), chart_series: baseChartSeries(), chart_type: "line"},
            "carbonFootprint": {title: "Carbon Footprint", chart_options: baseChartOptions(), chart_series: baseChartSeries(), chart_type: "line"},
            "energySavings": {title: "Energy Savings", chart_options: baseChartOptions(), chart_series: baseChartSeries(), chart_type: "line"},
            "amperage": {title: "Amperage", chart_options: baseChartOptions(), chart_series: baseChartSeries(), chart_type: "line"},
            "voltage": {title: "Voltage", chart_options: baseChartOptions(), chart_series: baseChartSeries(), chart_type: "line"}
        }
    ] 
        
};

const fetchFeederPillarDetailsStart = ( state, action ) => {
    return updateObject(state, {
        loadingHighlights: action.loading
    });
}

const fetchFeederPillarDetailsSuccess = ( state, action ) => {
    return updateObject(state, {
        loadingHighlights: action.loading,
        feederPillar: action.feederPillar,
        pillarId: action.pillarId
    });
}

const fetchFeederPillarDetailsFail = ( state, action ) => {
    return updateObject(state, {
        loadingHighlights: action.loading
    });
}

const feederPillarMetricChartsStart = ( state, action ) => {
    return updateObject(state, {
        loadingFeederPillarMetricChart: action.loading
    });
}

const feederPillarMetricChartsSuccess = ( state, action ) => {
    const updatedMetricCharts = updateCharts(state.feederPillarMetricCharts, action.chartsData);
    return updateObject(state, {
        loadingFeederPillarMetricChart: action.loading,
        feederPillarMetricCharts: updatedMetricCharts
        
    });
}

const feederPillarMetricChartsFail = ( state, action ) => {
    return updateObject(state, {
        loadingFeederPillarMetricChart: action.loading
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_FEEDER_PILLAR_DETAILS_START:
            return fetchFeederPillarDetailsStart( state, action );
        case actionTypes.FETCH_FEEDER_PILLAR_DETAILS_SUCCESS:
            return fetchFeederPillarDetailsSuccess( state, action );
        case actionTypes.FETCH_FEEDER_PILLAR_DETAILS_FAIL:
            return fetchFeederPillarDetailsFail( state, action );
        case actionTypes.FETCH_FEEDER_PILLAR_METRIC_CHARTS_START:
            return feederPillarMetricChartsStart( state, action );
        case actionTypes.FETCH_FEEDER_PILLAR_METRIC_CHARTS_SUCCESS:
            return feederPillarMetricChartsSuccess( state, action );
        case actionTypes.FETCH_FEEDER_PILLAR_METRIC_CHARTS_FAIL:
            return feederPillarMetricChartsFail( state, action );
        default:
            return state;
    }
};

export default reducer;