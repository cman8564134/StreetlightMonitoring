import React from 'react';

import LiquidFillGauge from 'react-liquid-gauge';

import {color} from 'd3-color';
import {interpolateRgb} from 'd3-interpolate';

const LiquidGauge = ( props ) => {
    const {
        startColor,
        endColor,
        gaugePercentage,
        gaugeValueText,
        percent,
        radius
    } = props;


    
    const interpolate = interpolateRgb(startColor, endColor);
    const fillColor = interpolate(gaugePercentage/ 100);

    const gradientStops = [
        {
            key: '0%',
            stopColor: color(fillColor).darker(0.5).toString(),
            stopOpacity: 1,
            offset: '0%'
        },
        {
            key: '50%',
            stopColor: fillColor,
            stopOpacity: 0.75,
            offset: '50%'
        },
        {
            key: '100%',
            stopColor: color(fillColor).brighter(0.5).toString(),
            stopOpacity: 0.5,
            offset: '100%'
        }
    ];

    return (
        <LiquidFillGauge
            style={{margin: '0 auto'}}
            width={radius}
            height={radius}
            value={gaugePercentage}
            percent={percent}
            textSize={1}
            textOffsetX={0}
            textOffsetY={0}
            textRenderer={(props) => {
                const value = Math.round(props.value);
                const radius = Math.min(props.height / 2, props.width / 2);
                const textPixels = (props.textSize * radius / 2);
                const valueStyle = {
                    fontSize: textPixels
                };
                const percentStyle = {
                    fontSize: textPixels * 0.6
                };

                return (
                    <tspan>
                        <tspan className="value"
                                style={valueStyle}>{gaugeValueText}</tspan>
                        <tspan style={percentStyle}>{props.percent}</tspan>
                    </tspan>
                );
            }}
            riseAnimation
            waveAnimation
            waveFrequency={5}
            waveAmplitude={3}
            gradient
            gradientStops={gradientStops}
            circleStyle={{
                fill: fillColor
            }}
            waveStyle={{
                fill: fillColor
            }}
            textStyle={{
                fill: color('#989fa4').toString(),

            }}
            waveTextStyle={{
                fill: color('#fff').toString(),

            }}
        />
    )
}

export default LiquidGauge;