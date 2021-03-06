import * as actionTypes from '../actions/actionTypes';
import {darkRYB} from '../../shared/colors';

import { 
    updateObject, 
    createMasterCodeOptions, 
    updateElementArray, 
    updateElementOptionArray,
    baseChartOptions,
    baseChartSeries,
    updateChart,
    checkValidity,
    formatDateByDateFormat,
    updateFormElementArray,
    updateSubElement
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
            },
            dateRange: {
                elementLabel: '',
                elementType: 'datePickerDropdown',
                elementConfig: {
                    type: "datePickerDropdown",
                    isDateRange: true,
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
                            selectsEnd: false,
                            
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
                errorMessage: 'Please select Date Range'
            },
            viewBy: {
                elementId: 'viewBy',
                elementRowIndex: 0,
                elementLabel: 'View By:',
                elementType: 'select',
                elementConfig: {
                    type: "select",
                    options: [
                        {value: "WEEK", displayValue: "WEEK"}, 
                        {value: "MONTH", displayValue: "MONTH"},
                        {value: "YEAR", displayValue: "YEAR"},
                    ],
                    // options: [],
                    isHide: true
                },
                value: 'WEEK',
                validation: {
                    required: true
                },
                valid: true,
                touched: false,
                errorMessage: ''
            },
        }
    ],
    metricFilters: [
        {
            active_power_l1: {
                elementLabel: 'Active Power R',
                elementType: 'checkbox',
                elementConfig: {
                    type: "checkbox"
                },
                value: false,
                validation: {
                    required: false
                },
                valid: true,
                touched: false,
                errorMessage: ''
            },
            active_power_l2: {
                elementLabel: 'Active Power Y',
                elementType: 'checkbox',
                elementConfig: {
                    type: "checkbox"
                },
                value: false,
                validation: {
                    required: false
                },
                valid: true,
                touched: false,
                errorMessage: ''
            },
            active_power_l3: {
                elementLabel: 'Active Power B',
                elementType: 'checkbox',
                elementConfig: {
                    type: "checkbox"
                },
                value: false,
                validation: {
                    required: false
                },
                valid: true,
                touched: false,
                errorMessage: ''
            },
            voltage_l1_n: {
                elementLabel: 'Voltage R',
                elementType: 'checkbox',
                elementConfig: {
                    type: "checkbox"
                },
                value: false,
                validation: {
                    required: false
                },
                valid: true,
                touched: false,
                errorMessage: ''
            },
            voltage_l2_n: {
                elementLabel: 'Voltage Y',
                elementType: 'checkbox',
                elementConfig: {
                    type: "checkbox"
                },
                value: false,
                validation: {
                    required: false
                },
                valid: true,
                touched: false,
                errorMessage: ''
            },
            voltage_l3_n: {
                elementLabel: 'Voltage B',
                elementType: 'checkbox',
                elementConfig: {
                    type: "checkbox"
                },
                value: false,
                validation: {
                    required: false
                },
                valid: true,
                touched: false,
                errorMessage: ''
            },
            current_p1: {
                elementLabel: 'Current R',
                elementType: 'checkbox',
                elementConfig: {
                    type: "checkbox"
                },
                value: false,
                validation: {
                    required: false
                },
                valid: true,
                touched: false,
                errorMessage: ''
            },
            current_p2: {
                elementLabel: 'Current Y',
                elementType: 'checkbox',
                elementConfig: {
                    type: "checkbox"
                },
                value: false,
                validation: {
                    required: false
                },
                valid: true,
                touched: false,
                errorMessage: ''
            },
            current_p3: {
                elementLabel: 'Current B',
                elementType: 'checkbox',
                elementConfig: {
                    type: "checkbox"
                },
                value: false,
                validation: {
                    required: false
                },
                valid: true,
                touched: false,
                errorMessage: ''
            },
            frequency: {
                elementLabel: 'Frequency',
                elementType: 'checkbox',
                elementConfig: {
                    type: "checkbox"
                },
                value: false,
                validation: {
                    required: false
                },
                valid: true,
                touched: false,
                errorMessage: ''
            },
            total_yield: {
                elementLabel: 'Total Yield',
                elementType: 'checkbox',
                elementConfig: {
                    type: "checkbox"
                },
                value: false,
                validation: {
                    required: false
                },
                valid: true,
                touched: false,
                errorMessage: ''
            },
            thdv1: {
                elementLabel: 'THDV R',
                elementType: 'checkbox',
                elementConfig: {
                    type: "checkbox"
                },
                value: false,
                validation: {
                    required: false
                },
                valid: true,
                touched: false,
                errorMessage: ''
            },
            thdv2: {
                elementLabel: 'THDV Y',
                elementType: 'checkbox',
                elementConfig: {
                    type: "checkbox"
                },
                value: false,
                validation: {
                    required: false
                },
                valid: true,
                touched: false,
                errorMessage: ''
            },
            thdv3: {
                elementLabel: 'THDV B',
                elementType: 'checkbox',
                elementConfig: {
                    type: "checkbox"
                },
                value: false,
                validation: {
                    required: false
                },
                valid: true,
                touched: false,
                errorMessage: ''
            },
            thdc1: {
                elementLabel: 'THDC R',
                elementType: 'checkbox',
                elementConfig: {
                    type: "checkbox"
                },
                value: false,
                validation: {
                    required: false
                },
                valid: true,
                touched: false,
                errorMessage: ''
            },
            thdc2: {
                elementLabel: 'THDC Y',
                elementType: 'checkbox',
                elementConfig: {
                    type: "checkbox"
                },
                value: false,
                validation: {
                    required: false
                },
                valid: true,
                touched: false,
                errorMessage: ''
            },
            thdc3: {
                elementLabel: 'THDC B',
                elementType: 'checkbox',
                elementConfig: {
                    type: "checkbox"
                },
                value: false,
                validation: {
                    required: false
                },
                valid: true,
                touched: false,
                errorMessage: ''
            },
            // thdp1: {
            //     elementLabel: 'THDP R',
            //     elementType: 'checkbox',
            //     elementConfig: {
            //         type: "checkbox"
            //     },
            //     value: false,
            //     validation: {
            //         required: false
            //     },
            //     valid: true,
            //     touched: false,
            //     errorMessage: ''
            // },
            // thdp2: {
            //     elementLabel: 'THDP Y',
            //     elementType: 'checkbox',
            //     elementConfig: {
            //         type: "checkbox"
            //     },
            //     value: false,
            //     validation: {
            //         required: false
            //     },
            //     valid: true,
            //     touched: false,
            //     errorMessage: ''
            // },
            // thdp3: {
            //     elementLabel: 'THDP B',
            //     elementType: 'checkbox',
            //     elementConfig: {
            //         type: "checkbox"
            //     },
            //     value: false,
            //     validation: {
            //         required: false
            //     },
            //     valid: true,
            //     touched: false,
            //     errorMessage: ''
            // },
            current_n: {
                elementLabel: 'Neutral Current',
                elementType: 'checkbox',
                elementConfig: {
                    type: "checkbox"
                },
                value: false,
                validation: {
                    required: false
                },
                valid: true,
                touched: false,
                errorMessage: ''
            },
            daily_yield: {
                elementLabel: 'Daily Yield',
                elementType: 'checkbox',
                elementConfig: {
                    type: "checkbox"
                },
                value: false,
                validation: {
                    required: false
                },
                valid: true,
                touched: false,
                errorMessage: ''
            },
            power_factor_avg: {
                elementLabel: 'Average Power Factor',
                elementType: 'checkbox',
                elementConfig: {
                    type: "checkbox"
                },
                value: false,
                validation: {
                    required: false
                },
                valid: true,
                touched: false,
                errorMessage: ''
            },
            
        }
    ],
    selectedMetrics: ["id", "pillar_id", "created_at"],
    csvData: [],
    excelSheets: [{}],
    // report: {id: 1, concession_name: "ABC Sdn Bhd", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
    report: {},
    activeTab: "powerUsageTab",
    graphCardTabsNavItemsArray: [{
        powerUsageTab: {navTitle: "TOTAL POWER CONSUMPTION", chart_options: {...baseChartOptions()}, chart_series: [...baseChartSeries()], chart_type: 'line', unit: 'KWh'},
        electricityBillTab: {navTitle: "ELECTRICITY BILL", chart_options: {...baseChartOptions()}, chart_series: [...baseChartSeries()], chart_type: 'line', unit: 'RM'},
        carbonFootprintTab: {navTitle: "CARBON FOOTPRINT", chart_options: {...baseChartOptions()}, chart_series: [...baseChartSeries()], chart_type: 'line', unit: 'KG'},
        energySavingsTab: {navTitle: "ENERGY SAVINGS", chart_options: {...baseChartOptions()}, chart_series: [...baseChartSeries()], chart_type: 'line', unit: 'KWh'},
        amperageTab: {navTitle: "AMPERAGE", chart_options: {...baseChartOptions()}, chart_series: [...baseChartSeries()], chart_type: 'line', unit: 'A'},
        voltageTab: {navTitle: "VOLTAGE", chart_options: {...baseChartOptions()}, chart_series: [...baseChartSeries()], chart_type: 'line', unit: 'V'},
        activePowerTab: {navTitle: "ACTIVE POWER", chart_options: {...baseChartOptions()}, chart_series: [...baseChartSeries()], chart_type: 'line', unit: 'W'},
        powerFactorTab: {navTitle: "AVERAGE POWER FACTOR", chart_options: {...baseChartOptions()}, chart_series: [...baseChartSeries()], chart_type: 'line', unit: 'kW'},
        thdvTab: {navTitle: "THDV", chart_options: {...baseChartOptions()}, chart_series: [...baseChartSeries()], chart_type: 'line', unit: ''},
        thdcTab: {navTitle: "THDC", chart_options: {...baseChartOptions()}, chart_series: [...baseChartSeries()], chart_type: 'line', unit: ''},
        // thdpTab: {navTitle: "THDP", chart_options: {...baseChartOptions()}, chart_series: [...baseChartSeries()], chart_type: 'line', unit: ''},
        frequencyTab: {navTitle: "FREQUENCY", chart_options: {...baseChartOptions()}, chart_series: [...baseChartSeries()], chart_type: 'line', unit: 'Hz'},
        neutralCurrentTab: {navTitle: "NEUTRAL CURRENT", chart_options: {...baseChartOptions()}, chart_series: [...baseChartSeries()], chart_type: 'line', unit: 'A'},
        dailyYieldTab: {navTitle: "DAILY YIELD", chart_options: {...baseChartOptions()}, chart_series: [...baseChartSeries()], chart_type: 'bar', unit: 'KWh'}
    }],
    loadingHighlights: false,
    loadingChart: false,
    fileName: "",
    generatingExcel: false,
    generatingCSV: false,
    metricFiltersErrorMessage: ""
};

