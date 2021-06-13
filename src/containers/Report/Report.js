import React, { Fragment, useEffect, useRef, useState } from "react";

import {
    Container,
    Row,
    Col
} from 'reactstrap';

import { connect } from 'react-redux';

import {
    toast,
    ToastContainer
} from 'react-toastify';

import * as actions from '../../store/actions/index';
import { HANDLE_REPORT_INPUT_CHANGED_SUCCESS, FETCH_REPORT_CONCESSION_NAME_MAP_SUCCESS, FETCH_REPORT_METRIC_FILTERS_CHANGED_SUCCESS } from '../../store/actions/actionTypes';

import Layout from '../../hoc/Layout/Layout';
import PageTitle from '../../components/Layout/PageTitle/PageTitle';
import SearchFilters from '../../components/SearchFilters/SearchFilters';
import HighlightsBox from '../../components/Dashboard/HighlightsBox/HighlightsBox';
import CenterProgressCircle from '../../components/Progress/ProgressCircles/CenterProgressCircle/CenterProgressCircle';
import GraphCardTabs from '../../components/Tab/GraphCardTabs/GraphCardTabs';
import { checkFormValidity, formatDateByDateFormat, addDaysToDate, subtractDaysFromDate, getFirstDayOfMonth, getLastDayOfMonth, getFirstDayOfYear, getLastDayOfYear } from "../../shared/utility";
import DatePickerDropdown from "../../components/Form/DatePicker/DatePickerDropdown/DatePickerDropdown";
import ExportDropdown from "../../components/Form/ExportDropdown/ExportDropdown";
import LabelInputFormGroup from "../../components/Form/LabelInputFormGroup/LabelInputFormGroup";

