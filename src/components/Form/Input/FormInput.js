import React, { Fragment } from 'react';

import {
 Input,
 CustomInput,
 FormFeedback,
 InputGroupAddon,
 InputGroupText,
 InputGroup
} from 'reactstrap';

import TextareaAutosize from 'react-textarea-autosize';

import DefaultDatePicker from '../DatePicker/DefaultDatePicker/DefaultDatePicker';
import DatePickerDropdown from '../DatePicker/DatePickerDropdown/DatePickerDropdown';
import MultiSelect from './MultiSelect/MultiSelect';
import { element } from 'prop-types';

const FormInput = ( props ) => {
    const {
        elementRowIndex,
        elementId,
        elementLabel,
        elementType,
        elementConfig,
        elementValue,
        inputChangedHandler,
        validationRules,
        valid,
        touched,
        errorMessage
    } = props;

    let isInputValid = true;
    if (validationRules.required && !valid && touched) {
        isInputValid = false;
    }

    switch (elementType) {
        case 'input':
            return (
                <Fragment>
                    <InputGroup>
                        {elementConfig.prepend 
                            ? 
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>{elementConfig.prepend}</InputGroupText>
                            </InputGroupAddon> 
                            : null
                        }
                        <Input 
                            type={elementConfig.type} 
                            name={elementLabel} 
                            id={elementId}
                            value={elementValue}
                            disabled={elementConfig.disabled ? true : false}
                            onChange={(event)=>inputChangedHandler(event, elementRowIndex, elementId, validationRules)}
                            invalid={!isInputValid}
                            readOnly={elementConfig.readonly}
                        />
                        {elementConfig.append 
                            ? 
                            <InputGroupAddon addonType="append">
                                <InputGroupText>{elementConfig.append}</InputGroupText>
                            </InputGroupAddon>
                            : 
                            null
                        }
                        <FormFeedback valid={isInputValid}>
                            {errorMessage}
                        </FormFeedback>
                    </InputGroup>
                    
                </Fragment>
                
            )
        case 'select':
            return (
                <Fragment>
                    <CustomInput 
                        type={elementConfig.type} 
                        id={elementId} name={elementId} 
                        value={elementValue}
                        onChange={(event)=>inputChangedHandler(event, elementRowIndex, elementId, validationRules)}
                        invalid={!isInputValid}>
                        <option value="">Select</option>
                        {elementConfig.options.map(selectOption => {
                            return <option key={selectOption.value} value={selectOption.value}>{selectOption.displayValue}</option>
                        })}
                    </CustomInput>
                    <FormFeedback valid={isInputValid}>
                        {errorMessage}
                    </FormFeedback>

                </Fragment>
                
            )
        case 'datePicker':
            return (
                <DefaultDatePicker 
                    elementRowIndex={elementRowIndex}
                    elementId={elementId}
                    elementValue={elementValue}
                    onChangeHandler={inputChangedHandler}
                    dateFormat={elementConfig.dateFormat}
                    showMonthYearPicker={elementConfig.showMonthYearPicker}
                    showYearPicker={elementConfig.showYearPicker}
                />
                
                
            )
        case 'datePickerDropdown':
            return (
                <DatePickerDropdown 
                    datePickerFrom={elementValue.datePickerFrom}
                    datePickerTo={elementValue.datePickerTo}
                    inputChangedHandler={inputChangedHandler}
                    isDateRange={elementConfig.isDateRange}
                    viewType={elementConfig.viewBy.value}
                />
                
                
            )
        case 'fileBrowser':
            return (
                <CustomInput 
                    type={elementConfig.type} 
                    id={elementId} 
                    name={elementId} 
                    onChange={(event)=>inputChangedHandler(event, elementRowIndex, elementId)}/>
            )
        case 'textArea':
            return (
                <TextareaAutosize 
                    className="form-control"
                    minRows={elementConfig.minLine}
                    maxRows={elementConfig.maxLine}
                    value={elementValue}
                    onChange={(event)=>inputChangedHandler(event, elementRowIndex, elementId)}
                    disabled={elementConfig.disabled}
                />
            )
        case 'multiSelect': 
                return <MultiSelect 
                    options={elementConfig.options} 
                    value={elementValue}
                    elementRowIndex={elementRowIndex} 
                    elementId={elementId} 
                    validationRules={validationRules}
                    inputChangedHandler={inputChangedHandler}/>
                    
        case 'checkbox': 
                return <CustomInput 
                    type={elementConfig.type} 
                    id={elementId}
                    label={elementLabel}
                    checked={elementValue}
                    onChange={(event)=>inputChangedHandler(event, elementRowIndex, elementId, validationRules)}
                    />
                    
        default:
            return (
                <Input 
                    type={elementConfig.type} 
                    name={elementLabel} 
                    id={elementId}
                    value={elementValue}
                    onChange={(event)=>inputChangedHandler(event, elementRowIndex, elementId)}/>
            )  
    }
}

export default FormInput;