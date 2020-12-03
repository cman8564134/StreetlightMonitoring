import React from 'react';

import {
    FormGroup,
    Label
} from 'reactstrap';

import FormInput from '../Input/FormInput';

const LabelInputFormGroup = ( props ) => {
    const {
        elementRowIndex,
        elementLabel,
        elementId,
        elementType,
        elementConfig,
        elementValue,
        inputChangedHandler,
        validationRules,
        valid,
        touched,
        errorMessage
    } = props;

    return (
        <FormGroup>
            <Label for={elementLabel}>{elementLabel}</Label>
            <FormInput 
                elementRowIndex={elementRowIndex}
                elementId={elementId}
                elementLabel={elementLabel}
                elementType={elementType}
                elementConfig={elementConfig} 
                elementValue={elementValue}
                validationRules={validationRules}
                valid={valid}
                touched={touched}
                errorMessage={errorMessage}
                inputChangedHandler={inputChangedHandler}
                />
        </FormGroup>
    )
}

export default LabelInputFormGroup;