const metricColumnsName = {
    id: {title: "ID", accessor: "id"},
    pillar_id: {title: "Pillar ID", accessor: "pillar_id"},
    created_at: {title: "Created At", accessor: "created_at"},
    active_power_l1: {title: "Active Power R", accessor: "active_power_l2"},
    active_power_l2: {title: "Active Power Y", accessor: "active_power_l2"},
    active_power_l3: {title: "Active Power B", accessor: "active_power_l3"},
    voltage_l1_n: {title: "Voltage R", accessor: "voltage_l1_n"},
    voltage_l2_n: {title: "Voltage Y", accessor: "voltage_l2_n"},
    voltage_l3_n: {title: "Voltage B", accessor: "voltage_l3_n"},
    current_p1: {title: "Current R", accessor: "current_p1"},
    current_p2: {title: "Current Y", accessor: "current_p2"},
    current_p3: {title: "Current B", accessor: "current_p3"},
    frequency: {title: "Frequency", accessor: "frequency"},
    power_factor_p1: {title: "Power Factor R", accessor: "power_factor_p1"},
    power_factor_p2: {title: "Power Factor Y", accessor: "power_factor_p2"},
    power_factor_p3: {title: "Power Factor B", accessor: "power_factor_p3"},
    total_yield: {title: "Total Yield", accessor: "total_yield"},
    thdv1: {title: "THDV R", accessor: "thdv1"},
    thdv2: {title: "THDV Y", accessor: "thdv2"},
    thdv3: {title: "THDV B", accessor: "thdv3"},
    thdc1: {title: "THDC R", accessor: "thdc1"},
    thdc2: {title: "THDC Y", accessor: "thdc2"},
    thdc3: {title: "THDC B", accessor: "thdc3"},
    // thdp1: {title: "THDP R", accessor: "thdp1"},
    // thdp2: {title: "THDP Y", accessor: "thdp2"},
    // thdp3: {title: "THDP B", accessor: "thdp3"},
    current_n: {title: "Neutral Current", accessor: "current_n"},
    power_factor_avg: {title: "Average Power Factor", accessor: "power_factor_avg"},
    daily_yield: {title: "Daily Yield", accessor: "daily_yield"},
}

