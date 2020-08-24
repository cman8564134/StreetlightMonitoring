import * as actionTypes from './actionTypes';

export const fetchReportConcessionNameMapStart = () => {
    return {
        type: actionTypes.FETCH_REPORT_CONCESSION_NAME_MAP_START,
        loading: true
    }
}

export const fetchReportConcessionNameMapSuccess = (concessionNameMap) => {
    return {
        type: actionTypes.FETCH_REPORT_CONCESSION_NAME_MAP_SUCCESS,
        loading: false,
        concessionNameMap: concessionNameMap
    }
}

export const fetchReportConcessionNameMapFail = (error) => {
    return {
        type: actionTypes.FETCH_REPORT_CONCESSION_NAME_MAP_FAIL,
        loading: false,
        error: error
    }
}

export const fetchReportConcessionNameMap =  () => {
    return dispatch => {
        dispatch(fetchReportConcessionNameMapStart());

        const concessionNameMap = {
                1: "ABC Sdn Bhd",
                2: "DEF Sdn Bhd",
                3: "GHI Sdn Bhd",
                4: "JKL Sdn Bhd",
            };
        
        dispatch(fetchReportConcessionNameMapSuccess(concessionNameMap));
    }
}


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

export const fetchReportSectionNameMapByConcessionId =  () => {
    return dispatch => {
        dispatch(fetchReportSectionNameMapByConcessionIdStart());
        
        const sectionNameMap = {
            1: "Section 1",
            2: "Section 2",
            3: "Section 3",
            4: "Section 4"
        };

        return Promise.resolve(dispatch(fetchReportSectionNameMapByConcessionIdSuccess(sectionNameMap)));
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
        
        const subsectionNameMap = {
            1: {
                1: "Subsection 1/1",
                2: "Subsection 1/2",
                3: "Subsection 1/3",
                4: "Subsection 1/4",
            },
            2: {
                5: "Subsection 2/1",
                6: "Subsection 2/2",
                7: "Subsection 2/3",
                8: "Subsection 2/4",
            },
            3: {
                9: "Subsection 3/1",
                10: "Subsection 3/2",
                11: "Subsection 3/3",
                12: "Subsection 3/4",
            },
            4: {
                13: "Subsection 4/1",
                14: "Subsection 4/2",
                15: "Subsection 4/3",
                16: "Subsection 4/4",
            }
        }

        return Promise.resolve(dispatch(fetchSubsectionNameMapBySectionIdSuccess(subsectionNameMap[params.section_id])));
    }
}

export const fetchFeederPillarNameMapBySubsectionIdStart = () => {
    return {
        type: actionTypes.FETCH_REPORT_FEEDER_PILLAR_NAME_MAP_START,
        loading: true
    }
}

export const fetchFeederPillarNameMapBySubsectionIdSuccess = (feederPillarNameMap) => {
    return {
        type: actionTypes.FETCH_REPORT_FEEDER_PILLAR_NAME_MAP_SUCCESS,
        loading: false,
        feederPillarNameMap: feederPillarNameMap,
    }
}

export const fetchFeederPillarNameMapBySubsectionIdFail = (error) => {
    return {
        type: actionTypes.FETCH_REPORT_FEEDER_PILLAR_NAME_MAP_FAIL,
        loading: false,
        error: error
    }
}

export const fetchFeederPillarNameMapBySubsectionId =  () => {
    return dispatch => {
        dispatch(fetchFeederPillarNameMapBySubsectionIdStart());
        
        const feederPillarNameMap = {
            1: "Feeder Pillar 1",
            2: "Feeder Pillar 2",
            3: "Feeder Pillar 3",
            4: "Feeder Pillar 4"
        };
        return Promise.resolve(dispatch(fetchFeederPillarNameMapBySubsectionIdSuccess(feederPillarNameMap)));
    }
}

export const fetchReportDataStart = () => {
    return {
        type: actionTypes.FETCH_REPORT_DATA_START,
        loading: true
    }
}

export const fetchReportDataSuccess = (reportData, activeTab) => {
    return {
        type: actionTypes.FETCH_REPORT_DATA_SUCCESS,
        loading: false,
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

        let graphSeries = [];
        let graphData = [[2000, 2100,2050,1800,2200,2100,2000]];
        
        switch(params.activeTabId) {
            case 'powerUsageTab': 
                graphSeries = ["Power Usage"];
                break;
            case 'electricityBillTab': 
                graphSeries = ["Electricity Bill"];
                break;
            case 'carbonFootprintTab': 
                graphSeries = ["Carbon Footprint"];
                break;
            case 'energySavingsTab': 
                graphSeries = ["Energy Savings"];
                break;
            case 'amperageTab': 
                graphSeries = ["Amperage P1", "Amperage P2", "Amperage P3"];
                graphData = [[10000, 11000,12050,8000,7200,7100,12000],[9080, 10000,12000,9000,7000,6900,11000],[9000, 9800,11800,8900,7010,5900,11090]];
                break;
            case 'voltageTab': 
                graphSeries = ["Voltage P1", "Voltage P2", "Voltage P3"];
                graphData = [[10000, 11000,12050,8000,7200,7100,12000],[9080, 10000,12000,9000,7000,6900,11000],[9000, 9800,11800,8900,7010,5900,11090]];
                break;
            default: 
                break;
        }

        const data = {
            graphLabels: ["1/7/2020", "2/7/2020", "3/7/2020", "4/7/2020", "5/7/2020", "6/7/2020", "7/7/2020"],
            graphData: graphData,
            graphSeries: graphSeries
        };
        dispatch(fetchReportDataSuccess(data, params.activeTabId));
    }
}