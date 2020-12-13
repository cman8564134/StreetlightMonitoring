import React, { Fragment, useEffect } from "react";

import Layout from '../../hoc/Layout/Layout';
import Loader from 'react-loaders'

import * as actions from '../../store/actions/index';
import { connect } from "react-redux";
import { Card, CardHeader, Col } from "reactstrap";
import BasicApexChart from "../../components/ChartBoxes/ApexChart/BasicApexChart";

const Analytics = ( props ) => {

    const {
        onFetchImbalanceAmpereChartData,
        imbalanceAmpereChartData
    } = props;

    useEffect(() => {
        onFetchImbalanceAmpereChartData();
    }, [
        onFetchImbalanceAmpereChartData
    ]);

    return (
        <Fragment>
            <Layout {...props}>
                <Col sm="12" md="12" xl="12">
                    <Card className="mb-3">
                        <CardHeader className="card-header-tab">
                            <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                                <i className="header-icon lnr-warning icon-gradient bg-warm-flame"> </i>
                                Imbalance Ampere
                            </div>
                        </CardHeader>
                        <div className="p-2 center-elem w-100">
                            <BasicApexChart 
                                options={imbalanceAmpereChartData.chart_options}
                                series={imbalanceAmpereChartData.chart_series}
                                type="polarArea"
                                width="100%"
                                height={300}
                            />
                            <div className="widget-subheading text-secondary text-center">
                                *Kindly check device Feeder Pillar 1 as imbalance ampere is detected.
                            </div>
                        </div>
                    </Card>
                </Col>
                {/* <Card> */}
                    <Col sm="12" md="12" xl="12">
                        <h1 className="mt-5">
                            <div className="widget-subheading text-secondary text-center">
                                Machine Learning In Progress...
                                
                            </div>
                        </h1>
                    </Col>
                {/* </Card> */}
                
                {/* <Loader type="ball-clip-rotate-multiple"/> */}
                
            </Layout>
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        imbalanceAmpereChartData: state.Analytics.imbalanceAmpereChartData,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchImbalanceAmpereChartData: () => dispatch(actions.fetchImbalanceAmpereChartData()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Analytics);