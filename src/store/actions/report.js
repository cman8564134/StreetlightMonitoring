import * as actionTypes from './actionTypes';
import axios from '../../axios-backend';
import { updateObject } from '../../shared/utility';

export const fetchReportSectionNameMapByConcessionIdStart = (type) => {
    return {
        type: type + "_START",
        loading: true
    }
}

export const fetchReportSectionNameMapByConcessionIdSuccess = (sectionNameMap, type) => {
    return {
        type: type + "_SUCCESS",
        loading: false,
        sectionNameMap: sectionNameMap
    }
}

export const fetchReportSectionNameMapByConcessionIdFail = (error, type) => {
    return {
        type: type + "_FAIL",
        loading: false,
        error: error
    }
}

export const fetchReportSectionNameMapByConcessionId =  (params) => {
    return dispatch => {
        dispatch(fetchReportSectionNameMapByConcessionIdStart(params.type));
        
        return axios.post('/getSectionsIdAndNameMapByConcessionId', params)
            .then(response => {
                return Promise.resolve(dispatch(fetchReportSectionNameMapByConcessionIdSuccess(response.data.sections, params.type)));
            })
            .catch(error => {
                console.log(error);
                dispatch(fetchReportSectionNameMapByConcessionIdFail(error, params.type));
            }); 
    }
}

export const fetchSubsectionNameMapBySectionIdStart = (type) => {
    return {
        type: type + "_START",
        loading: true
    }
}

export const fetchSubsectionNameMapBySectionIdSuccess = (subsectionNameMap,type) => {
    return {
        type: type + "_SUCCESS",
        loading: false,
        subsectionNameMap: subsectionNameMap
    }
}

export const fetchSubsectionNameMapBySectionIdFail = (error, type) => {
    return {
        type: type + "_FAIL",
        loading: false,
        error: error
    }
}

export const fetchSubsectionNameMapBySectionId =  (params) => {
    return dispatch => {
        dispatch(fetchSubsectionNameMapBySectionIdStart(params.type));
        
        return axios.post('/getSubsectionsIdAndNameMapBySectionId', params)
            .then(response => {
                return Promise.resolve(dispatch(fetchSubsectionNameMapBySectionIdSuccess(response.data.subsections, params.type)));
            })
            .catch(error => {
                console.log(error);
                dispatch(fetchSubsectionNameMapBySectionIdFail(error, params.type));
            }); 
    }
}

export const fetchRoadNameMapBySubsectionIdStart = (type) => {
    return {
        type: type + "_START",
        loading: true
    }
}

export const fetchRoadNameMapBySubsectionIdSuccess = (roadNameMap,type) => {
    return {
        type: type + "_SUCCESS",
        loading: false,
        roadNameMap: roadNameMap,
    }
}

export const fetchRoadNameMapBySubsectionIdFail = (error, type) => {
    return {
        type: type + "_FAIL",
        loading: false,
        error: error
    }
}

export const fetchRoadNameMapBySubsectionId =  (params) => {
    return dispatch => {
        dispatch(fetchRoadNameMapBySubsectionIdStart(params.type));
        
        return axios.post('/getRoadsIdAndNameMapBySubsectionId', params)
            .then(response => {
                return Promise.resolve(dispatch(fetchRoadNameMapBySubsectionIdSuccess(response.data.roads, params.type)));
            })
            .catch(error => {
                console.log(error);
                dispatch(fetchRoadNameMapBySubsectionIdFail(error, params.type));
            }); 
    }
}

export const fetchFeederPillarNameMapByRoadIdStart = (type) => {
    return {
        type: type + "_START",
        loading: true
    }
}

export const fetchFeederPillarNameMapByRoadIdSuccess = (feederPillarNameMap, type) => {
    return {
        type: type + "_SUCCESS",
        loading: false,
        feederPillarNameMap: feederPillarNameMap,
    }
}

export const fetchFeederPillarNameMapByRoadIdFail = (error, type) => {
    return {
        type: type + "_FAIL",
        loading: false,
        error: error
    }
}

export const fetchFeederPillarNameMapByRoadId =  (params) => {
    return dispatch => {
        dispatch(fetchFeederPillarNameMapByRoadIdStart(params.type));
        
        return axios.post('/getFeederPillarsIdAndNameMapByRoadId', params)
            .then(response => {
                return Promise.resolve(dispatch(fetchFeederPillarNameMapByRoadIdSuccess(response.data.feederPillars, params.type)));
            })
            .catch(error => {
                console.log(error);
                dispatch(fetchFeederPillarNameMapByRoadIdFail(error, params.type));
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

export const fetchExportableReportDataStart = (fileType) => {
    return {
        type: actionTypes.FETCH_EXPORTABLE_REPORT_DATA_START,
        generatingExcel: fileType === 'excel' ? true : false,
        generatingCSV: fileType === 'csv' ? true : false,
    }
}

export const fetchExportableReportDataSuccess = (reportData, fileName, selectedMetrics, dailyYield) => {
    console.log("fetchExportableReportDataSuccess", dailyYield)
    return {
        type: actionTypes.FETCH_EXPORTABLE_REPORT_DATA_SUCCESS,
        generatingExcel: false,
        generatingCSV: false,
        reportData: reportData,
        fileName: fileName,
        selectedMetrics: selectedMetrics,
        dailyYield: dailyYield
    }
}

export const fetchExportableReportDataFail = (error) => {
    return {
        type: actionTypes.FETCH_EXPORTABLE_REPORT_DATA_FAIL,
        generatingExcel: false,
        generatingCSV: false,
        error: error
    }
}

export const fetchExportableReportData = ( params ) => {
    
    return dispatch => {
        dispatch(fetchExportableReportDataStart(params.exportFileType));

        return getPaginatedExportableData(params)
        .then(response => {
            dispatch(fetchExportableReportDataSuccess(response.metrics, response.fileName, params.selectedMetrics, response.dailyYield));
            return Promise.resolve({isSuccessful: true});
            
        }).catch(error => {
            console.log(error);
            dispatch(fetchExportableReportDataFail(error));
        });  
    }
}

const getPaginatedExportableData = async (params) => {  
    const response = await axios.post('/getExportableReportData', params);
    const data = response.data;
    let metrics = data.metrics;
    let fileName = data.fileName;
    let metricsData = data.metrics.data;
    const dailyYield = data.dailyYield;
    
    if(metrics){
        const currentPage = metrics.current_page;
        if (metrics.last_page > currentPage) {
            const paginatedParams = updateObject(params, {page: currentPage + 1});
            const paginatedData = await getPaginatedExportableData(paginatedParams);
            fileName = paginatedData.fileName;
            metricsData = metricsData.concat(paginatedData.metrics);
        }
    }
    
    const exportableData = {metrics: metricsData, fileName: fileName, dailyYield: dailyYield};

    return exportableData; 
  }