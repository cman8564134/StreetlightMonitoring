import * as actionTypes from './actionTypes';

export const fetchFeederPillarDetailsStart = () => {
    return {
        type: actionTypes.FETCH_FEEDER_PILLAR_DETAILS_START,
        loading: true
    }
}

export const fetchFeederPillarDetailsSuccess = (concessionName, sectionName, subsectionName, feederPillar) => {
    return {
        type: actionTypes.FETCH_FEEDER_PILLAR_DETAILS_SUCCESS,
        loading: false,
        feederPillar: feederPillar,
        concessionName: concessionName,
        sectionName: sectionName,
        subsectionName: subsectionName,
    }
}

export const fetchFeederPillarDetailsFail = (error) => {
    return {
        type: actionTypes.FETCH_FEEDER_PILLAR_DETAILS_FAIL,
        loading: false,
        error: error
    }
}

export const fetchFeederPillarDetails =  (params) => {
    return dispatch => {
        dispatch(fetchFeederPillarDetailsStart());

        const concessions = {
            1: {concession_name: "ABC Sdn Bhd"},
            2: {concession_name: "DEF Sdn Bhd"},
            3: {concession_name: "GHI Sdn Bhd"},
            4: {concession_name: "JKL Sdn Bhd"},
        }

        const sections = {
            1:{
                section_name: "Section 1", 
                subsections: {
                    1: {subsection_name: "Section 1/1"},
                    2: {subsection_name: "Section 1/2"},
                    3: {subsection_name: "Section 1/3"},
                    4: {subsection_name: "Section 1/4"},
                }
            },
            2:{
                section_name: "Section 2", 
                subsections: {
                    1: {subsection_name: "Section 2/1"},
                    2: {subsection_name: "Section 2/2"},
                    3: {subsection_name: "Section 2/3"},
                    4: {subsection_name: "Section 2/4"},
                }
            },
            3:{
                section_name: "Section 3", 
                subsections: {
                    1: {subsection_name: "Section 3/1"},
                    2: {subsection_name: "Section 3/2"},
                    3: {subsection_name: "Section 3/3"},
                    4: {subsection_name: "Section 3/4"},
                }
            },
            4:{
                section_name: "Section 4", 
                subsections: {
                    1: {subsection_name: "Section 4/1"},
                    2: {subsection_name: "Section 4/2"},
                    3: {subsection_name: "Section 4/3"},
                    4: {subsection_name: "Section 4/4"},
                }
            },
        }

        const feederPillars = {
            1: {id: 1, feeder_pillar_id: "1", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500", door_status: "CLOSED"},
            2: {id: 2, feeder_pillar_id: "2", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500", door_status: "CLOSED"},
            3: {id: 3, feeder_pillar_id: "3", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500", door_status: "CLOSED"},
            4: {id: 4, feeder_pillar_id: "4", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500", door_status: "CLOSED"}  
        }

        const concession_name = concessions[params.concession_id].concession_name;
        const section_name = sections[params.section_id].section_name;
        const subsection_name = sections[params.section_id].subsections[params.subsection_id].subsection_name;
        const feederPillar = feederPillars[params.feeder_pillar_id]
        
        dispatch(fetchFeederPillarDetailsSuccess(concession_name, section_name, subsection_name, feederPillar));
    }
}


export const fetchFeederPillarMetricChartsStart = () => {
    return {
        type: actionTypes.FETCH_FEEDER_PILLAR_METRIC_CHARTS_START,
        loading: true
    }
}

export const fetchFeederPillarMetricChartsSuccess = (chartsData) => {
    return {
        type: actionTypes.FETCH_FEEDER_PILLAR_METRIC_CHARTS_SUCCESS,
        loading: false,
        chartsData: chartsData
    }
}

export const fetchFeederPillarMetricChartsFail = (error) => {
    return {
        type: actionTypes.FETCH_FEEDER_PILLAR_METRIC_CHARTS_FAIL,
        loading: false,
        error: error
    }
}

export const fetchFeederPillarMetricCharts =  () => {
    return dispatch => {
        dispatch(fetchFeederPillarMetricChartsStart());

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
            dispatch(fetchFeederPillarMetricChartsSuccess(chartsData[0]));
        }
        
    }
}