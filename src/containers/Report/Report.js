import React, { Fragment, useEffect, useRef } from "react";

import {
    Container,
    Row,
    Col
} from 'reactstrap';

import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import { HANDLE_REPORT_INPUT_CHANGED_SUCCESS } from '../../store/actions/actionTypes';

import Layout from '../../hoc/Layout/Layout';
import PageTitle from '../../components/Layout/PageTitle/PageTitle';
import SearchFilters from '../../components/SearchFilters/SearchFilters';
import HighlightsBox from '../../components/Dashboard/HighlightsBox/HighlightsBox';
import CenterProgressCircle from '../../components/Progress/ProgressCircles/CenterProgressCircle/CenterProgressCircle';
import GraphCardTabs from '../../components/Tab/GraphCardTabs/GraphCardTabs';

const Report = ( props ) => {
    const {
        searchFilters,
        csvData,
        excelSheets,
        report,
        loadingHighlights,
        activeTab,
        loading,
        graphCardTabsNavItemsArray,
        onFetchReportConcessionNameMap,
        onFetchReportSectionNameMapByConcessionId,
        onFetchSubsectionNameMapBySectionId,
        onFetchFeederPillarNameMapBySubsectionId,
        onHandleInputChanged,
        onFetchElectricityBillCSVData,
        onFetchReportData
    } = props;
    
    const csvLinkRef = useRef();
    const excelLinkRef = useRef();

    useEffect(() => {
        onFetchReportConcessionNameMap();
        onFetchReportData({activeTabId: activeTab});
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
                onFetchReportSectionNameMapByConcessionId()
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
                onFetchFeederPillarNameMapBySubsectionId()
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
        
        const concession_id = searchFilters[0].concession.value;
        onFetchElectricityBillCSVData({concession_id: concession_id})
            .then((response) => {
                if(response.isSuccessful){
                    csvLinkRef.current.link.click();
                }
            });
    }

    const onExportExcelHandler = (event) => {
        event.preventDefault();

        const concession_id = searchFilters[0].concession.value;
        onFetchElectricityBillCSVData({concession_id: concession_id})
            .then((response) => {
                if(response.isSuccessful){
                    excelLinkRef.current.click();
                }
            });
    }

    const highlightsHeaders = [
        {header: "Power Usage", iconBgClassName: "icon-wrapper-bg opacity-5 bg-info", iconClassName: "pe-7s-gleam text-dark opacity-8" , accessor: "power_usage"},
        {header: "Uptime %", iconBgClassName: "icon-wrapper-bg opacity-5 bg-success", iconClassName: "lnr-checkmark-circle text-dark opacity-8", accessor: "uptime_percentage"},
        {header: "Downtime %", iconBgClassName: "icon-wrapper-bg opacity-5 bg-danger", iconClassName: "lnr-warning text-dark opacity-8", accessor: "downtime_percentage"},
        {header: "Electrical Bill", iconBgClassName: "icon-wrapper-bg opacity-5 bg-primary", iconClassName: "lnr-chart-bars text-dark opacity-8", accessor: "electrical_bill"},
        {header: "Carbon Footprint", iconBgClassName: "icon-wrapper-bg opacity-7 bg-success", iconClassName: "lnr-leaf text-dark opacity-8", accessor: "carbon_footprint"},
        {header: "Energy Savings", iconBgClassName: "icon-wrapper-bg opacity-5 bg-warning", iconClassName: "pe-7s-calculator text-dark opacity-8", accessor: "energy_savings"},
    ]
    
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
        
        onFetchReportData({activeTabId: tab != null ? tab : activeTab});
    };

    const toggleGraphCardTabsHandler = (tab) => {

        onApplyFilterHandler(null, tab)
    }


    return (
        <Fragment>
            <Layout {...props}>
                <PageTitle
                    heading = "Report"
                    icon = "pe-7s-home opacity-6"
                />

                <Container fluid>
                    <Row>
                        <Col md="12" lg="12" xl="12">
                            <SearchFilters 
                                filterElementArray={searchFilters}
                                inputChangedHandler={inputChangedHandler}
                                loading={false}
                                onApplyFilterHandler={()=>null}
                                onExportCSVHandler={onExportCSVHandler}
                                csvLinkRef={csvLinkRef}
                                csvData={csvData}
                                excelLinkRef={excelLinkRef}
                                onExportExcelHandler={onExportExcelHandler}
                                excelSheets={excelSheets}
                                isExportable
                            />
                        
                        </Col>
                    </Row>

                    <Row>
                        <Col md="12" lg="12" xl="12">
                            <HighlightsBox
                                highlightsHeaders={highlightsHeaders}
                                values={report}
                                loading={loadingHighlights}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12" lg="9" xl="9">
                            <GraphCardTabs 
                                activeTab={activeTab}
                                toggleTabHandler={toggleGraphCardTabsHandler}
                                navItemsArray={graphCardTabsNavItemsArray}
                                loading={loading}
                            />
                        </Col>
                        <Col md="12" lg="3" xl="3">
                            <Row>
                                <Col md="12" lg="12" xl="12">
                                    <CenterProgressCircle 
                                        percent={100}
                                        trailColor="#cceff5"
                                        color="#0bb3cd"
                                        subheading="Uptime"
                                        value={`${50}/${50}`}
                                        loading={false}
                                    />
                                </Col>
                                <Col md="12" lg="12" xl="12">
                                    <CenterProgressCircle 
                                        percent={0}
                                        trailColor="#cceff5"
                                        color="#0bb3cd"
                                        subheading="Failure"
                                        value={`${0}/${50}`}
                                        loading={false}
                                    />
                                </Col>

                            </Row>
                        </Col>
                    </Row>
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
        csvData: state.ElectricityBill.csvData,
        excelSheets: state.ElectricityBill.excelSheets,
        activeTab: state.Report.activeTab,
        loading: state.Report.loading,
        graphCardTabsNavItemsArray: state.Report.graphCardTabsNavItemsArray
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchReportConcessionNameMap: () => dispatch(actions.fetchReportConcessionNameMap()),
        onFetchReportSectionNameMapByConcessionId: () => dispatch(actions.fetchReportSectionNameMapByConcessionId()),
        onFetchSubsectionNameMapBySectionId: (params) => dispatch(actions.fetchSubsectionNameMapBySectionId(params)),
        onFetchFeederPillarNameMapBySubsectionId: () => dispatch(actions.fetchFeederPillarNameMapBySubsectionId()),
        onHandleInputChanged: (type, value, elementRowIndex, elementId, validationRules) => dispatch(actions.handleInputChanged(type, value, elementRowIndex, elementId, validationRules)),
        onFetchElectricityBillCSVData: (params) => dispatch(actions.fetchElectricityBillCSVData(params)),
        onFetchReportData: (params) => dispatch(actions.fetchReportData(params))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Report);