import React from 'react';

import {
    FormGroup,
    Label
} from 'reactstrap';

import FormInput from '../../Input/FormInput';

const MetricFilters = ( props ) => {
    const {
        filters,
        inputChangedHandler
    } = props;

    return (
        <FormGroup>
            <div>
                {filters.map(((filterElements, index) => {
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
                            <FormInput 
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
                        )
                        
                    })
                )
            }))}
            </div>
        </FormGroup>
        
    )
    
}

export default MetricFilters;