const dailyYieldSheetColumnName = [
    {title: "ID", accessor: "id"},
    {title: "Pillar ID", accessor: "pillar_id"},
    {title: "Created At", accessor: "created_at"},
    {title: "Total Yield", accessor: "total_yield"},
    {title: "Daily Yield", accessor: "daily_yield"},
]

const dailyYieldSheetMetrics = ["id", "pillar_id", "created_at", "daily_yield", "total_yield"];
   

const fetchReportConcessionNameMapSuccess = ( state, action ) => {
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

const fetchReportSectionNameMapByConcessionIdSuccess = ( state, action ) => {
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

    // UPDATE DATE FROM AND DATE TO  
    if(elementId === "datePickerFrom" || elementId === "datePickerTo"){
        const dateString = formatDateByDateFormat(value, 'd/m/y');
        const isValid = checkValidity(dateString, updatedArray[elementRowIndex]["dateRange"].validation);
        
        updatedObject = updateObject(updatedObject, {valid:  isValid});
        const updatedDatePickerValue = updateObject(updatedArray[elementRowIndex]["dateRange"]["value"][elementId], updatedObject);
        updatedArray = updateElementOptionArray(updatedArray, elementRowIndex, "dateRange", "value", {
            [elementId]: updatedDatePickerValue
        });

        const isDateFromValid = updatedArray[elementRowIndex]["dateRange"]["value"].datePickerFrom.valid;
        const isDateToValid = updatedArray[elementRowIndex]["dateRange"]["value"].datePickerTo.valid;

        updatedArray = updateFormElementArray(updatedArray, elementRowIndex, 'dateRange', {valid: isDateFromValid && isDateToValid});
        
    } else{
        updatedObject = updateObject(updatedObject, {valid: checkValidity(value, updatedArray[elementRowIndex][elementId].validation)})
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
            case "WEEK":
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

const fetchReportDataStart = ( state, action ) => {
    return updateObject(state, {
        loadingHighlights: action.loading,
        loadingChart: action.loading
    });
}

const fetchReportDataSuccess = ( state, action ) => {
    const activeTab = action.activeTab;
    const reportData = action.reportData;
    const viewType = state.searchFilters[0].viewBy.value;

    let updatedBaseChartOptions = baseChartOptions();

    if(reportData.series.length === 3 ){
        updatedBaseChartOptions = updateObject(updatedBaseChartOptions, {colors: darkRYB});
    }
    
    if(viewType === "YEAR") {
        updatedBaseChartOptions = updateObject(updatedBaseChartOptions, {xaxis: {}});
    }

    const activeTabConfig = state.graphCardTabsNavItemsArray[0][activeTab]
    const unit = activeTabConfig.unit;
    let yAxisTitle = activeTabConfig.navTitle;

    if(unit !== ""){
        yAxisTitle = yAxisTitle + " (" + unit + ")";
    }

    const updatedGraphCardTabsArray = updateChart(state.graphCardTabsNavItemsArray, activeTab, reportData.labels, reportData.data, reportData.series, state.graphCardTabsNavItemsArray[0][activeTab].chart_type, yAxisTitle, updatedBaseChartOptions);
    const updatedGraphCardTabsAtIndex = updateObject(state.graphCardTabsNavItemsArray[0], {[activeTab]: updatedGraphCardTabsArray});
    

    const updatedGraphCardTabs = state.graphCardTabsNavItemsArray.map((item, index) => {
        if(index === 0){
            return updatedGraphCardTabsAtIndex;
        }

        return item[index];
    })

    return updateObject(state, {
        loadingHighlights: action.loading,
        loadingChart: action.loading,
        activeTab: activeTab,
        report: action.feederPillar,
        graphCardTabsNavItemsArray: updatedGraphCardTabs
    });
}

const fetchReportDataFail = ( state, action ) => {
    return updateObject(state, {
        loadingHighlights: action.loading,
        loadingChart: action.loading
    });
}

const fetchReportChartDataByActiveTabStart = ( state, action ) => {
    return updateObject(state, {
        loadingChart: action.loading
    });
}

const fetchReportChartDataByActiveTabSuccess = ( state, action ) => {
    const activeTab = action.activeTab;
    const reportData = action.reportData;
    const viewType = state.searchFilters[0].viewBy.value;
    
    let updatedBaseChartOptions = baseChartOptions();

    if(reportData.series.length === 3 ){
        updatedBaseChartOptions = updateObject(updatedBaseChartOptions, {colors: darkRYB});
    }

    if(viewType === "YEAR") {
        updatedBaseChartOptions = updateObject(updatedBaseChartOptions, {xaxis: {}});
    }
    
    const activeTabConfig = state.graphCardTabsNavItemsArray[0][activeTab]
    const unit = activeTabConfig.unit;
    let yAxisTitle = activeTabConfig.navTitle;

    if(unit !== ""){
        yAxisTitle = yAxisTitle + " (" + unit + ")";
    }

    const updatedGraphCardTabsArray = updateChart(state.graphCardTabsNavItemsArray, activeTab, reportData.labels, reportData.data, reportData.series, state.graphCardTabsNavItemsArray[0][activeTab].chart_type, yAxisTitle, updatedBaseChartOptions);
    const updatedGraphCardTabsAtIndex = updateObject(state.graphCardTabsNavItemsArray[0], {[activeTab]: updatedGraphCardTabsArray});
    

    const updatedGraphCardTabs = state.graphCardTabsNavItemsArray.map((item, index) => {
        if(index === 0){
            return updatedGraphCardTabsAtIndex;
        }

        return item[index];
    })

    return updateObject(state, {
        loadingChart: action.loading,
        activeTab: activeTab,
        graphCardTabsNavItemsArray: updatedGraphCardTabs
    });
}

const fetchReportChartDataByActiveTabFail = ( state, action ) => {
    return updateObject(state, {
        loadingChart: action.loading
    });
}

const fetchExportableReportDataStart = ( state, action ) => {
    return updateObject(state, {
        generatingExcel: action.generatingExcel,
        generatingCSV: action.generatingCSV
    });
}

const fetchExportableReportDataSuccess = ( state, action ) => {
    //TO POPULATE DATA FOR EXCEL REPORT START
    const selectedMetrics = Object.values(action.selectedMetrics);
    const sheet1Title = 'Metrics';
    const sheet2Title = 'Daily Yield';

    let updatedExcelSheetsColumnLabel = [];
    let updatedExcel = [];
    let updatedExcelSheets = {};
    let isDailyYieldMetricSelected = false;
    
    if(selectedMetrics.includes("daily_yield")){
        isDailyYieldMetricSelected = true;
    }

    selectedMetrics.map((metric) => {
        if(metric !== "daily_yield"){
            updatedExcelSheetsColumnLabel = [...updatedExcelSheetsColumnLabel, metricColumnsName[metric]];
        }
    })

    
    
    if((selectedMetrics.includes("daily_yield") && selectedMetrics.length >= 5) || (!selectedMetrics.includes("daily_yield") && selectedMetrics.length >= 4)){
        const reportData = action.reportData;
        const filteredMetrics = selectedMetrics.filter(item => item !== "daily_yield");
        const reportDataArray = createExcelReportArray(reportData, filteredMetrics, metricColumnsName);
        updatedExcelSheets = updateObject(updatedExcelSheets, {[sheet1Title]:{data: reportDataArray, columns: updatedExcelSheetsColumnLabel}})
    }

    if(isDailyYieldMetricSelected){
        const reportDataArray = createExcelReportArray(action.dailyYield, dailyYieldSheetMetrics, metricColumnsName);
        updatedExcelSheets = updateObject(updatedExcelSheets, {[sheet2Title]:{data: reportDataArray, columns: dailyYieldSheetColumnName}})
    }
    
    updatedExcel = updateObject(updatedExcel[0], updatedExcelSheets);

    const updatedArray = state["excelSheets"].map((item, index) => {
        if(index === 0){
            return updatedExcel;
        }

        return item[index];
    })
    //TO POPULATE DATA FOR EXCEL REPORT END

    //TO POPULATE DATA FOR CSV REPORT START
    let csvData = [];
    if(action.reportData){
        if(action.dailyYield){
            csvData = action.reportData.concat(action.dailyYield);
        }else{
            csvData = action.reportData
        }
        
    }else{
        if(action.dailyYield)
            csvData = action.dailyYield
    }
    //TO POPULATE DATA FOR CSV REPORT END

    return updateObject(state, {
        csvData: csvData,
        excelSheets: updatedArray,
        fileName: action.fileName,
        generatingExcel: action.generatingExcel,
        generatingCSV: action.generatingCSV,
        
    });
}

const createExcelReportArray = (reportData, columnLabel, accessors) => {
    const reportDataArray = [];
    
    reportData.forEach(function (objects, index) {
        let rowArray = [];

        columnLabel.forEach(function (columnName, index){
            const accessorId = accessors[columnName].accessor;
            const value = objects[accessorId];
            let columnData = {};
            
            if(accessorId !== "id" && !isNaN(value)){
                columnData = {value: Number(value), style:{numFmt: "0.00"}};
            }else{
                columnData = {value: value};
            }
            rowArray.push(columnData);
        })
        reportDataArray.push(rowArray);
    });

    return reportDataArray;
}

const fetchExportableReportDataFail = ( state, action ) => {
    return updateObject(state, {
        generatingExcel: action.generatingExcel,
        generatingCSV: action.generatingCSV
    });
}

const handleMetricFiltersInputChanged = ( state, action ) => {
    const elementRowIndex = action.elementRowIndex;
    const elementId = action.elementId; 
    const arrayId = "metricFilters";
    const value = action.value;
    let updatedArray = state[arrayId];
    
    let updatedObject = {
        value: !state[arrayId][elementRowIndex][elementId].value,
        touched: true
    };
    
    updatedObject = updateObject(updatedObject, {valid: checkValidity(value, updatedArray.validation)})
    updatedArray = updateElementArray(state, arrayId, elementRowIndex, elementId, updatedObject);
    
    const updatedObjectArray= Object.values(updatedArray);

    let updatedSelectedMetrics = state.selectedMetrics;
    if(value){
        updatedSelectedMetrics = [...state.selectedMetrics, elementId];
    }else{
        updatedSelectedMetrics = state.selectedMetrics.filter((element) => {
            return element !== elementId;
        })
    }

    return updateObject(state, {
        [arrayId]: updatedObjectArray,
        selectedMetrics: updatedSelectedMetrics
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
        case actionTypes.FETCH_REPORT_ROAD_NAME_MAP_SUCCESS: 
            return fetchRoadNameMapBySubsectionIdSuccess(state, action);
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
        case actionTypes.FETCH_REPORT_CHART_DATA_BY_ACTIVE_TAB_START: 
            return fetchReportChartDataByActiveTabStart(state, action);
        case actionTypes.FETCH_REPORT_CHART_DATA_BY_ACTIVE_TAB_SUCCESS: 
            return fetchReportChartDataByActiveTabSuccess(state, action);
        case actionTypes.FETCH_REPORT_CHART_DATA_BY_ACTIVE_TAB_FAIL: 
            return fetchReportChartDataByActiveTabFail(state, action);
        // case actionTypes.FETCH_ELECTRICITY_BILL_CSV_DATA_SUCCESS: 
        //     return fetchExportableReportDataSuccess(state, action);
        case actionTypes.FETCH_EXPORTABLE_REPORT_DATA_START: 
            return fetchExportableReportDataStart(state, action);
        case actionTypes.FETCH_EXPORTABLE_REPORT_DATA_SUCCESS: 
            return fetchExportableReportDataSuccess(state, action);
        case actionTypes.FETCH_EXPORTABLE_REPORT_DATA_FAIL: 
            return fetchExportableReportDataFail(state, action);
        case actionTypes.FETCH_REPORT_METRIC_FILTERS_CHANGED_SUCCESS: 
            return handleMetricFiltersInputChanged(state, action);
        default:
            return state;
    }
};

export default reducer;