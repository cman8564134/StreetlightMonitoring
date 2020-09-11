import React, { Fragment } from 'react';

import {
    Card,
    CardBody,
    CardHeader
} from 'reactstrap';

import PerfectScrollbar from 'react-perfect-scrollbar';

import headerBg from '../../../assets/images/backgrounds/kuala_lumpur_city_view.jpg';
import LiquidGauge from '../../Gauge/LiquidGauge/LiquidGauge';
import ProgressBar from '../../Progress/ProgressBar/ProgressBar';
import HighlightsBox from '../../Dashboard/HighlightsBox/HighlightsBox';
import Loader from '../../Loader/BallClipRotateMultiple/BallClipRotateMultiple';
import MetricCharts from '../../Dashboard/MetricCharts/MetricCharts';

const FeederPillarDetails = ( props ) => {
    const {
        loading,
        feederPillar,
        metricCharts,
        loadingMetricCharts
    } = props;


    const {
        pillar_id,
        status,
        created_at,
        total_yield,
        subsection_total_yield,
        feeder_pillar_total_yield_percentage
    } = feederPillar;

    const progressBarSubLabel = feeder_pillar_total_yield_percentage + "% (" + total_yield + "/" + subsection_total_yield + ")"
    
    const highlightsHeaders = [
        {header: "Active Power L1", iconBgClassName: "icon-wrapper-bg opacity-8 bg-info", iconClassName: "pe-7s-power text-dark opacity-8" , accessor: "active_power_l1"},
        {header: "Active Power L2", iconBgClassName: "icon-wrapper-bg opacity-6 bg-info", iconClassName: "pe-7s-power text-dark opacity-8", accessor: "active_power_l2"},
        {header: "Active Power L3", iconBgClassName: "icon-wrapper-bg opacity-4 bg-info", iconClassName: "pe-7s-power text-dark opacity-8", accessor: "active_power_l3"},
        {header: "Voltage L1", iconBgClassName: "icon-wrapper-bg opacity-8 bg-primary", iconClassName: "pe-7s-plug text-dark opacity-8", accessor: "voltage_l1_n"},
        {header: "Voltage L2", iconBgClassName: "icon-wrapper-bg opacity-6 bg-primary", iconClassName: "pe-7s-plug text-dark opacity-8", accessor: "voltage_l2_n"},
        {header: "Voltage L3", iconBgClassName: "icon-wrapper-bg opacity-4 bg-primary", iconClassName: "pe-7s-plug text-dark opacity-8", accessor: "voltage_l3_n"},
        {header: "Current P1", iconBgClassName: "icon-wrapper-bg opacity-8 bg-danger", iconClassName: "pe-7s-gleam text-dark opacity-8", accessor: "current_p1"},
        {header: "Current P2", iconBgClassName: "icon-wrapper-bg opacity-6 bg-danger", iconClassName: "pe-7s-gleam text-dark opacity-8", accessor: "current_p2"},
        {header: "Current P3", iconBgClassName: "icon-wrapper-bg opacity-4 bg-danger", iconClassName: "pe-7s-gleam text-dark opacity-8", accessor: "current_p3"},
        {header: "Power Factor P1", iconBgClassName: "icon-wrapper-bg opacity-8 bg-warning", iconClassName: "pe-7s-power text-dark opacity-8", accessor: "power_factor_p1"},
        {header: "Power Factor P2", iconBgClassName: "icon-wrapper-bg opacity-6 bg-warning", iconClassName: "pe-7s-power text-dark opacity-8", accessor: "power_factor_p2"},
        {header: "Power Factor P3", iconBgClassName: "icon-wrapper-bg opacity-4 bg-warning", iconClassName: "pe-7s-power text-dark opacity-8", accessor: "power_factor_p3"},
        {header: "THDV1", iconBgClassName: "icon-wrapper-bg opacity-8 bg-success", iconClassName: "pe-7s-plug text-dark opacity-8", accessor: "thdv1"},
        {header: "THDV2", iconBgClassName: "icon-wrapper-bg opacity-6 bg-success", iconClassName: "pe-7s-plug text-dark opacity-8", accessor: "thdv2"},
        {header: "THDV3", iconBgClassName: "icon-wrapper-bg opacity-4 bg-success", iconClassName: "pe-7s-plug text-dark opacity-8", accessor: "thdv3"},
        {header: "THDC1", iconBgClassName: "icon-wrapper-bg opacity-8 bg-alternate", iconClassName: "pe-7s-gleam text-dark opacity-8", accessor: "thdc1"},
        {header: "THDC2", iconBgClassName: "icon-wrapper-bg opacity-6 bg-alternate", iconClassName: "pe-7s-gleam text-dark opacity-8", accessor: "thdc2"},
        {header: "THDC3", iconBgClassName: "icon-wrapper-bg opacity-4 bg-alternate", iconClassName: "pe-7s-gleam text-dark opacity-8", accessor: "thdc3"},
        {header: "THDP1", iconBgClassName: "icon-wrapper-bg opacity-8 bg-dark-orange", iconClassName: "pe-7s-power text-dark opacity-8", accessor: "thdp1"},
        {header: "THDP2", iconBgClassName: "icon-wrapper-bg opacity-6 bg-dark-orange", iconClassName: "pe-7s-power text-dark opacity-8", accessor: "thdp2"},
        {header: "THDP3", iconBgClassName: "icon-wrapper-bg opacity-4 bg-dark-orange", iconClassName: "pe-7s-power text-dark opacity-8", accessor: "thdp3"},
        {header: "Frequency", iconBgClassName: "icon-wrapper-bg opacity-4 bg-warning", iconClassName: "pe-7s-graph1 text-dark opacity-8", accessor: "frequency"},
    ]

    let siteStatusClassNames = "badge badge-success";

    if(status === "INACTIVE"){
        siteStatusClassNames = "badge badge-danger";
    }

    const radius = 107;
    const startColor = '#8176c3'; // cornflowerblue
    const endColor = '#8176c3'; // crimson

    let details = <Loader/>

    if(!loading) {
        return (
            <Card className="card-shadow-primary profile-responsive card-border">
                <div className="dropdown-menu-header">
                    <div className="dropdown-menu-header-inner bg-focus">
                        <div className="menu-header-image opacity-3"
                                style={{
                                    backgroundImage: 'url(' + headerBg + ')'
                                }}
                        />

                        <div className="menu-header-content btn-pane-right">
                            <div>
                                <h5 className="menu-header-title">{pillar_id}</h5>
                                <h6 className="menu-header-subtitle"><span className={siteStatusClassNames}>{status}</span></h6>
                            </div>
                        </div>
                    </div>
                </div>

                <CardHeader className="card-header-tab">
                    <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                        <i className="header-icon lnr-hourglass icon-gradient bg-night-fade"> </i>
                        LAST UPDATE AT: {created_at}
                    </div>
                </CardHeader>

                <CardBody>
                    <div className="scroll-area-xl">
                        <PerfectScrollbar>
                            <div className="widget-content">
                                <div className="text-center">
                                    <h5 className="widget-heading opacity-4">
                                        Total Yield
                                    </h5>
                                    <h5>
                                        <LiquidGauge
                                            startColor={startColor}
                                            endColor={endColor}
                                            gaugePercentage={50}
                                            gaugeValueText={total_yield}
                                            percent=""
                                            radius={radius}
                                        />
                                    </h5>
                                    
                                    
                                    <ProgressBar
                                        progressValue={feeder_pillar_total_yield_percentage}
                                        subLabelLeft="Total Yield"
                                        subLabelRight={progressBarSubLabel}
                                    />
                                    
                                </div>

                                <div className="mt-3">
                                    <HighlightsBox
                                        highlightsHeaders={highlightsHeaders}
                                        values={feederPillar}
                                        loading={false}
                                    />

                                    <MetricCharts 
                                        metricCharts={metricCharts}
                                        loading={loadingMetricCharts}
                                    />
                                </div>
                            </div>
                            
                        </PerfectScrollbar>
                    </div>
                    
                </CardBody>
            </Card>
        )
    }

    return details;
}

export default FeederPillarDetails;