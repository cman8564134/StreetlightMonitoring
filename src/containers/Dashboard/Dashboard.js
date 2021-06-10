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
        onFetchConcessionsPowerUsageSummaryChart,
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
            dataKey: ['total_yield'], 
            chartType: "daily", 
            chartId: "power_quality",
            startType: actionTypes.FETCH_CONCESSIONS_POWER_QUALITY_SUMMARY_CHART_START,
            successType: actionTypes.FETCH_CONCESSIONS_POWER_QUALITY_SUMMARY_CHART_SUCCESS,
            failType: actionTypes.FETCH_CONCESSIONS_POWER_QUALITY_SUMMARY_CHART_FAIL,
            formulaType: 'electricityBill'
        });
        onFetchConcessionsPowerUsageSummaryChart({
            isRefresh: isRefresh, 
            dateTimeFrom: dateFrom, 
            dateTimeTo: dateTo, 
            dataKey: ['total_yield'], 
            chartType: "daily", 
            chartId: "power_usage",
            startType: actionTypes.FETCH_CONCESSIONS_POWER_USAGE_SUMMARY_CHART_START,
            successType: actionTypes.FETCH_CONCESSIONS_POWER_USAGE_SUMMARY_CHART_SUCCESS,
            failType: actionTypes.FETCH_CONCESSIONS_POWER_USAGE_SUMMARY_CHART_FAIL,
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
                dataKey: ['total_yield'], 
                chartType: "daily", 
                chartId: "power_quality",
                startType: actionTypes.FETCH_CONCESSIONS_POWER_QUALITY_SUMMARY_CHART_START,
                successType: actionTypes.FETCH_CONCESSIONS_POWER_QUALITY_SUMMARY_CHART_SUCCESS,
                failType: actionTypes.FETCH_CONCESSIONS_POWER_QUALITY_SUMMARY_CHART_FAIL,
                formulaType: 'electricityBill'
            });
            onFetchConcessionsPowerUsageSummaryChart({
                isRefresh: isRefresh, 
                dateTimeFrom: dateFrom, 
                dateTimeTo: dateTo, 
                dataKey: ['total_yield'], 
                chartType: "daily", 
                chartId: "power_usage",
                startType: actionTypes.FETCH_CONCESSIONS_POWER_USAGE_SUMMARY_CHART_START,
                successType: actionTypes.FETCH_CONCESSIONS_POWER_USAGE_SUMMARY_CHART_SUCCESS,
                failType: actionTypes.FETCH_CONCESSIONS_POWER_USAGE_SUMMARY_CHART_FAIL,
            });
        }, 30000);

        return () => clearInterval(interval);
    }, [
        onFetchConcessions,
        onFetchConcessionsSummary, 
        onFetchConcessionsPowerQualitySummaryChart,
        onFetchConcessionsPowerUsageSummaryChart,
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
        {header: "Accumulated Total Power Consumption", iconBgClassName: "icon-wrapper-bg opacity-5 bg-info", iconClassName: "pe-7s-gleam text-dark opacity-8" , accessor: "power_usage", prefix: "", suffix: " KWh", accessor2: "daily_yield", prefix2: "", suffix2: " KWh (Daily)", subtitle2: "7a.m to 7a.m"},
        {header: "Accumulated Carbon Footprint", iconBgClassName: "icon-wrapper-bg opacity-7 bg-success", iconClassName: "lnr-leaf text-dark opacity-8", accessor: "carbon_footprint_kg" , prefix: "", suffix: " KG",  accessor2: "carbon_footprint_metric_ton", prefix2: "", suffix2: " Metric Ton"},
        {header: "Monthly Electricity Bill", iconBgClassName: "icon-wrapper-bg opacity-5 bg-primary", iconClassName: "lnr-chart-bars text-dark opacity-8", accessor: "electricity_bill", prefix: "RM ", suffix: "", accessor2: "energy_savings", prefix2: "", suffix2: "", subtitle2: "Energy Savings"},
        {header: "Total Current In Use Now", iconBgClassName: "icon-wrapper-bg opacity-5 bg-warning", iconClassName: "pe-7s-gleam text-dark opacity-8", accessor: "total_current_in_use", prefix: "", suffix: " A"},
        
    ]
    
    const concessionsHighlightsHeaders = [
        {header: "Total Power Consumption", iconBgClassName: "icon-wrapper-bg opacity-5 bg-info", iconClassName: "pe-7s-gleam text-dark opacity-8" , accessor: "power_usage", prefix: "", suffix: " KWh"},
        {header: "Uptime (Lamp Up / Total Lamp)", iconBgClassName: "icon-wrapper-bg opacity-5 bg-success", iconClassName: "lnr-checkmark-circle text-dark opacity-8", accessor: "uptime_percentage_text", prefix: "", suffix: ""},
        {header: "Monthly Electricity Bill", iconBgClassName: "icon-wrapper-bg opacity-5 bg-primary", iconClassName: "lnr-chart-bars text-dark opacity-8", accessor: "electricity_bill", prefix: "RM ", suffix: ""},
        {header: "Accumulated Carbon Footprint", iconBgClassName: "icon-wrapper-bg opacity-7 bg-success", iconClassName: "lnr-leaf text-dark opacity-8", accessor: "carbon_footprint_kg", prefix: "", suffix: " KG"},
        {header: "Energy Savings", iconBgClassName: "icon-wrapper-bg opacity-5 bg-warning", iconClassName: "pe-7s-calculator text-dark opacity-8", accessor: "energy_savings", prefix: "", suffix: " KWh"},
        {header: "Total Current In Use Now", iconBgClassName: "icon-wrapper-bg opacity-5 bg-warning", iconClassName: "pe-7s-gleam text-dark opacity-8", accessor: "total_current_in_use", prefix: "", suffix: " A"},
    ]

    const summaryTabLargeTitleTabs = [
        {
            subheading: "Total Power Consumption", 
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
        },
        {
            subheading: "Electricity Bill", 
            value: concessionsSummary.electricity_bill, 
            suffix: "", 
            children: <BasicApexChart 
                        loading={loadingPowerQualityChart}
                        options={summaryChart[0].power_quality.chart_options} 
                        series={summaryChart[0].power_quality.chart_series} 
                        type="bar" 
                        width="100%" 
                        height="440px"
                        />
        },
        
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
                    Header: 'Total Power Consumption (KWh)',
                    accessor: 'power_usage'
                },                
                {
                    Header: 'Uptime (Lamp Up / Total Lamp)',
                    Cell: row => {
                            return row.original.total_active_streetlights + "/" + row.original.total_streetlights
                        }
                },
                {
                    Header: 'Downtime (Lamp Down / Total Lamp)',
                    Cell: row => {
                        return row.original.total_inactive_streetlights + "/" + row.original.total_streetlights
                    }
                },
                {
                    Header: 'Monthly Electricity Bill (RM)',
                    accessor: 'electricity_bill'
                },
                {
                    Header: 'Accumulated Carbon Footprint (KG)',
                    accessor: 'carbon_footprint_kg'
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
        onFetchConcessionsPowerUsageSummaryChart: (params) => dispatch(actions.fetchConcessionsPowerUsageSummaryChart(params)),
        onFetchConcessionsWeeklyElectricityBillChart: (params) => dispatch(actions.fetchConcessionsWeeklyElectricityBillChart(params)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);