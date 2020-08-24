import * as actionTypes from './actionTypes';

export const fetchSubsectionDetailsStart = () => {
    return {
        type: actionTypes.FETCH_SUBSECTION_DETAILS_START,
        loading: true
    }
}

export const fetchSubsectionDetailsSuccess = (subsection) => {
    return {
        type: actionTypes.FETCH_SUBSECTION_DETAILS_SUCCESS,
        loading: false,
        subsection: subsection
    }
}

export const fetchSubsectionDetailsFail = (error) => {
    return {
        type: actionTypes.FETCH_SUBSECTION_DETAILS_FAIL,
        loading: false,
        error: error
    }
}

export const fetchSubsectionDetails =  (params) => {
    return dispatch => {
        dispatch(fetchSubsectionDetailsStart());

        const subsections = {
            1: {
                1: {
                    1: {id: 1, concession_name: "ABC Sdn Bhd", section_name: "Section 1", subsection_name: "Section 1/1", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                    2: {id: 2, concession_name: "ABC Sdn Bhd", section_name: "Section 1", subsection_name: "Section 1/2", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                    3: {id: 3, concession_name: "ABC Sdn Bhd", section_name: "Section 1", subsection_name: "Section 1/3", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                    4: {id: 4, concession_name: "ABC Sdn Bhd", section_name: "Section 1", subsection_name: "Section 1/4", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"}
                },
                2: {
                    1: {id: 1, concession_name: "ABC Sdn Bhd", section_name: "Section 2", subsection_name: "Section 2/1", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                    2: {id: 2, concession_name: "ABC Sdn Bhd", section_name: "Section 2", subsection_name: "Section 2/2", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                    3: {id: 3, concession_name: "ABC Sdn Bhd", section_name: "Section 2", subsection_name: "Section 2/3", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                    4: {id: 4, concession_name: "ABC Sdn Bhd", section_name: "Section 2", subsection_name: "Section 2/4", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"}
                },
                3: {
                    1: {id: 1, concession_name: "ABC Sdn Bhd", section_name: "Section 3", subsection_name: "Section 3/1", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                    2: {id: 2, concession_name: "ABC Sdn Bhd", section_name: "Section 3", subsection_name: "Section 3/2", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                    3: {id: 3, concession_name: "ABC Sdn Bhd", section_name: "Section 3", subsection_name: "Section 3/3", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                    4: {id: 4, concession_name: "ABC Sdn Bhd", section_name: "Section 3", subsection_name: "Section 3/4", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"}
                },
                4: {
                    1: {id: 1, concession_name: "ABC Sdn Bhd", section_name: "Section 4", subsection_name: "Section 4/1", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                    2: {id: 2, concession_name: "ABC Sdn Bhd", section_name: "Section 4", subsection_name: "Section 4/2", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                    3: {id: 3, concession_name: "ABC Sdn Bhd", section_name: "Section 4", subsection_name: "Section 4/3", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                    4: {id: 4, concession_name: "ABC Sdn Bhd", section_name: "Section 4", subsection_name: "Section 4/4", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"}
                },
            },
            2: {
                1: {
                    1: {id: 1, concession_name: "DEF Sdn Bhd", section_name: "Section 1", subsection_name: "Section 1/1", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                    2: {id: 2, concession_name: "DEF Sdn Bhd", section_name: "Section 1", subsection_name: "Section 1/2", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                    3: {id: 3, concession_name: "DEF Sdn Bhd", section_name: "Section 1", subsection_name: "Section 1/3", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                    4: {id: 4, concession_name: "DEF Sdn Bhd", section_name: "Section 1", subsection_name: "Section 1/4", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"}
                },
                2: {
                    1: {id: 1, concession_name: "DEF Sdn Bhd", section_name: "Section 2", subsection_name: "Section 2/1", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                    2: {id: 2, concession_name: "DEF Sdn Bhd", section_name: "Section 2", subsection_name: "Section 2/2", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                    3: {id: 3, concession_name: "DEF Sdn Bhd", section_name: "Section 2", subsection_name: "Section 2/3", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                    4: {id: 4, concession_name: "DEF Sdn Bhd", section_name: "Section 2", subsection_name: "Section 2/4", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"}
                },
                3: {
                    1: {id: 1, concession_name: "DEF Sdn Bhd", section_name: "Section 3", subsection_name: "Section 3/1", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                    2: {id: 2, concession_name: "DEF Sdn Bhd", section_name: "Section 3", subsection_name: "Section 3/2", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                    3: {id: 3, concession_name: "DEF Sdn Bhd", section_name: "Section 3", subsection_name: "Section 3/3", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                    4: {id: 4, concession_name: "DEF Sdn Bhd", section_name: "Section 3", subsection_name: "Section 3/4", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"}
                },
                4: {
                    1: {id: 1, concession_name: "DEF Sdn Bhd", section_name: "Section 4", subsection_name: "Section 4/1", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                    2: {id: 2, concession_name: "DEF Sdn Bhd", section_name: "Section 4", subsection_name: "Section 4/2", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                    3: {id: 3, concession_name: "DEF Sdn Bhd", section_name: "Section 4", subsection_name: "Section 4/3", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                    4: {id: 4, concession_name: "DEF Sdn Bhd", section_name: "Section 4", subsection_name: "Section 4/4", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"}
                },
            },
            3: {
                1: {
                    1: {id: 1, concession_name: "GHI Sdn Bhd", section_name: "Section 1", subsection_name: "Section 1/1", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                    2: {id: 2, concession_name: "GHI Sdn Bhd", section_name: "Section 1", subsection_name: "Section 1/2", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                    3: {id: 3, concession_name: "GHI Sdn Bhd", section_name: "Section 1", subsection_name: "Section 1/3", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                    4: {id: 4, concession_name: "GHI Sdn Bhd", section_name: "Section 1", subsection_name: "Section 1/4", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"}
                },
                2: {
                    1: {id: 1, concession_name: "GHI Sdn Bhd", section_name: "Section 2", subsection_name: "Section 2/1", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                    2: {id: 2, concession_name: "GHI Sdn Bhd", section_name: "Section 2", subsection_name: "Section 2/2", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                    3: {id: 3, concession_name: "GHI Sdn Bhd", section_name: "Section 2", subsection_name: "Section 2/3", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                    4: {id: 4, concession_name: "GHI Sdn Bhd", section_name: "Section 2", subsection_name: "Section 2/4", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"}
                },
                3: {
                    1: {id: 1, concession_name: "GHI Sdn Bhd", section_name: "Section 3", subsection_name: "Section 3/1", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                    2: {id: 2, concession_name: "GHI Sdn Bhd", section_name: "Section 3", subsection_name: "Section 3/2", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                    3: {id: 3, concession_name: "GHI Sdn Bhd", section_name: "Section 3", subsection_name: "Section 3/3", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                    4: {id: 4, concession_name: "GHI Sdn Bhd", section_name: "Section 3", subsection_name: "Section 3/4", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"}
                },
                4: {
                    1: {id: 1, concession_name: "GHI Sdn Bhd", section_name: "Section 4", subsection_name: "Section 4/1", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                    2: {id: 2, concession_name: "GHI Sdn Bhd", section_name: "Section 4", subsection_name: "Section 4/2", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                    3: {id: 3, concession_name: "GHI Sdn Bhd", section_name: "Section 4", subsection_name: "Section 4/3", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                    4: {id: 4, concession_name: "GHI Sdn Bhd", section_name: "Section 4", subsection_name: "Section 4/4", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"}
                },
            },
            4: {
                1: {
                    1: {id: 1, concession_name: "JKL Sdn Bhd", section_name: "Section 1", subsection_name: "Section 1/1", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                    2: {id: 2, concession_name: "JKL Sdn Bhd", section_name: "Section 1", subsection_name: "Section 1/2", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                    3: {id: 3, concession_name: "JKL Sdn Bhd", section_name: "Section 1", subsection_name: "Section 1/3", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                    4: {id: 4, concession_name: "JKL Sdn Bhd", section_name: "Section 1", subsection_name: "Section 1/4", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"}
                },
                2: {
                    1: {id: 1, concession_name: "JKL Sdn Bhd", section_name: "Section 2", subsection_name: "Section 2/1", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                    2: {id: 2, concession_name: "JKL Sdn Bhd", section_name: "Section 2", subsection_name: "Section 2/2", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                    3: {id: 3, concession_name: "JKL Sdn Bhd", section_name: "Section 2", subsection_name: "Section 2/3", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                    4: {id: 4, concession_name: "JKL Sdn Bhd", section_name: "Section 2", subsection_name: "Section 2/4", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"}
                },
                3: {
                    1: {id: 1, concession_name: "JKL Sdn Bhd", section_name: "Section 3", subsection_name: "Section 3/1", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                    2: {id: 2, concession_name: "JKL Sdn Bhd", section_name: "Section 3", subsection_name: "Section 3/2", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                    3: {id: 3, concession_name: "JKL Sdn Bhd", section_name: "Section 3", subsection_name: "Section 3/3", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                    4: {id: 4, concession_name: "JKL Sdn Bhd", section_name: "Section 3", subsection_name: "Section 3/4", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"}
                },
                4: {
                    1: {id: 1, concession_name: "JKL Sdn Bhd", section_name: "Section 4", subsection_name: "Section 4/1", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                    2: {id: 2, concession_name: "JKL Sdn Bhd", section_name: "Section 4", subsection_name: "Section 4/2", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                    3: {id: 3, concession_name: "JKL Sdn Bhd", section_name: "Section 4", subsection_name: "Section 4/3", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
                    4: {id: 4, concession_name: "JKL Sdn Bhd", section_name: "Section 4", subsection_name: "Section 4/4", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"}
                },
            },
            
        }
        dispatch(fetchSubsectionDetailsSuccess(subsections[params.concession_id][params.section_id][params.subsection_id]));
    }
}

export const fetchFeederPillarsBySubsectionStart = () => {
    return {
        type: actionTypes.FETCH_FEEDER_PILLARS_BY_SUBSECTION_START,
        loading: true
    }
}

export const fetchFeederPillarsBySubsectionSuccess = (feederPillars) => {
    return {
        type: actionTypes.FETCH_FEEDER_PILLARS_BY_SUBSECTION_SUCCESS,
        loading: false,
        feederPillars: feederPillars
    }
}

export const fetchFeederPillarsBySubsectionFail = (error) => {
    return {
        type: actionTypes.FETCH_FEEDER_PILLARS_BY_SUBSECTION_FAIL,
        loading: false,
        error: error
    }
}

export const fetchFeederPillarsBySubsection =  (params) => {
    return dispatch => {
        dispatch(fetchFeederPillarsBySubsectionStart());

        const feederPillars = 
            [
                {id: 1, subsection_name: "1", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500", door_status: "CLOSED"},
                {id: 2, subsection_name: "2", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500", door_status: "CLOSED"},
                {id: 3, subsection_name: "3", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500", door_status: "CLOSED"},
                {id: 4, subsection_name: "4", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500", door_status: "CLOSED"}
            ];
        dispatch(fetchFeederPillarsBySubsectionSuccess(feederPillars));
    }
}


export const fetchSubsectionMetricChartsStart = () => {
    return {
        type: actionTypes.FETCH_SUBSECTION_METRIC_CHARTS_START,
        loading: true
    }
}

export const fetchSubsectionMetricChartsSuccess = (chartsData) => {
    return {
        type: actionTypes.FETCH_SUBSECTION_METRIC_CHARTS_SUCCESS,
        loading: false,
        chartsData: chartsData
    }
}

export const fetchSubsectionMetricChartsFail = (error) => {
    return {
        type: actionTypes.FETCH_SUBSECTION_METRIC_CHARTS_FAIL,
        loading: false,
        error: error
    }
}

export const fetchSubsectionMetricCharts =  () => {
    return dispatch => {
        dispatch(fetchSubsectionMetricChartsStart());

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
            dispatch(fetchSubsectionMetricChartsSuccess(chartsData[0]));
        }
        
    }
}