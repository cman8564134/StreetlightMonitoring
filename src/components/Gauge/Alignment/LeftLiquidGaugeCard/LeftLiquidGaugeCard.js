import React, { Fragment } from 'react';

import {Row} from 'reactstrap';

import LiquidGauge from '../../LiquidGauge/LiquidGauge'

import Loader from '../../../Loader/BallClipRotateMultiple/BallClipRotateMultiple';

const LeftLiquidGaugeCard = ( props ) => {
    const {
        gaugePercentage,
        startColor,
        endColor,
        subheading,
        value,
        loading,
        radius,
        prefix,
        suffix
    } = props;

    let liquidGauge = <Loader/>;

    if (!loading) {
        liquidGauge = (
            <Fragment>
                <div className="left-progress-circle-wrapper">
                    <LiquidGauge
                        startColor={startColor}
                        endColor={endColor}
                        gaugePercentage={gaugePercentage}
                        gaugeValueText={value}
                        percent=""
                        radius={radius}
                    />
                </div>
            
                <div className="widget-chart-content">
                    <div className="widget-subheading">
                        {subheading}
                    </div>
                    <div className="widget-numbers-sm">
                        {(prefix ? prefix  + ' ': '')  + value + (suffix ? ' ' + suffix : '')}
                    </div>
                </div>
            </Fragment>
        )
    }

    return (
        <div className="card mb-3 widget-chart text-left">
            {liquidGauge}
        </div>
    );
}

export default LeftLiquidGaugeCard;