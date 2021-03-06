import {
    toast
} from 'react-toastify';

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
}

export const convertToNumber = (value) => {
    if ( value ){
        const valueWithoutComma = value.replace(/,/g, "")
        return Number(valueWithoutComma);
    }
    return 0;
}

export const divideByThousand = (value) => {
    if ( value ){
        return value / 1000;
    }
    return 0;
}

var dateTimeFormatter = new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false
});

const formatDateToParts = (date) => {
    const [
        { value: day },,
        { value: month },,
        { value: year },,
        { value: hour },,
        { value: minute },,
        { value: second }] = dateTimeFormatter.formatToParts(date);

    return {
        day: day,
        month: month,
        year: year,
        hour: hour,
        minute: minute,
        second: second
    };
}

export const formatDateByDateFormat = (date, dateFormat) => {
    if(date){
        const {day, month, year, hour, minute, second} = formatDateToParts(date);
        const weekday = date.toString().substring(0,3);
        const monthName = date.toLocaleString('default', { month: 'short' })
        
        switch (dateFormat) {
            case 'h:m':
                return `${hour}:${minute}`;
            case 'ymd':
                return `${year}${month}${day}`;
            case 'y-m-d':
                return `${year}-${month}-${day}`;
            case 'd/m/y':
                return `${day}/${month}/${year}`;
            case 'd M':
                return `${day} ${monthName}`;
            case 'D, d M':
                return `${weekday}, ${day} ${monthName}`;
            case 'm/y':
                return `${month}/${year}`;
            case 'm-y':
                return `${month}-${year}`;
            case 'y':
                return `${year}`;
            case 'y-m-d h:m:i':
            default: 
                return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
        }
    }else {
        return '';
    }
    
}

export const getCurrentDateTimeInDBFormat = (dateFormat) => {
    return formatDateByDateFormat(new Date(), dateFormat);
}

export const subtractMinuteFromDateTime = (dateTime, minute) => {
    let subtractedDateTime = new Date(dateTime);
    subtractedDateTime.setMinutes(subtractedDateTime.getMinutes() - minute);
    
    return subtractedDateTime;
}

export const subtractDaysFromDate = (date, day) => {
    let subtractedDate = new Date(date);
    subtractedDate.setDate(subtractedDate.getDate() - day);
    
    return subtractedDate;
}

export const addDaysToDate = (date, day) => {
    let newDate = new Date(date);
    newDate.setDate(newDate.getDate() + day);
    
    return newDate;
}

export const setDayAndMonthOfDate = (date, day, month) => {
    let newDate = new Date(date);
    newDate.setMonth(month, day);

    return newDate;
}

export const getFirstDayOfMonth = (date) => {
    const formattedDate = new Date(date);
    const firstDayOfMonth = new Date(formattedDate.getFullYear(), formattedDate.getMonth(), 1);
    return formatDateByDateFormat(firstDayOfMonth, 'y-m-d')
}

export const getLastDayOfMonth = (date) => {
    const formattedDate = new Date(date);
    const lastDayOfMonth = new Date(formattedDate.getFullYear(), formattedDate.getMonth() + 1, 0);
    return formatDateByDateFormat(lastDayOfMonth, 'y-m-d')
}

export const getFirstDayOfYear = (year) => {
    const firstDayOfYear = new Date(year, 0, 1);
    
    return formatDateByDateFormat(firstDayOfYear, 'y-m-d')
}

export const getLastDayOfYear = (year) => {
    const lastDayOfYear = new Date(year, 11, 31);
    
    return formatDateByDateFormat(lastDayOfYear, 'y-m-d')
}

export const convertUnixTimestampToLocalTime = (unixTimestamp) => {
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    return new Date(unixTimestamp * 1000);
}

