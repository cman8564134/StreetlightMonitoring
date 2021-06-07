import * as actionTypes from '../actions/actionTypes';
import { 
    updateObject, 
    createMasterCodeOptions, 
    updateElementArray, 
    updateElementOptionArray 
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
                valid: false,
                touched: false,
                errorMessage: 'Please select Concession'
            },
            dateRange: {
                elementLabel: '',
                elementType: 'datePickerDropdown',
                elementConfig: {
                    type: "datePickerDropdown",
                    isDateRange: false,
                    viewBy: {value: "DAY"},
                    isHide: true
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
            },
            viewBy: {
                elementId: 'viewBy',
                elementRowIndex: 0,
                elementLabel: 'View By:',
                elementType: 'select',
                elementConfig: {
                    type: "select",
                    options: [
                        {value: "DAY", displayValue: "DAY"}, 
                        {value: "MONTH", displayValue: "MONTH"},
                        {value: "YEAR", displayValue: "YEAR"},
                    ],
                    // options: [],
                    isHide: true
                },
                value: 'DAY',
                validation: {
                    required: true
                },
                valid: true,
                touched: false,
                errorMessage: ''
            },
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
    costVariables:
        [
            {
                consumption: {
                    elementLabel: 'Consumption (kWh)',
                    elementType: 'input',
                    elementConfig: {
                        type: "number",
                        readonly: true
                    },
                    value: "557.36",
                    validation: {
                        required: true
                    },
                    valid: true,
                    touched: false,
                    errorMessage: ''
                },
                cost: {
                    elementLabel: 'Cost = Consumption X 0.192 (RM)',
                    elementType: 'input',
                    elementConfig: {
                        type: "number",
                        readonly: true
                    },
                    value: "107.01",
                    validation: {
                        required: true
                    },
                    valid: true,
                    touched: false,
                    errorMessage: ''
                }
            },
            {
                icpt: {
                    elementLabel: 'Imbalance Cost Pass-Through (ICPT) = Cost X 0.0152 (RM)',
                    elementType: 'input',
                    elementConfig: {
                        type: "number",
                        readonly: true
                    },
                    value: "8.47",
                    validation: {
                        required: true
                    },
                    valid: true,
                    touched: false,
                    errorMessage: ''
                },
                current_month_usage: {
                    elementLabel: 'Current Month Usage = Cost - ICPT',
                    elementType: 'input',
                    elementConfig: {
                        type: "number",
                        readonly: true
                    },
                    value: "98.54",
                    validation: {
                        required: true
                    },
                    valid: true,
                    touched: false,
                    errorMessage: ''
                }

            },
            {
                gst: {
                    elementLabel: 'GST = Current Month Usage * 6%',
                    elementType: 'input',
                    elementConfig: {
                        type: "number",
                        readonly: true
                    },
                    value: "5.91",
                    validation: {
                        required: true
                    },
                    valid: true,
                    touched: false,
                    errorMessage: ''
                },
                feed_in_tariff: {
                    elementLabel: 'Feed-In Tariff  = Cost X 1.6% (RM)',
                    elementType: 'input',
                    elementConfig: {
                        type: "number",
                        readonly: true
                    },
                    value: "1.71",
                    validation: {
                        required: true
                    },
                    valid: true,
                    touched: false,
                    errorMessage: ''
                }
            }
        ],
    totalBillAmount: "106.17",
    costBySectionTableData: [],
    loadingCostBySectionTableData: false,
    modalBreadcrumbItems: [],
    loadingCostByLevelTableData: false,
    costByLevelTableData: [],
    costByLevelTableHeader: "",
    level: 0
    
};

const fetchConcessionNameMapStart = ( state, action ) => {
    // return updateObject(state, {
    //     loadingHighlights: action.loading
    // });
}

