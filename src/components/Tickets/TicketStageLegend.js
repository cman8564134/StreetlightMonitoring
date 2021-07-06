import React from 'react';

import { Card, CardBody, CardTitle, Row, Col  } from 'reactstrap';

import {VerticalTimeline, VerticalTimelineElement} from 'react-vertical-timeline-component';

const TicketStageLegend = ( props ) => {
    return (
        <Card className="main-card mb-3">
            <CardBody>
                <CardTitle>Stage</CardTitle>
                <Row>
                    <Col md="2" lg="2">
                        <VerticalTimeline layout="1-column"
                                            className="vertical-time-simple vertical-without-time">
                            <VerticalTimelineElement
                                className="vertical-timeline-item dot-success"
                            >
                                <h4 className="timeline-title">Stage 1 - Tiket Dikeluar</h4>
                                <p>
                                    - Konsesi
                                </p>
                            </VerticalTimelineElement>
                        </VerticalTimeline>
                    </Col>

                    <Col md="2" lg="2">
                        <VerticalTimeline layout="1-column"
                                            className="vertical-time-simple vertical-without-time">
                            <VerticalTimelineElement
                                className="vertical-timeline-item dot-dark"
                            >
                                <h4 className="timeline-title">Stage 2 - 24 Jam</h4>
                                <p>- Konsesi</p>
                                <p>- TA Majlis</p>
                            </VerticalTimelineElement>
                        </VerticalTimeline>
                    </Col>
                    
                    <Col md="2" lg="2">
                        <VerticalTimeline layout="1-column"
                                            className="vertical-time-simple vertical-without-time">
                            <VerticalTimelineElement
                                className="vertical-timeline-item dot-info"
                            >
                                <h4 className="timeline-title">Stage 3 - 48 Jam</h4>
                                <p>- Konsesi</p>
                                <p>- TA Majlis</p>
                                <p>- Jurutera Majlis</p>
                            </VerticalTimelineElement>
                        </VerticalTimeline>
                    </Col>
                    
                    <Col md="2" lg="2">
                        <VerticalTimeline layout="1-column"
                                            className="vertical-time-simple vertical-without-time">
                            <VerticalTimelineElement
                                className="vertical-timeline-item dot-primary"
                            >
                                <h4 className="timeline-title">Stage 4 - 72 Jam</h4>
                                <p>- Konsesi</p>
                                <p>- TA Majlis</p>
                                <p>- Jurutera Majlis</p>
                                <p>- Tim Peng Majlis</p>
                            </VerticalTimelineElement>
                        </VerticalTimeline>
                    </Col>
                    
                    <Col md="2" lg="2">
                        <VerticalTimeline layout="1-column"
                                            className="vertical-time-simple vertical-without-time">
                            <VerticalTimelineElement
                                className="vertical-timeline-item dot-warning"
                            >
                                <h4 className="timeline-title">Stage 5 - 96 Jam</h4>
                                <p>- Konsesi</p>
                                <p>- TA Majlis</p>
                                <p>- Jurutera Majlis</p>
                                <p>- Tim Peng Majlis</p>
                                <p>- Peng Kej Majlis</p>
                            </VerticalTimelineElement>
                        </VerticalTimeline>
                    </Col>
                    
                    <Col md="2" lg="2">
                        <VerticalTimeline layout="1-column"
                                            className="vertical-time-simple vertical-without-time">
                            <VerticalTimelineElement
                                className="vertical-timeline-item dot-danger"
                            >
                                <h4 className="timeline-title">Stage 6 - 120 Jam</h4>
                                <p>- Konsesi</p>
                                <p>- TA Majlis</p>
                                <p>- Jurutera Majlis</p>
                                <p>- Tim Peng Majlis</p>
                                <p>- Peng Kej Majlis</p>
                                <p>- Tim Dato Bandar</p>
                            </VerticalTimelineElement>
                        </VerticalTimeline>
                    </Col>
                </Row>
                
                
            </CardBody>
        </Card>
    )
}

export default TicketStageLegend;