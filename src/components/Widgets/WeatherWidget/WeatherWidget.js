import React from 'react';

import {
    Card,
    Row,
    Col
} from 'reactstrap';

import cx from 'classnames';

import klCityView from '../../../assets/images/backgrounds/kuala_lumpur_city_view.jpg';

const WeatherWidget = ( props ) => {
    const {
        city,
        weatherDate,
        weatherTime,
        temperature,
        weatherId,
        weatherDesc
    } = props;

    return (
        <Card className="card-shadow-primary profile-responsive card-border mb-3">
            <div className="dropdown-menu-header">
                <div className="dropdown-menu-header-inner bg-focus">
                    <div className="menu-header-image opacity-3"
                            style={{
                                backgroundImage: 'url(' + klCityView + ')'
                            }}
                    />
                        <Row>
                            <Col md="12" lg="12" xl="12">
                                <Row>
                                    <Col md="6" lg="6" xl="6">
                                        <h4>{city}</h4>
                                        <h5 className="menu-header-subtitle">{weatherTime}</h5>
                                        <h6 className="menu-header-subtitle">{weatherDate}</h6>
                                    </Col>
                                    <Col md="6" lg="6" xl="6">
                                        <h3 className="text-right">{temperature} {'\u00b0C'} 
                                            <span><h5 >{weatherDesc}</h5></span>
                                        </h3>
                                        
                                        <div className="text-left"> 
                                            <div className="weather-icon-wrapper">
                                                <i className={cx("wi", "wi-owm-" + weatherId, "text-white")}/>        
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                </div>
            </div>
        </Card>
    )
}

export default WeatherWidget;