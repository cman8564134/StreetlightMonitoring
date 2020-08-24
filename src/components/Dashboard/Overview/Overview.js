import React, { Fragment } from 'react';

import HighlightsBox from '../HighlightsBox/HighlightsBox';
import MetricCharts from '../MetricCharts/MetricCharts';


const Overview = ( props ) => {
    const {
        loadingHighlights,
        highlightsHeaders,
        values,
        metricCharts,
        loadingMetricCharts
    } = props;

    return (
        <Fragment>
            <HighlightsBox
                highlightsHeaders={highlightsHeaders}
                values={values}
                loading={loadingHighlights}
            />

            <MetricCharts 
                metricCharts={metricCharts}
                loading={loadingMetricCharts}
            />
        </Fragment>
        
    );
}

export default Overview;