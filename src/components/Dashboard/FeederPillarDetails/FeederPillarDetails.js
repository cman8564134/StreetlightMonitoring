import React, { Fragment, useState } from 'react';

import {
    Card,
    CardBody,
    CardHeader,
    Col
} from 'reactstrap';

import PerfectScrollbar from 'react-perfect-scrollbar';

import headerBg from '../../../assets/images/backgrounds/kuala_lumpur_city_view.jpg';
import LiquidGauge from '../../Gauge/LiquidGauge/LiquidGauge';
import ProgressBar from '../../Progress/ProgressBar/ProgressBar';
import HighlightsBox from '../../Dashboard/HighlightsBox/HighlightsBox';
import Loader from '../../Loader/BallClipRotateMultiple/BallClipRotateMultiple';
import MetricCharts from '../../Dashboard/MetricCharts/MetricCharts';
import StreetlightStatusChartBox from './StreetlightStatusChartBox/StreetlightStatusChartBox';
import ElectricityCostBreakdownAccordion from '../../Accordions/ElectricityCostBreakdownAccordion/ElectricityCostBreakdownAccordion';
import { updateObject } from '../../../shared/utility';

const FeederPillarDetails = ( props ) => {
    const {
        loading,
        feederPillar,
        metricCharts,
        loadingMetricCharts,
        streetlightStatusChartOptions,
        streetlightStatusChartSeries,
        streetlightStatusByPhase,
        electricityBill
    } = props;


    const {
        pillar_id,
        created_at,
        total_yield,
        road_total_yield,
        feeder_pillar_total_yield_percentage,
        door_status,
        total_active_streetlights,
        total_streetlights,
        total_inactive_streetlights
    } = feederPillar;

    const progressBarSubLabel = feeder_pillar_total_yield_percentage + "% (" + total_yield + "/" + road_total_yield + ")"
    
    const highlightsHeaders = [
        {header: "Active Power R", iconBgClassName: "icon-wrapper-bg opacity-6 bg-danger", iconClassName: "pe-7s-power text-dark opacity-8" , accessor: "active_power_l1", prefix: "", suffix: " W"},
        {header: "Active Power Y", iconBgClassName: "icon-wrapper-bg opacity-6 bg-warning", iconClassName: "pe-7s-power text-dark opacity-8", accessor: "active_power_l2", prefix: "", suffix: " W"},
        {header: "Active Power B", iconBgClassName: "icon-wrapper-bg opacity-4 bg-info", iconClassName: "pe-7s-power text-dark opacity-8", accessor: "active_power_l3", prefix: "", suffix: " W"},
        {header: "Voltage R", iconBgClassName: "icon-wrapper-bg opacity-6 bg-danger", iconClassName: "pe-7s-plug text-dark opacity-8", accessor: "voltage_l1_n", prefix: "", suffix: " V"},
        {header: "Voltage Y", iconBgClassName: "icon-wrapper-bg opacity-6 bg-warning", iconClassName: "pe-7s-plug text-dark opacity-8", accessor: "voltage_l2_n", prefix: "", suffix: " V"},
        {header: "Voltage B", iconBgClassName: "icon-wrapper-bg opacity-4 bg-info", iconClassName: "pe-7s-plug text-dark opacity-8", accessor: "voltage_l3_n", prefix: "", suffix: " V"},
        {header: "Current R", iconBgClassName: "icon-wrapper-bg opacity-6 bg-danger", iconClassName: "pe-7s-gleam text-dark opacity-8", accessor: "current_p1", prefix: "", suffix: " Amp"},
        {header: "Current Y", iconBgClassName: "icon-wrapper-bg opacity-6 bg-warning", iconClassName: "pe-7s-gleam text-dark opacity-8", accessor: "current_p2", prefix: "", suffix: " Amp"},
        {header: "Current B", iconBgClassName: "icon-wrapper-bg opacity-4 bg-info", iconClassName: "pe-7s-gleam text-dark opacity-8", accessor: "current_p3", prefix: "", suffix: " Amp"},
        {header: "Power Factor R", iconBgClassName: "icon-wrapper-bg opacity-6 bg-danger", iconClassName: "pe-7s-power text-dark opacity-8", accessor: "power_factor_p1", prefix: "", suffix: ""},
        {header: "Power Factor Y", iconBgClassName: "icon-wrapper-bg opacity-6 bg-warning", iconClassName: "pe-7s-power text-dark opacity-8", accessor: "power_factor_p2", prefix: "", suffix: ""},
        {header: "Power Factor B", iconBgClassName: "icon-wrapper-bg opacity-4 bg-info", iconClassName: "pe-7s-power text-dark opacity-8", accessor: "power_factor_p3", prefix: "", suffix: ""},
        {header: "THDVR", iconBgClassName: "icon-wrapper-bg opacity-6 bg-danger", iconClassName: "pe-7s-plug text-dark opacity-8", accessor: "thdv1", prefix: "", suffix: ""},
        {header: "THDVY", iconBgClassName: "icon-wrapper-bg opacity-6 bg-warning", iconClassName: "pe-7s-plug text-dark opacity-8", accessor: "thdv2", prefix: "", suffix: ""},
        {header: "THDVB", iconBgClassName: "icon-wrapper-bg opacity-4 bg-info", iconClassName: "pe-7s-plug text-dark opacity-8", accessor: "thdv3", prefix: "", suffix: ""},
        {header: "THDCR", iconBgClassName: "icon-wrapper-bg opacity-6 bg-danger", iconClassName: "pe-7s-gleam text-dark opacity-8", accessor: "thdc1", prefix: "", suffix: ""},
        {header: "THDCY", iconBgClassName: "icon-wrapper-bg opacity-6 bg-warning", iconClassName: "pe-7s-gleam text-dark opacity-8", accessor: "thdc2", prefix: "", suffix: ""},
        {header: "THDCB", iconBgClassName: "icon-wrapper-bg opacity-4 bg-info", iconClassName: "pe-7s-gleam text-dark opacity-8", accessor: "thdc3", prefix: "", suffix: ""},
        {header: "THDPR", iconBgClassName: "icon-wrapper-bg opacity-6 bg-danger", iconClassName: "pe-7s-power text-dark opacity-8", accessor: "thdp1", prefix: "", suffix: ""},
        {header: "THDPY", iconBgClassName: "icon-wrapper-bg opacity-6 bg-warning", iconClassName: "pe-7s-power text-dark opacity-8", accessor: "thdp2", prefix: "", suffix: ""},
        {header: "THDPB", iconBgClassName: "icon-wrapper-bg opacity-4 bg-info", iconClassName: "pe-7s-power text-dark opacity-8", accessor: "thdp3", prefix: "", suffix: ""},
        {header: "Frequency", iconBgClassName: "icon-wrapper-bg opacity-6 bg-danger", iconClassName: "pe-7s-graph1 text-dark opacity-8", accessor: "frequency", prefix: "", suffix: " Hz"},
        {header: "Total Yield", iconBgClassName: "icon-wrapper-bg opacity-6 bg-warning", iconClassName: "pe-7s-graph1 text-dark opacity-8", accessor: "total_yield", prefix: "", suffix: " Wh"},
    ]
    
    const electricityBillCostBreakdown = [
        {header: "Consumption", iconBgClassName: "icon-wrapper-bg opacity-6 bg-danger", iconClassName: "pe-7s-power text-dark opacity-8" , accessor: "consumption", prefix: "", suffix: ""},
        {header: "Cost", iconBgClassName: "icon-wrapper-bg opacity-6 bg-warning", iconClassName: "pe-7s-power text-dark opacity-8", accessor: "cost", prefix: "", suffix: ""},
        {header: "ICPT", iconBgClassName: "icon-wrapper-bg opacity-4 bg-info", iconClassName: "pe-7s-power text-dark opacity-8", accessor: "icpt", prefix: "", suffix: ""},
        {header: "Daily Usage", iconBgClassName: "icon-wrapper-bg opacity-6 bg-danger", iconClassName: "pe-7s-plug text-dark opacity-8", accessor: "current_month_usage", prefix: "", suffix: ""},
        {header: "GST", iconBgClassName: "icon-wrapper-bg opacity-6 bg-warning", iconClassName: "pe-7s-plug text-dark opacity-8", accessor: "gst", prefix: "", suffix: ""},
        {header: "Feed-In Tariff", iconBgClassName: "icon-wrapper-bg opacity-6 bg-info", iconClassName: "pe-7s-plug text-dark opacity-8", accessor: "feed_in_tariff", prefix: "", suffix: ""},
    ]

    let doorStatusClassNames = "badge badge-success";
    
    if(door_status === "OPEN"){
        doorStatusClassNames = "badge badge-danger";
    }

    const [accordions, setAccordions] = useState([
        {
            dailyElectricityBill: {
                heading: "Daily Electricity Bill", 
                isOpen: false,
            }
        }
    ]);

    const toggleAccordion = (index, id) => {
        const prevState = accordions;
        const updatedAccordions = prevState.map((objects, key) => {
            let updatedAccordionObjects = objects;
            if(key === index){
                const accordionArray = [];
                for(let id in objects){
                    accordionArray.push({
                        id: id,
                        config: objects[id]
                    })
                }

                accordionArray.map((accordion) => {
                    let isOpen = false;

                    if(accordion.id === id){
                        isOpen = !accordion.config.isOpen;
                    }
                    const updatedIsOpen = updateObject(objects[accordion.id], {isOpen: isOpen});
                    updatedAccordionObjects = updateObject(updatedAccordionObjects, {[accordion.id]: updatedIsOpen});

                    const updatedAccordion = updateObject(accordion.config, {isOpen: isOpen})
                    const updatedConfig = updateObject(accordion, {config: updatedAccordion});
                    return updatedConfig;
                })
            }

            return updatedAccordionObjects;
            
        });
        setAccordions(updatedAccordions);
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
                                <h6 className="menu-header-subtitle"><span className={doorStatusClassNames}>Door Status: {door_status}</span></h6>
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
                                
                                <StreetlightStatusChartBox
                                    chartOptions={streetlightStatusChartOptions} 
                                    chartSeries={streetlightStatusChartSeries} 
                                    chartType="radialBar"
                                    chartWidth={250}
                                    chartHeight={300}
                                    total_streetlights={total_streetlights}
                                    totalActiveStreetlights={total_active_streetlights}
                                    totalInactiveStreetlights={total_inactive_streetlights}
                                    streetlightStatusByPhase={streetlightStatusByPhase}
                                />
                                
                                {/* <div className="text-center">
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
                                    
                                </div> */}

                                <div className="mt-3">
                                    <HighlightsBox
                                        highlightsHeaders={highlightsHeaders}
                                        values={feederPillar}
                                        loading={false}
                                    />

                                    <ElectricityCostBreakdownAccordion
                                        accordions={accordions}
                                        toggleAccordion={toggleAccordion}
                                        electricityBillCostBreakdownHeader={electricityBillCostBreakdown}
                                        electricityBillCostBreakdown={electricityBill}
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