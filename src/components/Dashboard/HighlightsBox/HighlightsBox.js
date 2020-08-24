import React from 'react';

import { Col, Row, Card } from 'reactstrap';

import IconBox from '../../ChartBoxes/IconBox/IconBox';

const HighlightsBox = ( props ) => {
    const {
        highlightsHeaders,
        values,
        loading
    } = props;

    
    return (
        <Card className="mb-3">
            <Row>
                {highlightsHeaders.map((highlight, key) => {
                    const {
                        iconBgClassName,
                        iconClassName,
                        header
                    } = highlight;

                    return (
                        <Col key={key} sm="6" md="4" xl="4">
                            <IconBox
                                iconBgClassName={iconBgClassName}
                                iconClassName={iconClassName}
                                header={header}
                                value={values[highlight.accessor]}
                                loading={loading}
                            />
                        </Col>
                    )
                })}
            </Row>
        </Card>
        
        
    );
}

export default HighlightsBox;
