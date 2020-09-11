import React from 'react';

import {
    Col,
    Row
} from 'reactstrap';

import {convertUnixTimestampToLocalTime, formatDateByDateFormat} from '../../../../shared/utility';

import WeatherForecastBox from '../WeatherForecastBox/WeatherForecastBox';

const WeatherForecastBoxes = ( props ) => {
    const {
        weatherForecasts,
        showOnly
    } = props;

    return (
        <Row>
            {weatherForecasts.map((forecast, index) => {
                if(index < showOnly){
                    const timestamp = convertUnixTimestampToLocalTime(forecast.dt);
                    const time = formatDateByDateFormat(timestamp, "h:m");
                    return (
                        <Col key={index} md="4" lg="4" xl="4">
                            <WeatherForecastBox
                                weatherTime={time}
                                temperature={forecast.main.temp}
                                weatherId={forecast.weather[0].id}
                                weatherDesc={forecast.weather[0].description}
                            />
                        </Col>
                    )
                }else{
                    return null;
                }
            })}
        </Row>
    )
}

export default WeatherForecastBoxes;