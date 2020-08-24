import React from 'react';

import {
    Card,
    CardBody,
    CardTitle,
    Row,
    Col
} from 'reactstrap';

import {
    VerticalTimeline, 
    VerticalTimelineElement
} from 'react-vertical-timeline-component';

import PerfectScrollbar from 'react-perfect-scrollbar';

import IconBox from '../../../ChartBoxes/IconBox/IconBox';

const ConcessionHighlights = ( props ) => {
    const {
        highlightsHeaders,
        concessionHighlights
    } = props;

    // const {
    //     power_usage,
    //     uptime_percentage,
    //     downtime_percentage,
    //     electrical_bill,
    //     carbon_footprint,
    //     energy_savings
    // } = concessionHighlights;

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
                        {/* <VerticalTimeline className="vertical-time-icons" layout="1-column">
                            <VerticalTimelineElement
                                className="vertical-timeline-item"
                                icon={<div className="timeline-icon border-primary"><i
                                    className="lnr-license icon-gradient bg-night-fade"/></div>}
                            >
                                <h4 className="timeline-title">Power Usage</h4>
                                <p>{power_usage}</p>
                            </VerticalTimelineElement>
                            <VerticalTimelineElement
                                className="vertical-timeline-item"
                                icon={<div className="timeline-icon border-success"><i
                                    className="lnr-cloud-upload icon-gradient bg-plum-plate"/></div>}
                            >
                                <h4 className="timeline-title">Uptime Percentage</h4>
                                <p>{uptime_percentage}</p>
                            </VerticalTimelineElement>
                            <VerticalTimelineElement
                                className="vertical-timeline-item"
                                icon={<div className="timeline-icon border-primary"><i
                                    className="lnr-license text-primary"/></div>}
                            >
                                <h4 className="timeline-title">Downtime Percentage</h4>
                                <p>{downtime_percentage}</p>
                            </VerticalTimelineElement>
                            <VerticalTimelineElement
                                className="vertical-timeline-item"
                                icon={<div className="timeline-icon border-primary"><i
                                    className="lnr-license text-primary"/></div>}
                            >
                                <h4 className="timeline-title">Electrical Bill</h4>
                                <p>{electrical_bill}</p>
                            </VerticalTimelineElement>
                            <VerticalTimelineElement
                                className="vertical-timeline-item"
                                icon={<div className="timeline-icon border-warning"><i
                                    className="lnr-cog fa-spin icon-gradient bg-happy-itmeo"/></div>}
                            >
                                <h4 className="timeline-title">Carbon Footprint</h4>
                                <p>{carbon_footprint}</p>
                            </VerticalTimelineElement>
                            <VerticalTimelineElement
                                className="vertical-timeline-item"
                                icon={<div className="timeline-icon border-warning"><i
                                    className="lnr-cog fa-spin icon-gradient bg-happy-itmeo"/></div>}
                            >
                                <h4 className="timeline-title">Energy Savings</h4>
                                <p>{energy_savings}</p>
                            </VerticalTimelineElement>
                            
                        </VerticalTimeline> */}
                    </PerfectScrollbar>
                </div>
            </CardBody>
        </Card>
    );
}

export default ConcessionHighlights;