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
            "powerUsage": {title: "Power Usage (KWh)", chart_options: baseChartOptions(), chart_series: baseChartSeries(), chart_type: "line"},
            "electricityBill": {title: "Electricity Bill (RM)", chart_options: baseChartOptions(), chart_series: baseChartSeries(), chart_type: "line"},
            "carbonFootprint": {title: "Carbon Footprint (KG)", chart_options: baseChartOptions(), chart_series: baseChartSeries(), chart_type: "line"},
            "energySavings": {title: "Energy Savings (KWh)", chart_options: baseChartOptions(), chart_series: baseChartSeries(), chart_type: "line"},
            "amperage": {title: "Amperage (Amp)", chart_options: updateObject(baseChartOptions(), {colors:['#fb0021', '#feb019', '#008ffb']}), chart_series: baseChartSeries(), chart_type: "line"},
            "voltage": {title: "Voltage (V)", chart_options: updateObject(baseChartOptions(), {colors:['#fb0021', '#feb019', '#008ffb']}), chart_series: baseChartSeries(), chart_type: "line"}
        }
    ],
    loadingFeederPillarDetails: false 
        
};

const fetchFeederPillarByFeederPillarIdStart = ( state, action ) => {
    return updateObject(state, {
        loadingHighlights: action.loading
    });
}

const fetchFeederPillarByFeederPillarIdSuccess = ( state, action ) => {
    return updateObject(state, {
        loadingHighlights: action.loading,
        feederPillar: action.feederPillar,
        pillarId: action.pillarId
    });
}

const fetchFeederPillarByFeederPillarIdFail = ( state, action ) => {
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

const fetchFeederPillarDetailsStart = ( state, action ) => {
    return updateObject(state, {
        loadingFeederPillarDetails: action.loading
    });
}

const fetchFeederPillarDetailsSuccess = ( state, action ) => {
    const updatedMetricCharts = updateCharts(state.feederPillarMetricCharts, action.chartsData);
    return updateObject(state, {
        loadingFeederPillarDetails: action.loading,
        feederPillar: action.feederPillar,
        feederPillarMetricCharts: updatedMetricCharts,
        pillarId: action.pillarId,

    });
}

const fetchFeederPillarDetailsFail = ( state, action ) => {
    return updateObject(state, {
        loadingFeederPillarDetails: action.loading
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_FEEDER_PILLAR_BY_FEEDER_PILLAR_ID_START:
            return fetchFeederPillarByFeederPillarIdStart( state, action );
        case actionTypes.FETCH_FEEDER_PILLAR_BY_FEEDER_PILLAR_ID_SUCCESS:
            return fetchFeederPillarByFeederPillarIdSuccess( state, action );
        case actionTypes.FETCH_FEEDER_PILLAR_BY_FEEDER_PILLAR_ID_FAIL:
            return fetchFeederPillarByFeederPillarIdFail( state, action );
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