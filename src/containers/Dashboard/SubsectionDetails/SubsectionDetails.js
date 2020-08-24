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

import * as actions from '../../../store/actions/index';
// import * as actionTypes from '../../store/actions/actionTypes';

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
        feederPillarsTableData,
        loadingFeederPillarsTable,
        onFetchSubsectionDetails,
        onFetchFeederPillarsBySubsection,
        onFetchSubsectionMetricCharts
    } = props;

    useEffect(() => {
        const concessionId = props.match.params.concessionId;
        const sectionId = props.match.params.sectionId;
        const subsectionId = props.match.params.subsectionId;
        
        onFetchSubsectionDetails({concession_id: concessionId, section_id: sectionId, subsection_id: subsectionId});
        onFetchFeederPillarsBySubsection({section_id: sectionId});
        onFetchSubsectionMetricCharts();

    }, [
        props.match.params.concessionId, 
        props.match.params.sectionId, 
        props.match.params.subsectionId,
        onFetchSubsectionDetails,
        onFetchFeederPillarsBySubsection,
        onFetchSubsectionMetricCharts
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

    const onClickViewDetailsHandler = ( feederPillarId ) => {
        props.history.push(props.match.url + "/" + feederPillarId);
    }

    const feederPillarsTableColumns = [
        {
            columns: [
                {
                    Header: 'Feeder Pillar ID',
                    accessor: 'id'
                },
                {
                    Header: 'Power Usage',
                    accessor: 'power_usage'
                },
                {
                    Header: 'Uptime %',
                    accessor: 'uptime_percentage'
                },
                {
                    Header: 'Downtime %',
                    accessor: 'downtime_percentage'
                },
                {
                    Header: 'Electrical Bill (Monthly)',
                    accessor: 'electrical_bill'
                },
                {
                    Header: 'Carbon Footprint',
                    accessor: 'carbon_footprint'
                },
                {
                    Header: 'Energy Savings',
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
                    accessor: 'id',
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
        {header: "Power Usage", iconBgClassName: "icon-wrapper-bg opacity-5 bg-info", iconClassName: "pe-7s-gleam text-dark opacity-8" , accessor: "power_usage"},
        {header: "Uptime %", iconBgClassName: "icon-wrapper-bg opacity-5 bg-success", iconClassName: "lnr-checkmark-circle text-dark opacity-8", accessor: "uptime_percentage"},
        {header: "Downtime %", iconBgClassName: "icon-wrapper-bg opacity-5 bg-danger", iconClassName: "lnr-warning text-dark opacity-8", accessor: "downtime_percentage"},
        {header: "Electrical Bill", iconBgClassName: "icon-wrapper-bg opacity-5 bg-primary", iconClassName: "lnr-chart-bars text-dark opacity-8", accessor: "electrical_bill"},
        {header: "Carbon Footprint", iconBgClassName: "icon-wrapper-bg opacity-7 bg-success", iconClassName: "lnr-leaf text-dark opacity-8", accessor: "carbon_footprint"},
        {header: "Energy Savings", iconBgClassName: "icon-wrapper-bg opacity-5 bg-warning", iconClassName: "pe-7s-calculator text-dark opacity-8", accessor: "energy_savings"},
    ]

    const tabPanes = [
        {
            tab_name: "Overview", 
            children: 
                <Overview
                    highlightsHeaders={highlightsHeaders}
                    loadingHighlights={loadingHighlights}
                    values={subsection}
                    metricCharts={subsectionMetricCharts}
                    loadingMetricCharts={loadingSubsectionMetricChart}
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
                    loading={loadingFeederPillarsTable}
                />
        },
    ]
    
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
                    />
                </Container>
            </Layout>
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        subsection: state.SubsectionDetails.subsection,
        feederPillarsTableData: state.SubsectionDetails.feederPillarsTableData,
        loadingFeederPillarsTable: state.SubsectionDetails.loadingFeederPillarsTable,
        subsectionMetricCharts: state.SubsectionDetails.subsectionMetricCharts,
        loadingSubsectionMetricChart: state.SubsectionDetails.loadingSubsectionMetricChart,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchSubsectionDetails: (params) => dispatch(actions.fetchSubsectionDetails(params)),
        onFetchFeederPillarsBySubsection: (params) => dispatch(actions.fetchFeederPillarsBySubsection(params)),
        onFetchSubsectionMetricCharts: () => dispatch(actions.fetchSubsectionMetricCharts()),
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubsectionDetails);