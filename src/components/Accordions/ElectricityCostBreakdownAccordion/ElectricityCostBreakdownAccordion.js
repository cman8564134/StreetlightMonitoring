import React from 'react';

import {
    Button,
    Card, CardBody, CardHeader,
    Col,
    Collapse
} from 'reactstrap';
import HighlightsBox from '../../Dashboard/HighlightsBox/HighlightsBox';

import ElectricityCostBreakdown from '../../ElectricityBilling/CostBreakdown/CostBreakdown';

const ElectricityCostBreakdownAccordion = ( props ) => {
    const {
        accordions,
        toggleAccordion,
        electricityBillCostBreakdownHeader,
        electricityBillCostBreakdown
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
                                        {/* <ElectricityCostBreakdown
                                            formElementArray={costBreakdownFormElementArray[id]}
                                            heading="Cost Breakdown"
                                            totalBillAmount={totalBillAmount[id]}
                                        /> */}

                                        <Col md="12">
                                            <div className="widget-chart">
                                                <div className="widget-chart-content">
                                                    <div className="widget-numbers mt-0 text-primary">
                                                            RM {electricityBillCostBreakdown.total_bill_amount}
                                                    </div>
                                                    <div className="widget-subheading">
                                                        TOTAL DAILY ELECTRICITY BILL AMOUNT
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                        

                                        <HighlightsBox
                                            highlightsHeaders={electricityBillCostBreakdownHeader}
                                            values={electricityBillCostBreakdown}
                                            loading={false}
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