import * as actionTypes from './actionTypes';

export const fetchConcessionNameMapStart = () => {
    return {
        type: actionTypes.FETCH_CONCESSION_NAME_MAP_START,
        loading: true
    }
}

export const fetchConcessionNameMapSuccess = (concessionNameMap) => {
    return {
        type: actionTypes.FETCH_CONCESSION_NAME_MAP_SUCCESS,
        loading: false,
        concessionNameMap: concessionNameMap,
    }
}

export const fetchConcessionNameMapFail = (error) => {
    return {
        type: actionTypes.FETCH_CONCESSION_NAME_MAP_FAIL,
        loading: false,
        error: error
    }
}

export const fetchConcessionNameMap =  () => {
    return dispatch => {
        dispatch(fetchConcessionNameMapStart());

        const concessionNameMap = 
            {
                1: "ABC Sdn Bhd",
                2: "DEF Sdn Bhd",
                3: "GHI Sdn Bhd",
                4: "JKL Sdn Bhd",
            }
        dispatch(fetchConcessionNameMapSuccess(concessionNameMap));
    }
}

export const fetchElectricityBillCSVDataStart = () => {
    return {
        type: actionTypes.FETCH_ELECTRICITY_BILL_CSV_DATA_START,
        loading: false
    }
}

export const fetchElectricityBillCSVDataSuccess = (csvData) => {
    return {
        type: actionTypes.FETCH_ELECTRICITY_BILL_CSV_DATA_SUCCESS,
        loading: false,
        csvData: csvData
    }
}

export const fetchElectricityBillCSVDataFail = (error) => {
    return {
        type: actionTypes.FETCH_ELECTRICITY_BILL_CSV_DATA_FAIL,
        loading: false,
        error: error
    }
}