const fetchConcessionNameMapSuccess = ( state, action ) => {
    const arrayId = "searchFilters";
    const concessionOptions = createMasterCodeOptions(action.concessionNameMap);
    
    const updatedObject = {options: concessionOptions};

    const updatedArray = updateElementOptionArray(state[arrayId], 0, "concession", "elementConfig", updatedObject);

    return updateObject(state, {
        [arrayId]: Object.values(updatedArray)
    });
}

const fetchConcessionNameMapFail = ( state, action ) => {
    // return updateObject(state, {
    //     loadingHighlights: action.loading
    // });
}

const handleElectricityBillingInputChanged = ( state, action ) => {
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
        const updatedDatePickerValue = updateObject(state[arrayId][elementRowIndex]["dateRange"]["value"][elementId], updatedObject);
        updatedArray = updateElementOptionArray(state[arrayId], elementRowIndex, "dateRange", "value", {
            [elementId]: updatedDatePickerValue
        });        
    } else{
        updatedArray = updateElementArray(state, arrayId, elementRowIndex, elementId, updatedObject);
    }

    if(elementId === "viewBy"){
        const dateRangeState = state[arrayId][0].dateRange;
        let isDateRange = dateRangeState.elementConfig.isDateRange;
        let dateFormat = "dd/MM/yyyy";
        let showMonthYearPicker = false;
        let showYearPicker = false;
        
        const dateFrom = new Date();
        const dateTo = new Date();

        switch(value){
            case "DAY":
                isDateRange = true;
                break;
            case "MONTH":
                dateFormat = "MM/yyyy";
                isDateRange = false;
                showMonthYearPicker = true;
                break;
            case "YEAR":
                dateFormat = "yyyy";
                isDateRange = false;
                showYearPicker = true;
                break;
            default:
                break;
        }

        const updatedDatePickerElementConfigObject = updateObject(dateRangeState.value.datePickerFrom.elementConfig, {
            dateFormat: dateFormat,
            showMonthYearPicker: showMonthYearPicker,
            showYearPicker: showYearPicker
        });

        const updatedDateFromElementConfig = updateObject(dateRangeState.value.datePickerFrom, {
            elementConfig: updatedDatePickerElementConfigObject,
            value: dateFrom
        });
        
        const updatedDateToElementConfig = updateObject(dateRangeState.value.datePickerTo, {
            value: dateTo
        });


        const updatedDateRangeValue = updateObject(dateRangeState.value, {datePickerFrom: updatedDateFromElementConfig, datePickerTo: updatedDateToElementConfig});
        const updatedDateRangeElementConfig = updateObject(dateRangeState.elementConfig, {isDateRange: isDateRange});
        const updatedDateRange = updateObject(state[arrayId][0].dateRange, {elementConfig: updatedDateRangeElementConfig, value: updatedDateRangeValue});
        const updatedArrayAtIndex = updateObject(updatedArray[0], {dateRange: updatedDateRange});
        updatedArray = updateObject(state[arrayId], {[elementRowIndex]: updatedArrayAtIndex});
    }

    const updatedObjectArray= Object.values(updatedArray);

    return updateObject(state, {
        [arrayId]: updatedObjectArray
    });
}

const fetchElectricityBillCSVDataStart = ( state, action ) => {
    return updateObject(state, {
        
    });
}

const fetchElectricityBillCSVDataSuccess = ( state, action ) => {
    const updatedObject = {data: action.csvData}
    const updatedBillingData = updateObject(state["excelSheets"][0]["Electricity Billing"], updatedObject);
    const updatedBilling = updateObject(state["excelSheets"][0], {"Electricity Billing": updatedBillingData});

    const updatedArray = state["excelSheets"].map((item, index) => {
        if(index === 0){
            return updatedBilling;
        }

        return item[index];
    })
    
    return updateObject(state, {
        csvData: action.csvData,
        excelSheets: updatedArray
    });
}

const fetchElectricityBillCSVDataFail = ( state, action ) => {
    return updateObject(state, {
    });
}

