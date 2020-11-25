import * as actionTypes from '../actions/actionTypes';
import { 
    updateObject, updateChartObject, convertUnixTimestampToLocalTime, 
    formatDateByDateFormat, baseChartOptions, baseChartSeries
 } from '../../shared/utility';

const initialState = {
    concession: {},
    loadingHighlights: false,
    loadingSectionsTable: false,
    sectionsTableData: [],
    loadingWeather: false,
    city: "",
    weatherDate: "",
    weatherTime: "",
    temperature: "",
    weatherId: "",
    weatherDesc: "",
    loadingWeatherForecast: false,
    weatherForecasts: [],
    realTimePowerUsageChartData: {loading: false, chart_options: baseChartOptions(), chart_series: baseChartSeries()},
    dailyPowerUsageChartData: {loading: false, chart_options: baseChartOptions(), chart_series: baseChartSeries()},
    monthlyPowerUsageChartData: {loading: false, chart_options: updateObject(baseChartOptions(), {xaxis: {}}), chart_series: baseChartSeries()},
    realTimeElectricityBillChartData: {loading: false, chart_options: baseChartOptions(), chart_series: baseChartSeries()},
    dailyElectricityBillChartData: {loading: false, chart_options: baseChartOptions(), chart_series: baseChartSeries()},
    monthlyElectricityBillChartData: {loading: false, chart_options: updateObject(baseChartOptions(), {xaxis: {}}), chart_series: baseChartSeries()}
};

const fetchConcessionDetailsStart = ( state, action ) => {
    return updateObject(state, {
        loadingHighlights: action.loading
    });
}

