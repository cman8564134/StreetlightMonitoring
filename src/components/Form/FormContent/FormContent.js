import React, { Fragment } from 'react';

import {
    Row,
    Col
} from 'reactstrap';

import LabelInputFormGroup from '../LabelInputFormGroup/LabelInputFormGroup';

const FormContent = ( props ) => {
    const {formElementArray, inputChangedHandler} = props;

    return (
        <Fragment>
            {formElementArray.map((formElementRow, index) => {
                const formElementArray = [];
                for (let key in formElementRow) {
                    formElementArray.push({
                        id: key,
                        config: formElementRow[key]
                    });
                }
                return (
                    <Row key={index} form>
                        {formElementArray.map(formElement => {
                            const {
                                id,
                                config
                            } = formElement;

                            return(
                                <Col key={config.elementLabel} md={6}>
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
                                </Col>
                            );

                            
                        })}
                        
                    </Row>
                )
                
            })}

        </Fragment>
        
    )
}

export default FormContent;