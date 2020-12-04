import React from 'react';

import {
    Col,
    Card,
    CardHeader,
    CardBody,
    CardFooter
} from 'reactstrap';

import FormContent from '../../Form/FormContent/FormContent';

const CostBreakdown = ( props ) => {
    const {
        formElementArray,        
        heading,
        totalBillAmount
    } = props;

    return (
        <Card className="main-card mb-3">
            <CardHeader className="card-header-lg">
                <div
                    className="card-header-title font-size-lg text-capitalize font-weight-normal">
                    {heading}
                </div>
            </CardHeader>

            <CardBody className="pt-4">
                <Col md="12" className="mx-auto">
                    <FormContent
                        formElementArray={formElementArray}
                        inputChangedHandler={null}
                    />
                </Col>
            </CardBody>
            <CardFooter className="d-block">
                <div className="widget-chart widget-chart2 text-left">
                    <div className="widget-chat-wrapper-outer">
                        <div className="widget-chart-content">
                            <div className="widget-chart-flex">
                                <div className="widget-numbers">
                                    Today's Bill Amount: RM <span className="text-primary">{totalBillAmount}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
            </CardFooter>

        </Card>
        
    )
}

export default CostBreakdown;