const fetchConcessionDetailsSuccess = ( state, action ) => {
    return updateObject(state, {
        concession: action.concession,
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

const fetchConcessionRealTimePowerUsageChartStart = ( state, action ) => {
    return updateObject(state, {
        realTimePowerUsageChartData: updateObject(state.realTimePowerUsageChartData, {loading: action.loading})
    });
}

const fetchConcessionRealTimePowerUsageChartSuccess = ( state, action ) => {
    const chart = action.chartsData;
    const updatedMetricCharts = updateChartObject(state.realTimePowerUsageChartData, chart.labels, chart.data, chart.series, 'line', 'Power Usage (KWh)');
    return updateObject(state, {
        realTimePowerUsageChartData: updateObject(updatedMetricCharts, {loading: action.loading})
        
    });
}

const fetchConcessionRealTimePowerUsageChartFail = ( state, action ) => {
    return updateObject(state, {
        realTimePowerUsageChartData: updateObject(state.realTimePowerUsageChartData, {loading: action.loading})
    });
}

const fetchConcessionDailyPowerUsageChartStart = ( state, action ) => {
    return updateObject(state, {
        dailyPowerUsageChartData: updateObject(state.dailyPowerUsageChartData, {loading: action.loading})
    });
}

const fetchConcessionDailyPowerUsageChartSuccess = ( state, action ) => {
    const chart = action.chartsData;
    const updatedMetricCharts = updateChartObject(state.dailyPowerUsageChartData, chart.labels, chart.data, chart.series, 'line', 'Power Usage (KWh)');
    
    return updateObject(state, {
        dailyPowerUsageChartData: updateObject(updatedMetricCharts, {loading: action.loading})
    });
}

const fetchConcessionDailyPowerUsageChartFail = ( state, action ) => {
    return updateObject(state, {
        dailyPowerUsageChartData: updateObject(state.dailyPowerUsageChartData, {loading: action.loading})
    });
}

const fetchConcessionMonthlyPowerUsageChartStart = ( state, action ) => {
    return updateObject(state, {
        monthlyPowerUsageChartData: updateObject(state.monthlyPowerUsageChartData, {loading: action.loading})
    });
}

const fetchConcessionMonthlyPowerUsageChartSuccess = ( state, action ) => {
    const chart = action.chartsData;
    const updatedMetricCharts = updateChartObject(state.monthlyPowerUsageChartData, chart.labels, chart.data, chart.series, 'line', 'Power Usage (KWh)');
    return updateObject(state, {
        monthlyPowerUsageChartData: updateObject(updatedMetricCharts, {loading: action.loading})
        
    });
}

const fetchConcessionMonthlyPowerUsageChartFail = ( state, action ) => {
    return updateObject(state, {
        monthlyPowerUsageChartData: updateObject(state.monthlyPowerUsageChartData, {loading: action.loading})
    });
}

const fetchConcessionRealTimeElectricityBillChartStart = ( state, action ) => {
    return updateObject(state, {
        realTimeElectricityBillChartData: updateObject(state.realTimeElectricityBillChartData, {loading: action.loading})
    });
}

const fetchConcessionRealTimeElectricityBillChartSuccess = ( state, action ) => {
    const chart = action.chartsData;
    const updatedMetricCharts = updateChartObject(state.realTimeElectricityBillChartData, chart.labels, chart.data, chart.series, 'line', 'Electricity Bill (RM)');
    return updateObject(state, {
        realTimeElectricityBillChartData: updateObject(updatedMetricCharts, {loading: action.loading})
        
    });
}

const fetchConcessionRealTimeElectricityBillChartFail = ( state, action ) => {
    return updateObject(state, {
        realTimeElectricityBillChartData: updateObject(state.realTimeElectricityBillChartData, {loading: action.loading})
    });
}

const fetchConcessionDailyElectricityBillChartStart = ( state, action ) => {
    return updateObject(state, {
        dailyElectricityBillChartData: updateObject(state.dailyElectricityBillChartData, {loading: action.loading})
    });
}

const fetchConcessionDailyElectricityBillChartSuccess = ( state, action ) => {
    const chart = action.chartsData;
    const updatedMetricCharts = updateChartObject(state.dailyElectricityBillChartData, chart.labels, chart.data, chart.series, 'line', 'Electricity Bill (RM)');
    return updateObject(state, {
        dailyElectricityBillChartData: updateObject(updatedMetricCharts, {loading: action.loading})
        
    });
}

const fetchConcessionDailyElectricityBillChartFail = ( state, action ) => {
    return updateObject(state, {
        dailyElectricityBillChartData: updateObject(state.dailyElectricityBillChartData, {loading: action.loading})
    });
}

const fetchConcessionMonthlyElectricityBillChartStart = ( state, action ) => {
    return updateObject(state, {
        monthlyElectricityBillChartData: updateObject(state.monthlyElectricityBillChartData, {loading: action.loading})
    });
}

const fetchConcessionMonthlyElectricityBillChartSuccess = ( state, action ) => {
    const chart = action.chartsData;
    const updatedMetricCharts = updateChartObject(state.monthlyElectricityBillChartData, chart.labels, chart.data, chart.series, 'line', 'Electricity Bill (RM)');
    return updateObject(state, {
        monthlyElectricityBillChartData: updateObject(updatedMetricCharts, {loading: action.loading})
        
    });
}

const fetchConcessionMonthlyElectricityBillChartFail = ( state, action ) => {
    return updateObject(state, {
        monthlyElectricityBillChartData: updateObject(state.monthlyElectricityBillChartData, {loading: action.loading})
    });
}

const fetchWeatherStart = ( state, action ) => {
    return updateObject(state, {
        loadingWeather: action.loading
    });
}

const fetchWeatherSuccess = ( state, action ) => {
    const localDate = convertUnixTimestampToLocalTime(action.unixTimestamp);

    return updateObject(state, {
        loadingWeather: action.loading,
        city: action.city,
        weatherDate: formatDateByDateFormat(localDate, 'D, d M'),
        weatherTime: formatDateByDateFormat(localDate, 'h:m'),
        temperature: action.temperature,
        weatherId: action.weatherId,
        weatherDesc: (action.weatherDesc).charAt(0).toUpperCase() + (action.weatherDesc).slice(1)
    });
}

const fetchWeatherFail = ( state, action ) => {
    return updateObject(state, {
        loadingWeather: action.loading
    });
}


const fetchWeatherForecastStart = ( state, action ) => {
    return updateObject(state, {
        loadingWeatherForecast: action.loading
    });
}

const fetchWeatherForecastSuccess = ( state, action ) => {
    return updateObject(state, {
        loadingWeatherForecast: action.loading,
        weatherForecasts: action.weatherForecasts
    });
}

const fetchWeatherForecastFail = ( state, action ) => {
    return updateObject(state, {
        loadingWeatherForecast: action.loading
    });
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
        case actionTypes.FETCH_CONCESSION_REAL_TIME_POWER_USAGE_CHART_START:
            return fetchConcessionRealTimePowerUsageChartStart( state, action );
        case actionTypes.FETCH_CONCESSION_REAL_TIME_POWER_USAGE_CHART_SUCCESS:
            return fetchConcessionRealTimePowerUsageChartSuccess( state, action );
        case actionTypes.FETCH_CONCESSION_REAL_TIME_POWER_USAGE_CHART_FAIL:
            return fetchConcessionRealTimePowerUsageChartFail( state, action );
        case actionTypes.FETCH_CONCESSION_DAILY_POWER_USAGE_CHART_START:
            return fetchConcessionDailyPowerUsageChartStart( state, action );
        case actionTypes.FETCH_CONCESSION_DAILY_POWER_USAGE_CHART_SUCCESS:
            return fetchConcessionDailyPowerUsageChartSuccess( state, action );
        case actionTypes.FETCH_CONCESSION_DAILY_POWER_USAGE_CHART_FAIL:
            return fetchConcessionDailyPowerUsageChartFail( state, action );
        case actionTypes.FETCH_CONCESSION_MONTHLY_POWER_USAGE_CHART_START:
            return fetchConcessionMonthlyPowerUsageChartStart( state, action );
        case actionTypes.FETCH_CONCESSION_MONTHLY_POWER_USAGE_CHART_SUCCESS:
            return fetchConcessionMonthlyPowerUsageChartSuccess( state, action );
        case actionTypes.FETCH_CONCESSION_MONTHLY_POWER_USAGE_CHART_FAIL:
            return fetchConcessionMonthlyPowerUsageChartFail( state, action );
        case actionTypes.FETCH_CONCESSION_REAL_TIME_ELECTRICITY_BILL_CHART_START:
            return fetchConcessionRealTimeElectricityBillChartStart( state, action );
        case actionTypes.FETCH_CONCESSION_REAL_TIME_ELECTRICITY_BILL_CHART_SUCCESS:
            return fetchConcessionRealTimeElectricityBillChartSuccess( state, action );
        case actionTypes.FETCH_CONCESSION_REAL_TIME_ELECTRICITY_BILL_CHART_FAIL:
            return fetchConcessionRealTimeElectricityBillChartFail( state, action );
        case actionTypes.FETCH_CONCESSION_DAILY_ELECTRICITY_BILL_CHART_START:
            return fetchConcessionDailyElectricityBillChartStart( state, action );
        case actionTypes.FETCH_CONCESSION_DAILY_ELECTRICITY_BILL_CHART_SUCCESS:
            return fetchConcessionDailyElectricityBillChartSuccess( state, action );
        case actionTypes.FETCH_CONCESSION_DAILY_ELECTRICITY_BILL_CHART_FAIL:
            return fetchConcessionDailyElectricityBillChartFail( state, action );
        case actionTypes.FETCH_CONCESSION_MONTHLY_ELECTRICITY_BILL_CHART_START:
            return fetchConcessionMonthlyElectricityBillChartStart( state, action );
        case actionTypes.FETCH_CONCESSION_MONTHLY_ELECTRICITY_BILL_CHART_SUCCESS:
            return fetchConcessionMonthlyElectricityBillChartSuccess( state, action );
        case actionTypes.FETCH_CONCESSION_MONTHLY_ELECTRICITY_BILL_CHART_FAIL:
            return fetchConcessionMonthlyElectricityBillChartFail( state, action );
            case actionTypes.FETCH_WEATHER_START: 
            return fetchWeatherStart(state, action);
        case actionTypes.FETCH_WEATHER_SUCCESS: 
            return fetchWeatherSuccess(state, action);
        case actionTypes.FETCH_WEATHER_FAIL: 
            return fetchWeatherFail(state, action);
        case actionTypes.FETCH_WEATHER_FORECAST_START: 
            return fetchWeatherForecastStart(state, action);
        case actionTypes.FETCH_WEATHER_FORECAST_SUCCESS: 
            return fetchWeatherForecastSuccess(state, action);
        case actionTypes.FETCH_WEATHER_FORECAST_FAIL: 
            return fetchWeatherForecastFail(state, action);
        default:
            return state;
    }
};

export default reducer;