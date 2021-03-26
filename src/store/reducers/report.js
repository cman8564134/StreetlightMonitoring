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
    updateFormElementArray
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
                valid: false,
                touched: false,
                errorMessage: 'Please select Subsection'
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
            power_factor_p1: {
                elementLabel: 'Power Factor R',
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
            power_factor_p2: {
                elementLabel: 'Power Factor Y',
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
            power_factor_p3: {
                elementLabel: 'Power Factor B',
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
            thdp1: {
                elementLabel: 'THDP R',
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
            thdp2: {
                elementLabel: 'THDP Y',
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
            thdp3: {
                elementLabel: 'THDP B',
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
    excelSheets: [
        {
            "Metrics": {
                data: [],
                columns: []
            }
        }
    ],
    // report: {id: 1, concession_name: "ABC Sdn Bhd", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
    report: {},
    activeTab: "powerUsageTab",
    graphCardTabsNavItemsArray: [{
        powerUsageTab: {navTitle: "TOTAL POWER CONSUMPTION", chart_options: {...baseChartOptions()}, chart_series: [...baseChartSeries()], chart_type: 'line'},
        electricityBillTab: {navTitle: "ELECTRICITY BILL", chart_options: {...baseChartOptions()}, chart_series: [...baseChartSeries()], chart_type: 'line'},
        carbonFootprintTab: {navTitle: "CARBON FOOTPRINT", chart_options: {...baseChartOptions()}, chart_series: [...baseChartSeries()], chart_type: 'line'},
        energySavingsTab: {navTitle: "ENERGY USED", chart_options: {...baseChartOptions()}, chart_series: [...baseChartSeries()], chart_type: 'line'},
        amperageTab: {navTitle: "AMPERAGE", chart_options: {...baseChartOptions()}, chart_series: [...baseChartSeries()], chart_type: 'line'},
        voltageTab: {navTitle: "VOLTAGE", chart_options: {...baseChartOptions()}, chart_series: [...baseChartSeries()], chart_type: 'line'},
        activePowerTab: {navTitle: "ACTIVE POWER", chart_options: {...baseChartOptions()}, chart_series: [...baseChartSeries()], chart_type: 'line'},
        powerFactorTab: {navTitle: "POWER FACTOR", chart_options: {...baseChartOptions()}, chart_series: [...baseChartSeries()], chart_type: 'line'},
        thdvTab: {navTitle: "THDV", chart_options: {...baseChartOptions()}, chart_series: [...baseChartSeries()], chart_type: 'line'},
        thdcTab: {navTitle: "THDC", chart_options: {...baseChartOptions()}, chart_series: [...baseChartSeries()], chart_type: 'line'},
        thdpTab: {navTitle: "THDP", chart_options: {...baseChartOptions()}, chart_series: [...baseChartSeries()], chart_type: 'line'},
        frequencyTab: {navTitle: "FREQUENCY", chart_options: {...baseChartOptions()}, chart_series: [...baseChartSeries()], chart_type: 'line'},
    }],
    loadingHighlights: false,
    loadingChart: false,
    fileName: "",
    generatingExcel: false,
    generatingCSV: false,
    metricFiltersErrorMessage: ""
};

const metricColumnsName = {
    id: {label: "ID", accessor: "id"},
    pillar_id: {label: "Pillar ID", accessor: "pillar_id"},
    created_at: {label: "Created At", accessor: "created_at"},
    active_power_l1: {label: "Active Power R", accessor: "active_power_l2"},
    active_power_l2: {label: "Active Power Y", accessor: "active_power_l2"},
    active_power_l3: {label: "Active Power B", accessor: "active_power_l3"},
    voltage_l1_n: {label: "Voltage R", accessor: "voltage_l1_n"},
    voltage_l2_n: {label: "Voltage Y", accessor: "voltage_l2_n"},
    voltage_l3_n: {label: "Voltage B", accessor: "voltage_l3_n"},
    current_p1: {label: "Current R", accessor: "current_p1"},
    current_p2: {label: "Current Y", accessor: "current_p2"},
    current_p3: {label: "Current B", accessor: "current_p3"},
    frequency: {label: "Frequency", accessor: "frequency"},
    power_factor_p1: {label: "Power Factor R", accessor: "power_factor_p1"},
    power_factor_p2: {label: "Power Factor Y", accessor: "power_factor_p2"},
    power_factor_p3: {label: "Power Factor B", accessor: "power_factor_p3"},
    total_yield: {label: "Total Yield", accessor: "total_yield"},
    thdv1: {label: "THDV R", accessor: "thdv1"},
    thdv2: {label: "THDV Y", accessor: "thdv2"},
    thdv3: {label: "THDV B", accessor: "thdv3"},
    thdc1: {label: "THDC R", accessor: "thdc1"},
    thdc2: {label: "THDC Y", accessor: "thdc2"},
    thdc3: {label: "THDC B", accessor: "thdc3"},
    thdp1: {label: "THDP R", accessor: "thdp1"},
    thdp2: {label: "THDP Y", accessor: "thdp2"},
    thdp3: {label: "THDP B", accessor: "thdp3"},
}

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

const fetchRoadNameMapBySubsectionIdSuccess = ( state, action ) => {
    const arrayId = "searchFilters";
    const roadOptions = createMasterCodeOptions(action.roadNameMap);
    
    const updatedRoadObject = {options: roadOptions};

    const updatedArray = updateElementOptionArray(state[arrayId], 0, "road", "elementConfig", updatedRoadObject);

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
        updatedObject = updateObject(updatedObject, {valid: checkValidity(value, updatedArray.validation)})
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

    const updatedGraphCardTabsArray = updateChart(state.graphCardTabsNavItemsArray, activeTab, reportData.labels, reportData.data, reportData.series, state.graphCardTabsNavItemsArray[0][activeTab].chart_type, state.graphCardTabsNavItemsArray[0][activeTab].navTitle, updatedBaseChartOptions);
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

    const updatedGraphCardTabsArray = updateChart(state.graphCardTabsNavItemsArray, activeTab, reportData.labels, reportData.data, reportData.series, state.graphCardTabsNavItemsArray[0][activeTab].chart_type, state.graphCardTabsNavItemsArray[0][activeTab].navTitle, updatedBaseChartOptions);
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
    const selectedMetrics = action.selectedMetrics;
    const sheet1Title = 'Metrics';

    let updatedExcelSheetsColumnLabel = [];

    selectedMetrics.map((metric) => {
        updatedExcelSheetsColumnLabel = [...updatedExcelSheetsColumnLabel, metricColumnsName[metric]];
    })

    const updatedExcelSheetsDataColumn = updateObject(state["excelSheets"][0][sheet1Title], {data: action.reportData, columns: updatedExcelSheetsColumnLabel});
    const updatedBilling = updateObject(state["excelSheets"][0], {[sheet1Title] : updatedExcelSheetsDataColumn});

    const updatedArray = state["excelSheets"].map((item, index) => {
        if(index === 0){
            return updatedBilling;
        }

        return item[index];
    })

    
    
    return updateObject(state, {
        csvData: action.reportData,
        excelSheets: updatedArray,
        fileName: action.fileName,
        generatingExcel: action.generatingExcel,
        generatingCSV: action.generatingCSV,
        
    });
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