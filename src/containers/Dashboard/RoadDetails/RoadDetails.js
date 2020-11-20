import React, { Fragment, useEffect, useState } from "react";

import {
    faHome
} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {
    Container,
    Button
} from 'reactstrap';

import { connect } from 'react-redux';

import { updateObject, getCurrentDateTimeInDBFormat, formatDateByDateFormat, subtractMinuteFromDateTime } from '../../../shared/utility';
import * as actions from '../../../store/actions/index';

import Layout from '../../../hoc/Layout/Layout';
import PageTitle from '../../../components/Layout/PageTitle/PageTitle';
import BasicTab from '../../../components/Tab/BasicTab/BasicTab';
import DataTable from '../../../components/Tables/DataTable/DataTable';
import Overview from '../../../components/Dashboard/Overview/Overview';
import BasicModal from '../../../components/Modal/BasicModal/BasicModal';
import FeederPillarDetails from '../../../components/Dashboard/FeederPillarDetails/FeederPillarDetails';

const RoadDetails = ( props ) => {
    const {
        road,
        loadingHighlights,
        roadMetricCharts,
        loadingRoadMetricChart,
        feederPillarsTableData,
        loadingFeederPillarTable,
        onFetchRoadDetails,
        onFetchFeederPillarsByRoad,
        onFetchRoadMetricCharts,
        onFetchFeederPillarDetails,
        feederPillar,
        loadingFeederPillarDetails,
        pillarId,
        feederPillarMetricCharts,
        loadingFeederPillarMetricChart,
        onFetchFeederPillarMetricCharts,
        loadingRoadDetails
    } = props;

    const [ isPillarDetailsModalVisible, setIsPillarDetailsModalVisible ] = useState(false);

    const showOrHidePillarDetailsModal = (pillarId) => {
        const roadId = props.match.params.roadId
        let isRefresh = false; 
        let dateTo = getCurrentDateTimeInDBFormat("y-m-d h:m:i");
        let dateFrom = formatDateByDateFormat(subtractMinuteFromDateTime(dateTo, 10), 'y-m-d h:m:i');
        // const baseMetricChartParams = {
        //     isRefresh: isRefresh, 
        //     dateTimeFrom: dateFrom, 
        //     dateTimeTo: dateTo,     
        //     // dataKey: [], 
        //     chartType: 'realtime', 
        //     // chartId: '',
        //     feederPillarId: pillarId,
        //     // formulaType: null,
        //     roadId: roadId
        // }

        onFetchFeederPillarDetails({isRefresh: isRefresh, dateTimeFrom: dateFrom, dateTimeTo: dateTo, chartType: 'realtime', feederPillarId: pillarId, roadId: roadId});
        // onFetchFeederPillarMetricCharts(updateObject(baseMetricChartParams, {dataKey: ['thdc1'], chartId: 'powerUsage'}));
        // onFetchFeederPillarMetricCharts(updateObject(baseMetricChartParams, {dataKey: ['thdc1'], chartId: 'electricityBill', formulaType: 'electricityBill'}));
        // onFetchFeederPillarMetricCharts(updateObject(baseMetricChartParams, {dataKey: ['thdc1'], chartId: 'carbonFootprint', formulaType: 'carbonFootprint'}));
        // onFetchFeederPillarMetricCharts(updateObject(baseMetricChartParams, {dataKey: ['thdc1'], chartId: 'energySavings', formulaType: 'energySavings'}));
        // onFetchFeederPillarMetricCharts(updateObject(baseMetricChartParams, {dataKey: ['current_p1', 'current_p2', 'current_p3'], chartId: 'amperage'}));
        // onFetchFeederPillarMetricCharts(updateObject(baseMetricChartParams, {dataKey: ['voltage_l1_n', 'voltage_l2_n', 'voltage_l3_n'], chartId: 'voltage'}));
        setIsPillarDetailsModalVisible(!isPillarDetailsModalVisible);
    }

    useEffect(() => {
        const roadId = props.match.params.roadId;
        let isRefresh = false; 
        let dateTo = getCurrentDateTimeInDBFormat("y-m-d h:m:i");
        let dateFrom = formatDateByDateFormat(subtractMinuteFromDateTime(dateTo, 10), 'y-m-d h:m:i');
        const baseMetricChartParams = {
            isRefresh: isRefresh, 
            dateTimeFrom: dateFrom, 
            dateTimeTo: dateTo,     
            // dataKey: [], 
            chartType: 'realtime', 
            // chartId: '',
            // roads: [roadId],
            roadId: roadId,
            // formulaType: null
        }
        
        onFetchRoadDetails(baseMetricChartParams);
        // onFetchFeederPillarsByRoad({roadId: roadId});
        // onFetchRoadMetricCharts(updateObject(baseMetricChartParams, {dataKey: ['thdc1'], chartId: 'powerUsage'}));
        // onFetchRoadMetricCharts(updateObject(baseMetricChartParams, {dataKey: ['thdc1'], chartId: 'electricityBill', formulaType: 'electricityBill'}));
        // onFetchRoadMetricCharts(updateObject(baseMetricChartParams, {dataKey: ['thdc1'], chartId: 'carbonFootprint', formulaType: 'carbonFootprint'}));
        // onFetchRoadMetricCharts(updateObject(baseMetricChartParams, {dataKey: ['thdc1'], chartId: 'energySavings', formulaType: 'energySavings'}));
        // onFetchRoadMetricCharts(updateObject(baseMetricChartParams, {dataKey: ['current_p1', 'current_p2', 'current_p3'], chartId: 'amperage'}));
        // onFetchRoadMetricCharts(updateObject(baseMetricChartParams, {dataKey: ['voltage_l1_n', 'voltage_l2_n', 'voltage_l3_n'], chartId: 'voltage'}));
        
        const interval = setInterval(() => {
            dateTo = getCurrentDateTimeInDBFormat("y-m-d h:m:i");
            dateFrom = formatDateByDateFormat(subtractMinuteFromDateTime(dateTo, 10), 'y-m-d h:m:i');
            isRefresh = true;
            const baseRefreshMetricChartParams = updateObject(baseMetricChartParams, {isRefresh: isRefresh, dateTimeFrom: dateFrom, dateTimeTo: dateTo});

            if(isPillarDetailsModalVisible){
                const baseFeederPillarMetricChartParams = {
                    isRefresh: true, 
                    dateTimeFrom: dateFrom, 
                    dateTimeTo: dateTo,     
                    // dataKey: [], 
                    chartType: 'realtime', 
                    // chartId: '',
                    feederPillarId: pillarId,
                    // formulaType: null,
                    roadId: roadId
                }

                onFetchFeederPillarDetails(baseFeederPillarMetricChartParams);
                // onFetchFeederPillarMetricCharts(updateObject(baseFeederPillarMetricChartParams, {dataKey: ['thdc1'], chartId: 'powerUsage'}));
                // onFetchFeederPillarMetricCharts(updateObject(baseFeederPillarMetricChartParams, {dataKey: ['thdc1'], chartId: 'electricityBill', formulaType: 'electricityBill'}));
                // onFetchFeederPillarMetricCharts(updateObject(baseFeederPillarMetricChartParams, {dataKey: ['thdc1'], chartId: 'carbonFootprint', formulaType: 'carbonFootprint'}));
                // onFetchFeederPillarMetricCharts(updateObject(baseFeederPillarMetricChartParams, {dataKey: ['thdc1'], chartId: 'energySavings', formulaType: 'energySavings'}));
                // onFetchFeederPillarMetricCharts(updateObject(baseFeederPillarMetricChartParams, {dataKey: ['current_p1', 'current_p2', 'current_p3'], chartId: 'amperage'}));
                // onFetchFeederPillarMetricCharts(updateObject(baseFeederPillarMetricChartParams, {dataKey: ['voltage_l1_n', 'voltage_l2_n', 'voltage_l3_n'], chartId: 'voltage'}));
            }else {
                onFetchRoadDetails(baseRefreshMetricChartParams);
                // onFetchRoadMetricCharts(updateObject(baseRefreshMetricChartParams, {dataKey: ['thdc1'], chartId: 'powerUsage'}));
                // onFetchRoadMetricCharts(updateObject(baseRefreshMetricChartParams, {dataKey: ['thdc1'], chartId: 'electricityBill', formulaType: 'electricityBill'}));
                // onFetchRoadMetricCharts(updateObject(baseRefreshMetricChartParams, {dataKey: ['thdc1'], chartId: 'carbonFootprint', formulaType: 'carbonFootprint'}));
                // onFetchRoadMetricCharts(updateObject(baseRefreshMetricChartParams, {dataKey: ['thdc1'], chartId: 'energySavings', formulaType: 'energySavings'}));
                // onFetchRoadMetricCharts(updateObject(baseRefreshMetricChartParams, {dataKey: ['current_p1', 'current_p2', 'current_p3'], chartId: 'amperage'}));
                // onFetchRoadMetricCharts(updateObject(baseRefreshMetricChartParams, {dataKey: ['voltage_l1_n', 'voltage_l2_n', 'voltage_l3_n'], chartId: 'voltage'}));        
            }
        }, 30000);

        return () => clearInterval(interval);
    }, [
        isPillarDetailsModalVisible,
        props.match.params.roadId,
        onFetchRoadDetails,
        // onFetchFeederPillarsByRoad,
        onFetchRoadMetricCharts,
        pillarId,
        onFetchFeederPillarDetails,
        onFetchFeederPillarMetricCharts
    ])
    
    const breadcrumbItems = [
        {
            title: "Concessions",
            href: '',
            onClickHandler: (e)=>{
                e.preventDefault();
                props.history.push("/dashboard");
            },
            children: (<span><FontAwesomeIcon icon={faHome}/> Concessions</span> ),
            isActive: false
        },
        {
            title: onFetchFeederPillarsByRoad.concession_name,
            href: '',
            onClickHandler: (e)=>{
                e.preventDefault();
                props.history.push("/dashboard/" + props.match.params.concessionId);
            },
            children: road.concession_name,
            isActive: false
        },
        {
            title: road.section_name,
            href: '',
            onClickHandler: (e)=>{
                e.preventDefault();
                props.history.push("/dashboard/" + props.match.params.concessionId + "/" + props.match.params.sectionId);
            },
            children: road.section_name,
            isActive: false
        },
        {
            title: road.subsection_name,
            href: '',
            onClickHandler: (e)=>{
                e.preventDefault();
                props.history.push("/dashboard/" + props.match.params.concessionId + "/" + props.match.params.sectionId + "/" + props.match.params.subsectionId);
            },
            children: road.subsection_name,
            isActive: false
        },
        {
            title: road.road_name,
            href: null,
            onClickHandler: null,
            children: road.road_name,
            isActive: true
        }
    ]

    const feederPillarsTableColumns = [
        {
            columns: [
                {
                    Header: 'Feeder Pillar ID',
                    accessor: 'pillar_id'
                },
                {
                    Header: 'Power Usage (KWh)',
                    accessor: 'power_usage'
                },
                {
                    Header: 'Status',
                    accessor: 'status'
                },
                {
                    Header: 'Uptime %',
                    accessor: 'uptime_percentage'
                },
                {
                    Header: 'Electricity Bill (RM)',
                    accessor: 'electricity_bill'
                },
                {
                    Header: 'Carbon Footprint (KG)',
                    accessor: 'carbon_footprint'
                },
                {
                    Header: 'Energy Savings (KWh)',
                    accessor: 'energy_savings'
                },
                {
                    Header: 'Door Staus',
                    accessor: 'door_status'
                }
            ]
        },
        {
            columns: [
                {
                    Header: 'Actions',
                    accessor: 'pillar_id',
                    Cell: row => (
                        <div className="d-block w-100 text-center">
                            <Button size="sm" color="primary" onClick={() => showOrHidePillarDetailsModal(row.value)}>
                                Details
                            </Button>
                        </div>
                    )
                }
            ]
        },
    ];

    const highlightsHeaders = [
        {header: "Power Usage", iconBgClassName: "icon-wrapper-bg opacity-5 bg-info", iconClassName: "pe-7s-gleam text-dark opacity-8" , accessor: "power_usage", prefix: "", suffix: " KWh"},
        {header: "Uptime %", iconBgClassName: "icon-wrapper-bg opacity-5 bg-success", iconClassName: "lnr-checkmark-circle text-dark opacity-8", accessor: "uptime_text", prefix: "", suffix: ""},
        {header: "Downtime %", iconBgClassName: "icon-wrapper-bg opacity-5 bg-danger", iconClassName: "lnr-warning text-dark opacity-8", accessor: "downtime_text", prefix: "", suffix: ""},
        {header: "Electricity Bill", iconBgClassName: "icon-wrapper-bg opacity-5 bg-primary", iconClassName: "lnr-chart-bars text-dark opacity-8", accessor: "electricity_bill", prefix: "RM ", suffix: ""},
        {header: "Carbon Footprint", iconBgClassName: "icon-wrapper-bg opacity-7 bg-success", iconClassName: "lnr-leaf text-dark opacity-8", accessor: "carbon_footprint", prefix: "", suffix: " KG"},
        {header: "Energy Savings", iconBgClassName: "icon-wrapper-bg opacity-5 bg-warning", iconClassName: "pe-7s-calculator text-dark opacity-8", accessor: "energy_savings", prefix: "", suffix: " KWh"},
    ]

    const tabPanes = [
        {
            tab_name: "Overview", 
            children: 
                <Overview
                    highlightsHeaders={highlightsHeaders}
                    loadingHighlights={loadingRoadDetails}
                    values={road}
                    metricCharts={roadMetricCharts}
                    loadingMetricCharts={loadingRoadDetails}
                />
        },
        {
            tab_name: "Feeder Pillars", 
            children: 
                <DataTable 
                    data={feederPillarsTableData}
                    columns={feederPillarsTableColumns}
                    pageSize={10}
                    header={null}
                    filterable
                    loading={loadingFeederPillarTable}
                />
        },
    ]

    const onTabChangeHandler = (key) => {
        const roadId = props.match.params.roadId
        
        if(key === '1' ) {
            onFetchFeederPillarsByRoad({roadId: roadId});
        }
    }
    
    return (
        <Fragment>
            <Layout {...props}>
                <PageTitle
                    heading = "Dashboard"
                    icon = "pe-7s-home opacity-6"
                    enableBreadcrumb
                    breadcrumbItems = {breadcrumbItems}
                />

                <Container fluid>
                    <BasicTab
                        tabPanes={tabPanes}
                        onChangeHandler={onTabChangeHandler}
                    />

                    <BasicModal 
                        modalWidth={1000}
                        visible={isPillarDetailsModalVisible}
                        showOrHideModal={showOrHidePillarDetailsModal}
                    >
                        <FeederPillarDetails
                            loading={loadingFeederPillarDetails}
                            feederPillar={feederPillar}
                            metricCharts={feederPillarMetricCharts}
                            loadingMetricCharts={loadingFeederPillarDetails}
                        />
                    </BasicModal>
                </Container>
            </Layout>
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        loadingHighlights: state.RoadDetails.loadingHighlights,
        road: state.RoadDetails.road,
        feederPillarsTableData: state.RoadDetails.feederPillarsTableData,
        loadingFeederPillarTable: state.RoadDetails.loadingFeederPillarTable,
        roadMetricCharts: state.RoadDetails.roadMetricCharts,
        loadingRoadMetricChart: state.RoadDetails.loadingRoadMetricChart,
        feederPillar: state.FeederPillarDetails.feederPillar,
        loadingFeederPillarDetails: state.FeederPillarDetails.loadingFeederPillarDetails,
        pillarId: state.FeederPillarDetails.pillarId,
        feederPillarMetricCharts: state.FeederPillarDetails.feederPillarMetricCharts,
        loadingFeederPillarMetricChart: state.FeederPillarDetails.loadingFeederPillarMetricChart,
        loadingRoadDetails: state.RoadDetails.loadingRoadDetails,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchRoadDetails: (params) => dispatch(actions.fetchRoadDetails(params)),
        onFetchFeederPillarsByRoad: (params) => dispatch(actions.fetchFeederPillarsByRoad(params)),
        onFetchRoadMetricCharts: (params) => dispatch(actions.fetchRoadMetricCharts(params)),
        onFetchFeederPillarDetails: (params) => dispatch(actions.fetchFeederPillarDetails(params)),
        onFetchFeederPillarMetricCharts: (params) => dispatch(actions.fetchFeederPillarMetricCharts(params)),
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoadDetails);