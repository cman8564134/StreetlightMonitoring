import React, { Fragment, useEffect } from "react";

import {
    faHome
} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {
    Container
} from 'reactstrap';

import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';
// import * as actionTypes from '../../store/actions/actionTypes';

import Layout from '../../../hoc/Layout/Layout';
import PageTitle from '../../../components/Layout/PageTitle/PageTitle';
import BasicTab from '../../../components/Tab/BasicTab/BasicTab';
import Overview from '../../../components/Dashboard/Overview/Overview';

const FeederPillarDetails = ( props ) => {
    const {
        concessionName,
        sectionName,
        subsectionName,
        feederPillar,
        loadingHighlights,
        feederPillarMetricCharts,
        loadingFeederPillarMetricChart,
        onFetchFeederPillarDetails,
        onFetchFeederPillarMetricCharts
    } = props;

    useEffect(() => {
        const concessionId = props.match.params.concessionId;
        const sectionId = props.match.params.sectionId;
        const subsectionId = props.match.params.subsectionId;
        const feederPillarId = props.match.params.feederPillarId;
        
        onFetchFeederPillarDetails({concession_id: concessionId, section_id: sectionId, subsection_id: subsectionId, feeder_pillar_id: feederPillarId});
        onFetchFeederPillarMetricCharts();

    }, [
        props.match.params.concessionId, 
        props.match.params.sectionId, 
        props.match.params.subsectionId,
        props.match.params.feederPillarId,
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
            title: concessionName,
            href: '',
            onClickHandler: (e)=>{
                e.preventDefault();
                props.history.push("/dashboard/" + props.match.params.concessionId);
            },
            children: concessionName,
            isActive: false
        },
        {
            title: sectionName,
            href: '',
            onClickHandler: (e)=>{
                e.preventDefault();
                props.history.push("/dashboard/" + props.match.params.concessionId + "/" + props.match.params.sectionId);
            },
            children: sectionName,
            isActive: false
        },
        {
            title: subsectionName,
            href: '',
            onClickHandler: (e)=>{
                e.preventDefault();
                props.history.push("/dashboard/" + props.match.params.concessionId + "/" + props.match.params.sectionId + "/" + props.match.params.subsectionId);
            },
            children: subsectionName,
            isActive: false
        },
        {
            title: feederPillar.feeder_pillar_id,
            href: null,
            onClickHandler: null,
            children: "Feeder Pillar " + feederPillar.id,
            isActive: true
        }
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
                    values={feederPillar}
                    metricCharts={feederPillarMetricCharts}
                    loadingMetricCharts={loadingFeederPillarMetricChart}
                />
        }
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
        concessionName: state.FeederPillarDetails.concessionName,
        sectionName: state.FeederPillarDetails.sectionName,
        subsectionName: state.FeederPillarDetails.subsectionName,
        feederPillar: state.FeederPillarDetails.feederPillar,
        feederPillarMetricCharts: state.FeederPillarDetails.feederPillarMetricCharts,
        loadingFeederPillarMetricChart: state.FeederPillarDetails.loadingFeederPillarMetricChart,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchFeederPillarDetails: (params) => dispatch(actions.fetchFeederPillarDetails(params)),
        onFetchFeederPillarMetricCharts: () => dispatch(actions.fetchFeederPillarMetricCharts()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeederPillarDetails);