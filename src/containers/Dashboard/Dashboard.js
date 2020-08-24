import React, { Fragment } from "react";

import {
    faHome
} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {
    Container,
    Row,
    Col
} from 'reactstrap';

import { connect } from 'react-redux';

// import * as actions from '../../store/actions/index';
// import * as actionTypes from '../../store/actions/actionTypes';

import Layout from '../../hoc/Layout/Layout';
import Concession from '../../components/Dashboard/Concession/Concession';
import PageTitle from '../../components/Layout/PageTitle/PageTitle';

const Dashboard = ( props ) => {
    const {
        concessions,
        concessionsChart
    } = props;
    
    const breadcrumbItems = [
        {
            title: "Concessions",
            href: null,
            onClickHandler: null,
            children: (<span><FontAwesomeIcon icon={faHome}/> Concessions</span> ),
            isActive: true
        }
    ]

    const onClickViewDetailsHandler = ( concessionId ) => {
        props.history.push(props.match.url + "/" + concessionId);
    }
    

    const highlightsHeaders = [
        {header: "Power Usage", iconBgClassName: "icon-wrapper-bg opacity-5 bg-info", iconClassName: "pe-7s-gleam text-dark opacity-8" , accessor: "power_usage"},
        {header: "Uptime %", iconBgClassName: "icon-wrapper-bg opacity-5 bg-success", iconClassName: "lnr-checkmark-circle text-dark opacity-8", accessor: "uptime_percentage"},
        {header: "Downtime %", iconBgClassName: "icon-wrapper-bg opacity-5 bg-danger", iconClassName: "lnr-warning text-dark opacity-8", accessor: "downtime_percentage"},
        {header: "Electrical Bill", iconBgClassName: "icon-wrapper-bg opacity-5 bg-primary", iconClassName: "lnr-chart-bars text-dark opacity-8", accessor: "electrical_bill"},
        {header: "Carbon Footprint", iconBgClassName: "icon-wrapper-bg opacity-7 bg-success", iconClassName: "lnr-leaf text-dark opacity-8", accessor: "carbon_footprint"},
        {header: "Energy Savings", iconBgClassName: "icon-wrapper-bg opacity-5 bg-warning", iconClassName: "pe-7s-calculator text-dark opacity-8", accessor: "energy_savings"},
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
                    <Row>
                        {concessions.map((concession) => {
                            return (
                                <Col key={concession.id} md="6" lg="6" xl="6">
                                    <Concession
                                        concession={concession}
                                        highlightsHeaders={highlightsHeaders}
                                        concessionChart={concessionsChart[concession.id]}
                                        onClickViewDetailsHandler={onClickViewDetailsHandler}
                                    />
                                </Col>
                            )
                        })}
                    </Row>
                    
                </Container>
            </Layout>
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        concessions: state.Concessions.concessions,
        concessionsChart: state.Concessions.concessionsChart,
    }
}

const mapDispatchToProps = dispatch => {
    return {
       
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);