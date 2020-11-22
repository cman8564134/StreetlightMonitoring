import React, { Fragment } from 'react';

import {Row, CardBody, Card} from 'reactstrap';

import {Progress} from 'react-sweet-progress';

import Loader from '../../../Loader/BallClipRotateMultiple/BallClipRotateMultiple';

const LeftProgressCircle = ( props ) => {
    const {
        percent,
        trailColor,
        color,
        subheading,
        value,
        loading,
        status
    } = props;

    let progressCircle = (
            <Loader/>
    )

    if (!loading) {
        progressCircle = (
            <Fragment>
                <div className="left-progress-circle-wrapper">
                    <Progress
                        type="circle"
                        percent={percent}
                        width="100%"
                        strokeWidth="4"
                        status={status}
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
                <div className="widget-chart-content">
                    <div className="widget-subheading">
                        {subheading}
                    </div>
                    <div className="widget-numbers-sm">
                        {value}
                    </div>
                </div>
            </Fragment>
        )
    }

    return (
        <div className="card mb-3 widget-chart text-left">
            {progressCircle}
        </div>
    );
}

export default LeftProgressCircle;