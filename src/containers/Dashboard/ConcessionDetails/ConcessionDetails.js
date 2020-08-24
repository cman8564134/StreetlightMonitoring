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

const ConcessionDetails = ( props ) => {
    const {
        onFetchConcessionDetails,
        concession,
        loadingHighlights,
        sectionsTableData,
        loadingSectionsTable,
        onFetchSectionsByConcession,
        onFetchConcessionMetricCharts,
        concessionMetricCharts,
        loadingConcessionMetricChart
    } = props;

    useEffect(() => {
        const concessionId = props.match.params.concessionId;
        
        onFetchConcessionDetails({concession_id: concessionId});
        onFetchSectionsByConcession();
        onFetchConcessionMetricCharts();

    }, [props.match.params.concessionId, onFetchConcessionDetails, onFetchSectionsByConcession, onFetchConcessionMetricCharts])
    
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
            title: concession.concession_name,
            href: null,
            onClickHandler: null,
            children: concession.concession_name,
            isActive: true
        }
    ]

    const onClickViewDetailsHandler = ( sectionId ) => {
        props.history.push(props.match.url + "/" + sectionId);
    }

    const sectionsTableColumns = [
        {
            columns: [
                {
                    Header: 'Section',
                    accessor: 'section_name'
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
                    values={concession}
                    metricCharts={concessionMetricCharts}
                    loadingMetricCharts={loadingConcessionMetricChart}
                />
        },
        {
            tab_name: "Sections", 
            children: 
                <DataTable 
                    data={sectionsTableData}
                    columns={sectionsTableColumns}
                    pageSize={10}
                    header={null}
                    filterable
                    loading={loadingSectionsTable}
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
        concession: state.ConcessionDetails.concession,
        loadingHighlights: state.ConcessionDetails.loadingHighlights,
        sectionsTableData: state.ConcessionDetails.sectionsTableData,
        loadingSectionsTable: state.ConcessionDetails.loadingSectionsTable,
        concessionMetricCharts: state.ConcessionDetails.concessionMetricCharts,
        loadingConcessionMetricChart: state.ConcessionDetails.loadingConcessionMetricChart
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchConcessionDetails: (concessionId) => dispatch(actions.fetchConcessionDetails(concessionId)),
        onFetchSectionsByConcession: () => dispatch(actions.fetchSectionsByConcession()),
        onFetchConcessionMetricCharts: () => dispatch(actions.fetchConcessionMetricCharts()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConcessionDetails);