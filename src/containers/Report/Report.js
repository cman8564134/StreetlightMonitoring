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
import { HANDLE_REPORT_INPUT_CHANGED_SUCCESS } from '../../store/actions/actionTypes';

import Layout from '../../hoc/Layout/Layout';
import PageTitle from '../../components/Layout/PageTitle/PageTitle';
import SearchFilters from '../../components/SearchFilters/SearchFilters';
import HighlightsBox from '../../components/Dashboard/HighlightsBox/HighlightsBox';
import CenterProgressCircle from '../../components/Progress/ProgressCircles/CenterProgressCircle/CenterProgressCircle';
import GraphCardTabs from '../../components/Tab/GraphCardTabs/GraphCardTabs';
import { checkFormValidity, formatDateByDateFormat, calculateDifferenceBetweenDates } from "../../shared/utility";

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
        onFetchReportConcessionNameMap,
        onFetchReportSectionNameMapByConcessionId,
        onFetchSubsectionNameMapBySectionId,
        onFetchRoadNameMapBySubsectionId,
        onFetchFeederPillarNameMapByRoadId,
        onHandleInputChanged,
        onFetchReportData,
        onFetchReportChartDataByActiveTab,
        onFetchExportableReportData,
        fileName
    } = props;
    
    const csvLinkRef = useRef();
    const excelLinkRef = useRef();

    useEffect(() => {
        onFetchReportConcessionNameMap();
    }, [
        onFetchReportConcessionNameMap, 
        onFetchReportData,
        activeTab
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
                onFetchReportSectionNameMapByConcessionId({concession_id: value})
                    .then(response => {
                        onHandleInputChanged(type, value, elementRowIndex, elementId, validationRules);
                    });
            break;
            case "section": 
                onFetchSubsectionNameMapBySectionId({section_id: value})
                    .then(response => {
                        onHandleInputChanged(type, value, elementRowIndex, elementId, validationRules);
                    });
            break;
            
            case "subsection": 
                onFetchRoadNameMapBySubsectionId({subsection_id: value})
                    .then(response => {
                        onHandleInputChanged(type, value, elementRowIndex, elementId, validationRules);
                    });
            break;
            case "road": 
                onFetchFeederPillarNameMapByRoadId({road_id: value})
                    .then(response => {
                        onHandleInputChanged(type, value, elementRowIndex, elementId, validationRules);
                    });
            break;

            default:
                onHandleInputChanged(type, value, elementRowIndex, elementId, validationRules);
                break;
                
        }
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
            const diffDays = calculateDifferenceBetweenDates(dateTimeFrom, dateTimeTo);
            const dateTimeFromStr = formatDateByDateFormat(dateTimeFrom, 'y-m-d') + ' 00:00:00';
            const dateTimeToStr = formatDateByDateFormat(dateTimeTo, 'y-m-d') + ' 23:59:59';

            if(diffDays > 10) {
                showToast('Date range should not exceed 10 days when exporting');
            }else {
                onFetchExportableReportData({
                    feederPillarId: feederPillarId,
                    dateTimeFrom: dateTimeFromStr,
                    dateTimeTo: dateTimeToStr
                })
                .then((response) => {
                    if(response.isSuccessful){
                        csvLinkRef.current.link.click();
                    }
                });
            }   
        }
    }

    const onExportExcelHandler = (event) => {
        event.preventDefault();

        const isFormValid = checkFormValidity(searchFilters);

        setIsSearchFilterValid(isFormValid);

        if(isFormValid){
            const filters = searchFilters[0];
            const feederPillarId = filters.feeder_pillar.value;
            const dateTimeFrom = filters.dateRange.value.datePickerFrom.value;
            const dateTimeTo = filters.dateRange.value.datePickerTo.value;
            const diffDays = calculateDifferenceBetweenDates(dateTimeFrom, dateTimeTo);
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
                

            if(diffDays > 10) {
                showToast('Date range should not exceed 10 days when exporting');
            }else {
                onFetchExportableReportData({
                    feederPillarId: feederPillarId,
                    dateTimeFrom: dateTimeFromStr,
                    dateTimeTo: dateTimeToStr,
                    dateStr: dateStr
                })
                .then((response) => {
                    if(response.isSuccessful){
                        excelLinkRef.current.click();
                    }
                });;
            }   
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
        // const viewType = filterElementArray[0].viewBy.value;
        // let dateFrom = formatDateByDateFormat(filterElementArray[0].datePickerFrom.value, "d/m/y");
        // let dateTo = formatDateByDateFormat(filterElementArray[0].datePickerTo.value, "d/m/y");

        // switch(viewType) {
        //     case "MONTH":
        //         dateFrom = formatDateByDateFormat(filterElementArray[0].datePickerFrom.value, "m-y");
        //         break;
        //     case "YEAR":
        //         dateFrom = formatDateByDateFormat(filterElementArray[0].datePickerFrom.value, "y");
        //         break;
        //     default:
        //         break;
        // }

        // let sites = [];

        // const siteOptions = filterElementArray[0].siteOption.value
        // for(let key in siteOptions){
        //     sites.push(siteOptions[key].value);
        // }
        // sites = site != null ? site : sites;

        // const params = {viewType: viewType, dateFrom: dateFrom, dateTo: dateTo, sites: sites, activeTabId: tab != null ? tab : activeTab};

        const isFormValid = checkFormValidity(searchFilters);

        setIsSearchFilterValid(isFormValid);

        if(isFormValid){
            const filters = searchFilters[0];
            const feederPillarId = filters.feeder_pillar.value;
            const dateTimeFrom = filters.dateRange.value.datePickerFrom.value;
            const dateTimeTo = filters.dateRange.value.datePickerTo.value;
            const diffDays = calculateDifferenceBetweenDates(dateTimeFrom, dateTimeTo);
            const dateTimeFromStr = formatDateByDateFormat(dateTimeFrom, 'y-m-d') + ' 00:00:00';
            const dateTimeToStr = formatDateByDateFormat(dateTimeTo, 'y-m-d') + ' 23:59:59';

            if(diffDays > 31) {
                showToast('Date range should not exceed 31 days');
            }else {
                onFetchReportData({
                    feederPillarId: feederPillarId,
                    dateTimeFrom: dateTimeFromStr,
                    dateTimeTo: dateTimeToStr,
                    activeTabId: tab != null ? tab : activeTab,
                    chartType: 'realtime'
                });
            }

            
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
            const dateTimeFromStr = formatDateByDateFormat(dateTimeFrom, 'y-m-d') + ' 00:00:00';
            const dateTimeToStr = formatDateByDateFormat(dateTimeTo, 'y-m-d') + ' 23:59:59';
            const diffDays = calculateDifferenceBetweenDates(dateTimeFrom, dateTimeTo);

            if(diffDays > 31) {
                showToast('Date range should not exceed 31 days');
            }else {
                onFetchReportChartDataByActiveTab({
                    feederPillarId: feederPillarId,
                    dateTimeFrom: dateTimeFromStr,
                    dateTimeTo: dateTimeToStr,
                    activeTabId: tab,
                    chartType: 'realtime'
                });
            }
        }
    }


    return (
        <Fragment>
            <Layout {...props}>
                <PageTitle
                    heading = "Report"
                    icon = "pe-7s-home opacity-6"
                ></PageTitle>

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
                                isExportable
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
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchReportConcessionNameMap: () => dispatch(actions.fetchReportConcessionNameMap()),
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