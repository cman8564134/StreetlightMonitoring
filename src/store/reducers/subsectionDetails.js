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
    feederPillarsTableData: [],
    loadingSubsectionMetricChart: false,
    subsectionMetricCharts:[
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


const fetchFeederPillarsBySubsectionStart = ( state, action ) => {
    return updateObject(state, {
        loadingFeederPillarTable: action.loading
    });
}

const fetchFeederPillarsBySubsectionSuccess = ( state, action ) => {
    return updateObject(state, {
        loadingFeederPillarTable: action.loading,
        feederPillarsTableData: action.feederPillars
        
    });
}

const fetchFeederPillarsBySubsectionFail = ( state, action ) => {
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
        case actionTypes.FETCH_FEEDER_PILLARS_BY_SUBSECTION_START:
            return fetchFeederPillarsBySubsectionStart( state, action );
        case actionTypes.FETCH_FEEDER_PILLARS_BY_SUBSECTION_SUCCESS:
            return fetchFeederPillarsBySubsectionSuccess( state, action );
        case actionTypes.FETCH_FEEDER_PILLARS_BY_SUBSECTION_FAIL:
            return fetchFeederPillarsBySubsectionFail( state, action );
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