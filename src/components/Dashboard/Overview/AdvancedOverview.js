import React, { Fragment, useState } from 'react';

import { connect } from 'react-redux';

import {
    Row,
    Col
} from 'reactstrap';

import bg from '../../../assets/images/dropdown-header/city3.jpg';

import * as actions from '../../../store/actions';
import * as actionTypes from '../../../store/actions/actionTypes';
import { getCurrentDateTimeInDBFormat,subtractMinuteFromDateTime, formatDateByDateFormat, subtractDaysFromDate } from '../../../shared/utility';

import ProfileCard from '../../ProfileCard/ProfileCard';
import HighlightsBox from '../HighlightsBox/HighlightsBox';
import LeftProgressCircle from '../../Progress/ProgressCircles/LeftProgressCircle/LeftProgressCircle';
import LeftLiquidGaugeCard from '../../Gauge/Alignment/LeftLiquidGaugeCard/LeftLiquidGaugeCard';
import WeatherWidget from '../../Widgets/WeatherWidget/WeatherWidget';
import WeatherForecastBoxes from '../../Widgets/WeatherWidget/WeatherForecastBoxes/WeatherForecastBoxes';
import SmallTitleTab from '../../Tab/SmallTitleTab/SmallTitleTab';
import BasicApexChart from '../../ChartBoxes/ApexChart/BasicApexChart';

