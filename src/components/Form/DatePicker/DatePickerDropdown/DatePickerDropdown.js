import React from 'react';

import {
    UncontrolledButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    Card,
    CardHeader,
    CardTitle,
    CardBody,
} from 'reactstrap';

import {
    faCalendarAlt
} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import DefaultDatePicker from '../DefaultDatePicker/DefaultDatePicker';
import DateRange from '../DateRange/DateRange';
import { formatDateByDateFormat } from '../../../../shared/utility';




const DatePickerDropdown = ( props ) => {
    const {
        datePickerFrom,
        datePickerTo,
        isDateRange,
        inputChangedHandler,
        viewType
    } = props;

    let datePicker = (
        <DefaultDatePicker 
            elementRowIndex={datePickerFrom.elementRowIndex}
            elementId={datePickerFrom.elementId}
            elementValue={datePickerFrom.value}
            onChangeHandler={inputChangedHandler}
            dateFormat={datePickerFrom.elementConfig.dateFormat}
            showMonthYearPicker={datePickerFrom.elementConfig.showMonthYearPicker}
            showYearPicker={datePickerFrom.elementConfig.showYearPicker}
        />
    )
    if(isDateRange) {
        datePicker =(
            <DateRange 
                datePickerFrom={datePickerFrom} 
                datePickerTo={datePickerTo}
                onChangeHandler={inputChangedHandler}
            />
        )
    }

    let dateLabel = formatDateByDateFormat(datePickerFrom.value, 'd/m/y');
    
    switch(viewType){
        case "WEEK": 
            const dateFrom = formatDateByDateFormat(datePickerFrom.value, 'd/m/y');
            const dateTo = formatDateByDateFormat(datePickerTo.value, 'd/m/y');
            dateLabel = `${dateFrom} - ${dateTo}`;
            break;
        case "MONTH":
            dateLabel = formatDateByDateFormat(datePickerFrom.value, 'm/y');
            break;
        case "YEAR":
            dateLabel = formatDateByDateFormat(datePickerFrom.value, 'y');
            break;
        default:
            break;
    } 

    return (
        <div className="d-inline-block pr-3">
            <UncontrolledButtonDropdown>
                <DropdownToggle caret color="primary" className="mb-2 mr-2">
                    <span><FontAwesomeIcon icon={faCalendarAlt}/> {dateLabel} </span>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-xl" right>
                    <Card className="main-card">
                        <CardHeader>
                            <CardTitle>Select Date Range</CardTitle>
                        </CardHeader>
                        <CardBody>
                            {datePicker}
                        </CardBody>
                        {/* <CardFooter className="d-block text-center">
                            <Button size="lg" color="success">Apply</Button>
                        </CardFooter> */}
                    </Card>
                    
                </DropdownMenu>
            </UncontrolledButtonDropdown>
        </div>
        
    )
}

export default DatePickerDropdown;