const Report = ( props ) => {
    const {
        searchFilters,
        csvData,
        excelSheets,
        report,
        loadingHighlights,
        activeTab,
        loadingChart,
        graphCardTabsNavItemsArray,
        onFetchConcessionNameMap,
        onFetchReportSectionNameMapByConcessionId,
        onFetchSubsectionNameMapBySectionId,
        onFetchRoadNameMapBySubsectionId,
        onFetchFeederPillarNameMapByRoadId,
        onHandleInputChanged,
        onFetchReportData,
        onFetchReportChartDataByActiveTab,
        onFetchExportableReportData,
        fileName,
        metricFilters,
        selectedMetrics,
        generatingExcel,
        generatingCSV,
    } = props;
    
    const csvLinkRef = useRef();
    const excelLinkRef = useRef();

    useEffect(() => {
        onFetchConcessionNameMap({successType: FETCH_REPORT_CONCESSION_NAME_MAP_SUCCESS});
    }, [
        onFetchConcessionNameMap, 
        // onFetchReportData,
        // activeTab
        // csvLinkRef, 
        // excelLinkRef, 
        // onFetchCostBreakdownBySectionData
    ]);

    const inputChangedHandler = (event, elementRowIndex, elementId, validationRules) => {
        let value = '';
        if(event != null && event.target){
            value = event.target.value;
        }else {
            value = event;
        }

        const type = HANDLE_REPORT_INPUT_CHANGED_SUCCESS;
        
        switch(elementId) {
            case "concession": 
                onFetchReportSectionNameMapByConcessionId({concession_id: value, type: "FETCH_REPORT_SECTION_NAME_MAP"})
                    .then(response => {
                        onHandleInputChanged(type, value, elementRowIndex, elementId, validationRules);
                    });
            break;
            case "section": 
                onFetchSubsectionNameMapBySectionId({section_id: value, type: "FETCH_REPORT_SUBSECTION_NAME_MAP"})
                    .then(response => {
                        onHandleInputChanged(type, value, elementRowIndex, elementId, validationRules);
                    });
            break;
            
            case "subsection": 
                onFetchRoadNameMapBySubsectionId({subsection_id: value, type: "FETCH_REPORT_ROAD_NAME_MAP"})
                    .then(response => {
                        onHandleInputChanged(type, value, elementRowIndex, elementId, validationRules);
                    });
            break;
            case "road": 
                onFetchFeederPillarNameMapByRoadId({road_id: value, type: "FETCH_REPORT_FEEDER_PILLAR_NAME_MAP"})
                    .then(response => {
                        onHandleInputChanged(type, value, elementRowIndex, elementId, validationRules);
                    });
            break;

            default:
                onHandleInputChanged(type, value, elementRowIndex, elementId, validationRules);
                break;
                
        }
    }
    
    const metricFiltersInputChangedHandler = (event, elementRowIndex, elementId, validationRules) => {
        const type = FETCH_REPORT_METRIC_FILTERS_CHANGED_SUCCESS;

        const value = event.target.checked;
        onHandleInputChanged(type, value, elementRowIndex, elementId, validationRules);
    }

    const onExportCSVHandler = (event) => {
        event.preventDefault();
    
        const isFormValid = checkFormValidity(searchFilters);

        setIsSearchFilterValid(isFormValid);

        if(isFormValid){
            const filters = searchFilters[0];
            const feederPillarId = filters.feeder_pillar.value;
            const dateTimeFrom = filters.dateRange.value.datePickerFrom.value;
            const dateTimeTo = filters.dateRange.value.datePickerTo.value;
            const dateTimeFromStr = formatDateByDateFormat(dateTimeFrom, 'y-m-d') + ' 00:00:00';
            const dateTimeToStr = formatDateByDateFormat(dateTimeTo, 'y-m-d') + ' 23:59:59';

        
            onFetchExportableReportData({
                feederPillarId: feederPillarId,
                dateTimeFrom: dateTimeFromStr,
                dateTimeTo: dateTimeToStr,
                selectedMetrics: selectedMetrics,
                exportFileType: 'csv'
            })
            .then((response) => {
                if(response.isSuccessful){
                    csvLinkRef.current.link.click();
                }
            });
             
        }
    }

    const onExportExcelHandler = (event) => {
        event.preventDefault();

        const isFormValid = checkFormValidity(searchFilters);
        let isMetricFiltersSelected = false; 

        if(selectedMetrics.length > 3)
            isMetricFiltersSelected = true;

        setIsSearchFilterValid(isFormValid);

        if(isFormValid && isMetricFiltersSelected){
            const filters = searchFilters[0];
            const feederPillarId = filters.feeder_pillar.value;
            const dateTimeFrom = filters.dateRange.value.datePickerFrom.value;
            const dateTimeTo = filters.dateRange.value.datePickerTo.value;
            const dateTimeFromStr = formatDateByDateFormat(dateTimeFrom, 'y-m-d') + ' 00:00:00';
            const dateTimeToStr = formatDateByDateFormat(dateTimeTo, 'y-m-d') + ' 23:59:59';
            const dateFromStr = formatDateByDateFormat(dateTimeFrom, 'ymd');
            const dateToStr = formatDateByDateFormat(dateTimeTo, 'ymd');
            let dateStr = "";

            if(dateFromStr === dateToStr){
                dateStr = dateFromStr;
            }else {
                dateStr = dateFromStr + '_to_' + dateToStr;
            }
                
            onFetchExportableReportData({
                feederPillarId: feederPillarId,
                dateTimeFrom: dateTimeFromStr,
                dateTimeTo: dateTimeToStr,
                dateStr: dateStr,
                selectedMetrics: selectedMetrics,
                exportFileType: 'excel'
            })
            .then((response) => {
                if(response.isSuccessful){
                    excelLinkRef.current.click();
                }
            });
            
        }

        if(!isMetricFiltersSelected){
            const message = "Please select at least 1 Metric in order to export data";
            showToast(message);
        }
            
    }

    const highlightsHeaders = [
        {header: "Total Power Consumption", iconBgClassName: "icon-wrapper-bg opacity-5 bg-info", iconClassName: "pe-7s-gleam text-dark opacity-8" , accessor: "power_usage"},
        {header: "Electricity Bill", iconBgClassName: "icon-wrapper-bg opacity-5 bg-primary", iconClassName: "lnr-chart-bars text-dark opacity-8", accessor: "electricity_bill"},
        {header: "Carbon Footprint", iconBgClassName: "icon-wrapper-bg opacity-7 bg-success", iconClassName: "lnr-leaf text-dark opacity-8", accessor: "carbon_footprint"},
    ]

    const [isSearchFilterValid, setIsSearchFilterValid] = useState(true);

    const showToast = (message) => toast.error(message,{position: toast.POSITION.BOTTOM_RIGHT});
    
    const onApplyFilterHandler = (site, tab) => {
        const isFormValid = checkFormValidity(searchFilters);

        setIsSearchFilterValid(isFormValid);

        if(isFormValid){
            const filters = searchFilters[0];
            const feederPillarId = filters.feeder_pillar.value;
            const dateTimeFrom = filters.dateRange.value.datePickerFrom.value;
            const dateTimeTo = filters.dateRange.value.datePickerTo.value;
            const viewType = filters.viewBy.value;
            let dateTimeFromStr = formatDateByDateFormat(dateTimeFrom, 'y-m-d') + ' 00:00:00';
            let dateTimeToStr = formatDateByDateFormat(dateTimeTo, 'y-m-d') + ' 23:59:59';
            let chartType = "realtime";

            switch(viewType) {
                case "MONTH":
                    dateTimeFromStr = getFirstDayOfMonth(dateTimeFrom) + ' 00:00:00';
                    dateTimeToStr = getLastDayOfMonth(dateTimeFrom) + ' 23:59:59';
                    chartType = "daily"
                    break;
                case "YEAR":
                    const year = formatDateByDateFormat(dateTimeFrom, "y");
                    dateTimeFromStr = getFirstDayOfYear(year) + ' 00:00:00';
                    dateTimeToStr = getLastDayOfYear(year) + ' 23:59:59'
                    chartType = "monthly"
                    break;
                default:
                    break;
            }

            if(activeTab && activeTab === "dailyYieldTab"){
                chartType = "daily"
            }
        
            onFetchReportData({
                feederPillarId: feederPillarId,
                dateTimeFrom: dateTimeFromStr,
                dateTimeTo: dateTimeToStr,
                activeTabId: tab != null ? tab : activeTab,
                chartType: chartType
            });

            
        }
            
    };

    const toggleGraphCardTabsHandler = (tab) => {

        const isFormValid = checkFormValidity(searchFilters);

        setIsSearchFilterValid(isFormValid);

        if(isFormValid){
            const filters = searchFilters[0];
            const feederPillarId = filters.feeder_pillar.value;
            const dateTimeFrom = filters.dateRange.value.datePickerFrom.value;
            const dateTimeTo = filters.dateRange.value.datePickerTo.value;
            let dateTimeFromStr = formatDateByDateFormat(dateTimeFrom, 'y-m-d') + ' 00:00:00';
            let dateTimeToStr = formatDateByDateFormat(dateTimeTo, 'y-m-d') + ' 23:59:59';
            const viewType = filters.viewBy.value;

            let chartType = "realtime";

            switch(viewType) {
                case "MONTH":
                    dateTimeFromStr = getFirstDayOfMonth(dateTimeFrom) + ' 00:00:00';
                    dateTimeToStr = getLastDayOfMonth(dateTimeFrom) + ' 23:59:59';
                    chartType = "daily"
                    break;
                case "YEAR":
                    const year = formatDateByDateFormat(dateTimeFrom, "y");
                    dateTimeFromStr = getFirstDayOfYear(year) + ' 00:00:00';
                    dateTimeToStr = getLastDayOfYear(year) + ' 23:59:59'
                    chartType = "monthly"
                    break;
                default:
                    break;
            }

            
            onFetchReportChartDataByActiveTab({
                feederPillarId: feederPillarId,
                dateTimeFrom: dateTimeFromStr,
                dateTimeTo: dateTimeToStr,
                activeTabId: tab,
                chartType: chartType
            });
            
        }
    }
    
    return (
        
        <Fragment>
            <Layout {...props}>
                <PageTitle
                    heading = "Report"
                    icon = "pe-7s-home opacity-6"
                >
                    <div className="d-inline-block pr-3">
                        <LabelInputFormGroup 
                            elementRowIndex={0}
                            elementId={searchFilters[0].viewBy.elementId}
                            elementLabel={searchFilters[0].viewBy.elementLabel}
                            elementType={searchFilters[0].viewBy.elementType}
                            elementConfig={searchFilters[0].viewBy.elementConfig} 
                            elementValue={searchFilters[0].viewBy.value}
                            validationRules={searchFilters[0].viewBy.validation}
                            valid={searchFilters[0].viewBy.valid}
                            touched={searchFilters[0].viewBy.touched}
                            errorMessage={searchFilters[0].viewBy.errorMessage}
                            inputChangedHandler={inputChangedHandler}
                        />
                    </div>
                    
                    
                    <DatePickerDropdown 
                        datePickerFrom={searchFilters[0].dateRange.value.datePickerFrom}
                        datePickerTo={searchFilters[0].dateRange.value.datePickerTo}
                        inputChangedHandler={inputChangedHandler}
                        isDateRange={searchFilters[0].dateRange.elementConfig.isDateRange}
                        viewType={searchFilters[0].viewBy.value}
                    />
                    <ExportDropdown 
                        onExportCSVHandler={onExportCSVHandler}
                        csvLinkRef={csvLinkRef}
                        csvData={csvData}
                        excelLinkRef={excelLinkRef}
                        onExportExcelHandler={onExportExcelHandler}
                        excelSheets={excelSheets}
                        fileName={fileName}
                        metricFilters={metricFilters}
                        inputChangedHandler={metricFiltersInputChangedHandler}
                        generatingCSV={generatingCSV}
                        generatingExcel={generatingExcel}
                    />
                </PageTitle>

                <Container fluid>
                    <Row>
                        <Col md="12" lg="12" xl="12">
                            <SearchFilters 
                                filterElementArray={searchFilters}
                                inputChangedHandler={inputChangedHandler}
                                loading={false}
                                onApplyFilterHandler={onApplyFilterHandler}
                                onExportCSVHandler={onExportCSVHandler}
                                csvLinkRef={csvLinkRef}
                                csvData={csvData}
                                excelLinkRef={excelLinkRef}
                                onExportExcelHandler={onExportExcelHandler}
                                excelSheets={excelSheets}
                                isExportable={false}
                                isSearchFilterValid={isSearchFilterValid}
                                fileName={fileName}
                            />
                        
                        </Col>
                    </Row>

                    
                    <Row>
                        <Col md="12" lg="12" xl="12">
                            <GraphCardTabs 
                                activeTab={activeTab}
                                toggleTabHandler={toggleGraphCardTabsHandler}
                                navItemsArray={graphCardTabsNavItemsArray}
                                loading={loadingChart}
                            />
                        </Col>
                    </Row>
                    <ToastContainer autoClose={false}/>
                </Container>
            </Layout>
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        searchFilters: state.Report.searchFilters,
        report: state.Report.report,
        loadingHighlights: state.Report.loadingHighlights,
        csvData: state.Report.csvData,
        excelSheets: state.Report.excelSheets,
        activeTab: state.Report.activeTab,
        loadingChart: state.Report.loadingChart,
        graphCardTabsNavItemsArray: state.Report.graphCardTabsNavItemsArray,
        fileName: state.Report.fileName,
        metricFilters: state.Report.metricFilters,
        selectedMetrics: state.Report.selectedMetrics,
        generatingExcel: state.Report.generatingExcel,
        generatingCSV: state.Report.generatingCSV,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchConcessionNameMap: (params) => dispatch(actions.fetchConcessionNameMap(params)),
        onFetchReportSectionNameMapByConcessionId: (params) => dispatch(actions.fetchReportSectionNameMapByConcessionId(params)),
        onFetchSubsectionNameMapBySectionId: (params) => dispatch(actions.fetchSubsectionNameMapBySectionId(params)),
        onFetchRoadNameMapBySubsectionId: (params) => dispatch(actions.fetchRoadNameMapBySubsectionId(params)),
        onFetchFeederPillarNameMapByRoadId: (params) => dispatch(actions.fetchFeederPillarNameMapByRoadId(params)),
        onHandleInputChanged: (type, value, elementRowIndex, elementId, validationRules) => dispatch(actions.handleInputChanged(type, value, elementRowIndex, elementId, validationRules)),
        onFetchReportData: (params) => dispatch(actions.fetchReportData(params)),
        onFetchReportChartDataByActiveTab: (params) => dispatch(actions.fetchReportChartDataByActiveTab(params)),
        onFetchExportableReportData: (params) => dispatch(actions.fetchExportableReportData(params)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Report);