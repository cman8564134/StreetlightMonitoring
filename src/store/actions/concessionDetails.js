import * as actionTypes from './actionTypes';

export const fetchConcessionDetailsStart = () => {
    return {
        type: actionTypes.FETCH_CONCESSION_DETAILS_START,
        loading: true
    }
}

export const fetchConcessionDetailsSuccess = (concession_id) => {
    return {
        type: actionTypes.FETCH_CONCESSION_DETAILS_SUCCESS,
        loading: false,
        concession_id: concession_id,
    }
}

export const fetchConcessionDetailsFail = (error) => {
    return {
        type: actionTypes.FETCH_CONCESSION_DETAILS_FAIL,
        loading: false,
        error: error
    }
}

export const fetchConcessionDetails =  (params) => {
    return dispatch => {
        dispatch(fetchConcessionDetailsStart());

        dispatch(fetchConcessionDetailsSuccess(params.concession_id));
    }
}

export const fetchSectionsByConcessionStart = () => {
    return {
        type: actionTypes.FETCH_SECTIONS_BY_CONCESSION_START,
        loading: true
    }
}

export const fetchSectionsByConcessionSuccess = (sections) => {
    return {
        type: actionTypes.FETCH_SECTIONS_BY_CONCESSION_SUCCESS,
        loading: false,
        sections: sections
    }
}

export const fetchSectionsByConcessionFail = (error) => {
    return {
        type: actionTypes.FETCH_SECTIONS_BY_CONCESSION_FAIL,
        loading: false,
        error: error
    }
}

export const fetchSectionsByConcession =  () => {
    return dispatch => {
        dispatch(fetchSectionsByConcessionStart());

        const sections = [
            {id: 1, section_name: "Section 1", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
            {id: 2, section_name: "Section 2", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
            {id: 3, section_name: "Section 3", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
            {id: 4, section_name: "Section 4", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
        ]
        dispatch(fetchSectionsByConcessionSuccess(sections));
    }
}


export const fetchConcessionMetricChartsStart = () => {
    return {
        type: actionTypes.FETCH_CONCESSION_METRIC_CHARTS_START,
        loading: true
    }
}

export const fetchConcessionMetricChartsSuccess = (chartsData) => {
    return {
        type: actionTypes.FETCH_CONCESSION_METRIC_CHARTS_SUCCESS,
        loading: false,
        chartsData: chartsData
    }
}

export const fetchConcessionMetricChartsFail = (error) => {
    return {
        type: actionTypes.FETCH_CONCESSION_METRIC_CHARTS_FAIL,
        loading: false,
        error: error
    }
}

export const fetchConcessionMetricCharts =  () => {
    return dispatch => {
        dispatch(fetchConcessionMetricChartsStart());

        const chartsData = [
            {
                powerUsage: {
                    data: [[2000, 2100,2050,1800,2200,2100,2000]],
                    labels: ["1/7/2020", "2/7/2020", "3/7/2020", "4/7/2020", "5/7/2020", "6/7/2020", "7/7/2020"],
                    series: ["Power Usage"]
                },
                electricalBill: {
                    data: [[10000, 11000,12050,8000,7200,7100,12000]],
                    labels: ["1/7/2020", "2/7/2020", "3/7/2020", "4/7/2020", "5/7/2020", "6/7/2020", "7/7/2020"],
                    series: ["Electrical Bill"]
                },
                carbonFootprint: {
                    data: [[10000, 11000,12050,8000,7200,7100,12000]],
                    labels: ["1/7/2020", "2/7/2020", "3/7/2020", "4/7/2020", "5/7/2020", "6/7/2020", "7/7/2020"],
                    series: ["Carbon Footprint"]
                },
                energySavings: {
                    data: [[10000, 11000,12050,8000,7200,7100,12000]],
                    labels: ["1/7/2020", "2/7/2020", "3/7/2020", "4/7/2020", "5/7/2020", "6/7/2020", "7/7/2020"],
                    series: ["Energy Savings"]
                },
                amperage: {
                    data: [[10000, 11000,12050,8000,7200,7100,12000],[9080, 10000,12000,9000,7000,6900,11000],[9000, 9800,11800,8900,7010,5900,11090]],
                    labels: ["1/7/2020", "2/7/2020", "3/7/2020", "4/7/2020", "5/7/2020", "6/7/2020", "7/7/2020"],
                    series: ["Amperage P1", "Amperage P2", "Amperage P3"]
                },
                voltage: {
                    data: [[10000, 11000,12050,8000,7200,7100,12000],[9080, 10000,12000,9000,7000,6900,11000],[9000, 9800,11800,8900,7010,5900,11090]],
                    labels: ["1/7/2020", "2/7/2020", "3/7/2020", "4/7/2020", "5/7/2020", "6/7/2020", "7/7/2020"],
                    series: ["Voltage P1", "Voltage P2", "Voltage P3"]
                }
            }
        ]

        if(chartsData && chartsData.length > 0) {
            dispatch(fetchConcessionMetricChartsSuccess(chartsData[0]));
        }
        
    }
}