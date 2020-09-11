import * as actionTypes from './actionTypes';
import axios from '../../axios-backend';
import axiosweather from '../../axios-weather';
import { getConcessionsChartDataStart, getConcessionsChartDataSuccess, getConcessionsChartDataFail } from '../actions/concessions';

export const fetchConcessionDetailsStart = () => {
    return {
        type: actionTypes.FETCH_CONCESSION_DETAILS_START,
        loading: true
    }
}

export const fetchConcessionDetailsSuccess = (concession) => {
    return {
        type: actionTypes.FETCH_CONCESSION_DETAILS_SUCCESS,
        loading: false,
        concession: concession,
    }
}

export const fetchConcessionDetailsFail = (error) => {
    return {
        type: actionTypes.FETCH_CONCESSION_DETAILS_FAIL,
        loading: false,
        error: error
    }
}

export const fetchConcessionDetails =  (params) => {
    return dispatch => {
        if(!params.isRefresh)
            dispatch(fetchConcessionDetailsStart());

        axios.post('/getConcessionByConcessionId', params)
        .then(response => {
            dispatch(fetchConcessionDetailsSuccess(response.data.concession));
        })
        .catch(error => {
            console.log(error);
            dispatch(fetchConcessionDetailsFail(error));
        });
    }
}

export const fetchSectionsByConcessionStart = () => {
    return {
        type: actionTypes.FETCH_SECTIONS_BY_CONCESSION_START,
        loading: true
    }
}

export const fetchSectionsByConcessionSuccess = (sections) => {
    return {
        type: actionTypes.FETCH_SECTIONS_BY_CONCESSION_SUCCESS,
        loading: false,
        sections: sections
    }
}

export const fetchSectionsByConcessionFail = (error) => {
    return {
        type: actionTypes.FETCH_SECTIONS_BY_CONCESSION_FAIL,
        loading: false,
        error: error
    }
}

export const fetchSectionsByConcession =  (params) => {
    return dispatch => {
        dispatch(fetchSectionsByConcessionStart());

        axios.post('/getSectionsMetricsByConcessionId', params)
        .then(response => {
            dispatch(fetchSectionsByConcessionSuccess(response.data.sections));
        })
        .catch(error => {
            console.log(error);
            dispatch(fetchSectionsByConcessionFail(error));
        });        
    }
}

export const fetchConcessionRealTimeChart =  (params) => {
    return dispatch => {

        getConcessionsChartData(dispatch, params);
    }
}

export const getConcessionsChartData = (dispatch, params) => {
    if(!params.isRefresh)
        dispatch(getConcessionsChartDataStart(params.startType));
    
    axios.post('/getConcessionsChartData', params)
        .then(response => {
            dispatch(getConcessionsChartDataSuccess(response.data.chartData[params.chartId], params.successType));
        })
        .catch(error => {
            console.log(error);
            dispatch(getConcessionsChartDataFail(error, params.failType));
        });
}

export const fetchConcessionRealTimeElectricityBillChart =  (params) => {
    return dispatch => {

        getConcessionsElectricityBillChartData(dispatch, params);
    }
}

export const getConcessionsElectricityBillChartData = (dispatch, params) => {
    if(!params.isRefresh)
        dispatch(getConcessionsChartDataStart(params.startType));
    
    axios.post('/getConcessionsElectricityBillChartData', params)
        .then(response => {
            dispatch(getConcessionsChartDataSuccess(response.data.chartData[0][params.chartId], params.successType));
        })
        .catch(error => {
            console.log(error);
            dispatch(getConcessionsChartDataFail(error, params.failType));
        });
}

export const fetchWeatherStart = () => {
    return {
        type: actionTypes.FETCH_WEATHER_START,
        loading: true
    }
}

export const fetchWeatherSuccess = (city, timestamp, temperature, weatherId, weatherDesc) => {
    return {
        type: actionTypes.FETCH_WEATHER_SUCCESS,
        city: city,
        unixTimestamp: timestamp,
        temperature: temperature,
        weatherId: weatherId,
        weatherDesc: weatherDesc,
        loading: false
    }
}

export const fetchWeatherFail = (error) => {
    return {
        type: actionTypes.FETCH_WEATHER_FAIL,
        loading: false
    }
}

export const fetchWeather = () => {
    return dispatch => {
        dispatch(fetchWeatherStart());

        axiosweather.get('/weather')
            .then(response => {
                const data = response.data;
                const city = data.name;
                const unixTimestamp = data.dt;
                const temperature = data.main.temp;
                const weather = data.weather[0];
                const weatherId = weather.id;
                const weatherDesc = weather.description;

                dispatch(fetchWeatherSuccess(city, unixTimestamp, temperature, weatherId, weatherDesc));
                
            })
            .catch(error => {
                dispatch(fetchWeatherFail(error));
            });
    }
    
}


export const fetchWeatherForecastStart = () => {
    return {
        type: actionTypes.FETCH_WEATHER_FORECAST_START,
        loading: true
    }
}

export const fetchWeatherForecastSuccess = (weatherForecasts) => {
    return {
        type: actionTypes.FETCH_WEATHER_FORECAST_SUCCESS,
        weatherForecasts: weatherForecasts,
        loading: false
    }
}

export const fetchWeatherForecastFail = (error) => {
    return {
        type: actionTypes.FETCH_WEATHER_FORECAST_FAIL,
        loading: false
    }
}

export const fetchWeatherForecast = () => {
    return dispatch => {
        dispatch(fetchWeatherForecastStart());

        axiosweather.get('/forecast')
            .then(response => {
                const weatherForecasts = response.data.list;

                dispatch(fetchWeatherForecastSuccess(weatherForecasts));
                
            })
            .catch(error => {
                dispatch(fetchWeatherForecastFail(error));
            });
    }
    
}