export const getBasicChartOptions = ( labels, yAxisTitle ) => {
    return {
        chart: {
            height: 350,
            type: 'line',
            stacked: false,
        },
        stroke: {
            width: [0, 2, 5],
            curve: 'smooth'
        },
        plotOptions: {
            bar: {
                columnWidth: '50%'
            }
        },
        fill: {
            opacity: [0.85,0.25,1],
            gradient: {
                inverseColors: false,
                shade: 'light',
                type: "vertical",
                opacityFrom: 0.85,
                opacityTo: 0.55,
                stops: [0, 100, 100, 100]
            }
        },
        dataLabels: {
            textAnchor: "middle"
        },
        labels: labels,
        markers: {
            size: 0
        },
        yaxis: {
            title: {
                text: yAxisTitle,
            },
            min: 0
        },
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter: function (y) {
                    if(typeof y !== "undefined") {
                        return  y.toFixed(2) + " points";
                    }
                    return y;

                }
            }
        }

    }
}

export const updateElementArraySubElement = (state, arrayId, arrayIndex, subElementId, updatedObject) => {
    const updatedSubElement = updateObject(state[arrayId][arrayIndex][subElementId], updatedObject);

    return updatedSubElement;
}

export const updateFormElementArraySubElement = (array, arrayIndex, subElementId, updatedObject) => {
    const updatedSubElement = updateObject(array[arrayIndex][subElementId], updatedObject);

    return updatedSubElement;
}

export const updateSubElement = (array, arrayIndex, subElementId, updatedObject) => {
    const updatedSubElement = updateObject(array[arrayIndex][subElementId], updatedObject);
    const updatedArrayAtIndex = updateObject(array[arrayIndex], {
        [subElementId]: updatedSubElement
    });

    const updatedArray = updateObject(array, {
        [arrayIndex]: updatedArrayAtIndex
    });

    return updatedArray;
}

export const updateElementArray = (state, arrayId, elementRowIndex, elementId, updatedObject) => {

    const updatedElement = updateObject(state[arrayId][elementRowIndex][elementId], updatedObject);

    const updatedArrayAtIndex = updateObject(state[arrayId][elementRowIndex], {
        [elementId]: updatedElement
    });

    const updatedArray = updateObject(state[arrayId], {
        [elementRowIndex]: updatedArrayAtIndex
    });

    return updatedArray;
}

export const updateElementOptionArray = (array, arrayIndex, subElementId, childElementId, updatedObject) => {
    const updatedElementOption = updateObject(array[arrayIndex][subElementId][childElementId], updatedObject);
    
    const updatedElementConfig = updateObject(array[arrayIndex][subElementId], {
        [childElementId]: updatedElementOption
    })
    const updatedArrayAtIndex = updateObject(array[arrayIndex], {[subElementId]: updatedElementConfig})

    const updatedArray = updateObject(array, {[arrayIndex]: updatedArrayAtIndex});

    return updatedArray;
}

export const createMasterCodeOptions = (masterCode) => {
    const options = [];

    for (let code in masterCode) {
        options.push({value: code, displayValue: masterCode[code]})
    }
    return options;
}

export const createMasterCodeOptionsWithCodeAsDisplayValue = (masterCode) => {
    const options = [];

    for (let code in masterCode) {
        options.push({value: code, displayValue: code})
    }
    return options;
}

export const createMultiSelectOptions = (masterCode) => {
    const options = [];

    for (let code in masterCode) {
        options.push({value: code, label: masterCode[code]})
    }
    return options;
}


export const checkValidity = ( value, rules ) => {
    let isValid = true;
    
    if ( !rules ) {
        return true;
    }

    if ( rules.required ) {
        isValid = value != null && value.trim() !== '' && isValid;
    }

    if ( rules.minLength ) {
        isValid = value.length >= rules.minLength && isValid
    }

    if ( rules.maxLength ) {
        isValid = value.length <= rules.maxLength && isValid
    }

    if ( rules.isEmail ) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test( value ) && isValid
    }

    if ( rules.isNumeric ) {
        const pattern = /^\d+$/;
        isValid = pattern.test( value ) && isValid
    }

    return isValid;
}

