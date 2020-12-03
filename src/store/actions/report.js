import * as actionTypes from './actionTypes';
import axios from '../../axios-backend';

export const fetchReportSectionNameMapByConcessionIdStart = () => {
    return {
        type: actionTypes.FETCH_REPORT_SECTION_NAME_MAP_START,
        loading: true
    }
}

export const fetchReportSectionNameMapByConcessionIdSuccess = (sectionNameMap) => {
    return {
        type: actionTypes.FETCH_REPORT_SECTION_NAME_MAP_SUCCESS,
        loading: false,
        sectionNameMap: sectionNameMap
    }
}

export const fetchReportSectionNameMapByConcessionIdFail = (error) => {
    return {
        type: actionTypes.FETCH_REPORT_SECTION_NAME_MAP_FAIL,
        loading: false,
        error: error
    }
}

export const fetchReportSectionNameMapByConcessionId =  (params) => {
    return dispatch => {
        dispatch(fetchReportSectionNameMapByConcessionIdStart());

        return axios.post('/getSectionsIdAndNameMapByConcessionId', params)
            .then(response => {
                return Promise.resolve(dispatch(fetchReportSectionNameMapByConcessionIdSuccess(response.data.sections[0])));
            })
            .catch(error => {
                console.log(error);
                dispatch(fetchReportSectionNameMapByConcessionIdFail(error));
            }); 
    }
}

export const fetchSubsectionNameMapBySectionIdStart = () => {
    return {
        type: actionTypes.FETCH_REPORT_SUBSECTION_NAME_MAP_START,
        loading: true
    }
}

export const fetchSubsectionNameMapBySectionIdSuccess = (subsectionNameMap) => {
    return {
        type: actionTypes.FETCH_REPORT_SUBSECTION_NAME_MAP_SUCCESS,
        loading: false,
        subsectionNameMap: subsectionNameMap
    }
}

export const fetchSubsectionNameMapBySectionIdFail = (error) => {
    return {
        type: actionTypes.FETCH_REPORT_SUBSECTION_NAME_MAP_FAIL,
        loading: false,
        error: error
    }
}

export const fetchSubsectionNameMapBySectionId =  (params) => {
    return dispatch => {
        dispatch(fetchSubsectionNameMapBySectionIdStart());
        
        return axios.post('/getSubsectionsIdAndNameMapBySectionId', params)
            .then(response => {
                return Promise.resolve(dispatch(fetchSubsectionNameMapBySectionIdSuccess(response.data.subsections[0])));
            })
            .catch(error => {
                console.log(error);
                dispatch(fetchSubsectionNameMapBySectionIdFail(error));
            }); 
    }
}

export const fetchRoadNameMapBySubsectionIdStart = () => {
    return {
        type: actionTypes.FETCH_REPORT_ROAD_NAME_MAP_START,
        loading: true
    }
}

export const fetchRoadNameMapBySubsectionIdSuccess = (roadNameMap) => {
    return {
        type: actionTypes.FETCH_REPORT_ROAD_NAME_MAP_SUCCESS,
        loading: false,
        roadNameMap: roadNameMap,
    }
}

export const fetchRoadNameMapBySubsectionIdFail = (error) => {
    return {
        type: actionTypes.FETCH_REPORT_ROAD_NAME_MAP_FAIL,
        loading: false,
        error: error
    }
}

export const fetchRoadNameMapBySubsectionId =  (params) => {
    return dispatch => {
        dispatch(fetchRoadNameMapBySubsectionIdStart());
        
        return axios.post('/getRoadsIdAndNameMapBySubsectionId', params)
            .then(response => {
                return Promise.resolve(dispatch(fetchRoadNameMapBySubsectionIdSuccess(response.data.roads[0])));
            })
            .catch(error => {
                console.log(error);
                dispatch(fetchRoadNameMapBySubsectionIdFail(error));
            }); 
    }
}

export const fetchFeederPillarNameMapByRoadIdStart = () => {
    return {
        type: actionTypes.FETCH_REPORT_FEEDER_PILLAR_NAME_MAP_START,
        loading: true
    }
}

export const fetchFeederPillarNameMapByRoadIdSuccess = (feederPillarNameMap) => {
    return {
        type: actionTypes.FETCH_REPORT_FEEDER_PILLAR_NAME_MAP_SUCCESS,
        loading: false,
        feederPillarNameMap: feederPillarNameMap,
    }
}

