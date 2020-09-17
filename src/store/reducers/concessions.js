import * as actionTypes from '../actions/actionTypes';
import { 
    updateObject, 
    baseChartOptions, 
    baseChartSeries, 
    updateCharts,
    generateChartObject
} from '../../shared/utility';

const initialState = {
    loadingConcessionsTable: false,
    concessions: [],
    loadingElectricityBillChart: false, 
    concessionsChart:{},
    loadingSummaryHighlights: false,
    concessionsSummary: {},
    loadingPowerQualityChart: false,
    summaryChart:[
        {
            "power_usage": {title: "Power Usage", chart_options: baseChartOptions(), chart_series: baseChartSeries(), chart_type: "bar"}
        }
    ] 
};

const fetchConcessionsStart = ( state, action ) => {
    return updateObject(state, {
        loadingConcessionsTable: action.loading
    });
}

const fetchConcessionsSuccess = ( state, action ) => {
    const dummyConcessions = [{
        "concession_id": 1,
        "concession_name": "DEF SDN BHD",
        "location": "SHAH ALAM",
        "thdc1": "41.77",
        "total_feeder_pillar": 1,
        "total_active_feeder_pillar": 1,
        "id": 1,
        "power_usage": "41.77",
        "carbon_footprint": "2172.04",
        "electricity_bill": "1378.41",
        "uptime_percentage": "100",
        "uptime_percentage_text": "1/1 (100%)",
        "energy_savings": "417.70"
    },
    {
        "concession_id": 1,
        "concession_name": "GHI SDN BHD",
        "location": "SHAH ALAM",
        "thdc1": "41.77",
        "total_feeder_pillar": 1,
        "total_active_feeder_pillar": 1,
        "id": 1,
        "power_usage": "41.77",
        "carbon_footprint": "2172.04",
        "electricity_bill": "1378.41",
        "uptime_percentage": "100",
        "uptime_percentage_text": "1/1 (100%)",
        "energy_savings": "417.70"
    },
    {
        "concession_id": 1,
        "concession_name": "JKL SDN BHD",
        "location": "SHAH ALAM",
        "thdc1": "41.77",
        "total_feeder_pillar": 1,
        "total_active_feeder_pillar": 1,
        "id": 1,
        "power_usage": "41.77",
        "carbon_footprint": "2172.04",
        "electricity_bill": "1378.41",
        "uptime_percentage": "100",
        "uptime_percentage_text": "1/1 (100%)",
        "energy_savings": "417.70"
    }];

    const updatedSummary = action.concessions.concat(dummyConcessions);
    return updateObject(state, {
        // concessions: action.concessions,
        concessions: updatedSummary,
        loadingConcessionsTable: action.loading
    });
}

const fetchConcessionsFail = ( state, action ) => {
    return updateObject(state, {
        loadingConcessionsTable: action.loading
    });
}

const fetchConcessionsSummaryStart = ( state, action ) => {
    return updateObject(state, {
        loadingSummaryHighlights: action.loading
    });
}

const fetchConcessionsSummarySuccess = ( state, action ) => {
    if(action.summary.created_at != null){
        return updateObject(state, {
            concessionsSummary: action.summary,
            loadingSummaryHighlights: action.loading
        });
    }
    
    return state;
}

const fetchConcessionsSummaryFail = ( state, action ) => {
    return updateObject(state, {
        loadingHighlights: action.loading
    });
}

const fetchConcessionsPowerQualitySummaryChartStart = ( state, action ) => {
    return updateObject(state, {
        loadingPowerQualityChart: action.loading
    });
}

const fetchConcessionsPowerQualitySummaryChartSuccess = ( state, action ) => {
    const updatedChart = updateCharts(state.summaryChart, action.chartsData);
    return updateObject(state, {
        loadingPowerQualityChart: action.loading,
        summaryChart: updatedChart
    });
}

const fetchConcessionsPowerQualitySummaryChartFail = ( state, action ) => {
    return updateObject(state, {
        loadingPowerQualityChart: action.loading
    });
}

const fetchConcessionsWeeklyElectricityBillChartStart = ( state, action ) => {
    return updateObject(state, {
        loadingElectricityBillChart: action.loading
    });
}

const fetchConcessionsWeeklyElectricityBillChartSuccess = ( state, action ) => {
    const concessionsChart = generateChartObject(action.chartData, 'Electricity Bill', 'line');

    return updateObject(state, {
        loadingElectricityBillChart: action.loading,
        concessionsChart: concessionsChart
        
    });
}

const fetchConcessionsWeeklyElectricityBillChartFail = ( state, action ) => {
    return updateObject(state, {
        loadingElectricityBillChart: action.loading
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_CONCESSIONS_START:
            return fetchConcessionsStart( state, action );
        case actionTypes.FETCH_CONCESSIONS_SUCCESS:
            return fetchConcessionsSuccess( state, action );
        case actionTypes.FETCH_CONCESSIONS_FAIL:
            return fetchConcessionsFail( state, action );
        case actionTypes.FETCH_CONCESSIONS_SUMMARY_START:
            return fetchConcessionsSummaryStart( state, action );
        case actionTypes.FETCH_CONCESSIONS_SUMMARY_SUCCESS:
            return fetchConcessionsSummarySuccess( state, action );
        case actionTypes.FETCH_CONCESSIONS_SUMMARY_FAIL:
            return fetchConcessionsSummaryFail( state, action );
        case actionTypes.FETCH_CONCESSIONS_POWER_QUALITY_SUMMARY_CHART_START:
            return fetchConcessionsPowerQualitySummaryChartStart( state, action );
        case actionTypes.FETCH_CONCESSIONS_POWER_QUALITY_SUMMARY_CHART_SUCCESS:
            return fetchConcessionsPowerQualitySummaryChartSuccess( state, action );
        case actionTypes.FETCH_CONCESSIONS_POWER_QUALITY_SUMMARY_CHART_FAIL:
            return fetchConcessionsPowerQualitySummaryChartFail( state, action );
        case actionTypes.FETCH_CONCESSIONS_WEEKLY_ELECTRICITY_BILL_CHART_START:
            return fetchConcessionsWeeklyElectricityBillChartStart( state, action );
        case actionTypes.FETCH_CONCESSIONS_WEEKLY_ELECTRICITY_BILL_CHART_SUCCESS:
            return fetchConcessionsWeeklyElectricityBillChartSuccess( state, action );
        case actionTypes.FETCH_CONCESSIONS_WEEKLY_ELECTRICITY_BILL_CHART_FAIL:
            return fetchConcessionsWeeklyElectricityBillChartFail( state, action );
        default:
            return state;
    }
};

export default reducer;