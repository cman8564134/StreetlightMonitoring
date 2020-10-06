import * as actionTypes from '../actions/actionTypes';
import { 
    updateObject,
    baseChartOptions,
    baseChartSeries,
    updateCharts
 } from '../../shared/utility';

const initialState = {
    section: {},
    loadingHighlights: false,
    loadingSubsectionsTable: false,
    subsectionsTableData: [],
    loadingSectionMetricChart: false,
    sectionMetricCharts:[
        {
            "powerUsage": {title: "Power Usage (KWh)", chart_options: baseChartOptions(), chart_series: baseChartSeries(), chart_type: "line"},
            "electricityBill": {title: "Electricity Bill (RM)", chart_options: baseChartOptions(), chart_series: baseChartSeries(), chart_type: "line"},
            "carbonFootprint": {title: "Carbon Footprint (KG)", chart_options: baseChartOptions(), chart_series: baseChartSeries(), chart_type: "line"},
            "energySavings": {title: "Energy Savings (KWh)", chart_options: baseChartOptions(), chart_series: baseChartSeries(), chart_type: "line"},
            "amperage": {title: "Amperage (Amp)", chart_options: updateObject(baseChartOptions(), {colors:['#fb0021', '#feb019', '#008ffb']}), chart_series: baseChartSeries(), chart_type: "line"},
            "voltage": {title: "Voltage (V)", chart_options: updateObject(baseChartOptions(), {colors:['#fb0021', '#feb019', '#008ffb']}), chart_series: baseChartSeries(), chart_type: "line"}
        }
    ],
    loadingSectionDetails: false 
        
};

const fetchSectionBySectionIdStart = ( state, action ) => {
    return updateObject(state, {
        loadingHighlights: action.loading
    });
}

const fetchSectionBySectionIdSuccess = ( state, action ) => {
    return updateObject(state, {
        section: action.section,
        loadingHighlights: action.loading
    });
}

const fetchSectionBySectionIdFail = ( state, action ) => {
    return updateObject(state, {
        loadingHighlights: action.loading
    });
}


const fetchSubsectionsBySectionStart = ( state, action ) => {
    return updateObject(state, {
        loadingSubsectionsTable: action.loading
    });
}

const fetchSubsectionsBySectionSuccess = ( state, action ) => {
    return updateObject(state, {
        loadingSubsectionsTable: action.loading,
        subsectionsTableData: action.subsections
        
    });
}

const fetchSubsectionsBySectionFail = ( state, action ) => {
    return updateObject(state, {
        loadingSubsectionsTable: action.loading
    });
}

const fetchSectionMetricChartsStart = ( state, action ) => {
    return updateObject(state, {
        loadingSectionMetricChart: action.loading
    });
}

const fetchSectionMetricChartsSuccess = ( state, action ) => {
    const updatedMetricCharts = updateCharts(state.sectionMetricCharts, action.chartsData);
    return updateObject(state, {
        loadingSectionMetricChart: action.loading,
        sectionMetricCharts: updatedMetricCharts
        
    });
}

const fetchSectionMetricChartsFail = ( state, action ) => {
    return updateObject(state, {
        loadingSectionMetricChart: action.loading
    });
}

const fetchSectionDetailsStart = ( state, action ) => {
    return updateObject(state, {
        loadingSectionDetails: action.loading
    });
}

const fetchSectionDetailsSuccess = ( state, action ) => {
    const updatedMetricCharts = updateCharts(state.sectionMetricCharts, action.chartsData);
    return updateObject(state, {
        section: action.section,
        sectionMetricCharts: updatedMetricCharts,
        loadingSectionDetails: action.loading
    });
}

const fetchSectionDetailsFail = ( state, action ) => {
    return updateObject(state, {
        loadingSectionDetails: action.loading
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_SECTION_BY_SECTION_ID_START:
            return fetchSectionBySectionIdStart( state, action );
        case actionTypes.FETCH_SECTION_BY_SECTION_ID_SUCCESS:
            return fetchSectionBySectionIdSuccess( state, action );
        case actionTypes.FETCH_SECTION_BY_SECTION_ID_FAIL:
            return fetchSectionBySectionIdFail( state, action );
        case actionTypes.FETCH_SECTION_DETAILS_START:
            return fetchSectionDetailsStart( state, action );
        case actionTypes.FETCH_SECTION_DETAILS_SUCCESS:
            return fetchSectionDetailsSuccess( state, action );
        case actionTypes.FETCH_SECTION_DETAILS_FAIL:
            return fetchSectionDetailsFail( state, action );
        case actionTypes.FETCH_SUBSECTIONS_BY_SECTION_START:
            return fetchSubsectionsBySectionStart( state, action );
        case actionTypes.FETCH_SUBSECTIONS_BY_SECTION_SUCCESS:
            return fetchSubsectionsBySectionSuccess( state, action );
        case actionTypes.FETCH_SUBSECTIONS_BY_SECTION_FAIL:
            return fetchSubsectionsBySectionFail( state, action );
        case actionTypes.FETCH_SECTION_METRIC_CHARTS_START:
            return fetchSectionMetricChartsStart( state, action );
        case actionTypes.FETCH_SECTION_METRIC_CHARTS_SUCCESS:
            return fetchSectionMetricChartsSuccess( state, action );
        case actionTypes.FETCH_SECTION_METRIC_CHARTS_FAIL:
            return fetchSectionMetricChartsFail( state, action );
        default:
            return state;
    }
};

export default reducer;