export const fetchFeederPillarNameMapByRoadIdFail = (error) => {
    return {
        type: actionTypes.FETCH_REPORT_FEEDER_PILLAR_NAME_MAP_FAIL,
        loading: false,
        error: error
    }
}

export const fetchFeederPillarNameMapByRoadId =  (params) => {
    return dispatch => {
        dispatch(fetchFeederPillarNameMapByRoadIdStart());
        
        return axios.post('/getFeederPillarsIdAndNameMapByRoadId', params)
            .then(response => {
                return Promise.resolve(dispatch(fetchFeederPillarNameMapByRoadIdSuccess(response.data.feederPillars[0])));
            })
            .catch(error => {
                console.log(error);
                dispatch(fetchFeederPillarNameMapByRoadIdFail(error));
            }); 
    }
}

export const fetchReportDataStart = () => {
    return {
        type: actionTypes.FETCH_REPORT_DATA_START,
        loading: true
    }
}

export const fetchReportDataSuccess = (feederPillar, reportData, activeTab) => {
    return {
        type: actionTypes.FETCH_REPORT_DATA_SUCCESS,
        loading: false,
        feederPillar: feederPillar,
        reportData: reportData,
        activeTab: activeTab
    }
}

export const fetchReportDataFail = (error) => {
    return {
        type: actionTypes.FETCH_REPORT_DATA_FAIL,
        loading: false,
        error: error
    }
}

export const fetchReportData = ( params ) => {
    
    return dispatch => {
        dispatch(fetchReportDataStart());    

        return axios.post('/getReportMetricsAndChartDataByFeederPillarIdAndDateRange', params)
            .then(response => {
                dispatch(fetchReportDataSuccess(response.data.feederPillar, response.data.chartData, params.activeTabId));
            })
            .catch(error => {
                console.log(error);
                dispatch(fetchReportDataFail(error));
            });  
    }
}

export const fetchReportChartDataByActiveTabStart = () => {
    return {
        type: actionTypes.FETCH_REPORT_CHART_DATA_BY_ACTIVE_TAB_START,
        loading: true
    }
}

export const fetchReportChartDataByActiveTabSuccess = (reportData, activeTab) => {
    return {
        type: actionTypes.FETCH_REPORT_CHART_DATA_BY_ACTIVE_TAB_SUCCESS,
        loading: false,
        reportData: reportData,
        activeTab: activeTab
    }
}

export const fetchReportChartDataByActiveTabFail = (error) => {
    return {
        type: actionTypes.FETCH_REPORT_CHART_DATA_BY_ACTIVE_TAB_FAIL,
        loading: false,
        error: error
    }
}

export const fetchReportChartDataByActiveTab = ( params ) => {
    
    return dispatch => {
        dispatch(fetchReportChartDataByActiveTabStart());    


        return axios.post('/getReportChartDataByActiveTabId', params)
            .then(response => {
                dispatch(fetchReportChartDataByActiveTabSuccess(response.data.chartData, params.activeTabId));
            })
            .catch(error => {
                console.log(error);
                dispatch(fetchReportChartDataByActiveTabFail(error));
            });  

        
    }
}

export const fetchExportableReportDataStart = () => {
    return {
        type: actionTypes.FETCH_EXPORTABLE_REPORT_DATA_START,
        loading: true
    }
}

export const fetchExportableReportDataSuccess = (reportData, fileName) => {
    return {
        type: actionTypes.FETCH_EXPORTABLE_REPORT_DATA_SUCCESS,
        loading: false,
        reportData: reportData,
        fileName: fileName
    }
}

export const fetchExportableReportDataFail = (error) => {
    return {
        type: actionTypes.FETCH_EXPORTABLE_REPORT_DATA_FAIL,
        loading: false,
        error: error
    }
}

export const fetchExportableReportData = ( params ) => {
    
    return dispatch => {
        dispatch(fetchExportableReportDataStart());    


        return axios.post('/getExportableReportData', params)
            .then(response => {
                dispatch(fetchExportableReportDataSuccess(response.data.metrics, response.data.fileName));

                return Promise.resolve({isSuccessful: true});
            })
            .catch(error => {
                console.log(error);
                dispatch(fetchExportableReportDataFail(error));
            });  

        
    }
}