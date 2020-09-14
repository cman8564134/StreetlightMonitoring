import React from 'react';

import {
    Card,
    CardBody,
    CardTitle,
    Row,
    Col
} from 'reactstrap';

import PerfectScrollbar from 'react-perfect-scrollbar';

import IconBox from '../../../ChartBoxes/IconBox/IconBox';

const ConcessionHighlights = ( props ) => {
    const {
        highlightsHeaders,
        concessionHighlights
    } = props;

    return (
        <Card className="main-card">
            <CardBody>
                <CardTitle>Highlights</CardTitle>
                <div className="scroll-area-sm">
                    <PerfectScrollbar>
                        <Row>
                            {highlightsHeaders.map((highlight, key) => {
                                const {
                                    iconBgClassName,
                                    iconClassName,
                                    header
                                } = highlight;

                                return (
                                    <Col key={key} sm="12" md="6" xl="6">
                                        <IconBox
                                            iconBgClassName={iconBgClassName}
                                            iconClassName={iconClassName}
                                            header={header}
                                            value={concessionHighlights[highlight.accessor]}
                                            loading={false}
                                        />
                                    </Col>
                                )
                            })}
                        </Row>
                    </PerfectScrollbar>
                </div>
            </CardBody>
        </Card>
    );
}

export default ConcessionHighlights;