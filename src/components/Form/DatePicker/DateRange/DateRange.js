import React from 'react';

import {
    Form,
    Row,
    Col,
    FormGroup,
    Label,
} from 'reactstrap';

import DefaultDatePicker from '../DefaultDatePicker/DefaultDatePicker';

const DateRange = ( props ) => {
    const {
        datePickerFrom,
        datePickerTo,
        onChangeHandler
    } = props;

    return (
        <Form>
            <Row form>
                <Col md={6}>
                    <Label for="startDate" className="mr-sm-2">Start Date</Label>
                    <DefaultDatePicker 
                        elementRowIndex={datePickerFrom.elementRowIndex}
                        elementId={datePickerFrom.elementId}
                        elementValue={datePickerFrom.value}
                        onChangeHandler={(date) => onChangeHandler(date, datePickerFrom.elementRowIndex, datePickerFrom.elementId, null)}
                        dateFormat={datePickerFrom.elementConfig.dateFormat}
                        showMonthYearPicker={datePickerFrom.elementConfig.showMonthYearPicker}
                        showYearPicker={datePickerFrom.elementConfig.showYearPicker}
                        selectsStart={datePickerFrom.elementConfig.selectsStart}
                        selectsEnd={datePickerFrom.elementConfig.selectsEnd}
                        startDate={datePickerFrom.value}
                        endDate={datePickerTo.value}
                    />
                    
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label for="examplePassword" className="mr-sm-2">End Date</Label>
                        <DefaultDatePicker 
                            elementRowIndex={datePickerTo.elementRowIndex}
                            elementId={datePickerTo.elementId}
                            elementValue={datePickerTo.value}
                            onChangeHandler={(date) => onChangeHandler(date, datePickerTo.elementRowIndex, datePickerTo.elementId, null)}
                            dateFormat={datePickerTo.elementConfig.dateFormat}
                            showMonthYearPicker={datePickerTo.elementConfig.showMonthYearPicker}
                            showYearPicker={datePickerTo.elementConfig.showYearPicker}
                            selectsStart={datePickerTo.elementConfig.selectsStart}
                            selectsEnd={datePickerTo.elementConfig.selectsEnd}
                            startDate={datePickerFrom.value}
                            endDate={datePickerTo.value}
                        />
                    </FormGroup>
                </Col>
            </Row>
        </Form>
    );
}

export default DateRange;