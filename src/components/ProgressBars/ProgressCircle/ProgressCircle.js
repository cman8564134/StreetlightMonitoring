import React, { Fragment } from 'react';

import {Row} from 'reactstrap';

import {Progress} from 'react-sweet-progress';

import Loader from '../../Loader/BallClipRotateMultiple/BallClipRotateMultiple';

const ProgressCircle = ( props ) => {
    const {
        percent,
        trailColor,
        color,
        subheading,
        value,
        loading
    } = props;

    let progressCircle = <Loader/>;

    if (!loading) {
        progressCircle = (
            <Fragment>
                
                    <div className="progress-circle-wrapper">
                        <Progress
                            type="circle"
                            percent={percent}
                            width="100%"
                            strokeWidth="4"
                            theme={
                                {
                                    active: {
                                        symbol: percent,
                                        trailColor: trailColor,
                                        color: color
                                    }
                                }
                            }
                        />
                    </div>
                    
                    <div className="widget-description">
                        {subheading}
                    </div>
                    <div className="widget-numbers-sm">
                        {value}
                    </div>
                
                {/* <div className="text-center d-block p-3"> */}
                    {/* <Row>
                        <div className="progress-circle-wrapper">
                            <Progress
                                type="circle"
                                percent={percent}
                                width="100%"
                                strokeWidth="4"
                                theme={
                                    {
                                        active: {
                                            symbol: percent,
                                            trailColor: trailColor,
                                            color: color
                                        }
                                    }
                                }
                            />
                        </div>
                    </Row>
                    <Row>
                        <div className="widget-chart-content">
                            <div className="widget-subheading">
                                {subheading}
                            </div>
                            <div className="widget-numbers-sm">
                                {value}
                            </div>
                        </div>
                    </Row> */}
                    
                {/* </div> */}
            </Fragment>
        )
    }

    return (
        <div className="card mb-3 widget-chart">
            {progressCircle}
        </div>
    );
}

export default ProgressCircle;