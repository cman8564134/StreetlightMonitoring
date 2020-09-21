import * as actionTypes from '../actions/actionTypes';
import { 
    updateObject,
    baseChartOptions,
    baseChartSeries,
    updateCharts
 } from '../../shared/utility';

const initialState = {
    subsection: {},
    loadingHighlights: false,
    loadingFeederPillarTable: false,
    roadsTableData: [],
    loadingSubsectionMetricChart: false,
    subsectionMetricCharts:[
        {
            "powerUsage": {title: "Power Usage (KWh)", chart_options: baseChartOptions(), chart_series: baseChartSeries(), chart_type: "line"},
            "electricityBill": {title: "Electricity Bill (RM)", chart_options: baseChartOptions(), chart_series: baseChartSeries(), chart_type: "line"},
            "carbonFootprint": {title: "Carbon Footprint (KG)", chart_options: baseChartOptions(), chart_series: baseChartSeries(), chart_type: "line"},
            "energySavings": {title: "Energy Savings (KWh)", chart_options: baseChartOptions(), chart_series: baseChartSeries(), chart_type: "line"},
            "amperage": {title: "Amperage (Amp)", chart_options: updateObject(baseChartOptions(), {colors:['#fb0021', '#feb019', '#008ffb']}), chart_series: baseChartSeries(), chart_type: "line"},
            "voltage": {title: "Voltage (V)", chart_options: updateObject(baseChartOptions(), {colors:['#fb0021', '#feb019', '#008ffb']}), chart_series: baseChartSeries(), chart_type: "line"}
        }
    ] 
        
};

const fetchSubsectionDetailsStart = ( state, action ) => {
    return updateObject(state, {
        loadingHighlights: action.loading
    });
}

const fetchSubsectionDetailsSuccess = ( state, action ) => {
    return updateObject(state, {
        subsection: action.subsection,
        loadingHighlights: action.loading
    });
}

const fetchSubsectionDetailsFail = ( state, action ) => {
    return updateObject(state, {
        loadingHighlights: action.loading
    });
}


const fetchRoadsBySubsectionStart = ( state, action ) => {
    return updateObject(state, {
        loadingFeederPillarTable: action.loading
    });
}

const fetchRoadsBySubsectionSuccess = ( state, action ) => {
    return updateObject(state, {
        loadingFeederPillarTable: action.loading,
        roadsTableData: action.roads
        
    });
}

const fetchRoadsBySubsectionFail = ( state, action ) => {
    return updateObject(state, {
        loadingFeederPillarTable: action.loading
    });
}

const fetchSubsectionMetricChartsStart = ( state, action ) => {
    return updateObject(state, {
        loadingSubsectionMetricChart: action.loading
    });
}

const fetchSubsectionMetricChartsSuccess = ( state, action ) => {
    const updatedMetricCharts = updateCharts(state.subsectionMetricCharts, action.chartsData);
    return updateObject(state, {
        loadingSubsectionMetricChart: action.loading,
        subsectionMetricCharts: updatedMetricCharts
        
    });
}

const fetchSubsectionMetricChartsFail = ( state, action ) => {
    return updateObject(state, {
        loadingSubsectionMetricChart: action.loading
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_SUBSECTION_DETAILS_START:
            return fetchSubsectionDetailsStart( state, action );
        case actionTypes.FETCH_SUBSECTION_DETAILS_SUCCESS:
            return fetchSubsectionDetailsSuccess( state, action );
        case actionTypes.FETCH_SUBSECTION_DETAILS_FAIL:
            return fetchSubsectionDetailsFail( state, action );
        case actionTypes.FETCH_ROADS_BY_SUBSECTION_START:
            return fetchRoadsBySubsectionStart( state, action );
        case actionTypes.FETCH_ROADS_BY_SUBSECTION_SUCCESS:
            return fetchRoadsBySubsectionSuccess( state, action );
        case actionTypes.FETCH_ROADS_BY_SUBSECTION_FAIL:
            return fetchRoadsBySubsectionFail( state, action );
        case actionTypes.FETCH_SUBSECTION_METRIC_CHARTS_START:
            return fetchSubsectionMetricChartsStart( state, action );
        case actionTypes.FETCH_SUBSECTION_METRIC_CHARTS_SUCCESS:
            return fetchSubsectionMetricChartsSuccess( state, action );
        case actionTypes.FETCH_SUBSECTION_METRIC_CHARTS_FAIL:
            return fetchSubsectionMetricChartsFail( state, action );
        default:
            return state;
    }
};

export default reducer;