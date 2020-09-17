import * as actionTypes from '../actions/actionTypes';
import { 
    updateObject,
    baseChartOptions,
    baseChartSeries,
    updateCharts
 } from '../../shared/utility';

const initialState = {
    road: {},
    loadingHighlights: false,
    loadingFeederPillarTable: false,
    feederPillarsTableData: [],
    loadingRoadMetricChart: false,
    roadMetricCharts:[
        {
            "powerUsage": {title: "Power Usage (KWh)", chart_options: baseChartOptions(), chart_series: baseChartSeries(), chart_type: "line"},
            "electricityBill": {title: "Electricity Bill (RM)", chart_options: baseChartOptions(), chart_series: baseChartSeries(), chart_type: "line"},
            "carbonFootprint": {title: "Carbon Footprint (KG)", chart_options: baseChartOptions(), chart_series: baseChartSeries(), chart_type: "line"},
            "energySavings": {title: "Energy Savings (KWh)", chart_options: baseChartOptions(), chart_series: baseChartSeries(), chart_type: "line"},
            "amperage": {title: "Amperage (Amp)", chart_options: baseChartOptions(), chart_series: baseChartSeries(), chart_type: "line"},
            "voltage": {title: "Voltage (V)", chart_options: baseChartOptions(), chart_series: baseChartSeries(), chart_type: "line"}
        }
    ] 
        
};

const fetchRoadDetailsStart = ( state, action ) => {
    return updateObject(state, {
        loadingHighlights: action.loading
    });
}

const fetchRoadDetailsSuccess = ( state, action ) => {
    return updateObject(state, {
        road: action.road,
        loadingHighlights: action.loading
    });
}

const fetchRoadDetailsFail = ( state, action ) => {
    return updateObject(state, {
        loadingHighlights: action.loading
    });
}


const fetchFeederPillarsByRoadStart = ( state, action ) => {
    return updateObject(state, {
        loadingFeederPillarTable: action.loading
    });
}

const fetchFeederPillarsByRoadSuccess = ( state, action ) => {
    return updateObject(state, {
        loadingFeederPillarTable: action.loading,
        feederPillarsTableData: action.feederPillars
        
    });
}

const fetchFeederPillarsByRoadFail = ( state, action ) => {
    return updateObject(state, {
        loadingFeederPillarTable: action.loading
    });
}

const roadMetricChartsStart = ( state, action ) => {
    return updateObject(state, {
        loadingRoadMetricChart: action.loading
    });
}

const roadMetricChartsSuccess = ( state, action ) => {
    const updatedMetricCharts = updateCharts(state.roadMetricCharts, action.chartsData);
    return updateObject(state, {
        loadingRoadMetricChart: action.loading,
        roadMetricCharts: updatedMetricCharts
        
    });
}

const roadMetricChartsFail = ( state, action ) => {
    return updateObject(state, {
        loadingRoadMetricChart: action.loading
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ROAD_DETAILS_START:
            return fetchRoadDetailsStart( state, action );
        case actionTypes.FETCH_ROAD_DETAILS_SUCCESS:
            return fetchRoadDetailsSuccess( state, action );
        case actionTypes.FETCH_ROAD_DETAILS_FAIL:
            return fetchRoadDetailsFail( state, action );
        case actionTypes.FETCH_FEEDER_PILLARS_BY_ROAD_START:
            return fetchFeederPillarsByRoadStart( state, action );
        case actionTypes.FETCH_FEEDER_PILLARS_BY_ROAD_SUCCESS:
            return fetchFeederPillarsByRoadSuccess( state, action );
        case actionTypes.FETCH_FEEDER_PILLARS_BY_ROAD_FAIL:
            return fetchFeederPillarsByRoadFail( state, action );
        case actionTypes.FETCH_ROAD_METRIC_CHARTS_START:
            return roadMetricChartsStart( state, action );
        case actionTypes.FETCH_ROAD_METRIC_CHARTS_SUCCESS:
            return roadMetricChartsSuccess( state, action );
        case actionTypes.FETCH_ROAD_METRIC_CHARTS_FAIL:
            return roadMetricChartsFail( state, action );
        default:
            return state;
    }
};

export default reducer;