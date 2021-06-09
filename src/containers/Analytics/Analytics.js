import React, { Fragment, useEffect, useState } from "react";

import Layout from '../../hoc/Layout/Layout';

import Loader from "react-loaders";

import * as actions from '../../store/actions/index';
import { connect } from "react-redux";
import { 
    Card, 
    CardHeader, 
    Col,
    Row
} from "reactstrap";
import BasicApexChart from "../../components/ChartBoxes/ApexChart/BasicApexChart";
import PageTitle from '../../components/Layout/PageTitle/PageTitle';
import SearchFilters from "../../components/SearchFilters/SearchFilters";
import BallClipLoader from "../../components/Loader/BallClipRotateMultiple/BallClipRotateMultiple";

import { checkFormValidity, formatDateByDateFormat, getFirstDayOfMonth, getLastDayOfMonth, getFirstDayOfYear, getLastDayOfYear } from "../../shared/utility";

import { HANDLE_ANALYTICS_INPUT_CHANGED_SUCCESS, FETCH_ANALYTICS_CONCESSION_NAME_MAP_SUCCESS } from '../../store/actions/actionTypes';


const Analytics = ( props ) => {

    const {
        loadingImbalanceAmpere,
        onFetchImbalanceAmpereChartData,
        imbalanceAmpereChartData,
        searchFilters,
        onHandleInputChanged,
        onFetchConcessionNameMap,
        onFetchReportSectionNameMapByConcessionId,
        onFetchSubsectionNameMapBySectionId,
        onFetchRoadNameMapBySubsectionId,
        onFetchFeederPillarNameMapByRoadId,
    } = props;

    const [isSearchFilterValid, setIsSearchFilterValid] = useState(true);

    useEffect(() => {
        onFetchConcessionNameMap({successType: FETCH_ANALYTICS_CONCESSION_NAME_MAP_SUCCESS});
    }, [
        onFetchConcessionNameMap,
        onFetchImbalanceAmpereChartData
    ]);

    const inputChangedHandler = (event, elementRowIndex, elementId, validationRules) => {
        let value = '';
        if(event != null && event.target){
            value = event.target.value;
        }else {
            value = event;
        }

        const type = HANDLE_ANALYTICS_INPUT_CHANGED_SUCCESS;

        switch(elementId) {
            case "concession": 
                onFetchReportSectionNameMapByConcessionId({concession_id: value, type: "FETCH_ANALYTICS_SECTION_NAME_MAP"})
                    .then(response => {
                        onHandleInputChanged(type, value, elementRowIndex, elementId, validationRules);
                    });
            break;
            case "section": 
                onFetchSubsectionNameMapBySectionId({section_id: value, type: "FETCH_ANALYTICS_SUBSECTION_NAME_MAP"})
                    .then(response => {
                        onHandleInputChanged(type, value, elementRowIndex, elementId, validationRules);
                    });
            break;
            
            case "subsection": 
                onFetchRoadNameMapBySubsectionId({subsection_id: value, type: "FETCH_ANALYTICS_ROAD_NAME_MAP"})
                    .then(response => {
                        onHandleInputChanged(type, value, elementRowIndex, elementId, validationRules);
                    });
            break;
            case "road": 
                onFetchFeederPillarNameMapByRoadId({road_id: value, type: "FETCH_ANALYTICS_FEEDER_PILLAR_NAME_MAP"})
                    .then(response => {
                        onHandleInputChanged(type, value, elementRowIndex, elementId, validationRules);
                    });
            break;

            default:
                onHandleInputChanged(type, value, elementRowIndex, elementId, validationRules);
                break;
                
        }
    }

    const onApplyFilterHandler = (site, tab) => {
        const isFormValid = checkFormValidity(searchFilters);

        setIsSearchFilterValid(isFormValid);

        if(isFormValid){
            const filters = searchFilters[0];
            const feederPillarId = filters.feeder_pillar.value;
        
            onFetchImbalanceAmpereChartData({
                feederPillarId: feederPillarId,
            });

            
        }
            
    };

    let imbalanceChart = <BallClipLoader/>
    if(!loadingImbalanceAmpere){
        imbalanceChart = (
                            <BasicApexChart 
                            options={imbalanceAmpereChartData.chart_options}
                            series={imbalanceAmpereChartData.chart_series}
                            type="bar"
                            width="100%"
                            height={300}
                        />)
    }

    return (
        <Fragment>
            <Layout {...props}>
                <PageTitle
                        heading = "Analytics"
                        icon = "pe-7s-home opacity-6"
                />
                
                <Row>
                    <Col md="12" lg="12" xl="12">
                        <SearchFilters 
                            filterElementArray={searchFilters}
                            inputChangedHandler={inputChangedHandler}
                            loading={loadingImbalanceAmpere}
                            onApplyFilterHandler={onApplyFilterHandler}
                            onExportCSVHandler={null}
                            csvLinkRef={null}
                            csvData={null}
                            excelLinkRef={null}
                            onExportExcelHandler={null}
                            excelSheets={null}
                            isExportable={false}
                            isSearchFilterValid={isSearchFilterValid}
                            fileName={null}
                        />
                    
                    </Col>
                </Row>
                
                <Row>
                    <Col sm="12" md="12" xl="12">
                        <Card className="mb-3">
                            <CardHeader className="card-header-tab">
                                <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                                    <i className="header-icon lnr-warning icon-gradient bg-warm-flame"> </i>
                                    Unbalanced Cable Stress Detected
                                </div>
                            </CardHeader>
                            <div className="p-2 center-elem w-100">
                                {imbalanceChart}
                            </div>

                            <div className="widget-subheading text-secondary text-center">
                                *Check device
                            </div>
                        </Card>
                    </Col>
                    
                    <Col sm="12" md="12" xl="12">
                        <Card>
                            <div className="float-left mr-3 mb-3">
                                <h1 className="mt-5">
                                    <div className="widget-subheading text-secondary text-center">
                                        <Loader type="ball-pulse"/>
                                        Machine Learning In Progress
                                    </div>
                                </h1>
                            </div>
                        </Card>
                    </Col>
                </Row>
                
            </Layout>
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        imbalanceAmpereChartData: state.Analytics.imbalanceAmpereChartData,
        searchFilters: state.Analytics.searchFilters,
        loadingImbalanceAmpere: state.Analytics.loadingImbalanceAmpere,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchImbalanceAmpereChartData: (params) => dispatch(actions.fetchImbalanceAmpereChartData(params)),
        onHandleInputChanged: (type, value, elementRowIndex, elementId, validationRules) => dispatch(actions.handleInputChanged(type, value, elementRowIndex, elementId, validationRules)),
        onFetchConcessionNameMap: (params) => dispatch(actions.fetchConcessionNameMap(params)),
        onFetchReportSectionNameMapByConcessionId: (params) => dispatch(actions.fetchReportSectionNameMapByConcessionId(params)),
        onFetchSubsectionNameMapBySectionId: (params) => dispatch(actions.fetchSubsectionNameMapBySectionId(params)),
        onFetchRoadNameMapBySubsectionId: (params) => dispatch(actions.fetchRoadNameMapBySubsectionId(params)),
        onFetchFeederPillarNameMapByRoadId: (params) => dispatch(actions.fetchFeederPillarNameMapByRoadId(params)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Analytics);