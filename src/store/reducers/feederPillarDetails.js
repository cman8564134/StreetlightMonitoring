import * as actionTypes from '../actions/actionTypes';
import { 
    updateObject,
    baseChartOptions,
    baseChartSeries,
    updateCharts,
    baseRadialBarChartOptions
 } from '../../shared/utility';

 import {darkRYB} from '../../shared/colors';

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
            "amperage": {title: "Amperage (Amp)", chart_options: updateObject(baseChartOptions(), {colors: darkRYB}), chart_series: baseChartSeries(), chart_type: "line"},
            "voltage": {title: "Voltage (V)", chart_options: updateObject(baseChartOptions(), {colors: darkRYB}), chart_series: baseChartSeries(), chart_type: "line"},
            "activePower": {title: "Active Power (W)", chart_options: updateObject(baseChartOptions(), {colors: darkRYB}), chart_series: baseChartSeries(), chart_type: "line"},
            "powerFactor": {title: "Power Factor", chart_options: updateObject(baseChartOptions(), {colors: darkRYB}), chart_series: baseChartSeries(), chart_type: "line"},
            "thdv": {title: "THDV", chart_options: updateObject(baseChartOptions(), {colors: darkRYB}), chart_series: baseChartSeries(), chart_type: "line"},
            "thdc": {title: "THDC", chart_options: updateObject(baseChartOptions(), {colors: darkRYB}), chart_series: baseChartSeries(), chart_type: "line"},
            "thdp": {title: "THDP", chart_options: updateObject(baseChartOptions(), {colors: darkRYB}), chart_series: baseChartSeries(), chart_type: "line"},
            "frequency": {title: "Frequency", chart_options: updateObject(baseChartOptions(), {colors: darkRYB}), chart_series: baseChartSeries(), chart_type: "line"},
        }
    ],
    loadingFeederPillarDetails: false,
    streetlightStatusChartOptions: baseRadialBarChartOptions(),
    streetlightStatusChartSeries: [], 
    streetlightStatusByPhase: [],
    electricityBill: {}

    // costBreakdownFormElementArray:{
    //     dailyElectricityBill: [
    //         {
    //             consumption: {
    //                 elementLabel: 'Consumption (kWh)',
    //                 elementType: 'input',
    //                 elementConfig: {
    //                     type: "number",
    //                     readonly: true
    //                 },
    //                 value: "",
    //                 validation: {
    //                     required: true
    //                 },
    //                 valid: true,
    //                 touched: false,
    //                 errorMessage: ''
    //             },
    //             cost: {
    //                 elementLabel: 'Cost = Consumption * 0.192',
    //                 elementType: 'input',
    //                 elementConfig: {
    //                     type: "number",
    //                     readonly: true
    //                 },
    //                 value: "",
    //                 validation: {
    //                     required: true
    //                 },
    //                 valid: true,
    //                 touched: false,
    //                 errorMessage: ''
    //             }
    //         },
    //         {
    //             icpt: {
    //                 elementLabel: 'Imbalance Cost Pass-Through (ICPT) = Cost * 0.0152',
    //                 elementType: 'input',
    //                 elementConfig: {
    //                     type: "number",
    //                     readonly: true
    //                 },
    //                 value: "",
    //                 validation: {
    //                     required: true
    //                 },
    //                 valid: true,
    //                 touched: false,
    //                 errorMessage: ''
    //             },
    //             current_month_usage: {
    //                 elementLabel: 'Daily Usage = Cost - ICPT',
    //                 elementType: 'input',
    //                 elementConfig: {
    //                     type: "number",
    //                     readonly: true
    //                 },
    //                 value: "",
    //                 validation: {
    //                     required: true
    //                 },
    //                 valid: true,
    //                 touched: false,
    //                 errorMessage: ''
    //             }

    //         },
    //         {
    //             gst: {
    //                 elementLabel: 'GST = Current Month Usage * 6%',
    //                 elementType: 'input',
    //                 elementConfig: {
    //                     type: "number",
    //                     readonly: true
    //                 },
    //                 value: "",
    //                 validation: {
    //                     required: true
    //                 },
    //                 valid: true,
    //                 touched: false,
    //                 errorMessage: ''
    //             },
    //             feed_in_tariff: {
    //                 elementLabel: 'Feed-In Tariff  = Cost * 1.6%',
    //                 elementType: 'input',
    //                 elementConfig: {
    //                     type: "number",
    //                     readonly: true
    //                 },
    //                 value: "",
    //                 validation: {
    //                     required: true
    //                 },
    //                 valid: true,
    //                 touched: false,
    //                 errorMessage: ''
    //             }
    //         }
    //     ],
    // },
    // totalBillAmount: {
    //     dailyElectricityBill: 0
    // }
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
    const feederPillar = action.feederPillar;
    const radialBarChartData = action.radialBarChartData;
    const radialBarFormatter = (w) => {
        return feederPillar.total_streetlights
    };
    const electricityBill = action.electricityBill;

    const updatedRadialTotalOption = updateObject(state.streetlightStatusChartOptions.plotOptions.radialBar.dataLabels.total, {formatter: radialBarFormatter});
    const updatedRadialDataLabels = updateObject(state.streetlightStatusChartOptions.plotOptions.radialBar.dataLabels, {total: updatedRadialTotalOption});
    const updatedRadialRadialBar = updateObject(state.streetlightStatusChartOptions.plotOptions.radialBar, {dataLabels: updatedRadialDataLabels});
    const updatedRadialPlotOptions = updateObject(state.streetlightStatusChartOptions.plotOptions, {radialBar: updatedRadialRadialBar});
    const updatedMetricCharts = updateCharts(state.feederPillarMetricCharts, action.chartsData);
    const updatedStreetlightStatusChartOptions = updateObject(state.streetlightStatusChartOptions, {labels: radialBarChartData.labels, plotOptions: updatedRadialPlotOptions, colors:['#c83953', '#f2b227', '#1d94f5']});

    // UPDATE costBreakdownFormElementArray state
    // let updatedCostBreakdownFormElementArray = state.costBreakdownFormElementArray;
    // let updatedTotalBillAmount = state.totalBillAmount;
    // for (const [formElementArrayId, formElementArray] of Object.entries(state.costBreakdownFormElementArray)) {
    //     let updatedFormElementArray = formElementArray;
    //     formElementArray.forEach((formElementObjects, index, array) => {
    //         let updatedFormElementObjects = formElementObjects;
            
    //         for(const [objectId, property] of Object.entries(formElementObjects)){
    //             const updatedProperty = updateObject(property, {value: electricityBill[objectId]});
    //             updatedFormElementObjects = updateObject(updatedFormElementObjects, {[objectId]: updatedProperty});
    //         }
    //         updatedFormElementArray = updateObject(updatedFormElementArray, {[index]: updatedFormElementObjects});
    //     });
    //     updatedCostBreakdownFormElementArray = updateObject(updatedCostBreakdownFormElementArray, {[formElementArrayId]: Object.values(updatedFormElementArray)});
    //     updatedTotalBillAmount = updateObject(updatedTotalBillAmount, {[formElementArrayId]: electricityBill.total_bill_amount});
    // };

    


    return updateObject(state, {
        loadingFeederPillarDetails: action.loading,
        feederPillar: feederPillar,
        feederPillarMetricCharts: updatedMetricCharts,
        pillarId: action.pillarId,
        streetlightStatusChartOptions: updatedStreetlightStatusChartOptions,
        streetlightStatusChartSeries: radialBarChartData.series,
        streetlightStatusByPhase: action.streetlightStatus,
        electricityBill: electricityBill
        // costBreakdownFormElementArray: updatedCostBreakdownFormElementArray,
        // totalBillAmount: updatedTotalBillAmount
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