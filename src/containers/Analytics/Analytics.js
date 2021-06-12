import React, { Fragment, useEffect, useState } from "react";

import Layout from '../../hoc/Layout/Layout';

import Loader from "react-loaders";

import * as actions from '../../store/actions/index';

import { connect } from "react-redux";

import { 
    Card, 
    CardHeader, 
    Col,
    Row,
    Button
} from "reactstrap";

import ReactSpeedometer from "react-d3-speedometer"

import BasicApexChart from "../../components/ChartBoxes/ApexChart/BasicApexChart";
import PageTitle from '../../components/Layout/PageTitle/PageTitle';
import SearchFilters from "../../components/SearchFilters/SearchFilters";
import BallClipLoader from "../../components/Loader/BallClipRotateMultiple/BallClipRotateMultiple";



import { checkFormValidity } from "../../shared/utility";

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
        neutralCurrent,
        speedometerText,
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

    const [barChartTitle, setBarChartTitle] = useState(null);
    const [unbalancedAmpereReminder, setUnbalancedAmpereReminder] = useState("");

    const onApplyFilterHandler = (site, tab) => {
        const isFormValid = checkFormValidity(searchFilters);

        setIsSearchFilterValid(isFormValid);

        if(isFormValid){
            const filters = searchFilters[0];
            const feederPillarId = filters.feeder_pillar.value;
        
            onFetchImbalanceAmpereChartData({
                feederPillarId: feederPillarId,
            })
            .then(response => {
                if(response.isUnbalancedAmpere){
                    setBarChartTitle (
                        <Fragment>
                            <i className="header-icon lnr-warning icon-gradient bg-warm-flame"> </i> 
                            Unbalanced Cable Stress Detected
                        </Fragment>
                        
                    );

                    setUnbalancedAmpereReminder("* Check Device");
                }else{
                    setBarChartTitle(null);
                    setUnbalancedAmpereReminder("");
                }
                
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
                    <Col sm="9" md="9" xl="9">
                        <Card className="mb-3">
                            <CardHeader className="card-header-tab">
                                <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                                    {barChartTitle}
                                </div>
                            </CardHeader>
                            <div className="p-2 center-elem w-100">
                                {imbalanceChart}
                            </div>

                            <div className="widget-subheading text-secondary text-center">
                                {unbalancedAmpereReminder}
                            </div>
                        </Card>
                    </Col>

                    <Col sm="3" md="3" xl="3">
                    <Card className="mb-3">
                            <CardHeader className="card-header-tab">
                                <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                                    Neutral Current
                                </div>
                            </CardHeader>
                            <div className="p-2 center-elem w-100">
                                <ReactSpeedometer
                                    value={neutralCurrent}
                                    height={"22"}
                                    currentValueText={speedometerText}
                                    needleColor="black"
                                    minValue={0}
                                    maxValue={30}
                                    customSegmentStops={[0, 5, 10, 15, 20, 30]}
                                    segmentColors={["#BEE6D0", "#67b668", "#FDE26C", "#FFB144", "#CD5C5C", "#D30000"]} 
                                />
                                <div className="mb-2 mr-2 badge badge-pill badge-lightgreen">Good</div>
                                <div className="mb-2 mr-2 badge badge-pill badge-green">Good</div>
                                <div className="mb-2 mr-2 badge badge-pill badge-yellow">Moderate</div>
                                <div className="mb-2 mr-2 badge badge-pill badge-orange">Moderate</div>
                                <div className="mb-2 mr-2 badge badge-pill badge-red">Need Attention</div>
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
        neutralCurrent: state.Analytics.neutralCurrent,
        speedometerText: state.Analytics.speedometerText,
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