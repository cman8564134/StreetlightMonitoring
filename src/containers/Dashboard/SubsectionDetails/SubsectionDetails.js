import React, { Fragment, useEffect } from "react";

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

const SubsectionDetails = ( props ) => {
    const {
        subsection,
        loadingHighlights,
        subsectionMetricCharts,
        loadingSubsectionMetricChart,
        roadsTableData,
        loadingRoadTable,
        onFetchSubsectionDetails,
        onFetchRoadsBySubsection,
        onFetchSubsectionMetricCharts,
        loadingSubsectionDetails
    } = props;

    useEffect(() => {
        const subsectionId = props.match.params.subsectionId;
        let isRefresh = false; 
        let dateTo = getCurrentDateTimeInDBFormat("y-m-d h:m:i");
        let dateFrom = formatDateByDateFormat(subtractMinuteFromDateTime(dateTo, 1440), 'y-m-d h:m:i');
        const baseMetricChartParams = {
            isRefresh: isRefresh, 
            dateTimeFrom: dateFrom, 
            dateTimeTo: dateTo,     
            // dataKey: [], 
            chartType: 'realtime', 
            // chartId: '',
            // sections: [subsectionId],
            // formulaType: null,
            subsectionId: subsectionId,
        }
        
        onFetchSubsectionDetails(baseMetricChartParams);
        // onFetchRoadsBySubsection({subsectionId: subsectionId});
        // onFetchSubsectionMetricCharts(updateObject(baseMetricChartParams, {dataKey: ['thdc1'], chartId: 'powerUsage'}));
        // onFetchSubsectionMetricCharts(updateObject(baseMetricChartParams, {dataKey: ['thdc1'], chartId: 'electricityBill', formulaType: 'electricityBill'}));
        // onFetchSubsectionMetricCharts(updateObject(baseMetricChartParams, {dataKey: ['thdc1'], chartId: 'carbonFootprint', formulaType: 'carbonFootprint'}));
        // onFetchSubsectionMetricCharts(updateObject(baseMetricChartParams, {dataKey: ['thdc1'], chartId: 'energySavings', formulaType: 'energySavings'}));
        // onFetchSubsectionMetricCharts(updateObject(baseMetricChartParams, {dataKey: ['current_p1', 'current_p2', 'current_p3'], chartId: 'amperage'}));
        // onFetchSubsectionMetricCharts(updateObject(baseMetricChartParams, {dataKey: ['voltage_l1_n', 'voltage_l2_n', 'voltage_l3_n'], chartId: 'voltage'}));
        
        const interval = setInterval(() => {
            dateTo = getCurrentDateTimeInDBFormat("y-m-d h:m:i");
            dateFrom = formatDateByDateFormat(subtractMinuteFromDateTime(dateTo, 1440), 'y-m-d h:m:i');
            isRefresh = true;
            const baseRefreshMetricChartParams = updateObject(baseMetricChartParams, {isRefresh: isRefresh, dateTimeFrom: dateFrom, dateTimeTo: dateTo});
            
            onFetchSubsectionDetails(baseRefreshMetricChartParams);
            // onFetchSubsectionMetricCharts(updateObject(baseRefreshMetricChartParams, {dataKey: ['thdc1'], chartId: 'powerUsage'}));
            // onFetchSubsectionMetricCharts(updateObject(baseRefreshMetricChartParams, {dataKey: ['thdc1'], chartId: 'electricityBill', formulaType: 'electricityBill'}));
            // onFetchSubsectionMetricCharts(updateObject(baseRefreshMetricChartParams, {dataKey: ['thdc1'], chartId: 'carbonFootprint', formulaType: 'carbonFootprint'}));
            // onFetchSubsectionMetricCharts(updateObject(baseRefreshMetricChartParams, {dataKey: ['thdc1'], chartId: 'energySavings', formulaType: 'energySavings'}));
            // onFetchSubsectionMetricCharts(updateObject(baseRefreshMetricChartParams, {dataKey: ['current_p1', 'current_p2', 'current_p3'], chartId: 'amperage'}));
            // onFetchSubsectionMetricCharts(updateObject(baseRefreshMetricChartParams, {dataKey: ['voltage_l1_n', 'voltage_l2_n', 'voltage_l3_n'], chartId: 'voltage'}));        
            
        }, 30000);

        return () => clearInterval(interval);
    }, [
        props.match.params.subsectionId,
        onFetchSubsectionDetails
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
            title: subsection.concession_name,
            href: '',
            onClickHandler: (e)=>{
                e.preventDefault();
                props.history.push("/dashboard/" + props.match.params.concessionId);
            },
            children: subsection.concession_name,
            isActive: false
        },
        {
            title: subsection.section_name,
            href: '',
            onClickHandler: (e)=>{
                e.preventDefault();
                props.history.push("/dashboard/" + props.match.params.concessionId + "/" + props.match.params.sectionId);
            },
            children: subsection.section_name,
            isActive: false
        },
        {
            title: subsection.subsection_name,
            href: null,
            onClickHandler: null,
            children: subsection.subsection_name,
            isActive: true
        }
    ]

    const onClickViewDetailsHandler = ( roadId ) => {
        props.history.push(props.match.url + "/" + roadId);
    }

    const roadsTableColumns = [
        {
            columns: [
                {
                    Header: 'Road',
                    accessor: 'road_name',
                    Cell: row => {
                        return (
                            <div className="d-block w-100 text-center">
                                {row.value}
                            </div>)
                    }
                },
                {
                    Header: 'Total Power Consumption (KWh)',
                    accessor: 'power_usage',
                    Cell: row => {
                        return (
                            <div className="d-block w-100 text-center">
                                {row.value}
                            </div>)
                    }
                },
                {
                    Header: 'Uptime (Lamp Up / Total Lamp)',
                    Cell: row => {
                            const uptime = row.original.total_active_streetlights + "/" + row.original.total_streetlights;
                            return (
                                <div className="d-block w-100 text-center">
                                    {uptime}
                                </div>)
                        }
                },
                {
                    Header: 'Downtime (Lamp Down / Total Lamp)',
                    Cell: row => {
                        const uptime = row.original.total_inactive_streetlights + "/" + row.original.total_streetlights;
                        return (
                            <div className="d-block w-100 text-center">
                                {uptime}
                            </div>)
                    }
                },
                {
                    Header: 'Electricity Bill (RM)',
                    accessor: 'electricity_bill',
                    Cell: row => {
                        return (
                            <div className="d-block w-100 text-center">
                                {row.value}
                            </div>)
                    }
                },
                {
                    Header: 'Carbon Footprint (KG)',
                    accessor: 'carbon_footprint_kg',
                    Cell: row => {
                        return (
                            <div className="d-block w-100 text-center">
                                {row.value}
                            </div>)
                    }
                },
                {
                    Header: 'Energy Savings (KWh)',
                    accessor: 'energy_savings',
                    Cell: row => {
                        return (
                            <div className="d-block w-100 text-center">
                                {row.value}
                            </div>)
                    }
                },
            ]
        },
        {
            columns: [
                {
                    Header: 'Actions',
                    accessor: 'road_id',
                    Cell: row => (
                        <div className="d-block w-100 text-center">
                            <Button size="sm" color="primary" onClick={()=>{onClickViewDetailsHandler(row.value)}}>
                                Details
                            </Button>
                        </div>
                    )
                }
            ]
        },
    ];

    const highlightsHeaders = [
        {header: "Total Power Consumption", iconBgClassName: "icon-wrapper-bg opacity-5 bg-info", iconClassName: "pe-7s-gleam text-dark opacity-8" , accessor: "power_usage", prefix: "", suffix: " KWh"},
        {header: "Uptime (Lamp Up / Total Lamp)", iconBgClassName: "icon-wrapper-bg opacity-5 bg-success", iconClassName: "lnr-checkmark-circle text-dark opacity-8", accessor: "uptime_text", prefix: "", suffix: ""},
        {header: "Downtime (Lamp Down / Total Lamp)", iconBgClassName: "icon-wrapper-bg opacity-5 bg-danger", iconClassName: "lnr-warning text-dark opacity-8", accessor: "downtime_text", prefix: "", suffix: ""},
        {header: "Electricity Bill", iconBgClassName: "icon-wrapper-bg opacity-5 bg-primary", iconClassName: "lnr-chart-bars text-dark opacity-8", accessor: "electricity_bill", prefix: "RM ", suffix: ""},
        {header: "Carbon Footprint", iconBgClassName: "icon-wrapper-bg opacity-7 bg-success", iconClassName: "lnr-leaf text-dark opacity-8", accessor: "carbon_footprint_kg", prefix: "", suffix: " KG"},
        {header: "Energy Savings", iconBgClassName: "icon-wrapper-bg opacity-5 bg-warning", iconClassName: "pe-7s-calculator text-dark opacity-8", accessor: "energy_savings", prefix: "", suffix: " KWh"},
    ]

    const tabPanes = [
        {
            tab_name: "Overview", 
            children: 
                <Overview
                    highlightsHeaders={highlightsHeaders}
                    loadingHighlights={loadingSubsectionDetails}
                    values={subsection}
                    metricCharts={subsectionMetricCharts}
                    loadingMetricCharts={loadingSubsectionDetails}
                />
        },
        {
            tab_name: "Roads", 
            children: 
                <DataTable 
                    data={roadsTableData}
                    columns={roadsTableColumns}
                    pageSize={10}
                    header={null}
                    filterable
                    loading={loadingRoadTable}
                />
        },
    ]
    
    const onTabChangeHandler = (key) => {
        const subsectionId = props.match.params.subsectionId;
        
        if(key === '1' ) {
            onFetchRoadsBySubsection({subsectionId: subsectionId});
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
                </Container>
            </Layout>
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        loadingHighlights: state.SubsectionDetails.loadingHighlights,
        subsection: state.SubsectionDetails.subsection,
        roadsTableData: state.SubsectionDetails.roadsTableData,
        loadingRoadTable: state.SubsectionDetails.loadingRoadTable,
        subsectionMetricCharts: state.SubsectionDetails.subsectionMetricCharts,
        loadingSubsectionMetricChart: state.SubsectionDetails.loadingSubsectionMetricChart,
        loadingSubsectionDetails: state.SubsectionDetails.loadingSubsectionDetails,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchSubsectionDetails: (params) => dispatch(actions.fetchSubsectionDetails(params)),
        onFetchRoadsBySubsection: (params) => dispatch(actions.fetchRoadsBySubsection(params)),
        onFetchSubsectionMetricCharts: (params) => dispatch(actions.fetchSubsectionMetricCharts(params))        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubsectionDetails);