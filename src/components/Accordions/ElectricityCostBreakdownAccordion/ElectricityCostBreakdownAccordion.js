import React from 'react';

import {
    Button,
    Card, CardBody, CardHeader,
    Collapse
} from 'reactstrap';

import ElectricityCostBreakdown from '../../ElectricityBilling/CostBreakdown/CostBreakdown';

const ElectricityCostBreakdownAccordion = ( props ) => {
    const {
        accordions,
        toggleAccordion,
        costBreakdownFormElementArray,
        totalBillAmount
    } = props;

    return (
        <div id="accordion" className="accordion-wrapper mb-3">
            {accordions.map((accordionObjects, index) => {
                const accordionArray = [];

                for(let id in accordionObjects){
                    accordionArray.push({
                        id: id,
                        config: accordionObjects[id]
                    })
                }

                return (
                    accordionArray.map((accordion, key) => {
                        const {
                            id,
                            config
                        } = accordion;
                        return (
                            <Card key={key}>
                                <CardHeader id={"heading" + key}>
                                    <Button block color="link" className="text-left m-0 p-0"
                                            onClick={() => toggleAccordion(index, id)}
                                            aria-expanded={config.isOpen}
                                            aria-controls={"collapse" + key}>
                                        <h5 className="m-0 p-0">{config.heading}</h5>
                                    </Button>
                                </CardHeader>
                                <Collapse isOpen={config.isOpen} data-parent="#accordion"
                                            id={"collapse" + key} aria-labelledby={"heading" + key}>
                                    <CardBody>
                                        <ElectricityCostBreakdown
                                            formElementArray={costBreakdownFormElementArray[id]}
                                            heading="Cost Breakdown"
                                            totalBillAmount={totalBillAmount[id]}
                                        />
                                    </CardBody>
                                </Collapse>
                            </Card>
                        )
                    })
                )
            })}
        </div>
    );
}

export default ElectricityCostBreakdownAccordion;