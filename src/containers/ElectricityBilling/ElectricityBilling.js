import React, { Fragment, useEffect, useRef, useState } from "react";

import {
    Container,
    Button
} from 'reactstrap';

import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import { HANDLE_ELECTRICITY_BILLING_INPUT_CHANGED_SUCCESS, FETCH_ELECTRICITY_BILLING_CONCESSION_NAME_MAP_SUCCESS } from '../../store/actions/actionTypes';


import Layout from '../../hoc/Layout/Layout';
import PageTitle from '../../components/Layout/PageTitle/PageTitle';
import SearchFilters from '../../components/SearchFilters/SearchFilters';
import CostBreakdown from '../../components/ElectricityBilling/CostBreakdown/CostBreakdown';
import AccordionDataTable from "../../components/Accordions/DataTableAccordion/DataTableAccordion";
import DataTable from '../../components/Tables/DataTable/DataTable';
import BasicModal from '../../components/Modal/BasicModal/BasicModal';
import BreakdownModal from '../../components/ElectricityBilling/BreakdownModal/BreakdownModal';
import { updateObject, checkFormValidity, formatDateByDateFormat, getFirstDayOfMonth, getLastDayOfMonth, getFirstDayOfYear, getLastDayOfYear } from "../../shared/utility";
import LabelInputFormGroup from "../../components/Form/LabelInputFormGroup/LabelInputFormGroup";
import DatePickerDropdown from "../../components/Form/DatePicker/DatePickerDropdown/DatePickerDropdown";


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
        level,
        loadingCostBySectionTableData,
        onResetBreakdownLevel
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
                    Header: 'Bill Amount (RM)',
                    accessor: 'total_bill_amount'
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
                    Header: 'GST (RM)',
                    accessor: 'gst'
                },
                {
                    Header: 'Feed-In Tariff (RM)',
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
                            {level !== 3 
                                ? 
                                <Button size="sm" color="primary" disabled={level === 3} onClick={()=>{showOrHideBreakdownModal(row.value, row.original.name, level)}}>
                                    Details
                                </Button>
                                : null
                            }
                            
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
        onFetchConcessionNameMap({successType: FETCH_ELECTRICITY_BILLING_CONCESSION_NAME_MAP_SUCCESS});
        
    }, [
        onFetchConcessionNameMap, 
        csvLinkRef, 
        excelLinkRef
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
            const filters = searchFilters[0];
            const dateTimeFrom = filters.dateRange.value.datePickerFrom.value;
            const dateTimeTo = filters.dateRange.value.datePickerTo.value;
            const viewBy = filters.viewBy.value;
            let dateTimeFromStr = formatDateByDateFormat(dateTimeFrom, 'y-m-d') + ' 00:00:00';
            let dateTimeToStr = formatDateByDateFormat(dateTimeTo, 'y-m-d') + ' 23:59:59';
            let viewType = "daily";

            switch(viewBy) {
                case "MONTH":
                    dateTimeFromStr = getFirstDayOfMonth(dateTimeFrom) + ' 00:00:00';
                    dateTimeToStr = getLastDayOfMonth(dateTimeFrom) + ' 23:59:59';
                    viewType = "daily"
                    break;
                case "YEAR":
                    const year = formatDateByDateFormat(dateTimeFrom, "y");
                    dateTimeFromStr = getFirstDayOfYear(year) + ' 00:00:00';
                    dateTimeToStr = getLastDayOfYear(year) + ' 23:59:59'
                    viewType = "monthly"
                    break;
                default:
                    break;
            }
            
            onFetchElectricityCostBreakdownByLevel(
                {
                    id: id, 
                    dateTimeFrom: dateTimeFromStr,
                    dateTimeTo: dateTimeToStr,
                    viewType: viewType,
                    level: breakdownLevel
                });

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
            onResetBreakdownLevel();
        }
        
    }

    const [isSearchFilterValid, setIsSearchFilterValid] = useState(true);

    const onApplyFilterHandler = () => {
        const isFormValid = checkFormValidity(searchFilters);

        setIsSearchFilterValid(isFormValid);

        if(isFormValid){
            const filters = searchFilters[0];
            const concessionId = filters.concession.value;
            const dateTimeFrom = filters.dateRange.value.datePickerFrom.value;
            const dateTimeTo = filters.dateRange.value.datePickerTo.value;
            const viewBy = filters.viewBy.value;
            let dateTimeFromStr = formatDateByDateFormat(dateTimeFrom, 'y-m-d') + ' 00:00:00';
            let dateTimeToStr = formatDateByDateFormat(dateTimeTo, 'y-m-d') + ' 23:59:59';
            let viewType = "daily";

            switch(viewBy) {
                case "MONTH":
                    dateTimeFromStr = getFirstDayOfMonth(dateTimeFrom) + ' 00:00:00';
                    dateTimeToStr = getLastDayOfMonth(dateTimeFrom) + ' 23:59:59';
                    viewType = "daily"
                    break;
                case "YEAR":
                    const year = formatDateByDateFormat(dateTimeFrom, "y");
                    dateTimeFromStr = getFirstDayOfYear(year) + ' 00:00:00';
                    dateTimeToStr = getLastDayOfYear(year) + ' 23:59:59'
                    viewType = "monthly"
                    break;
                default:
                    break;
            }

        
            onFetchCostBreakdownBySectionData({
                concessionId: concessionId,
                dateTimeFrom: dateTimeFromStr,
                dateTimeTo: dateTimeToStr,
                viewType: viewType
            });

            
        }
            
    };
    
    return (
        <Fragment>
            <Layout {...props}>
                <PageTitle
                    heading = "Electricity Billing"
                    icon = "pe-7s-home opacity-6"
                >
                    <div className="d-inline-block pr-3">
                        <LabelInputFormGroup 
                            elementRowIndex={0}
                            elementId={searchFilters[0].viewBy.elementId}
                            elementLabel={searchFilters[0].viewBy.elementLabel}
                            elementType={searchFilters[0].viewBy.elementType}
                            elementConfig={searchFilters[0].viewBy.elementConfig} 
                            elementValue={searchFilters[0].viewBy.value}
                            validationRules={searchFilters[0].viewBy.validation}
                            valid={searchFilters[0].viewBy.valid}
                            touched={searchFilters[0].viewBy.touched}
                            errorMessage={searchFilters[0].viewBy.errorMessage}
                            inputChangedHandler={inputChangedHandler}
                        />
                    </div>
                    
                    
                    <DatePickerDropdown 
                        datePickerFrom={searchFilters[0].dateRange.value.datePickerFrom}
                        datePickerTo={searchFilters[0].dateRange.value.datePickerTo}
                        inputChangedHandler={inputChangedHandler}
                        isDateRange={searchFilters[0].dateRange.elementConfig.isDateRange}
                        viewType={searchFilters[0].viewBy.value}
                    />
                </PageTitle>

                <Container fluid>
                    <SearchFilters 
                        filterElementArray={searchFilters}
                        inputChangedHandler={inputChangedHandler}
                        loading={false}
                        onApplyFilterHandler={onApplyFilterHandler}
                        onExportCSVHandler={onExportCSVHandler}
                        csvLinkRef={csvLinkRef}
                        csvData={csvData}
                        excelLinkRef={excelLinkRef}
                        onExportExcelHandler={onExportExcelHandler}
                        excelSheets={excelSheets}
                        isExportable
                        isSearchFilterValid={isSearchFilterValid}
                    />

                    <DataTable 
                        data={costBySectionTableData}
                        columns={costBySectionTableColumns}
                        pageSize={10}
                        header={null}
                        filterable
                        loading={loadingCostBySectionTableData}
                    />

                    {/* <CostBreakdown
                        formElementArray={costVariables}
                        heading={"Cost Breakdown"}
                        totalBillAmount={totalBillAmount}
                    />

                    <AccordionDataTable 
                        accordions={accordions}
                        toggleAccordion={toggleAccordion}
                        accordionBody={
                            
                        }
                    /> */}

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
        level: state.ElectricityBill.level,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchConcessionNameMap: (params) => dispatch(actions.fetchConcessionNameMap(params)),
        onHandleInputChanged: (type, value, elementRowIndex, elementId, validationRules) => dispatch(actions.handleInputChanged(type, value, elementRowIndex, elementId, validationRules)),
        onFetchElectricityBillCSVData: (params) => dispatch(actions.fetchElectricityBillCSVData(params)),
        onFetchCostBreakdownBySectionData: (params) => dispatch(actions.fetchCostBreakdownBySectionData(params)),
        onFetchElectricityCostBreakdownByLevel: (params) => dispatch(actions.fetchElectricityCostBreakdownByLevel(params)),
        onResetBreakdownLevel: (params) => dispatch(actions.resetBreakdownLevel(params)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ElectricityBilling);