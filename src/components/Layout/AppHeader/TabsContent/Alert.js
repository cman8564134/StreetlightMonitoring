import React, {Fragment, useEffect} from 'react';

import { connect } from 'react-redux';

import {
    Card,
    CardBody
} from 'reactstrap';

import {
    VerticalTimeline, 
    VerticalTimelineElement
} from 'react-vertical-timeline-component';

import PerfectScrollbar from 'react-perfect-scrollbar';


const Alert = ( props ) => {
    let {
        hasAlert,
        alertData,
    } = props;

    let alerts = (
        <div className="no-results">
            <div className="sa-icon sa-success animate">
                <span className="sa-line sa-tip animateSuccessTip"/>
                <span className="sa-line sa-long animateSuccessLong"/>

                <div className="sa-placeholder"/>
                <div className="sa-fix"/>
            </div>
            <div className="results-subtitle">All caught up!</div>
            <div className="results-title">There are no unread alerts!</div>
        </div>
    )

    if(hasAlert) {
        alerts = (
            <Card className="main-card">
                <CardBody>
                    <div className="scroll-area-sm">
                        <PerfectScrollbar>
                            <VerticalTimeline layout="1-column">
                                {alertData.map((alert) => {
                                    let badgeClassName = "badge badge-dot badge-dot-xl ";

                                    switch(alert.data.status){
                                        case 'PI': 
                                            badgeClassName = badgeClassName.concat("badge-danger");
                                        break;
                                        case 'IIP': 
                                            badgeClassName = badgeClassName.concat("badge-warning");
                                        break;
                                        case 'RI': 
                                        badgeClassName = badgeClassName.concat("badge-primary");
                                        break;
            
                                        case 'R': 
                                        default: 
                                            badgeClassName = badgeClassName.concat("badge-success");
                                    }
                                    return (
                                        <VerticalTimelineElement
                                            key={alert.data.alert_id}
                                            className="vertical-timeline-item"
                                            icon={<i
                                                className={badgeClassName}> </i>}
                                            date={alert.created_at}
                                        >
                                            <h4 className="timeline-title">{alert.data.event}</h4>
                                            <p>
                                                {alert.data.site_name} - {alert.data.device_id} ({alert.data.status_desc})
                                            </p>
                                        </VerticalTimelineElement>
                                    )
                                })}
                            </VerticalTimeline>
                        </PerfectScrollbar>
                    </div>
                </CardBody>
            </Card>
        )
    }

    return (
        <Fragment>
            {alerts}
        </Fragment>
    )
}

export default Alert;