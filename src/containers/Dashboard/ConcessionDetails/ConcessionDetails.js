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

import * as actions from '../../../store/actions/index';
import * as actionTypes from '../../../store/actions/actionTypes';

import Layout from '../../../hoc/Layout/Layout';
import PageTitle from '../../../components/Layout/PageTitle/PageTitle';
import BasicTab from '../../../components/Tab/BasicTab/BasicTab';
import DataTable from '../../../components/Tables/DataTable/DataTable';
import AdvancedOverview from "../../../components/Dashboard/Overview/AdvancedOverview";
import { getCurrentDateTimeInDBFormat, subtractMinuteFromDateTime, formatDateByDateFormat } from "../../../shared/utility";

const ConcessionDetails = ( props ) => {
    const {
        onFetchConcessionDetails,
        concession,
        loadingHighlights,
        sectionsTableData,
        loadingSectionsTable,
        onFetchSectionsByConcession,
        onFetchConcessionRealTimeChart,
        onFetchWeather,
        onFetchWeatherForecast,
        loadingWeather,
        city,
        weatherDate,
        weatherTime,
        temperature,
        weatherId,
        weatherDesc,
        loadingWeatherForecast,
        weatherForecasts,
        realTimePowerUsageChartData,
        dailyPowerUsageChartData,
        monthlyPowerUsageChartData,
        realTimeElectricityBillChartData,
        dailyElectricityBillChartData,
        monthlyElectricityBillChartData,
        onFetchConcessionRealTimeElectricityBillChart
    } = props;

    useEffect(() => {
        const concessionId = props.match.params.concessionId;

        let dateTo = getCurrentDateTimeInDBFormat("y-m-d h:m:i");
        let dateFrom = formatDateByDateFormat(subtractMinuteFromDateTime(dateTo, 10), 'y-m-d h:m:i');
        let isRefresh = false; 
        
        const realTimePowerUsageChartStartType = actionTypes.FETCH_CONCESSION_REAL_TIME_POWER_USAGE_CHART_START;
        const realTimePowerUsageChartSuccessType = actionTypes.FETCH_CONCESSION_REAL_TIME_POWER_USAGE_CHART_SUCCESS;
        const realTimePowerUsageChartFailType = actionTypes.FETCH_CONCESSION_REAL_TIME_POWER_USAGE_CHART_FAIL;
        const realTimeElectricityBillChartStartType = actionTypes.FETCH_CONCESSION_REAL_TIME_ELECTRICITY_BILL_CHART_START;
        const realTimeElectricityBillChartSuccessType = actionTypes.FETCH_CONCESSION_REAL_TIME_ELECTRICITY_BILL_CHART_SUCCESS;
        const realTimeElectricityBillChartFailType = actionTypes.FETCH_CONCESSION_REAL_TIME_ELECTRICITY_BILL_CHART_FAIL;

        onFetchConcessionDetails({isRefresh: isRefresh, concessionId: concessionId});
        onFetchSectionsByConcession({concessionId: concessionId});
        onFetchConcessionRealTimeChart({
            isRefresh: isRefresh, 
            dateTimeFrom: dateFrom, 
            dateTimeTo: dateTo, 
            dataKey: ['thdc1'], 
            chartType: 'realtime', 
            chartId: 'power_usage',
            concessions: [concessionId],
            startType: realTimePowerUsageChartStartType,
            successType: realTimePowerUsageChartSuccessType,
            failType: realTimePowerUsageChartFailType,
        });
        onFetchConcessionRealTimeElectricityBillChart({
            isRefresh: isRefresh, 
            dateTimeFrom: dateFrom, 
            dateTimeTo: dateTo, 
            dataKey: ['thdc1'], 
            chartType: 'realtime', 
            chartId: concession.concession_name,
            concessions: [concessionId],
            startType: realTimeElectricityBillChartStartType,
            successType: realTimeElectricityBillChartSuccessType,
            failType: realTimeElectricityBillChartFailType,
        });
        onFetchWeather();
        onFetchWeatherForecast();

        const interval = setInterval(() => {
            dateTo = getCurrentDateTimeInDBFormat("y-m-d h:m:i");
            dateFrom = formatDateByDateFormat(subtractMinuteFromDateTime(dateTo, 10), 'y-m-d h:m:i');
            isRefresh = true; 
    
            const realTimePowerUsageChartStartType = actionTypes.FETCH_CONCESSION_REAL_TIME_POWER_USAGE_CHART_START;
            const realTimePowerUsageChartSuccessType = actionTypes.FETCH_CONCESSION_REAL_TIME_POWER_USAGE_CHART_SUCCESS;
            const realTimePowerUsageChartFailType = actionTypes.FETCH_CONCESSION_REAL_TIME_POWER_USAGE_CHART_FAIL;
            const realTimeElectricityBillChartStartType = actionTypes.FETCH_CONCESSION_REAL_TIME_ELECTRICITY_BILL_CHART_START;
            const realTimeElectricityBillChartSuccessType = actionTypes.FETCH_CONCESSION_REAL_TIME_ELECTRICITY_BILL_CHART_SUCCESS;
            const realTimeElectricityBillChartFailType = actionTypes.FETCH_CONCESSION_REAL_TIME_ELECTRICITY_BILL_CHART_FAIL;
    
            onFetchConcessionDetails({isRefresh: isRefresh, concessionId: concessionId});

            onFetchConcessionRealTimeChart({
                isRefresh: isRefresh, 
                dateTimeFrom: dateFrom, 
                dateTimeTo: dateTo, 
                dataKey: ['thdc1'], 
                chartType: 'realtime', 
                chartId: 'power_usage',
                concessions: [concessionId],
                startType: realTimePowerUsageChartStartType,
                successType: realTimePowerUsageChartSuccessType,
                failType: realTimePowerUsageChartFailType
            });
    
            onFetchConcessionRealTimeElectricityBillChart({
                isRefresh: isRefresh, 
                dateTimeFrom: dateFrom, 
                dateTimeTo: dateTo, 
                dataKey: ['thdc1'], 
                chartType: 'realtime', 
                chartId: concession.concession_name,
                concessions: [concessionId],
                startType: realTimeElectricityBillChartStartType,
                successType: realTimeElectricityBillChartSuccessType,
                failType: realTimeElectricityBillChartFailType,
            });
        }, 30000);

        return () => clearInterval(interval);

    }, [
        props.match.params.concessionId, 
        concession.concession_name,
        onFetchConcessionDetails, 
        onFetchSectionsByConcession, 
        onFetchConcessionRealTimeChart,
        onFetchConcessionRealTimeElectricityBillChart,
        onFetchWeather,
        onFetchWeatherForecast
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
                    Header: 'Electrical Bill (Monthly)',
                    accessor: 'electricity_bill'
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
                    accessor: 'section_id',
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
        {header: "Electrical Bill", iconBgClassName: "icon-wrapper-bg opacity-5 bg-primary", iconClassName: "lnr-chart-bars text-dark opacity-8", accessor: "electricity_bill"},
        {header: "Carbon Footprint", iconBgClassName: "icon-wrapper-bg opacity-7 bg-success", iconClassName: "lnr-leaf text-dark opacity-8", accessor: "carbon_footprint"},
    ]

    const tabPanes = [
        {
            tab_name: "Overview", 
            children: 
                <AdvancedOverview
                    {...props}
                    highlightsHeaders={highlightsHeaders}
                    loadingHighlights={loadingHighlights}
                    highlightValues={concession}
                    loadingWeather={loadingWeather}
                    city={city}
                    weatherDate={weatherDate}
                    weatherTime={weatherTime}
                    temperature={temperature}
                    weatherId={weatherId}
                    weatherDesc={weatherDesc}
                    loadingWeatherForecast={loadingWeatherForecast}
                    weatherForecasts={weatherForecasts}
                    realTimePowerUsageChartData={realTimePowerUsageChartData}
                    dailyPowerUsageChartData={dailyPowerUsageChartData}
                    monthlyPowerUsageChartData={monthlyPowerUsageChartData}
                    realTimeElectricityBillChartData={realTimeElectricityBillChartData}
                    dailyElectricityBillChartData={dailyElectricityBillChartData}
                    monthlyElectricityBillChartData={monthlyElectricityBillChartData}
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
        loadingWeather: state.ConcessionDetails.loadingWeather,
        city: state.ConcessionDetails.city,
        weatherDate: state.ConcessionDetails.weatherDate,
        weatherTime: state.ConcessionDetails.weatherTime,
        temperature: state.ConcessionDetails.temperature,
        weatherId: state.ConcessionDetails.weatherId,
        weatherDesc: state.ConcessionDetails.weatherDesc,
        loadingWeatherForecast: state.ConcessionDetails.loadingWeatherForecast,
        weatherForecasts: state.ConcessionDetails.weatherForecasts,
        realTimePowerUsageChartData: state.ConcessionDetails.realTimePowerUsageChartData,
        dailyPowerUsageChartData: state.ConcessionDetails.dailyPowerUsageChartData,
        monthlyPowerUsageChartData: state.ConcessionDetails.monthlyPowerUsageChartData,
        realTimeElectricityBillChartData: state.ConcessionDetails.realTimeElectricityBillChartData,
        dailyElectricityBillChartData: state.ConcessionDetails.dailyElectricityBillChartData,
        monthlyElectricityBillChartData: state.ConcessionDetails.monthlyElectricityBillChartData,
        
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchConcessionDetails: (concessionId) => dispatch(actions.fetchConcessionDetails(concessionId)),
        onFetchSectionsByConcession: (params) => dispatch(actions.fetchSectionsByConcession(params)),
        onFetchConcessionRealTimeChart: (params) => dispatch(actions.fetchConcessionRealTimeChart(params)),
        onFetchConcessionRealTimeElectricityBillChart: (params) => dispatch(actions.fetchConcessionRealTimeElectricityBillChart(params)),
        onFetchWeather: () => dispatch(actions.fetchWeather()),
        onFetchWeatherForecast: () => dispatch(actions.fetchWeatherForecast()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConcessionDetails);