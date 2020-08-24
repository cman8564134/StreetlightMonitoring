import * as actionTypes from '../actions/actionTypes';

import { 
    updateObject, 
    createMasterCodeOptions, 
    updateElementArray, 
    updateElementOptionArray,
    baseChartOptions,
    baseChartSeries,
    updateChart
} from '../../shared/utility';

const initialState = {
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
                valid: true,
                touched: false,
                errorMessage: ''
            },
            section: {
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
                valid: true,
                touched: false,
                errorMessage: ''
            },
            subsection: {
                elementLabel: 'Subsection:',
                elementType: 'select',
                elementConfig: {
                    type: "select",
                    options: []
                },
                value: '',
                validation: {
                    required: true
                },
                valid: true,
                touched: false,
                errorMessage: ''
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
                valid: true,
                touched: false,
                errorMessage: ''
            },
            dateRange: {
                elementLabel: '',
                elementType: 'datePickerDropdown',
                elementConfig: {
                    type: "datePickerDropdown",
                    isDateRange: true,
                    viewBy: {value: "WEEK"}
                },
                value: {
                    datePickerFrom: {
                        elementId: 'datePickerFrom',
                        elementRowIndex: 0,
                        elementLabel: 'Date Picker From',
                        elementType: 'datePicker',
                        elementConfig: {
                            type: "datePicker",
                            dateFormat: "dd/MM/yyyy",
                            showMonthYearPicker: false,
                            showYearPicker: false,
                            selectsStart: true,
                            selectsEnd: false
                        },
                        value: new Date(),
                        validation: {
                            required: true
                        },
                        valid: true,
                        touched: false,
                        errorMessage: ''
                    },
                    datePickerTo: {
                        elementId: 'datePickerTo',
                        elementRowIndex: 0,
                        elementLabel: 'Date Picker To',
                        elementType: 'datePicker',
                        elementConfig: {
                            type: "datePicker",
                            dateFormat: "dd/MM/yyyy",
                            showMonthYearPicker: false,
                            showYearPicker: false,
                            selectsStart: false,
                            selectsEnd: true
                        },
                        value: new Date(),
                        validation: {
                            required: false
                        },
                        valid: true,
                        touched: false,
                        errorMessage: ''
                    }
                },
                validation: {
                    required: true
                },
                valid: true,
                touched: false,
                errorMessage: ''
            }
        }
    ],
    csvData: [],
    excelSheets: [
        {
            "Electricity Billing": {
                data: [],
                columns: [
                    {label: "Concession", accessor: "concession_name"},
                    {label: "Section", accessor: "section_name"},
                    {label: "Bill Date", accessor: "bill_date"},
                    {label: "Bill Amount", accessor: "bill_amount"},
                    {label: "Consumption", accessor: "consumption"},
                    {label: "Imbalance Cost Pass Through", accessor: "icpt"},
                    {label: "Current Month Usage", accessor: "current_month_usage"},
                    {label: "6% GST", accessor: "gst"},
                    {label: "Feed In Tariff", accessor: "feed_in_tariff"},
                    {label: "Total Cost Per Night", accessor: "total_cost_per_night"},
                    {label: "Total Cost Per Year", accessor: "total_cost_per_year"},
                    {label: "Total Energy Per Night", accessor: "total_energy_per_night"},
                    {label: "Total Energy Per Year", accessor: "total_energy_per_year"},
                ]
            }
        }
    ],
    report: {id: 1, concession_name: "ABC Sdn Bhd", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
    activeTab: "powerUsageTab",
    graphCardTabsNavItemsArray: [{
        powerUsageTab: {navTitle: "POWER USAGE", chart_options: {...baseChartOptions()}, chart_series: [...baseChartSeries()]},
        electricityBillTab: {navTitle: "ELECTRICITY BILL", chart_options: {...baseChartOptions()}, chart_series: [...baseChartSeries()]},
        carbonFootprintTab: {navTitle: "CARBON FOOTPRINT", chart_options: {...baseChartOptions()}, chart_series: [...baseChartSeries()]},
        energySavingsTab: {navTitle: "ENERGY SAVINGS", chart_options: {...baseChartOptions()}, chart_series: [...baseChartSeries()]},
        amperageTab: {navTitle: "AMPERAGE", chart_options: {...baseChartOptions()}, chart_series: [...baseChartSeries()]},
        voltageTab: {navTitle: "VOLTAGE", chart_options: {...baseChartOptions()}, chart_series: [...baseChartSeries()]},
    }],
};

const fetchReportConcessionNameMapSuccess = ( state, action ) => {
    const arrayId = "searchFilters";
    const concessionOptions = createMasterCodeOptions(action.concessionNameMap);
    
    const updatedConcessionObject = {options: concessionOptions};

    const updatedArray = updateElementOptionArray(state[arrayId], 0, "concession", "elementConfig", updatedConcessionObject);

    return updateObject(state, {
        [arrayId]: Object.values(updatedArray)
    });
}

const fetchReportSectionNameMapByConcessionIdSuccess = ( state, action ) => {
    const arrayId = "searchFilters";
    const sectionOptions = createMasterCodeOptions(action.sectionNameMap);
    
    const updatedSectionObject = {options: sectionOptions};

    const updatedArray = updateElementOptionArray(state[arrayId], 0, "section", "elementConfig", updatedSectionObject);

    return updateObject(state, {
        [arrayId]: Object.values(updatedArray)
    });
}

const fetchSubsectionNameMapBySectionIdSuccess = ( state, action ) => {
    const arrayId = "searchFilters";
    const subsectionOptions = createMasterCodeOptions(action.subsectionNameMap);
    
    const updatedSubsectionObject = {options: subsectionOptions};

    const updatedArray = updateElementOptionArray(state[arrayId], 0, "subsection", "elementConfig", updatedSubsectionObject);

    return updateObject(state, {
        [arrayId]: Object.values(updatedArray)
    });
}

const fetchFeederPillarNameMapBySubsectionIdSuccess = ( state, action ) => {
    const arrayId = "searchFilters";
    const feederPillarOptions = createMasterCodeOptions(action.feederPillarNameMap);
    
    const updatedFeederPillarObject = {options: feederPillarOptions};

    const updatedArray = updateElementOptionArray(state[arrayId], 0, "feeder_pillar", "elementConfig", updatedFeederPillarObject);

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
    
    const updatedObject = {
        value: value,
        touched: true,
        valid: true
    };

    if(elementId === "datePickerFrom" || elementId === "datePickerTo"){
        const updatedDatePickerValue = updateObject(updatedArray[elementRowIndex]["dateRange"]["value"][elementId], updatedObject);
        updatedArray = updateElementOptionArray(updatedArray, elementRowIndex, "dateRange", "value", {
            [elementId]: updatedDatePickerValue
        });        
    } else{
        updatedArray = updateElementArray(state, arrayId, elementRowIndex, elementId, updatedObject);
    }

    console.log("updatedArray", updatedArray);
    const updatedObjectArray= Object.values(updatedArray);

    return updateObject(state, {
        [arrayId]: updatedObjectArray
    });
}

const fetchReportDataStart = ( state, action ) => {
    return updateObject(state, {
        loading: action.loading
    });
}

const fetchReportDataSuccess = ( state, action ) => {
    const activeTab = action.activeTab;
    const reportData = action.reportData;
    

    const updatedGraphCardTabsArray = updateChart(state.graphCardTabsNavItemsArray, activeTab, reportData.graphLabels, reportData.graphData, reportData.graphSeries);
    const updatedGraphCardTabsAtIndex = updateObject(state.graphCardTabsNavItemsArray[0], {[activeTab]: updatedGraphCardTabsArray});
    

    const updatedGraphCardTabs = state.graphCardTabsNavItemsArray.map((item, index) => {
        if(index === 0){
            return updatedGraphCardTabsAtIndex;
        }

        return item[index];
    })

    return updateObject(state, {
        loading: action.loading,
        activeTab: activeTab,
        graphCardTabsNavItemsArray: updatedGraphCardTabs
    });
}

const fetchReportDataFail = ( state, action ) => {
    return updateObject(state, {
        loading: action.loading
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_REPORT_CONCESSION_NAME_MAP_SUCCESS: 
            return fetchReportConcessionNameMapSuccess(state, action);
        case actionTypes.FETCH_REPORT_SECTION_NAME_MAP_SUCCESS: 
            return fetchReportSectionNameMapByConcessionIdSuccess(state, action);
        case actionTypes.FETCH_REPORT_SUBSECTION_NAME_MAP_SUCCESS: 
            return fetchSubsectionNameMapBySectionIdSuccess(state, action);
        case actionTypes.FETCH_REPORT_FEEDER_PILLAR_NAME_MAP_SUCCESS: 
            return fetchFeederPillarNameMapBySubsectionIdSuccess(state, action);
        case actionTypes.HANDLE_REPORT_INPUT_CHANGED_SUCCESS: 
            return handleReportInputChanged(state, action);
        case actionTypes.FETCH_REPORT_DATA_START: 
            return fetchReportDataStart(state, action);
        case actionTypes.FETCH_REPORT_DATA_SUCCESS: 
            return fetchReportDataSuccess(state, action);
        case actionTypes.FETCH_REPORT_DATA_FAIL: 
            return fetchReportDataFail(state, action);
        // case actionTypes.FETCH_ELECTRICITY_BILL_CSV_DATA_SUCCESS: 
        //     return fetchElectricityBillCSVDataSuccess(state, action);
        default:
            return state;
    }
};

export default reducer;