import React from 'react';

import {FormGroup} from 'reactstrap';

import Select from 'react-select';

import makeAnimated from 'react-select/lib/animated';

const MultiSelect = ( props ) => {
    const {
        options, 
        inputChangedHandler, 
        value,
        elementRowIndex, 
        elementId, 
        validationRules
    } = props;
    return (
        <FormGroup>
            <Select
                closeMenuOnSelect={false}
                components={makeAnimated()}
                isMulti
                options={options}
                value={value}
                onChange={(value)=>inputChangedHandler(value, elementRowIndex, elementId, validationRules)}
            />
        </FormGroup>
    )
}

export default MultiSelect;