export const fetchElectricityBillCSVData = ( params ) => {
    
    return dispatch => {
        dispatch(fetchElectricityBillCSVDataStart());    

        const electricityBills = 
        {
            1: [
                {id: 1, concession_name: "ABC Sdn Bhd", section_name: "Section 1", bill_date: "30/06/2020", bill_amount: "106.17", consumption: "557.36", icpt: "8.47", current_month_usage: "98.54", gst: "5.91", feed_in_tariff: "1.71", total_cost_per_night: "25.46", total_cost_per_year: "101.71", total_energy_per_night: "133.65", total_energy_per_year: "533.96"},
                {id: 2, concession_name: "ABC Sdn Bhd", section_name: "Section 2", bill_date: "30/06/2020", bill_amount: "106.17", consumption: "557.36", icpt: "8.47", current_month_usage: "98.54", gst: "5.91", feed_in_tariff: "1.71", total_cost_per_night: "25.46", total_cost_per_year: "101.71", total_energy_per_night: "133.65", total_energy_per_year: "533.96"},
                {id: 3, concession_name: "ABC Sdn Bhd", section_name: "Section 3", bill_date: "30/06/2020", bill_amount: "106.17", consumption: "557.36", icpt: "8.47", current_month_usage: "98.54", gst: "5.91", feed_in_tariff: "1.71", total_cost_per_night: "25.46", total_cost_per_year: "101.71", total_energy_per_night: "133.65", total_energy_per_year: "533.96"},
                {id: 4, concession_name: "ABC Sdn Bhd", section_name: "Section 4", bill_date: "30/06/2020", bill_amount: "106.17", consumption: "557.36", icpt: "8.47", current_month_usage: "98.54", gst: "5.91", feed_in_tariff: "1.71", total_cost_per_night: "25.46", total_cost_per_year: "101.71", total_energy_per_night: "133.65", total_energy_per_year: "533.96"}
            ],
            2: [
                {id: 1, concession_name: "DEF Sdn Bhd", section_name: "Section 1", bill_date: "30/06/2020", bill_amount: "106.17", consumption: "557.36", icpt: "8.47", current_month_usage: "98.54", gst: "5.91", feed_in_tariff: "1.71", total_cost_per_night: "25.46", total_cost_per_year: "101.71", total_energy_per_night: "133.65", total_energy_per_year: "533.96"},
                {id: 2, concession_name: "DEF Sdn Bhd", section_name: "Section 2", bill_date: "30/06/2020", bill_amount: "106.17", consumption: "557.36", icpt: "8.47", current_month_usage: "98.54", gst: "5.91", feed_in_tariff: "1.71", total_cost_per_night: "25.46", total_cost_per_year: "101.71", total_energy_per_night: "133.65", total_energy_per_year: "533.96"},
                {id: 3, concession_name: "DEF Sdn Bhd", section_name: "Section 3", bill_date: "30/06/2020", bill_amount: "106.17", consumption: "557.36", icpt: "8.47", current_month_usage: "98.54", gst: "5.91", feed_in_tariff: "1.71", total_cost_per_night: "25.46", total_cost_per_year: "101.71", total_energy_per_night: "133.65", total_energy_per_year: "533.96"},
                {id: 4, concession_name: "DEF Sdn Bhd", section_name: "Section 4", bill_date: "30/06/2020", bill_amount: "106.17", consumption: "557.36", icpt: "8.47", current_month_usage: "98.54", gst: "5.91", feed_in_tariff: "1.71", total_cost_per_night: "25.46", total_cost_per_year: "101.71", total_energy_per_night: "133.65", total_energy_per_year: "533.96"}
            ],
            3: [
                {id: 1, concession_name: "GHI Sdn Bhd", section_name: "Section 1", bill_date: "30/06/2020", bill_amount: "106.17", consumption: "557.36", icpt: "8.47", current_month_usage: "98.54", gst: "5.91", feed_in_tariff: "1.71", total_cost_per_night: "25.46", total_cost_per_year: "101.71", total_energy_per_night: "133.65", total_energy_per_year: "533.96"},
                {id: 2, concession_name: "GHI Sdn Bhd", section_name: "Section 2", bill_date: "30/06/2020", bill_amount: "106.17", consumption: "557.36", icpt: "8.47", current_month_usage: "98.54", gst: "5.91", feed_in_tariff: "1.71", total_cost_per_night: "25.46", total_cost_per_year: "101.71", total_energy_per_night: "133.65", total_energy_per_year: "533.96"},
                {id: 3, concession_name: "GHI Sdn Bhd", section_name: "Section 3", bill_date: "30/06/2020", bill_amount: "106.17", consumption: "557.36", icpt: "8.47", current_month_usage: "98.54", gst: "5.91", feed_in_tariff: "1.71", total_cost_per_night: "25.46", total_cost_per_year: "101.71", total_energy_per_night: "133.65", total_energy_per_year: "533.96"},
                {id: 4, concession_name: "GHI Sdn Bhd", section_name: "Section 4", bill_date: "30/06/2020", bill_amount: "106.17", consumption: "557.36", icpt: "8.47", current_month_usage: "98.54", gst: "5.91", feed_in_tariff: "1.71", total_cost_per_night: "25.46", total_cost_per_year: "101.71", total_energy_per_night: "133.65", total_energy_per_year: "533.96"}
            ],
            4: [
                {id: 1, concession_name: "JKL Sdn Bhd", section_name: "Section 1", bill_date: "30/06/2020", bill_amount: "106.17", consumption: "557.36", icpt: "8.47", current_month_usage: "98.54", gst: "5.91", feed_in_tariff: "1.71", total_cost_per_night: "25.46", total_cost_per_year: "101.71", total_energy_per_night: "133.65", total_energy_per_year: "533.96"},
                {id: 2, concession_name: "JKL Sdn Bhd", section_name: "Section 2", bill_date: "30/06/2020", bill_amount: "106.17", consumption: "557.36", icpt: "8.47", current_month_usage: "98.54", gst: "5.91", feed_in_tariff: "1.71", total_cost_per_night: "25.46", total_cost_per_year: "101.71", total_energy_per_night: "133.65", total_energy_per_year: "533.96"},
                {id: 3, concession_name: "JKL Sdn Bhd", section_name: "Section 3", bill_date: "30/06/2020", bill_amount: "106.17", consumption: "557.36", icpt: "8.47", current_month_usage: "98.54", gst: "5.91", feed_in_tariff: "1.71", total_cost_per_night: "25.46", total_cost_per_year: "101.71", total_energy_per_night: "133.65", total_energy_per_year: "533.96"},
                {id: 4, concession_name: "JKL Sdn Bhd", section_name: "Section 4", bill_date: "30/06/2020", bill_amount: "106.17", consumption: "557.36", icpt: "8.47", current_month_usage: "98.54", gst: "5.91", feed_in_tariff: "1.71", total_cost_per_night: "25.46", total_cost_per_year: "101.71", total_energy_per_night: "133.65", total_energy_per_year: "533.96"}
            ],
        }
        
        if(params.concession_id === ''){
            return Promise.resolve({isSuccessful: false});
        }else{
            dispatch(fetchElectricityBillCSVDataSuccess(electricityBills[params.concession_id]));

            return Promise.resolve({isSuccessful: true});
        }

        
    }
}

