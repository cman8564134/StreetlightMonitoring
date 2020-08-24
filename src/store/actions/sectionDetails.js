import * as actionTypes from './actionTypes';

export const fetchSectionDetailsStart = () => {
    return {
        type: actionTypes.FETCH_SECTION_DETAILS_START,
        loading: true
    }
}

export const fetchSectionDetailsSuccess = (section) => {
    return {
        type: actionTypes.FETCH_SECTION_DETAILS_SUCCESS,
        loading: false,
        section: section
    }
}

export const fetchSectionDetailsFail = (error) => {
    return {
        type: actionTypes.FETCH_SECTION_DETAILS_FAIL,
        loading: false,
        error: error
    }
}

export const fetchSectionDetails =  (params) => {
    return dispatch => {
        dispatch(fetchSectionDetailsStart());

        const sections = {
            1: {
                1: {id: 1, concession_name: "ABC Sdn Bhd", section_name: "Section 1", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                2: {id: 2, concession_name: "ABC Sdn Bhd", section_name: "Section 2", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                3: {id: 3, concession_name: "ABC Sdn Bhd", section_name: "Section 3", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                4: {id: 4, concession_name: "ABC Sdn Bhd", section_name: "Section 4", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"}
            },
            2: {
                1: {id: 1, concession_name: "DEF Sdn Bhd", section_name: "Section 1", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                2: {id: 2, concession_name: "DEF Sdn Bhd", section_name: "Section 2", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                3: {id: 3, concession_name: "DEF Sdn Bhd", section_name: "Section 3", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                4: {id: 4, concession_name: "DEF Sdn Bhd", section_name: "Section 4", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"}
            },
            3: {
                1: {id: 1, concession_name: "GHI Sdn Bhd", section_name: "Section 1", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                2: {id: 2, concession_name: "GHI Sdn Bhd", section_name: "Section 2", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                3: {id: 3, concession_name: "GHI Sdn Bhd", section_name: "Section 3", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                4: {id: 4, concession_name: "GHI Sdn Bhd", section_name: "Section 4", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                
            },
            4: {
                1: {id: 1, concession_name: "JKL Sdn Bhd", section_name: "Section 1", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                2: {id: 2, concession_name: "JKL Sdn Bhd", section_name: "Section 2", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                3: {id: 3, concession_name: "JKL Sdn Bhd", section_name: "Section 3", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                4: {id: 4, concession_name: "JKL Sdn Bhd", section_name: "Section 4", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"}
            },
        }
        dispatch(fetchSectionDetailsSuccess(sections[params.concession_id][params.section_id]));
    }
}

export const fetchSubsectionsBySectionStart = () => {
    return {
        type: actionTypes.FETCH_SUBSECTIONS_BY_SECTION_START,
        loading: true
    }
}

export const fetchSubsectionsBySectionSuccess = (subsections) => {
    return {
        type: actionTypes.FETCH_SUBSECTIONS_BY_SECTION_SUCCESS,
        loading: false,
        subsections: subsections
    }
}

export const fetchSubsectionsBySectionFail = (error) => {
    return {
        type: actionTypes.FETCH_SUBSECTIONS_BY_SECTION_FAIL,
        loading: false,
        error: error
    }
}

export const fetchSubsectionsBySection =  (params) => {
    return dispatch => {
        dispatch(fetchSubsectionsBySectionStart());

        const subsections = {
            1: [
                {id: 1, subsection_name: "Section 1/1", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                {id: 2, subsection_name: "Section 1/2", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                {id: 3, subsection_name: "Section 1/3", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                {id: 4, subsection_name: "Section 1/4", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
            ],
            2: [
                {id: 1, subsection_name: "Section 2/1", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                {id: 2, subsection_name: "Section 2/2", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                {id: 3, subsection_name: "Section 2/3", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                {id: 4, subsection_name: "Section 2/4", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
            ],
            3: [
                {id: 1, subsection_name: "Section 3/1", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                {id: 2, subsection_name: "Section 3/2", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                {id: 3, subsection_name: "Section 3/3", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                {id: 4, subsection_name: "Section 3/4", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
            ],
            4: [
                {id: 1, subsection_name: "Section 4/1", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                {id: 2, subsection_name: "Section 4/2", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                {id: 3, subsection_name: "Section 4/3", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                {id: 4, subsection_name: "Section 4/4", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
            ],
            
        }
        dispatch(fetchSubsectionsBySectionSuccess(subsections[params.section_id]));
    }
}


export const fetchSectionMetricChartsStart = () => {
    return {
        type: actionTypes.FETCH_SECTION_METRIC_CHARTS_START,
        loading: true
    }
}

export const fetchSectionMetricChartsSuccess = (chartsData) => {
    return {
        type: actionTypes.FETCH_SECTION_METRIC_CHARTS_SUCCESS,
        loading: false,
        chartsData: chartsData
    }
}

export const fetchSectionMetricChartsFail = (error) => {
    return {
        type: actionTypes.FETCH_SECTION_METRIC_CHARTS_FAIL,
        loading: false,
        error: error
    }
}

export const fetchSectionMetricCharts =  () => {
    return dispatch => {
        dispatch(fetchSectionMetricChartsStart());

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
            dispatch(fetchSectionMetricChartsSuccess(chartsData[0]));
        }
        
    }
}