const AdvancedOverview = ( props ) => {
    const {
        loadingHighlights,
        highlightsHeaders,
        highlightValues,
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
        onFetchConcessionRealTimeChart,
        realTimeElectricityBillChartData,
        dailyElectricityBillChartData,
        monthlyElectricityBillChartData,
        onFetchConcessionRealTimeElectricityBillChart
    } = props;

    const profileAttributes = [
        {title: "Location", className: "lnr-license icon-gradient bg-night-fade", accessor: "location"},
        {title: "MBSA", className: "lnr-cog fa-spin icon-gradient bg-happy-itmeo", accessor: "total_sections"},
        {title: "No of Sections", className: "lnr-cloud-upload icon-gradient bg-plum-plate", accessor: "total_subsections"},
        {title: "No of Roads", className: "lnr-cloud-upload icon-gradient bg-plum-plate", accessor: "total_roads"},
        {title: "No of Feeder Pillars", className: "lnr-license text-primary", accessor: "total_feeder_pillar"}
    ]

    const liquidGaugeStartColor = '#8176c3'; 
    const liquidGaugeEndColor = '#8176c3'; 
    const radius = 68;

    const [powerUsageChartActiveTab, setPowerUsageChartActiveTab] = useState('Real Time');
    const [electricityBillChartActiveTab, setElectricityBillChartActiveTab] = useState('Real Time');

    const onTogglePowerUsageChartTab = (tab) => {
        if (powerUsageChartActiveTab !== tab) {
            setPowerUsageChartActiveTab(tab);

            let dateTo = ""
            let dateFrom = "";
            let isRefresh = false; 
            let realTimeChartStartType = "";
            let realTimeChartSuccessType = "";
            let realTimeChartFailType = "";
            let chartType = "";
            const concessions = props.match.params.concessionId;
            const dataKey = ["thdc1"];


            switch(tab) {
                case "Real Time": 
                    chartType = "realtime";
                    dateTo = getCurrentDateTimeInDBFormat("y-m-d h:m:i");
                    dateFrom = formatDateByDateFormat(subtractMinuteFromDateTime(dateTo, 10), 'y-m-d h:m:i');
                    realTimeChartStartType = actionTypes.FETCH_CONCESSION_REAL_TIME_POWER_USAGE_CHART_START;
                    realTimeChartSuccessType = actionTypes.FETCH_CONCESSION_REAL_TIME_POWER_USAGE_CHART_SUCCESS;
                    realTimeChartFailType = actionTypes.FETCH_CONCESSION_REAL_TIME_POWER_USAGE_CHART_FAIL;
                    break;
                
                case "Daily": 
                    chartType = "daily";
                    dateTo = getCurrentDateTimeInDBFormat("y-m-d h:m:i");
                    dateFrom = formatDateByDateFormat(subtractDaysFromDate(dateTo, 6), 'y-m-d') + ' 00:00:00';
                    realTimeChartStartType = actionTypes.FETCH_CONCESSION_DAILY_POWER_USAGE_CHART_START;
                    realTimeChartSuccessType = actionTypes.FETCH_CONCESSION_DAILY_POWER_USAGE_CHART_SUCCESS;
                    realTimeChartFailType = actionTypes.FETCH_CONCESSION_DAILY_POWER_USAGE_CHART_FAIL;
                    break;
                
                case "Monthly": 
                    chartType = "monthly";
                    dateTo = getCurrentDateTimeInDBFormat("y-m-d h:m:i");
                    dateFrom = formatDateByDateFormat(new Date(dateTo), 'y') + '-01-01 00:00:00';
                    realTimeChartStartType = actionTypes.FETCH_CONCESSION_MONTHLY_POWER_USAGE_CHART_START;
                    realTimeChartSuccessType = actionTypes.FETCH_CONCESSION_MONTHLY_POWER_USAGE_CHART_SUCCESS;
                    realTimeChartFailType = actionTypes.FETCH_CONCESSION_MONTHLY_POWER_USAGE_CHART_FAIL;
                    break;
                default: 
                    
            }

            onFetchConcessionRealTimeChart({
                isRefresh: isRefresh, 
                dateTimeFrom: dateFrom, 
                dateTimeTo: dateTo, 
                dataKey: dataKey, 
                chartType: chartType, 
                chartId: 'power_usage',
                concessions: [concessions],
                startType: realTimeChartStartType,
                successType: realTimeChartSuccessType,
                failType: realTimeChartFailType,
            });
        }
    }
    
    const onToggleElectricityBillChartTab = (tab) => {
        if (electricityBillChartActiveTab !== tab) {
            setElectricityBillChartActiveTab(tab);

            let dateTo = ""
            let dateFrom = "";
            let isRefresh = false; 
            let realTimeChartStartType = "";
            let realTimeChartSuccessType = "";
            let realTimeChartFailType = "";
            let chartType = "";
            const concessions = props.match.params.concessionId;
            const dataKey = ["thdc1"];


            switch(tab) {
                case "Real Time": 
                    chartType = "realtime";
                    dateTo = getCurrentDateTimeInDBFormat("y-m-d h:m:i");
                    dateFrom = formatDateByDateFormat(subtractMinuteFromDateTime(dateTo, 10), 'y-m-d h:m:i');
                    realTimeChartStartType = actionTypes.FETCH_CONCESSION_REAL_TIME_ELECTRICITY_BILL_CHART_START;
                    realTimeChartSuccessType = actionTypes.FETCH_CONCESSION_REAL_TIME_ELECTRICITY_BILL_CHART_SUCCESS;
                    realTimeChartFailType = actionTypes.FETCH_CONCESSION_REAL_TIME_ELECTRICITY_BILL_CHART_FAIL;
                    break;
                
                case "Daily": 
                    chartType = "daily";
                    dateTo = getCurrentDateTimeInDBFormat("y-m-d h:m:i");
                    dateFrom = formatDateByDateFormat(subtractDaysFromDate(dateTo, 6), 'y-m-d') + ' 00:00:00';
                    realTimeChartStartType = actionTypes.FETCH_CONCESSION_DAILY_ELECTRICITY_BILL_CHART_START;
                    realTimeChartSuccessType = actionTypes.FETCH_CONCESSION_DAILY_ELECTRICITY_BILL_CHART_SUCCESS;
                    realTimeChartFailType = actionTypes.FETCH_CONCESSION_DAILY_ELECTRICITY_BILL_CHART_FAIL;
                    break;
                
                case "Monthly": 
                    chartType = "monthly";
                    dateTo = getCurrentDateTimeInDBFormat("y-m-d h:m:i");
                    dateFrom = formatDateByDateFormat(new Date(dateTo), 'y') + '-01-01 00:00:00';
                    realTimeChartStartType = actionTypes.FETCH_CONCESSION_MONTHLY_ELECTRICITY_BILL_CHART_START;
                    realTimeChartSuccessType = actionTypes.FETCH_CONCESSION_MONTHLY_ELECTRICITY_BILL_CHART_SUCCESS;
                    realTimeChartFailType = actionTypes.FETCH_CONCESSION_MONTHLY_ELECTRICITY_BILL_CHART_FAIL;
                    break;
                default: 
                    
            }

            onFetchConcessionRealTimeElectricityBillChart({
                isRefresh: isRefresh, 
                dateTimeFrom: dateFrom, 
                dateTimeTo: dateTo, 
                dataKey: dataKey, 
                chartType: chartType, 
                chartId: highlightValues.concession_name,
                concessions: [concessions],
                startType: realTimeChartStartType,
                successType: realTimeChartSuccessType,
                failType: realTimeChartFailType,
            });
        }
    }

    const powerUsageChartTabs = [{
        hourly: {
            tabName: "Real Time", 
            chartTitle: "Total Power Consumption", 
            children: <BasicApexChart 
                        loading={realTimePowerUsageChartData.loading}
                        options={realTimePowerUsageChartData.chart_options} 
                        series={realTimePowerUsageChartData.chart_series} 
                        type="line" 
                        width="100%" 
                        height="330px"
                        />
        },
        daily: {
            tabName: "Daily", 
            chartTitle: "Total Power Consumption", 
            children: <BasicApexChart 
                        loading={dailyPowerUsageChartData.loading}
                        options={dailyPowerUsageChartData.chart_options} 
                        series={dailyPowerUsageChartData.chart_series} 
                        type="line" 
                        width="100%" 
                        height="330px"
                        />
        },
        monthly: {
            tabName: "Monthly", 
            chartTitle: "Total Power Consumption", 
            children: <BasicApexChart 
                        loading={monthlyPowerUsageChartData.loading}
                        options={monthlyPowerUsageChartData.chart_options} 
                        series={monthlyPowerUsageChartData.chart_series} 
                        type="line" 
                        width="100%" 
                        height="330px"
                        />
        },

    }];
    
    const electricityBillChartTabs = [{
        hourly: {
            tabName: "Real Time", 
            chartTitle: "Electricity Bill", 
            children: <BasicApexChart 
                        loading={realTimeElectricityBillChartData.loading}
                        options={realTimeElectricityBillChartData.chart_options} 
                        series={realTimeElectricityBillChartData.chart_series} 
                        type="line" 
                        width="100%" 
                        height="330px"
                        />
        },
        daily: {
            tabName: "Daily", 
            chartTitle: "Electricity Bill", 
            children: <BasicApexChart 
                        loading={dailyElectricityBillChartData.loading}
                        options={dailyElectricityBillChartData.chart_options} 
                        series={dailyElectricityBillChartData.chart_series} 
                        type="line" 
                        width="100%" 
                        height="330px"
                        />
        },
        monthly: {
            tabName: "Monthly", 
            chartTitle: "Electricity Bill", 
            children: <BasicApexChart 
                        loading={monthlyElectricityBillChartData.loading}
                        options={monthlyElectricityBillChartData.chart_options} 
                        series={monthlyElectricityBillChartData.chart_series} 
                        type="line" 
                        width="100%" 
                        height="330px"
                        />
        },

    }];

    return (
        <Fragment>
            <Row>
                <Col md="12" lg="4" xl="3">
                    <ProfileCard 
                        profileHeaderTitle={highlightValues.concession_name}
                        profileBodyTitle="Concession Profile"
                        profileSubtitle=""
                        profileAttributes={profileAttributes}
                        profile={highlightValues}
                        profileHeaderBg={bg}
                    />
                </Col>
                <Col md="12" lg="8" xl="9">
                    <Row>
                        <Col md="12" lg="12" xl="12">
                            <HighlightsBox
                                highlightsHeaders={highlightsHeaders}
                                values={highlightValues}
                                loading={loadingHighlights}
                            />   
                        </Col>
                    </Row>
                    
                    <Row>
                        <Col md="12" lg="4" xl="4">
                            <LeftProgressCircle 
                                percent={highlightValues.uptime_percentage}
                                trailColor="#cceff5"
                                color="#0bb3cd"
                                subheading={'Uptime (Lamp Up / Total Lamp) (' + highlightValues.uptime_percentage +'%)'}
                                value={`${highlightValues.total_active_streetlights}/${highlightValues.total_streetlights} Active`}
                                loading={loadingHighlights}
                                status="success"
                            />
                        </Col>
                        <Col md="12" lg="4" xl="4">
                            <LeftLiquidGaugeCard 
                                gaugePercentage={50}
                                startColor={liquidGaugeStartColor}
                                endColor={liquidGaugeEndColor}
                                subheading="Carbon Footprint Savings"
                                value={highlightValues.carbon_footprint_savings}
                                loading={loadingHighlights}
                                radius={radius}
                            />
                        </Col>
                        <Col md="12" lg="4" xl="4">
                            <LeftLiquidGaugeCard 
                                gaugePercentage={50}
                                startColor={liquidGaugeStartColor}
                                endColor={liquidGaugeEndColor}
                                subheading="Energy Savings"
                                value={highlightValues.energy_savings}
                                loading={loadingHighlights}
                                radius={radius}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12" lg="6" xl="6">
                            <WeatherWidget 
                                loading={loadingWeather}
                                city={city}
                                weatherDate={weatherDate}
                                weatherTime={weatherTime}
                                temperature={temperature}
                                weatherId={weatherId}
                                weatherDesc={weatherDesc}
                            />        
                        </Col>

                        <Col md="12"  lg="6" xl="6">
                            <WeatherForecastBoxes 
                                loading={loadingWeatherForecast}
                                weatherForecasts={weatherForecasts}
                                showOnly={3}
                            />
                        </Col>
                    </Row>
                </Col>
                
                <Col md="12" lg="6" xl="6">
                    <SmallTitleTab 
                        activeTab={powerUsageChartActiveTab}
                        tabs={powerUsageChartTabs}
                        toggleTabHandler={onTogglePowerUsageChartTab}
                    />
                </Col>
                <Col md="12" lg="6" xl="6">
                    <SmallTitleTab 
                        activeTab={electricityBillChartActiveTab}
                        tabs={electricityBillChartTabs}
                        toggleTabHandler={onToggleElectricityBillChartTab}
                    />
                </Col>
            </Row>
        </Fragment>
        
    );
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchConcessionRealTimeChart: (params) => dispatch(actions.fetchConcessionRealTimeChart(params)),
        onFetchConcessionRealTimeElectricityBillChart: (params) => dispatch(actions.fetchConcessionRealTimeElectricityBillChart(params)),
    }
}

export default connect(null, mapDispatchToProps)(AdvancedOverview);