export const fetchCostBreakdownBySectionDataStart = () => {
    return {
        type: actionTypes.FETCH_COST_BREAKDOWN_BY_SECTION_DATA_START,
        loading: false
    }
}

export const fetchCostBreakdownBySectionDataSuccess = (costBreakdownBySection) => {
    return {
        type: actionTypes.FETCH_COST_BREAKDOWN_BY_SECTION_DATA_SUCCESS,
        loading: false,
        costBreakdownBySection: costBreakdownBySection
    }
}

export const fetchCostBreakdownBySectionDataFail = (error) => {
    return {
        type: actionTypes.FETCH_COST_BREAKDOWN_BY_SECTION_DATA_FAIL,
        loading: false,
        error: error
    }
}

export const fetchCostBreakdownBySectionData = () => {
    
    return dispatch => {
        dispatch(fetchCostBreakdownBySectionDataStart());    

        const electricityBills = [
            {id: 1, concession_name: "ABC Sdn Bhd", section_name: "Section 1", bill_date: "30/06/2020", bill_amount: "106.17", consumption: "557.36", cost: "107.01", icpt: "8.47", current_month_usage: "98.54", gst: "5.91", feed_in_tariff: "1.71", total_cost_per_night: "25.46", total_cost_per_year: "101.71", total_energy_per_night: "133.65", total_energy_per_year: "533.96"},
            {id: 2, concession_name: "ABC Sdn Bhd", section_name: "Section 2", bill_date: "30/06/2020", bill_amount: "106.17", consumption: "557.36", cost: "107.01", icpt: "8.47", current_month_usage: "98.54", gst: "5.91", feed_in_tariff: "1.71", total_cost_per_night: "25.46", total_cost_per_year: "101.71", total_energy_per_night: "133.65", total_energy_per_year: "533.96"},
            {id: 3, concession_name: "ABC Sdn Bhd", section_name: "Section 3", bill_date: "30/06/2020", bill_amount: "106.17", consumption: "557.36", cost: "107.01", icpt: "8.47", current_month_usage: "98.54", gst: "5.91", feed_in_tariff: "1.71", total_cost_per_night: "25.46", total_cost_per_year: "101.71", total_energy_per_night: "133.65", total_energy_per_year: "533.96"},
            {id: 4, concession_name: "ABC Sdn Bhd", section_name: "Section 4", bill_date: "30/06/2020", bill_amount: "106.17", consumption: "557.36", cost: "107.01", icpt: "8.47", current_month_usage: "98.54", gst: "5.91", feed_in_tariff: "1.71", total_cost_per_night: "25.46", total_cost_per_year: "101.71", total_energy_per_night: "133.65", total_energy_per_year: "533.96"}    
        ]
        
        dispatch(fetchCostBreakdownBySectionDataSuccess(electricityBills));

        return Promise.resolve({isSuccessful: true});
        
    }
}


export const toggleAccordionSuccess = (index, id) => {
    return {
        type: actionTypes.TOGGLE_ACCORDION_SUCCESS,
        index: index,
        id: id
    }
}

export const toggleAccordion = (index, id) => {
    
    return dispatch => {
        dispatch(toggleAccordionSuccess(index, id));        
    }
}