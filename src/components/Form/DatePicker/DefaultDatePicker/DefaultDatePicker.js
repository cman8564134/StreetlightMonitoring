import React from 'react';

import {
    InputGroup, InputGroupAddon
} from 'reactstrap';

import {
    faCalendarAlt,

} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import DatePicker from 'react-datepicker';

const DefaultDatePicker = ( props ) => {
    const {
        elementRowIndex,
        elementId,
        elementValue,
        onChangeHandler,
        dateFormat,
        showMonthYearPicker,
        showYearPicker,
        selectsStart,
        selectsEnd,
        startDate,
        endDate
    } = props;

    return (
        <InputGroup>
            <InputGroupAddon addonType="prepend">
                <div className="input-group-text">
                    <FontAwesomeIcon icon={faCalendarAlt}/>
                </div>
            </InputGroupAddon>
            <DatePicker 
                id={elementId}
                className="form-control"
                selected={elementValue}
                onChange={(date) => onChangeHandler(date, elementRowIndex, elementId, null)}
                dateFormat={dateFormat}
                showMonthYearPicker={showMonthYearPicker}
                showYearPicker={showYearPicker}
                selectsStart={selectsStart}
                selectsEnd={selectsEnd}
                startDate={startDate}
                endDate={endDate}
            />
        </InputGroup>
    )
}

export default DefaultDatePicker;