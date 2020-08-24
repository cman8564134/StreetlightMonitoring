import React from 'react';
import * as actionTypes from '../actions/actionTypes';
import { 
    updateObject, 
    createMasterCodeOptions, 
    updateElementArray, 
    updateElementOptionArray 
} from '../../shared/utility';

import DataTable from '../../components/Tables/DataTable/DataTable';

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
                    elementLabel: 'Cost = Consumption * 0.192',
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
                    elementLabel: 'Imbalance Cost Pass-Through (ICPT) = Cost * 0.0152',
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
                    elementLabel: 'Feed-In Tariff  = Cost * 1.6%',
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
    accordions: [
        {
            bySection: {
                heading: "Breakdown By Section", 
                isOpen: false, 
                children: null
            }
        }
    ]
};

const costBySectionTableColumns = [
    {
        columns: [
            {
                Header: 'Section',
                accessor: 'section_name'
            },
            {
                Header: 'Bill Date',
                accessor: 'bill_date'
            },
            {
                Header: 'Bill Amount',
                accessor: 'bill_amount'
            },
            {
                Header: 'Consumption (kWh)',
                accessor: 'consumption'
            },
            {
                Header: 'Cost (RM)',
                accessor: 'cost'
            },
            {
                Header: 'Imbalance Cost Pass-Through (RM)',
                accessor: 'icpt'
            },
            {
                Header: 'Current Month Usage (RM)',
                accessor: 'current_month_usage'
            },
            {
                Header: 'GST',
                accessor: 'gst'
            },
            {
                Header: 'Feed-In Tariff',
                accessor: 'feed_in_tariff'
            },
        ]
    }
];

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

    console.log("updatedArray", updatedArray);
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
    const udpatedChildren = {children: 
        <DataTable 
            data={action.costBreakdownBySection}
            columns={costBySectionTableColumns}
            pageSize={10}
            header={null}
            filterable
            loading={action.loading}
        />
    }

    const updatedAccordionsItem = updateObject(state.accordions[0].bySection, udpatedChildren);
    const updatedAccordionAtArrayIndex = updateObject(state.accordions[0], {bySection: updatedAccordionsItem});
    
    const updatedArray = state["accordions"].map((item, index) => {
        if(index === 0){
            return updatedAccordionAtArrayIndex;
        }

        return item[index];
    })

    return updateObject(state, {
        loadingCostBySectionTableData: action.loading,
        costBySectionTableData: action.costBreakdownBySection,
        accordions: updatedArray
    });
}

const fetchCostBreakdownBySectionDataFail = ( state, action ) => {
    return updateObject(state, {
        loadingCostBySectionTableData: action.loading,
    });
}

const toggleAccordionSuccess = ( state, action ) => {
    const prevState = state.accordions;
        const updatedAccordions = prevState.map((objects, key) => {
            let updatedAccordionObjects = objects;
            if(key === action.index){
                const accordionArray = [];
                for(let id in objects){
                    accordionArray.push({
                        id: id,
                        config: objects[id]
                    })
                }

                accordionArray.map((accordion) => {
                    let isOpen = false;

                    if(accordion.id === action.id){
                        isOpen = !accordion.config.isOpen;
                    }
                    const updatedIsOpen = updateObject(objects[accordion.id], {isOpen: isOpen});
                    updatedAccordionObjects = updateObject(updatedAccordionObjects, {[accordion.id]: updatedIsOpen});

                    const updatedAccordion = updateObject(accordion.config, {isOpen: isOpen})
                    const updatedConfig = updateObject(accordion, {config: updatedAccordion});
                    return updatedConfig;
                })
            }

            return updatedAccordionObjects;
            
        });
    return updateObject(state, {
        accordions: updatedAccordions
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
        case actionTypes.TOGGLE_ACCORDION_SUCCESS: 
            return toggleAccordionSuccess(state, action);
        default:
            return state;
    }
};

export default reducer;