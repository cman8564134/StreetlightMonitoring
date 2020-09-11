import React, { Fragment } from 'react';

import {Card, Row, Col, CardBody} from 'reactstrap';

import {
    ResponsiveContainer
} from 'recharts';

import Chart from 'react-apexcharts'

import Loader from '../../Loader/BallClipRotateMultiple/BallClipRotateMultiple';

const MetricCharts = ( props ) => {
    const {
        loading,
        metricCharts
    } = props;

    return (
        metricCharts.map((charts, metricChartKey) => {
            const chartArray = [];
            for (let chartKey in charts) {
                chartArray.push({
                    id: chartKey,
                    chartData: charts[chartKey]
                });
            }

            return (
                <Row key={metricChartKey}>
                    {chartArray.map((chart, key) => {
                        let chartComponent = (
                                <Card>
                                    <CardBody>
                                        <Loader />
                                    </CardBody>
                                </Card>
                                
                            )

                        if(!loading) {
                            chartComponent = (
                                <ResponsiveContainer height={300}>
                                    <Chart options={chart.chartData.chart_options} series={chart.chartData.chart_series} type="line" width="100%"/>
                                </ResponsiveContainer>
                                
                            )
                        }

                        return (
                            <Col key={key} sm="12" md="6" xl="6">
                                <Card className="mb-3">
                                    {chartComponent}
                                    
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
            )
            
        })
        
        
        
    );
}

export default MetricCharts;
