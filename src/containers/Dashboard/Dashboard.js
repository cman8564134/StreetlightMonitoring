import React, { Fragment, useEffect } from "react";

import {
    faHome
} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {
    Container
} from 'reactstrap';

import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import * as actionTypes from '../../store/actions/actionTypes';
import { getCurrentDateTimeInDBFormat, subtractDaysFromDate, formatDateByDateFormat } from '../../shared/utility';

import Layout from '../../hoc/Layout/Layout';
import PageTitle from '../../components/Layout/PageTitle/PageTitle';
import BasicTab from '../../components/Tab/BasicTab/BasicTab';
import Summary from '../../components/Dashboard/Summary/Summary';
import Concessions from '../../components/Dashboard/Concessions/Concessions';
import BasicApexChart from '../../components/ChartBoxes/ApexChart/BasicApexChart';

const Dashboard = ( props ) => {
    const {
        loadingConcessionsTable,
        concessions,
        concessionsChart,
        loadingSummaryHighlights,
        concessionsSummary,
        loadingPowerQualityChart,
        summaryChart,
        loadingElectricityBillChart,
        onFetchConcessions,
        onFetchConcessionsSummary,
        onFetchConcessionsPowerQualitySummaryChart,
        onFetchConcessionsWeeklyElectricityBillChart
    } = props;
    
    useEffect(() => {
        let dateTo = getCurrentDateTimeInDBFormat("y-m-d h:m:i");
        const dateFrom = formatDateByDateFormat(subtractDaysFromDate(dateTo, 6), 'y-m-d') + ' 00:00:00';
        let isRefresh = false;
        
        onFetchConcessionsSummary({isRefresh: isRefresh});
        onFetchConcessions({isRefresh: isRefresh});
        onFetchConcessionsPowerQualitySummaryChart({
            isRefresh: isRefresh, 
            dateTimeFrom: dateFrom, 
            dateTimeTo: dateTo, 
            dataKey: ['thdc1'], 
            chartType: "daily", 
            chartId: "power_usage",
            startType: actionTypes.FETCH_CONCESSIONS_POWER_QUALITY_SUMMARY_CHART_START,
            successType: actionTypes.FETCH_CONCESSIONS_POWER_QUALITY_SUMMARY_CHART_SUCCESS,
            failType: actionTypes.FETCH_CONCESSIONS_POWER_QUALITY_SUMMARY_CHART_FAIL,
        });

    onFetchConcessionsWeeklyElectricityBillChart({isRefresh: isRefresh, dateTimeFrom: dateFrom, dateTimeTo: dateTo, chartType: 'daily', dataKey: ['thdc1']});

        const interval = setInterval(() => {
            dateTo = getCurrentDateTimeInDBFormat("y-m-d h:m:i");
            isRefresh = true;
            onFetchConcessionsSummary({isRefresh: isRefresh});
            onFetchConcessions({isRefresh: isRefresh});
            onFetchConcessionsPowerQualitySummaryChart({
                isRefresh: isRefresh, 
                dateTimeFrom: dateFrom, 
                dateTimeTo: dateTo, 
                dataKey: ['thdc1'], 
                chartType: "daily", 
                chartId: "power_usage",
                startType: actionTypes.FETCH_CONCESSIONS_POWER_QUALITY_SUMMARY_CHART_START,
                successType: actionTypes.FETCH_CONCESSIONS_POWER_QUALITY_SUMMARY_CHART_SUCCESS,
                failType: actionTypes.FETCH_CONCESSIONS_POWER_QUALITY_SUMMARY_CHART_FAIL,
            });
        }, 30000);

        return () => clearInterval(interval);
    }, [
        onFetchConcessions,
        onFetchConcessionsSummary, 
        onFetchConcessionsPowerQualitySummaryChart,
        onFetchConcessionsWeeklyElectricityBillChart
    ]);

    const breadcrumbItems = [
        {
            title: "Concessions",
            href: null,
            onClickHandler: null,
            children: (<span><FontAwesomeIcon icon={faHome}/> Concessions</span> ),
            isActive: true
        }
    ]

    const summaryHighlightsHeaders = [
        {header: "Power Usage", iconBgClassName: "icon-wrapper-bg opacity-5 bg-info", iconClassName: "pe-7s-gleam text-dark opacity-8" , accessor: "power_usage", prefix: "", suffix: " KWh"},
        {header: "Accumulated Carbon Footprint", iconBgClassName: "icon-wrapper-bg opacity-7 bg-success", iconClassName: "lnr-leaf text-dark opacity-8", accessor: "carbon_footprint" , prefix: "", suffix: " KG"},
        {header: "Monthly Electricity Bill", iconBgClassName: "icon-wrapper-bg opacity-5 bg-primary", iconClassName: "lnr-chart-bars text-dark opacity-8", accessor: "electricity_bill", prefix: "RM ", suffix: ""},
    ]
    
    const concessionsHighlightsHeaders = [
        {header: "Power Usage", iconBgClassName: "icon-wrapper-bg opacity-5 bg-info", iconClassName: "pe-7s-gleam text-dark opacity-8" , accessor: "power_usage", prefix: "", suffix: " KWh"},
        {header: "Uptime %", iconBgClassName: "icon-wrapper-bg opacity-5 bg-success", iconClassName: "lnr-checkmark-circle text-dark opacity-8", accessor: "uptime_percentage_text", prefix: "", suffix: ""},
        {header: "Monthly Electricity Bill", iconBgClassName: "icon-wrapper-bg opacity-5 bg-primary", iconClassName: "lnr-chart-bars text-dark opacity-8", accessor: "electricity_bill", prefix: "RM ", suffix: ""},
        {header: "Accumulated Carbon Footprint", iconBgClassName: "icon-wrapper-bg opacity-7 bg-success", iconClassName: "lnr-leaf text-dark opacity-8", accessor: "carbon_footprint", prefix: "", suffix: " KG"},
        {header: "Energy Savings", iconBgClassName: "icon-wrapper-bg opacity-5 bg-warning", iconClassName: "pe-7s-calculator text-dark opacity-8", accessor: "energy_savings", prefix: "", suffix: " KWh"},
    ]

    const summaryTabLargeTitleTabs = [
        {
            heading: "Power Quality", 
            value: concessionsSummary.power_usage, 
            suffix: "KWh", 
            children: <BasicApexChart 
                        loading={loadingPowerQualityChart}
                        options={summaryChart[0].power_usage.chart_options} 
                        series={summaryChart[0].power_usage.chart_series} 
                        type="bar" 
                        width="100%" 
                        height="440px"
                        />
        }
    ];

    const liquidGaugeStartColor = '#8176c3'; 
    const liquidGaugeEndColor = '#8176c3'; 

    const onClickViewDetailsHandler = ( concessionId ) => {
        props.history.push(props.match.url + "/" + concessionId);
    }

    const concessionsTableColumns = [
        {
            columns: [
                {
                    Header: 'Concession',
                    accessor: 'concession_name'
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
                    Header: 'Monthly Electricity Bill (RM)',
                    accessor: 'electricity_bill'
                },
                {
                    Header: 'Accumulated Carbon Footprint (KG)',
                    accessor: 'carbon_footprint'
                },
                {
                    Header: 'Energy Savings (KWh)',
                    accessor: 'energy_savings'
                },
            ]
        }
    ];

    const tabPanes = [
        {
            tab_name: "Summary", 
            children: 
                <Summary
                    loadingHighlights={loadingSummaryHighlights}
                    highlightsHeaders={summaryHighlightsHeaders}
                    values={concessionsSummary}
                    tabs={summaryTabLargeTitleTabs}
                    liquidGaugeStartColor={liquidGaugeStartColor}
                    liquidGaugeEndColor={liquidGaugeEndColor}
                    concessions={concessions}
                    concessionsTableColumns={concessionsTableColumns}
                    loadingConcessionsTable={loadingConcessionsTable}
                />
        },
        {
            tab_name: "Concessions", 
            children: 
                <Concessions 
                    concessions={concessions}
                    loadingConcessionChart={loadingElectricityBillChart}
                    concessionsChart={concessionsChart}
                    highlightsHeaders={concessionsHighlightsHeaders}
                    onClickViewDetailsHandler={onClickViewDetailsHandler}
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
                >
                    <div className="mb-2 mr-2 badge badge-primary">Last Update: {concessionsSummary.created_at}</div>
                </PageTitle>

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
        concessions: state.Concessions.concessions,
        loadingConcessionsTable: state.Concessions.loadingConcessionsTable,
        concessionsChart: state.Concessions.concessionsChart,
        loadingSummaryHighlights: state.Concessions.loadingSummaryHighlights,
        concessionsSummary: state.Concessions.concessionsSummary,
        loadingPowerQualityChart: state.Concessions.loadingPowerQualityChart,
        summaryChart: state.Concessions.summaryChart,
        loadingElectricityBillChart: state.Concessions.loadingElectricityBillChart,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchConcessions: (params) => dispatch(actions.fetchConcessions(params)),
        onFetchConcessionsSummary: (params) => dispatch(actions.fetchConcessionsSummary(params)),
        onFetchConcessionsPowerQualitySummaryChart: (params) => dispatch(actions.fetchConcessionsPowerQualitySummaryChart(params)),
        onFetchConcessionsWeeklyElectricityBillChart: (params) => dispatch(actions.fetchConcessionsWeeklyElectricityBillChart(params)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);