import React from 'react';

import cx from 'classnames';

const WeatherForecastBox = ( props ) => {
    const {
        weatherTime,
        temperature,
        weatherId,
        weatherDesc
    } = props;

    return (
        <div className="card mb-3 widget-chart">
            <div className="icon-wrapper">
                {/* <div className="weather-icon-wrapper-bg"/> */}
                <i className={cx("wi", "wi-owm-" + weatherId, "text-primary")}/>
            </div>

            <h6 className="text-center">{temperature} {'\u00b0C'}</h6>
            <h6 className="text-center opacity-8">{weatherTime}</h6>
            <h6 className="text-center opacity-8 font-size-xxs">{weatherDesc}</h6>
        </div>
    )
}

export default WeatherForecastBox;