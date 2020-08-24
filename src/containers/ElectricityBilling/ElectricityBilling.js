import React, { Fragment, useEffect, useRef } from "react";

import {
    Container
} from 'reactstrap';

import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import { HANDLE_ELECTRICITY_BILLING_INPUT_CHANGED_SUCCESS } from '../../store/actions/actionTypes';


import Layout from '../../hoc/Layout/Layout';
import PageTitle from '../../components/Layout/PageTitle/PageTitle';
import SearchFilters from '../../components/SearchFilters/SearchFilters';
import CostBreakdown from '../../components/ElectricityBilling/CostBreakdown/CostBreakdown';
import Accordion from "../../components/Accordion/Accordion";

const ElectricityBilling = ( props ) => {
    const {
        searchFilters,
        csvData,
        excelSheets,
        costVariables,
        totalBillAmount,
        accordions,
        onFetchConcessionNameMap,
        onHandleInputChanged,
        onFetchElectricityBillCSVData,
        onFetchCostBreakdownBySectionData,
        onToggleAccordion
    } = props;
    
    const csvLinkRef = useRef();
    const excelLinkRef = useRef();

    useEffect(() => {
        onFetchConcessionNameMap();
        onFetchCostBreakdownBySectionData();
    }, [
        onFetchConcessionNameMap, 
        csvLinkRef, 
        excelLinkRef, 
        onFetchCostBreakdownBySectionData
    ]);

    const inputChangedHandler = (event, elementRowIndex, elementId, validationRules) => {
        let value = '';
        if(event != null && event.target){
            value = event.target.value;
        }else {
            value = event;
        }

        onHandleInputChanged(HANDLE_ELECTRICITY_BILLING_INPUT_CHANGED_SUCCESS, value, elementRowIndex, elementId, validationRules);
    }

    const onExportCSVHandler = (event) => {
        event.preventDefault();
        
        const concession_id = searchFilters[0].concession.value;
        onFetchElectricityBillCSVData({concession_id: concession_id})
            .then((response) => {
                if(response.isSuccessful){
                    csvLinkRef.current.link.click();
                }
            });
    }

    const onExportExcelHandler = (event) => {
        event.preventDefault();

        const concession_id = searchFilters[0].concession.value;
        onFetchElectricityBillCSVData({concession_id: concession_id})
            .then((response) => {
                if(response.isSuccessful){
                    excelLinkRef.current.click();
                }
            });
    }
    
    return (
        <Fragment>
            <Layout {...props}>
                <PageTitle
                    heading = "Electricity Billing"
                    icon = "pe-7s-home opacity-6"
                />

                <Container fluid>
                    <SearchFilters 
                        filterElementArray={searchFilters}
                        inputChangedHandler={inputChangedHandler}
                        loading={false}
                        onApplyFilterHandler={()=>null}
                        onExportCSVHandler={onExportCSVHandler}
                        csvLinkRef={csvLinkRef}
                        csvData={csvData}
                        excelLinkRef={excelLinkRef}
                        onExportExcelHandler={onExportExcelHandler}
                        excelSheets={excelSheets}
                        isExportable
                    />

                    <CostBreakdown
                        formElementArray={costVariables}
                        heading={"Cost Breakdown"}
                        totalBillAmount={totalBillAmount}
                    />

                    <Accordion 
                        accordions={accordions}
                        toggleAccordion={onToggleAccordion}
                    />

                </Container>
            </Layout>
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        searchFilters: state.ElectricityBill.searchFilters,
        csvData: state.ElectricityBill.csvData,
        excelSheets: state.ElectricityBill.excelSheets,
        costVariables: state.ElectricityBill.costVariables,
        totalBillAmount: state.ElectricityBill.totalBillAmount,
        costBySectionTableData: state.ElectricityBill.costBySectionTableData,
        loadingCostBySectionTableData: state.ElectricityBill.loadingCostBySectionTableData,
        accordions: state.ElectricityBill.accordions,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchConcessionNameMap: () => dispatch(actions.fetchConcessionNameMap()),
        onHandleInputChanged: (type, value, elementRowIndex, elementId, validationRules) => dispatch(actions.handleInputChanged(type, value, elementRowIndex, elementId, validationRules)),
        onFetchElectricityBillCSVData: (params) => dispatch(actions.fetchElectricityBillCSVData(params)),
        onFetchCostBreakdownBySectionData: () => dispatch(actions.fetchCostBreakdownBySectionData()),
        onToggleAccordion: (index, id) => dispatch(actions.toggleAccordion(index, id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ElectricityBilling);