export const checkFormValidity = (formElementArray) => {
    let isFormValid = true;

    for(let arrayIndex in formElementArray) {
        const rowObjectArray = Object.values(formElementArray[arrayIndex]);

        for(let elementId in rowObjectArray){
            const isInputValid = rowObjectArray[elementId].valid;
            
            isFormValid = isInputValid && isFormValid
        }
    }    
    return isFormValid;
}

export const updateFormElementArray = (array, elementRowIndex, elementId, updatedObject) => {

    const updatedElement = updateObject(array[elementRowIndex][elementId], updatedObject);

    const updatedArrayAtIndex = updateObject(array[elementRowIndex], {
        [elementId]: updatedElement
    });

    const updatedArray = updateObject(array, {
        [elementRowIndex]: updatedArrayAtIndex
    });

    return updatedArray;
}

export const clearFormElementArray = (formElementArray) => {
    let updatedFormElementArray = formElementArray;
    formElementArray.forEach((formElementObjects, index, array) => {
        const formElementObjectsEntries = Object.entries(formElementObjects);
        
        for(const [formElementObjectId, formElementObject] of formElementObjectsEntries){
            const updatedObject = {
                value: formElementObject.elementType === 'number' ? 0 : "",
                valid: !formElementObject.validation.required,
                touched: false,
                errorMessage: ""
            }

            updatedFormElementArray = updateFormElementArray(updatedFormElementArray, index, formElementObjectId, updatedObject);
        }
    })

    return Object.values(updatedFormElementArray);
    
}

export const updateFormElementValidity = (errorResponse, formElementArray) => {
    const errorResponseArray = Object.entries(errorResponse);
    let updatedFormElementArray = [...formElementArray];
    let arrayIndex  = 0;

    formElementArray.forEach(formElementRowObjects => {
        const formElementRow = Object.entries(formElementRowObjects);
        
        for(const [elementId] of formElementRow){
            let valid = true;
            let touched = true;
            let message = "";

            for(const [id, errorMessage] of errorResponseArray) {
                let shouldBreak = false;

                if(elementId === id){
                    valid = false;
                    message = errorMessage[0];
                    shouldBreak = true;
                } 
                const updatedObject = {
                    valid: valid,
                    touched: touched,
                    errorMessage: message
                }
                const updatedElement = updateObject(updatedFormElementArray[arrayIndex][elementId], updatedObject);
                const updatedArrayAtIndex = updateObject(updatedFormElementArray[arrayIndex], {
                    [elementId]: updatedElement
                });
            
                updatedFormElementArray[arrayIndex] = updateObject(updatedFormElementArray[arrayIndex], updatedArrayAtIndex);

                if(shouldBreak)
                    break;
            }

        }
        arrayIndex++;
    })
    
    return updatedFormElementArray;
}

export const showToastMessage = (response) => {
    if(response.message){
        showToast(response.message, "success");
    }else if(response.data){
        showToast(response.data.message, "warning");
    }
}

const showToast = (message, type) => toast[type](message,{position: toast.POSITION.BOTTOM_RIGHT});

export const baseChartOptions = () => {
    return {
        chart: {
            height: 350,
            type: 'line',
            stacked: false,
        },
        stroke: {
            curve: 'smooth',
            width: 1
        },
        labels: [],
        markers: {
            size: 0
        },
        xaxis: {
            type:'datetime',
        },
        yaxis: {
            title: {
                text: '',
            },
            min: (min) => {
                if(min === 5e-324)
                    return 0;
                else
                    return min;
            }
        },
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter: function (y) {
                    if(typeof y !== "undefined") {
                        return  y.toFixed(2);
                    }
                    return y;
    
                }
            },
            x: {
                format: 'dd MMM yyyy HH:mm:yy'
            }
        },
        noData: {
            text: "No Data",
            align: 'center',
            verticalAlign: 'middle'
          }
    }
}

export const baseChartSeries = () => {
    return [{
        name: '',
        type: 'line',
        data: []
    }]
} 

