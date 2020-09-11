import React from 'react';

import Chart from 'react-apexcharts';

import Loader from '../../Loader/BallClipRotateMultiple/BallClipRotateMultiple';

const BasicApexChart = ( props ) => {
    const {
        loading,
        options,
        series,
        type,
        width,
        height
    } = props;

    let chart = <Loader />

    if(!loading) {
        chart = (
            <Chart 
                options={options} 
                series={series} 
                type={type}
                width={width}
                height={height}
            />
        )
    }

    return chart;
}

export default BasicApexChart;