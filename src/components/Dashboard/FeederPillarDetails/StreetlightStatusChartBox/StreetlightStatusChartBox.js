import React from 'react';

import Loader from '../../../Loader/BallClipRotateMultiple/BallClipRotateMultiple';

import {
    Row, Col,
    Card, 
    ListGroupItem,
    ListGroup,
} from 'reactstrap';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {
    faAngleUp,
    faAngleDown

} from '@fortawesome/free-solid-svg-icons';

import BasicApexChart from '../../../ChartBoxes/ApexChart/BasicApexChart';
import StreetlightStatusPerPhaseBoxes from '../StreetlightStatusPerPhaseBoxes/StreetlightStatusPerPhaseBoxes';

const StreetlightStatusChartBox = ( props ) => {
    const {
        loading,
        chartOptions,
        chartSeries,
        chartType,
        chartHeight,
        chartWidth,
        totalActiveStreetlights,
        totalInactiveStreetlights,
        streetlightStatusByPhase
    } = props;

    let details = <Loader/>

    if(!loading) {
        return (
            <ListGroup flush>
                <ListGroupItem className="p-0">
                    <Row>
                        <Col md="4" className="center-elem">
                            <div className="p-2 center-elem w-100">
                                <BasicApexChart 
                                    options={chartOptions} 
                                    series={chartSeries} 
                                    type={chartType}
                                    width={chartWidth}
                                    height={chartHeight}
                                />
                            </div>
                        </Col>
                        <Col md="8">
                            <div className="widget-chart">
                                <div className="widget-chart-content">
                                    <div className="widget-numbers mt-0 text-success">
                                            {totalActiveStreetlights}
                                        <small className="opacity-5 pl-2">
                                            <FontAwesomeIcon icon={faAngleUp}/>
                                        </small>
                                    </div>
                                    <div className="widget-subheading">
                                        TOTAL ACTIVE STREETLIGHTS
                                    </div>
                                </div>
                            </div>
                            <div className="divider mt-0 mb-0 mr-2"/>
                            <div className="widget-chart">
                                <div className="widget-chart-content">
                                    <div className="widget-numbers mt-0 text-danger">
                                            {totalInactiveStreetlights}
                                        <small className="opacity-5 pl-2">
                                            <FontAwesomeIcon icon={faAngleDown}/>
                                        </small>
                                    </div>
                                    <div className="widget-subheading">
                                        TOTAL INACTIVE STREETLIGHTS
                                    </div>
                                </div>
                            </div>
                            
                            <StreetlightStatusPerPhaseBoxes
                                loading={false}
                                statusByPhase={streetlightStatusByPhase}
                            />
                        </Col>
                    </Row>
                </ListGroupItem>
            </ListGroup>
        )
    }

    return details;
}

export default StreetlightStatusChartBox;