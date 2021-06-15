import * as actionTypes from '../actions/actionTypes';
import { 
    updateObject, baseChartSeries, baseChartOptions, generateChartSeriesArray,
    createMasterCodeOptions, 
    updateElementArray, 
    updateElementOptionArray,
    checkValidity,
    updateSubElement
 } from '../../shared/utility';

import {darkRYB} from '../../shared/colors';

const initialState = {
    // imbalanceAmpereChartData: [{
    //     imbalanceAmpere: {
    //         title: "Unbalanced Cable Stress", 
    //         loading: false, 
    //         chart_options: updateObject(baseChartOptions(), {colors: darkRYB, xaxis: {}}), 
    //         chart_series: baseChartSeries(),
    //         chart_type: "bar"
    //     }
    // }]
    loadingImbalanceAmpere: false,
    imbalanceAmpereChartData: {
            title: "Percentage", 
            loading: false, 
            chart_options: updateObject(baseChartOptions(), {colors: darkRYB, xaxis: {}}), 
            chart_series: baseChartSeries(),
            chart_type: "bar"
    },
    searchFilters: [
        {
            concession: {
                elementLabel: 'Concession:',
                elementType: 'select',
                elementConfig: {
                    type: "select",
                    options: []
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                errorMessage: 'Please select Concession'
            },
            section: {
                elementLabel: 'Majlis:',
                elementType: 'select',
                elementConfig: {
                    type: "select",
                    options: []
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                errorMessage: 'Please select Majlis'
            },
            subsection: {
                elementLabel: 'Section:',
                elementType: 'select',
                elementConfig: {
                    type: "select",
                    options: []
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                errorMessage: 'Please select Section'
            },
            road: {
                elementLabel: 'Road:',
                elementType: 'select',
                elementConfig: {
                    type: "select",
                    options: []
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                errorMessage: 'Please select Road'
            },
            feeder_pillar: {
                elementLabel: 'Feeder Pillar:',
                elementType: 'select',
                elementConfig: {
                    type: "select",
                    options: []
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                errorMessage: 'Please select Feeder Pillar'
            }
        }
    ],
    neutralCurrent: 0,
    speedometerText: ""

};

const fetchImbalanceAmpereChartDataStart = ( state, action ) => {
    return updateObject(state, {
        loadingImbalanceAmpere: action.loading,
        neutralCurrent: 0,
        speedometerText: ""
    });
}

const fetchImbalanceAmpereChartDataSuccess = ( state, action ) => {
    const chart = action.chartsData;
    const updatedChartOptions = updateObject(state.imbalanceAmpereChartData.chart_options, 
        {
            labels: chart.labels, 
            tooltip: {
                y: {
                    formatter: function (y, opt) {
                        if(typeof y !== "undefined") {
                            return  y + "%"
                        }
                        return y;

                    }
                }       
            } ,
            dataLabels: {
                formatter: function(val, opt) {
                    return val + "%" 
                }
            },
            yaxis: {
                title: {
                    text: state.imbalanceAmpereChartData.title,
                },
            },

              
        }
    );
    const updatedChartSeries = generateChartSeriesArray(chart.data, chart.series, state.imbalanceAmpereChartData.chart_type, chart.labels, false);
    
    const updatedImbalanceAmpereChartData = updateObject(state.imbalanceAmpereChartData, {
        loadingImbalanceAmpere: action.loading,
        chart_options: updatedChartOptions,
        // chart_series: chart.series
        chart_series: updatedChartSeries
    })
    return updateObject(state, {
        loadingImbalanceAmpere: action.loading,
        imbalanceAmpereChartData: updatedImbalanceAmpereChartData,
        neutralCurrent: action.neutralCurrent,
        speedometerText: action.speedometerText
    });
}

const fetchImbalanceAmpereChartDataFail = ( state, action ) => {
    return updateObject(state, {
        loadingImbalanceAmpere: action.loading
    });
}

const fetchAnalyticsConcessionNameMapSuccess = ( state, action ) => {
    const arrayId = "searchFilters";
    const concessionOptions = createMasterCodeOptions(action.concessionNameMap);
    
    const updatedConcessionObject = {options: concessionOptions};

    const emptyValueObj = {value: "", valid: false, touched: false};

    //CLEAR LOWER LEVEL DROPDOWN VALUE TO ""
    let updatedArray = updateElementArray(state, arrayId, 0, "concession", emptyValueObj);
    updatedArray = updateSubElement(updatedArray, 0, "section", emptyValueObj);
    updatedArray = updateSubElement(updatedArray, 0, "subsection", emptyValueObj);
    updatedArray = updateSubElement(updatedArray, 0, "road", emptyValueObj);
    updatedArray = updateSubElement(updatedArray, 0, "feeder_pillar", emptyValueObj);

    updatedArray = updateElementOptionArray(updatedArray, 0, "concession", "elementConfig", updatedConcessionObject);

    return updateObject(state, {
        [arrayId]: Object.values(updatedArray)
    });
}

const fetchAnalyticsSectionNameMapByConcessionIdSuccess = ( state, action ) => {
    const arrayId = "searchFilters";
    const sectionOptions = createMasterCodeOptions(action.sectionNameMap);
    
    const updatedSectionObject = {options: sectionOptions};

    const emptyValueObj = {value: "", valid: false, touched: false};

    let updatedArray = updateElementArray(state, arrayId, 0, "section", emptyValueObj);
    updatedArray = updateSubElement(updatedArray, 0, "subsection", emptyValueObj);
    updatedArray = updateSubElement(updatedArray, 0, "road", emptyValueObj);
    updatedArray = updateSubElement(updatedArray, 0, "feeder_pillar", emptyValueObj);

    updatedArray = updateElementOptionArray(updatedArray, 0, "section", "elementConfig", updatedSectionObject);

    return updateObject(state, {
        [arrayId]: Object.values(updatedArray)
    });
}

const fetchSubsectionNameMapBySectionIdSuccess = ( state, action ) => {
    const arrayId = "searchFilters";
    const subsectionOptions = createMasterCodeOptions(action.subsectionNameMap);
    const updatedSubsectionObject = {options: subsectionOptions};

    const emptyValueObj = {value: "", valid: false, touched: false};
    
    let updatedArray = updateElementArray(state, arrayId, 0, "subsection", emptyValueObj);
    updatedArray = updateSubElement(updatedArray, 0, "road", emptyValueObj);
    updatedArray = updateSubElement(updatedArray, 0, "feeder_pillar", emptyValueObj);

    updatedArray = updateElementOptionArray(updatedArray, 0, "subsection", "elementConfig", updatedSubsectionObject);
    
    return updateObject(state, {
        [arrayId]: Object.values(updatedArray)
    });
}

const fetchRoadNameMapBySubsectionIdSuccess = ( state, action ) => {
    const arrayId = "searchFilters";
    const roadOptions = createMasterCodeOptions(action.roadNameMap);
    
    const updatedRoadObject = {options: roadOptions};

    const emptyValueObj = {value: "", valid: false, touched: false};

    let updatedArray = updateElementArray(state, arrayId, 0, "road", emptyValueObj);
    updatedArray = updateSubElement(updatedArray, 0, "feeder_pillar", emptyValueObj);

    updatedArray = updateElementOptionArray(updatedArray, 0, "road", "elementConfig", updatedRoadObject);

    return updateObject(state, {
        [arrayId]: Object.values(updatedArray)
    });
}

const fetchFeederPillarNameMapBySubsectionIdSuccess = ( state, action ) => {
    const arrayId = "searchFilters";
    const feederPillarOptions = createMasterCodeOptions(action.feederPillarNameMap);
    
    const updatedFeederPillarObject = {options: feederPillarOptions};

    let updatedArray = updateElementArray(state, arrayId, 0, "feeder_pillar", {value: "", valid: false, touched: false});
    updatedArray = updateElementOptionArray(updatedArray, 0, "feeder_pillar", "elementConfig", updatedFeederPillarObject);

    return updateObject(state, {
        [arrayId]: Object.values(updatedArray)
    });
}

const handleReportInputChanged = ( state, action ) => {
    const value = action.value;
    const elementRowIndex = action.elementRowIndex;
    const elementId = action.elementId; 
    const arrayId = "searchFilters";
    let updatedArray = state[arrayId];
    
    let updatedObject = {
        value: value,
        touched: true
    };

    
    updatedObject = updateObject(updatedObject, {valid: checkValidity(value, updatedArray[elementRowIndex][elementId].validation)})
    updatedArray = updateElementArray(state, arrayId, elementRowIndex, elementId, updatedObject);
    
    const updatedObjectArray= Object.values(updatedArray);

    return updateObject(state, {
        [arrayId]: updatedObjectArray
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_IMBALANCE_AMPERE_START: 
            return fetchImbalanceAmpereChartDataStart(state, action);
        case actionTypes.FETCH_IMBALANCE_AMPERE_SUCCESS: 
            return fetchImbalanceAmpereChartDataSuccess(state, action);
        case actionTypes.FETCH_IMBALANCE_AMPERE_FAIL: 
            return fetchImbalanceAmpereChartDataFail(state, action);
        case actionTypes.FETCH_ANALYTICS_CONCESSION_NAME_MAP_SUCCESS: 
            return fetchAnalyticsConcessionNameMapSuccess(state, action);
        case actionTypes.FETCH_ANALYTICS_SECTION_NAME_MAP_SUCCESS: 
            return fetchAnalyticsSectionNameMapByConcessionIdSuccess(state, action);
        case actionTypes.FETCH_ANALYTICS_SUBSECTION_NAME_MAP_SUCCESS: 
            return fetchSubsectionNameMapBySectionIdSuccess(state, action);
        case actionTypes.FETCH_ANALYTICS_ROAD_NAME_MAP_SUCCESS: 
            return fetchRoadNameMapBySubsectionIdSuccess(state, action);
        case actionTypes.FETCH_ANALYTICS_FEEDER_PILLAR_NAME_MAP_SUCCESS: 
            return fetchFeederPillarNameMapBySubsectionIdSuccess(state, action);
        case actionTypes.HANDLE_ANALYTICS_INPUT_CHANGED_SUCCESS: 
            return handleReportInputChanged(state, action);    
        default:
            return state;
    }
};

export default reducer;