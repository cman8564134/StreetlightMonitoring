import React, { Fragment } from 'react';

import LaddaButton, {
    ZOOM_IN,
} from 'react-ladda';

import { Alert } from 'reactstrap';

import LabelInputFormGroup from '../Form/LabelInputFormGroup/LabelInputFormGroup';
import ExportDropdown from '../Form/ExportDropdown/ExportDropdown';


const SearchFilters = ( props ) => {

    const {
        filterElementArray,
        inputChangedHandler,
        loading,
        onApplyFilterHandler,
        onExportCSVHandler,
        csvLinkRef,
        csvData,
        excelLinkRef,
        onExportExcelHandler,
        isExportable,
        excelSheets,
        isSearchFilterValid
    } = props;

    let exportDropdownMenu = null;

    if(isExportable) {
        exportDropdownMenu = (
            <ExportDropdown 
                onExportCSVHandler={onExportCSVHandler}
                csvLinkRef={csvLinkRef}
                csvData={csvData}
                excelLinkRef={excelLinkRef}
                onExportExcelHandler={onExportExcelHandler}
                excelSheets={excelSheets}
            />
        )
    }

    let alert = null;

    if(!isSearchFilterValid) {
        alert = 
            filterElementArray.map(((filterElements, index) => {
                const elementObjects = [];
                for(let filterElementKey in filterElements){
                    elementObjects.push({
                        id: filterElementKey,
                        config: filterElements[filterElementKey]
                    });
                }

                return (
                    elementObjects.map((element, elementKey) => {
                        const {
                            id,
                            config
                        } = element;

                        if(!config.valid){
                            return (
                                <Alert color="danger" key={id}>
                                    {config.errorMessage}
                                </Alert>
                            )
                        }  
                    })
                )
            }))
            
        
    }

    return (
        <Fragment>
            {filterElementArray.map(((filterElements, index) => {
                const elementObjects = [];
                for(let filterElementKey in filterElements){
                    elementObjects.push({
                        id: filterElementKey,
                        config: filterElements[filterElementKey]
                    });
                }

                return (
                    elementObjects.map((element, elementKey) => {
                        const {
                            id,
                            config
                        } = element;

                        return (
                            <div key={elementKey} className="d-inline-block pr-3">
                                <LabelInputFormGroup 
                                    elementRowIndex={index}
                                    elementId={id}
                                    elementLabel={config.elementLabel}
                                    elementType={config.elementType}
                                    elementConfig={config.elementConfig} 
                                    elementValue={config.value}
                                    validationRules={config.validation}
                                    valid={config.valid}
                                    touched={config.touched}
                                    errorMessage={config.errorMessage}
                                    inputChangedHandler={inputChangedHandler}

                                    
                                />
                            </div>
                        )
                    })
                )
            }))}

            <div className="d-inline-block pr-3">
                <LaddaButton 
                    className="btn btn-shadow btn-pill btn-focus"
                    loading={loading}
                    onClick={() => onApplyFilterHandler(null, null)}
                    data-style={ZOOM_IN}>
                        Apply
                </LaddaButton>
            </div>

            {exportDropdownMenu}

            {alert}
        </Fragment>
    )
}

export default React.memo(SearchFilters);