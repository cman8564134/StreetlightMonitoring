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

import { getCurrentDateTimeInDBFormat, formatDateByDateFormat, subtractMinuteFromDateTime, updateObject } from '../../../shared/utility';
import * as actions from '../../../store/actions/index';
// import * as actionTypes from '../../store/actions/actionTypes';

import Layout from '../../../hoc/Layout/Layout';
import PageTitle from '../../../components/Layout/PageTitle/PageTitle';
import BasicTab from '../../../components/Tab/BasicTab/BasicTab';
import DataTable from '../../../components/Tables/DataTable/DataTable';
import Overview from '../../../components/Dashboard/Overview/Overview';

const SectionDetails = ( props ) => {
    const {
        section,
        loadingHighlights,
        sectionMetricCharts,
        loadingSectionMetricChart,
        subsectionsTableData,
        loadingSubsectionsTable,
        onFetchSectionDetails,
        onFetchSubsectionsBySection,
        onFetchSectionMetricCharts,
        loadingSectionDetails
    } = props;

    useEffect(() => {
        const sectionId = props.match.params.sectionId;
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
            // sections: [sectionId],
            sectionId: sectionId,
            // formulaType: null
        }

        onFetchSectionDetails(baseMetricChartParams);

        // onFetchSectionDetails({isRefresh: isRefresh, sectionId: sectionId});
        // onFetchSubsectionsBySection({sectionId: sectionId});
        // onFetchSectionMetricCharts(updateObject(baseMetricChartParams, {dataKey: ['thdc1'], chartId: 'powerUsage'}));
        // onFetchSectionMetricCharts(updateObject(baseMetricChartParams, {dataKey: ['thdc1'], chartId: 'electricityBill', formulaType: 'electricityBill'}));
        // onFetchSectionMetricCharts(updateObject(baseMetricChartParams, {dataKey: ['thdc1'], chartId: 'carbonFootprint', formulaType: 'carbonFootprint'}));
        // onFetchSectionMetricCharts(updateObject(baseMetricChartParams, {dataKey: ['thdc1'], chartId: 'energySavings', formulaType: 'energySavings'}));
        // onFetchSectionMetricCharts(updateObject(baseMetricChartParams, {dataKey: ['current_p1', 'current_p2', 'current_p3'], chartId: 'amperage'}));
        // onFetchSectionMetricCharts(updateObject(baseMetricChartParams, {dataKey: ['voltage_l1_n', 'voltage_l2_n', 'voltage_l3_n'], chartId: 'voltage'}));
        
        const interval = setInterval(() => {
            dateTo = getCurrentDateTimeInDBFormat("y-m-d h:m:i");
            dateFrom = formatDateByDateFormat(subtractMinuteFromDateTime(dateTo, 10), 'y-m-d h:m:i');
            isRefresh = true;
            const baseRefreshMetricChartParams = updateObject(baseMetricChartParams, {isRefresh: isRefresh, dateTimeFrom: dateFrom, dateTimeTo: dateTo});

            onFetchSectionDetails(baseRefreshMetricChartParams);
            // onFetchSectionDetails({isRefresh: isRefresh, sectionId: sectionId});
            // onFetchSectionMetricCharts(updateObject(baseRefreshMetricChartParams, {dataKey: ['thdc1'], chartId: 'powerUsage'}));
            // onFetchSectionMetricCharts(updateObject(baseRefreshMetricChartParams, {dataKey: ['thdc1'], chartId: 'electricityBill', formulaType: 'electricityBill'}));
            // onFetchSectionMetricCharts(updateObject(baseRefreshMetricChartParams, {dataKey: ['thdc1'], chartId: 'carbonFootprint', formulaType: 'carbonFootprint'}));
            // onFetchSectionMetricCharts(updateObject(baseRefreshMetricChartParams, {dataKey: ['thdc1'], chartId: 'energySavings', formulaType: 'energySavings'}));
            // onFetchSectionMetricCharts(updateObject(baseRefreshMetricChartParams, {dataKey: ['current_p1', 'current_p2', 'current_p3'], chartId: 'amperage'}));
            // onFetchSectionMetricCharts(updateObject(baseRefreshMetricChartParams, {dataKey: ['voltage_l1_n', 'voltage_l2_n', 'voltage_l3_n'], chartId: 'voltage'}));        
        }, 30000);

        return () => clearInterval(interval);

    }, [
        props.match.params.sectionId, 
        onFetchSectionDetails,
        // onFetchSectionMetricCharts
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
            title: section.concession_name,
            href: '',
            onClickHandler: (e)=>{
                e.preventDefault();
                props.history.push("/dashboard/" + props.match.params.concessionId);
            },
            children: section.concession_name,
            isActive: false
        },
        {
            title: section.section_name,
            href: null,
            onClickHandler: null,
            children: section.section_name,
            isActive: true
        }
    ]

    const onClickViewDetailsHandler = ( subsectionId ) => {
        props.history.push(props.match.url + "/" + subsectionId);
    }

    const subsectionsTableColumns = [
        {
            columns: [
                {
                    Header: 'Subsection',
                    accessor: 'subsection_name'
                },
                {
                    Header: 'Power Usage (KWh)',
                    accessor: 'power_usage'
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
            ]
        },
        {
            columns: [
                {
                    Header: 'Actions',
                    accessor: 'subsection_id',
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
                    loadingHighlights={loadingSectionDetails}
                    values={section}
                    metricCharts={sectionMetricCharts}
                    loadingMetricCharts={loadingSectionDetails}
                />
        },
        {
            tab_name: "Subsections", 
            children: 
                <DataTable 
                    data={subsectionsTableData}
                    columns={subsectionsTableColumns}
                    pageSize={10}
                    header={null}
                    filterable
                    loading={loadingSubsectionsTable}
                />
        },
    ]

    const onTabChangeHandler = (key) => {
        const sectionId = props.match.params.sectionId;
        
        if(key === '1' ) {
            onFetchSubsectionsBySection({sectionId: sectionId});
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
        section: state.SectionDetails.section,
        loadingHighlights: state.SectionDetails.loadingHighlights,
        subsectionsTableData: state.SectionDetails.subsectionsTableData,
        loadingSubsectionsTable: state.SectionDetails.loadingSubsectionsTable,
        sectionMetricCharts: state.SectionDetails.sectionMetricCharts,
        loadingSectionMetricChart: state.SectionDetails.loadingSectionMetricChart,
        loadingSectionDetails: state.SectionDetails.loadingSectionDetails,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchSectionDetails: (params) => dispatch(actions.fetchSectionDetails(params)),
        onFetchSubsectionsBySection: (params) => dispatch(actions.fetchSubsectionsBySection(params)),
        onFetchSectionMetricCharts: (params) => dispatch(actions.fetchSectionMetricCharts(params)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SectionDetails);