export const baseRadialBarChartOptions = () => {
    return {
        chart: {
            height: 350,
            type: 'radialBar',
          },
          plotOptions: {
            radialBar: {
              dataLabels: {
                name: {
                  fontSize: '22px',
                },
                value: {
                  fontSize: '16px',
                },
                total: {
                  show: true,
                  label: 'Total',
                  formatter: function (w) {
                    // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                    return 249
                  }
                }
              }
            }
          },
          labels: [],
    }
}

export const basePolarChartOptions = () => {
    return {
        chart: {
            type: 'polarArea',
            },
            stroke: {
            colors: ['#fff']
        },
        fill: {
            opacity: 0.8
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }],
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter: function (y) {
                    if(typeof y !== "undefined") {
                        return y + "%";
                    }
                    return y;

                }
            }
        }
    }
}

export const updateCharts = (metricCharts, chartsData) => {
    let updatedMetricChartsAtIndex = metricCharts[0];
    const chartDataKeys = Object.keys(chartsData);
    
    for(let key in chartDataKeys) {
        const chartKey = chartDataKeys[key];
        const chart = chartsData[chartKey];
        const updatedChart = updateChart(metricCharts, chartKey, chart.labels, chart.data, chart.series, metricCharts[0][chartKey].chart_type, metricCharts[0][chartKey].title, metricCharts[0][chartKey].chart_options);
        updatedMetricChartsAtIndex = updateObject(updatedMetricChartsAtIndex, {[chartKey]: updatedChart});
    }

    const updatedMetricCharts = metricCharts.map((item, index) => {
        if(index === 0){
            return updatedMetricChartsAtIndex;
        }

        return item[index];
    })

    return updatedMetricCharts;
}

export const updateChart = (metricCharts, chartKey, chartLabels, chartData, chartSeries, chartType, chartTitle, chartOptions) => {
    const isXAxisDateTime = chartOptions.xaxis.hasOwnProperty('type');
    const chartSeriesArray = generateChartSeriesArray(chartData, chartSeries, chartType, chartLabels, isXAxisDateTime);
    const updatedChartOptions = generateChartOptions(chartTitle, chartLabels, chartOptions, chartSeries);
    
    const updatedChart = updateObject(metricCharts[0][chartKey], {
        chart_options: updatedChartOptions, 
        chart_series: chartSeriesArray
    });

    return updatedChart;
}

export const updateChartObject = (metricChart, chartLabels, chartData, chartSeries, chartType, chartTitle) => {
    const isXAxisDateTime = metricChart.chart_options.xaxis.hasOwnProperty('type');
    const chartSeriesArray = generateChartSeriesArray(chartData, chartSeries, chartType, chartLabels, isXAxisDateTime);

    const updatedChartOptions = generateChartOptions(chartTitle, chartLabels, metricChart.chart_options, chartSeries);
    const updatedChart = updateObject(metricChart, {
        chart_options: updatedChartOptions, 
        chart_series: chartSeriesArray
    });

    return updatedChart;
}

export const generateChartSeriesArray = (chartData, chartSeries, chartType, chartLabels, isXAxisDateTime) => {
    const chartSeriesArray = [];
    
    for(let key in chartData){
        const chartSeriesObject = generateChartSeriesObject(chartSeries[key], chartType, chartData[key], chartLabels, isXAxisDateTime);
        chartSeriesArray.push(chartSeriesObject);
    }

    return  chartSeriesArray;
}

export const generateChartSeriesObject = (name, type, data, labels, isXAxisDateTime) => {
    let chartSeriesData = data; 

    if(isXAxisDateTime){
        chartSeriesData = generateChartSeriesDateTimeDataArray(labels, data);
    }

    const chartSeriesObject = {
        name: name,
        type: type,
        // data: data
        data: chartSeriesData
    }
    return chartSeriesObject;
}

export const generateChartSeriesDateTimeDataArray = (labels, data) => {
    const dataCount = data.length;
    const seriesData = [];
    let i = 0;
    while(i < dataCount){
        const dateTime = new Date(labels[i]);
        dateTime.setTime(dateTime.getTime() + (/* UTC+8 */ 8) * 60 * 60 * 1000);
        seriesData.push([dateTime.getTime(), data[i]]);
        i++;
    }
    
    return seriesData;
}