const fetchCostBreakdownBySectionDataStart = ( state, action ) => {
    return updateObject(state, {
        loadingCostBySectionTableData: action.loading, 
    });
}

const fetchCostBreakdownBySectionDataSuccess = ( state, action ) => {
    return updateObject(state, {
        loadingCostBySectionTableData: action.loading,
        costBySectionTableData: action.costBreakdownBySection,
        level: 0
    });
}

const fetchCostBreakdownBySectionDataFail = ( state, action ) => {
    return updateObject(state, {
        loadingCostBySectionTableData: action.loading,
    });
}
const fetchElectricityCostBreakdownByLevelStart = ( state, action ) => {
    return updateObject(state, {
        loadingCostByLevelTableData: action.loading, 
    });
}

const costBreakdownByLevelHeaders = {
    1: "Breakdown By Section",
    2: "Breakdown By Road",
    3: "Breakdown By Feeder Pillar",
} 

const fetchElectricityCostBreakdownByLevelSuccess = ( state, action ) => {
    let header = costBreakdownByLevelHeaders[action.level];

    return updateObject(state, {
        loadingCostByLevelTableData: action.loading,
        costByLevelTableData: action.costBreakdownByLevelData,
        costByLevelTableHeader: header,
        level: action.level
    });
}

const fetchElectricityCostBreakdownByLevelFail = ( state, action ) => {
    return updateObject(state, {
        loadingCostByLevelTableData: action.loading,
    });
}

const fetchElectricityConcessionNameMapSuccess = ( state, action ) => {
    const arrayId = "searchFilters";
    const concessionOptions = createMasterCodeOptions(action.concessionNameMap);
    
    const updatedConcessionObject = {options: concessionOptions};

    const updatedArray = updateElementOptionArray(state[arrayId], 0, "concession", "elementConfig", updatedConcessionObject);

    return updateObject(state, {
        [arrayId]: Object.values(updatedArray)
    });
}

const resetBreakdownLevel = ( state, action ) => {
    return updateObject(state, {
        level: 0,
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_CONCESSION_NAME_MAP_SUCCESS: 
            return fetchConcessionNameMapSuccess(state, action);
        case actionTypes.HANDLE_ELECTRICITY_BILLING_INPUT_CHANGED_SUCCESS: 
            return handleElectricityBillingInputChanged(state, action);
        case actionTypes.FETCH_ELECTRICITY_BILL_CSV_DATA_SUCCESS: 
            return fetchElectricityBillCSVDataSuccess(state, action);
        case actionTypes.FETCH_COST_BREAKDOWN_BY_SECTION_DATA_START: 
            return fetchCostBreakdownBySectionDataStart(state, action);
        case actionTypes.FETCH_COST_BREAKDOWN_BY_SECTION_DATA_SUCCESS: 
            return fetchCostBreakdownBySectionDataSuccess(state, action);
        case actionTypes.FETCH_COST_BREAKDOWN_BY_SECTION_DATA_FAIL: 
            return fetchCostBreakdownBySectionDataFail(state, action);
        case actionTypes.FETCH_COST_BREAKDOWN_BY_LEVEL_START: 
            return fetchElectricityCostBreakdownByLevelStart(state, action);
        case actionTypes.FETCH_COST_BREAKDOWN_BY_LEVEL_SUCCESS: 
            return fetchElectricityCostBreakdownByLevelSuccess(state, action);
        case actionTypes.FETCH_COST_BREAKDOWN_BY_LEVEL_FAIL: 
            return fetchElectricityCostBreakdownByLevelFail(state, action);
        case actionTypes.FETCH_ELECTRICITY_BILLING_CONCESSION_NAME_MAP_SUCCESS: 
            return fetchElectricityConcessionNameMapSuccess(state, action);
        case actionTypes.RESET_BREAKDOWN_LEVEL: 
            return resetBreakdownLevel(state, action);
        default:
            return state;
    }
};

export default reducer;