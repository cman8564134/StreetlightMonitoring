import React, { Fragment } from 'react';

import LiquidGauge from '../../LiquidGauge/LiquidGauge';

import Loader from '../../../Loader/BallClipRotateMultiple/BallClipRotateMultiple';

const CenterLiquidGaugeCard = ( props ) => {
    const {
        gaugePercentage,
        startColor,
        endColor,
        subheading,
        value,
        loading,
        radius
    } = props;

    let liquidGauge = <Loader/>;

    if (!loading) {
        liquidGauge = (
            <Fragment>
                <div className="center-progress-circle-wrapper">
                    <LiquidGauge
                        startColor={startColor}
                        endColor={endColor}
                        gaugePercentage={gaugePercentage}
                        gaugeValueText={value}
                        percent=""
                        radius={radius}
                    />
                </div>
                
                <div className="widget-description">
                    {subheading}
                </div>
                <div className="widget-numbers-sm">
                    {value}
                </div>
            </Fragment>
        )
    }

    return (
        <div className="card mb-3 widget-chart">
            {liquidGauge}
        </div>
    );
}

export default CenterLiquidGaugeCard;