export const generateChartOptions = (chartTitle, chartLabels, chartOptions, chartSeries)  => {
    const options = chartOptions;

    // SET Y-AXIS TITLE
    const updatedYAxisTitle = updateObject(options.yaxis.title, {text: chartTitle})
    const updatedYAxis = updateObject(options.yaxis, {title: updatedYAxisTitle})
    
    let updatedOptions = {labels: chartLabels, yaxis: updatedYAxis};

    // // SET STROKE WIDTH FOR MULTI-LINE GRAPH
    // if(chartSeries.length > 1){
    //     const updatedStrokeWidth = updateObject(options.stroke, {width: 1});
    //     updatedOptions = updateObject(updatedOptions, {stroke: updatedStrokeWidth});
    // }

    const updatedChartOptions = updateObject(options, updatedOptions);

    return updatedChartOptions;
}

export const generateChartObject = (chartsData, chartTitle, chartType) => {
    let charts = {};
    const baseOptions = baseChartOptions();
    
    for(let key in chartsData){
        const chartData = chartsData[key];
        const chartKey = Object.keys(chartData)[0];
        const chart = chartData[chartKey];
        const chartSeriesArray = generateChartSeriesArray(chart.data, chart.series, chartType, chart.labels, true);
        const updatedChartOptions = generateChartOptions(chartTitle, chart.labels, baseOptions, chart.series);
        charts = updateObject(charts, {[chartKey]: {chart_options: updatedChartOptions, chart_series: chartSeriesArray}})
    }
    
    return charts;
}

export const calculateDifferenceBetweenDates = (date1, date2) => {
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    return diffDays;
}

export const createCustomMenuExpandStateObject = (multiLevelNavItems) => {
    const multiLevelNavItemsVal = Object.values(multiLevelNavItems);
    
    let customMultiLevelNavMenu = {};
    let customMenuExpandState = {};
    multiLevelNavItemsVal.map((multiLevelNavItem, index) => {
        const level = index + 1;
        let navItemsGroupByParentId = {};
        multiLevelNavItem.map(navItems => {
            const {
                parentId,
                id
            } = navItems;

            let navItemsGroupByParentIdArr = navItemsGroupByParentId[parentId];
            if(navItemsGroupByParentIdArr){
                navItemsGroupByParentIdArr.push(navItems);
            }else{
                navItemsGroupByParentIdArr = [];
                navItemsGroupByParentIdArr.push(navItems);
                navItemsGroupByParentId = updateObject(navItemsGroupByParentId, {[parentId]: navItemsGroupByParentIdArr});
            }
            
            const key = parentId !== 0 ? parentId + "/" + id : id;
            const object = {id: key, parentId: parentId !== 0 ? "" + parentId : "" + id,isExpand: false};
            customMenuExpandState = updateObject(customMenuExpandState, {[key]: object});
        });

        customMultiLevelNavMenu = updateObject(customMultiLevelNavMenu, {[level]: navItemsGroupByParentId});
    })

    const customMenuState = {customMultiLevelNavMenu:customMultiLevelNavMenu, customMenuExpandState: customMenuExpandState};

    return customMenuState;
}

const pushItemsIntoBreadcrumbArray = (items) => {
    let breadcrumbItemsArray = [];
    items.map(item => {
        breadcrumbItemsArray.push(item);
    })

    return breadcrumbItemsArray;
}

export const populateBreadcrumbItemsBasedOnUserConcessionId = (userConcessionId, home, subPages) => {
    let breadcrumbItems = [];

    if(userConcessionId){
        breadcrumbItems = pushItemsIntoBreadcrumbArray(subPages);
    }else{
        const allPages = home.concat(subPages);
        breadcrumbItems = pushItemsIntoBreadcrumbArray(allPages);
    }

    return breadcrumbItems;
}