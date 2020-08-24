import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const concession = {
    1: {id: 1, concession_name: "ABC Sdn Bhd", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
    2: {id: 2, concession_name: "DEF Sdn Bhd", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
    3: {id: 3, concession_name: "GHI Sdn Bhd", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
    4: {id: 4, concession_name: "JKL Sdn Bhd", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"}
}

const baseChartOptions = () => {
    return {
        chart: {
            height: 350,
            type: 'line',
            stacked: false,
        },
        stroke: {
            curve: 'smooth'
        },
        labels: ["1/7/2020", "2/7/2020", "3/7/2020", "4/7/2020", "5/7/2020", "6/7/2020", "7/7/2020"],
        markers: {
            size: 0
        },
        xaxis: {
            // type:'datetime'
        },
        yaxis: {
            title: {
                text: 'Power Usage',
            },
            min: 0
        },
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter: function (y) {
                    if(typeof y !== "undefined") {
                        return  y.toFixed(2);
                    }
                    return y;
    
                }
            }
        }
    }
}

const baseChartSeries = () => {
    return [{
        name: 'Power Usage',
        type: 'line',
        data: [2000, 2100,2050,1800,2200,2100,2000]
    }]
} 

const initialState = {
    concession: {},
    loadingHighlights: false,
    loadingSectionsTable: false,
    sectionsTableData: [],
    loadingConcessionMetricChart: false,
    concessionMetricCharts:[
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

const fetchConcessionDetailsStart = ( state, action ) => {
    return updateObject(state, {
        loadingHighlights: action.loading
    });
}

const fetchConcessionDetailsSuccess = ( state, action ) => {
    return updateObject(state, {
        concession: concession[action.concession_id],
        loadingHighlights: action.loading
    });
}

const fetchConcessionDetailsFail = ( state, action ) => {
    return updateObject(state, {
        loadingHighlights: action.loading
    });
}


const fetchSectionsByConcessionStart = ( state, action ) => {
    return updateObject(state, {
        loadingSectionsTable: action.loading
    });
}

const fetchSectionsByConcessionSuccess = ( state, action ) => {
    return updateObject(state, {
        loadingSectionsTable: action.loading,
        sectionsTableData: action.sections
        
    });
}

const fetchSectionsByConcessionFail = ( state, action ) => {
    return updateObject(state, {
        loadingSectionsTable: action.loading
    });
}

const fetchConcessionMetricChartsStart = ( state, action ) => {
    return updateObject(state, {
        loadingConcessionMetricChart: action.loading
    });
}

const fetchConcessionMetricChartsSuccess = ( state, action ) => {
    const updatedMetricCharts = updateCharts(state.concessionMetricCharts, action.chartsData);
    return updateObject(state, {
        loadingConcessionMetricChart: action.loading,
        concessionMetricCharts: updatedMetricCharts
        
    });
}

const fetchConcessionMetricChartsFail = ( state, action ) => {
    return updateObject(state, {
        loadingConcessionMetricChart: action.loading
    });
}

const updateCharts = (metricCharts, chartsData) => {
    let updatedMetricChartsAtIndex = metricCharts[0];
    for(let chartKey in metricCharts[0]){
        const chart = chartsData[chartKey];
        const updatedChart = updateChart(metricCharts, chartKey, chart.labels, chart.data, chart.series);
        updatedMetricChartsAtIndex = updateObject(updatedMetricChartsAtIndex, {[chartKey]: updatedChart});
    }

    const updatedMetricCharts = metricCharts.map((item, index) => {
        if(index === 0){
            return updatedMetricChartsAtIndex;
        }

        return item[index];
    })

    return updatedMetricCharts;
}

const updateChart = (metricCharts, chartKey, chartLabels, chartData, chartSeries) => {
    const chartSeriesArray = [];
    
    for(let key in chartData){
        const chartSeriesObject = {
            name: chartSeries[key],
            type: 'line',
            data: chartData[key]
        }
        chartSeriesArray.push(chartSeriesObject);
    }

    const options = baseChartOptions();
    const updatedYAxisTitle = updateObject(options.yaxis.title, {text: metricCharts[0][chartKey].title})
    const updatedYAxis = updateObject(options.yaxis, {title: updatedYAxisTitle})

    const updatedChartOptions = updateObject(options, {labels: chartLabels, yaxis: updatedYAxis});
    const updatedChart = updateObject(metricCharts[0][chartKey], {
        chart_options: updatedChartOptions, 
        chart_series: chartSeriesArray
    });

    return updatedChart;
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_CONCESSION_DETAILS_START:
            return fetchConcessionDetailsStart( state, action );
        case actionTypes.FETCH_CONCESSION_DETAILS_SUCCESS:
            return fetchConcessionDetailsSuccess( state, action );
        case actionTypes.FETCH_CONCESSION_DETAILS_FAIL:
            return fetchConcessionDetailsFail( state, action );
        case actionTypes.FETCH_SECTIONS_BY_CONCESSION_START:
            return fetchSectionsByConcessionStart( state, action );
        case actionTypes.FETCH_SECTIONS_BY_CONCESSION_SUCCESS:
            return fetchSectionsByConcessionSuccess( state, action );
        case actionTypes.FETCH_SECTIONS_BY_CONCESSION_FAIL:
            return fetchSectionsByConcessionFail( state, action );
        case actionTypes.FETCH_CONCESSION_METRIC_CHARTS_START:
            return fetchConcessionMetricChartsStart( state, action );
        case actionTypes.FETCH_CONCESSION_METRIC_CHARTS_SUCCESS:
            return fetchConcessionMetricChartsSuccess( state, action );
        case actionTypes.FETCH_CONCESSION_METRIC_CHARTS_FAIL:
            return fetchConcessionMetricChartsFail( state, action );
        default:
            return state;
    }
};

export default reducer;