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
                        header,
                        accessor,
                        prefix,
                        suffix
                    } = highlight;

                    let value2 = null; 
                    let prefix2 = null;
                    let suffix2 = null;
                    let subtitle2 = null;
                    if(highlight.hasOwnProperty("accessor2")){
                        value2 = values[highlight.accessor2];
                        prefix2 = highlight.prefix2;
                        suffix2 = highlight.suffix2;
                        subtitle2 = highlight.subtitle2;
                    }
                    return (
                        <Col key={key} sm="6" md="4" xl="4">
                            <IconBox
                                iconBgClassName={iconBgClassName}
                                iconClassName={iconClassName}
                                header={header}
                                value={values[accessor]}
                                loading={loading}
                                prefix={prefix}
                                suffix={suffix}
                                value2={value2}
                                prefix2={prefix2}
                                suffix2={suffix2}
                                subtitle2={subtitle2}
                            />
                        </Col>
                    )
                })}
            </Row>
        </Card>
        
        
    );
}

export default HighlightsBox;
