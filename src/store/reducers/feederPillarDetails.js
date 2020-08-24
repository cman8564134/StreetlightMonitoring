import * as actionTypes from '../actions/actionTypes';
import { 
    updateObject,
    baseChartOptions,
    baseChartSeries,
    updateCharts
 } from '../../shared/utility';

const initialState = {
    concessionName: "",
    sectionName: "",
    subsectionName: "",
    feederPillar: {},
    loadingHighlights: false,
    loadingFeederPillarMetricChart: false,
    feederPillarMetricCharts:[
        {
            "powerUsage": {title: "Power Usage", chart_options: baseChartOptions(), chart_series: baseChartSeries()},
            "electricalBill": {title: "Electrical Bill", chart_options: baseChartOptions(), chart_series: baseChartSeries()},
            "carbonFootprint": {title: "Carbon Footprint", chart_options: baseChartOptions(), chart_series: baseChartSeries()},
            "energySavings": {title: "Energy Savings", chart_options: baseChartOptions(), chart_series: baseChartSeries()},
            "amperage": {title: "Amperage", chart_options: baseChartOptions(), chart_series: baseChartSeries()},
            "voltage": {title: "Voltage", chart_options: baseChartOptions(), chart_series: baseChartSeries()}
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
        feederPillar: action.feederPillar,
        concessionName: action.concessionName,
        sectionName: action.sectionName,
        subsectionName: action.subsectionName,
        loadingHighlights: action.loading
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