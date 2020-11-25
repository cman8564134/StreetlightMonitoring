import React, { Fragment, useEffect, useRef, useState } from "react";

import {
    Container,
    Button
} from 'reactstrap';

import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import { HANDLE_ELECTRICITY_BILLING_INPUT_CHANGED_SUCCESS } from '../../store/actions/actionTypes';


import Layout from '../../hoc/Layout/Layout';
import PageTitle from '../../components/Layout/PageTitle/PageTitle';
import SearchFilters from '../../components/SearchFilters/SearchFilters';
import CostBreakdown from '../../components/ElectricityBilling/CostBreakdown/CostBreakdown';
import AccordionDataTable from "../../components/Accordions/AccordionDataTable/AccordionDataTable";
import DataTable from '../../components/Tables/DataTable/DataTable';
import BasicModal from '../../components/Modal/BasicModal/BasicModal';
import BreakdownModal from '../../components/ElectricityBilling/BreakdownModal/BreakdownModal';
import { updateObject } from "../../shared/utility";


const ElectricityBilling = ( props ) => {
    const {
        searchFilters,
        csvData,
        excelSheets,
        costVariables,
        totalBillAmount,
        onFetchConcessionNameMap,
        onHandleInputChanged,
        onFetchElectricityBillCSVData,
        onFetchCostBreakdownBySectionData,
        costBySectionTableData,
        loadingCostByLevelTableData,
        costByLevelTableData,
        onFetchElectricityCostBreakdownByLevel,
        costByLevelTableHeader,
    } = props;
    
    const csvLinkRef = useRef();
    const excelLinkRef = useRef();

    const costBySectionTableColumns = [
        {
            columns: [
                {
                    Header: 'Name',
                    accessor: 'name'
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
        },
        {
            columns: [
                {
                    Header: 'Actions',
                    accessor: 'id',
                    Cell: row => (
                        <div className="d-block w-100 text-center">
                            <Button size="sm" color="primary" disabled={row.original.level === 3} onClick={()=>{showOrHideBreakdownModal(row.value, row.original.name, row.original.level)}}>
                                Details
                            </Button>
                        </div>
                    )
                }
            ]
        },
    ];

    const [accordions, setAccordions] = useState([
        {
            bySection: {
                heading: "Breakdown By Section", 
                isOpen: false, 
                children: <DataTable 
                            data={costBySectionTableData}
                            columns={costBySectionTableColumns}
                            pageSize={10}
                            header={null}
                            filterable
                            loading={loadingCostByLevelTableData}
                        />
            }
        }
    ]);

    const toggleAccordion = (index, id) => {
        const prevState = accordions;
        const updatedAccordions = prevState.map((objects, key) => {
            let updatedAccordionObjects = objects;
            if(key === index){
                const accordionArray = [];
                for(let id in objects){
                    accordionArray.push({
                        id: id,
                        config: objects[id]
                    })
                }

                accordionArray.map((accordion) => {
                    let isOpen = false;

                    if(accordion.id === id){
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
        setAccordions(updatedAccordions);
    }

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

    const [showBreakdownModal, setShowBreakdownModal] = useState(false);

    const createModalBreadcrumbItem = (id, name, level) => {
        const item = {
            title: name,
            href: null,
            onClickHandler: (e)=>{
                                e.preventDefault();
                                showOrHideBreakdownModal(id, name, level);
                                
                            },
            children: name,
            isActive: true
        }
    
        return item;
    }

    const [modalBreadcrumbItems, setModalBreadcrumbItems] = useState([]);

    const showOrHideBreakdownModal = (id, name, breakdownLevel) => {
        if(breakdownLevel >= 0){
            onFetchElectricityCostBreakdownByLevel({id: id, name: name, level: breakdownLevel});

            const updatedBreadcrumbItems = [];

            modalBreadcrumbItems.forEach((element, index) => {
                if(index === breakdownLevel) {
                    const updatedItem = updateObject(element, {href: null, isActive: true});
                    updatedBreadcrumbItems[index] = updatedItem;
                } else if (index < breakdownLevel) {
                    const updatedItem = updateObject(element, {href: '', isActive: false});
                    updatedBreadcrumbItems[index] = updatedItem;
                }
            });

            const currentLevelItem = updatedBreadcrumbItems[breakdownLevel];

            if(!currentLevelItem) {
                const item = createModalBreadcrumbItem(id, name, breakdownLevel);
                updatedBreadcrumbItems[breakdownLevel] = item;
            }

            setModalBreadcrumbItems(updatedBreadcrumbItems);
            if(breakdownLevel === 0)
                setShowBreakdownModal(true);
        }else {
            setShowBreakdownModal(false);
        }
        
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

                    <AccordionDataTable 
                        accordions={accordions}
                        toggleAccordion={toggleAccordion}
                        accordionBody={
                            <DataTable 
                                data={costBySectionTableData}
                                columns={costBySectionTableColumns}
                                pageSize={10}
                                header={null}
                                filterable
                                loading={loadingCostByLevelTableData}
                            />
                        }
                    />

                    <BasicModal 
                        modalWidth={1000}
                        visible={showBreakdownModal}
                        showOrHideModal={showOrHideBreakdownModal}
                    >
                        <BreakdownModal
                            breadcrumbItems={modalBreadcrumbItems}
                            data={costByLevelTableData}
                            tableColumns={costBySectionTableColumns}
                            loading={loadingCostByLevelTableData}
                            header={costByLevelTableHeader}
                        />
                    </BasicModal>

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
        loadingCostByLevelTableData: state.ElectricityBill.loadingCostByLevelTableData,
        costByLevelTableData: state.ElectricityBill.costByLevelTableData,
        costByLevelTableHeader: state.ElectricityBill.costByLevelTableHeader,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchConcessionNameMap: () => dispatch(actions.fetchConcessionNameMap()),
        onHandleInputChanged: (type, value, elementRowIndex, elementId, validationRules) => dispatch(actions.handleInputChanged(type, value, elementRowIndex, elementId, validationRules)),
        onFetchElectricityBillCSVData: (params) => dispatch(actions.fetchElectricityBillCSVData(params)),
        onFetchCostBreakdownBySectionData: () => dispatch(actions.fetchCostBreakdownBySectionData()),
        onFetchElectricityCostBreakdownByLevel: (params) => dispatch(actions.fetchElectricityCostBreakdownByLevel(params)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ElectricityBilling);