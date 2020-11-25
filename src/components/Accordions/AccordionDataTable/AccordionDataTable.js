import React from 'react';

import {
    Button,
    Card, CardBody, CardHeader,
    Collapse
} from 'reactstrap';

const Accordion = ( props ) => {
    const {
        accordions,
        toggleAccordion,
        accordionBody
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
                        return (
                            <Card key={key}>
                                <CardHeader id={"heading" + key}>
                                    <Button block color="link" className="text-left m-0 p-0"
                                            onClick={() => toggleAccordion(index, accordion.id)}
                                            aria-expanded={accordion.config.isOpen}
                                            aria-controls={"collapse" + key}>
                                        <h5 className="m-0 p-0">{accordion.config.heading}</h5>
                                    </Button>
                                </CardHeader>
                                <Collapse isOpen={accordion.config.isOpen} data-parent="#accordion"
                                            id={"collapse" + key} aria-labelledby={"heading" + key}>
                                    <CardBody>
                                        {accordionBody}
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

export default Accordion;