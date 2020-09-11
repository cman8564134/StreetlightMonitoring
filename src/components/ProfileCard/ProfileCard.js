import React from 'react';

import {
    Card,
    CardBody,
    CardTitle
} from 'reactstrap';

import {
    VerticalTimeline, 
    VerticalTimelineElement
} from 'react-vertical-timeline-component';

import PerfectScrollbar from 'react-perfect-scrollbar';

const ProfileCard = ( props ) => {
    const {
        profileHeaderTitle,
        profileBodyTitle,
        profileSubtitle,
        profileAttributes,
        profile,
        profileHeaderBg
    } = props;


    return (
        <Card className="card-shadow-primary profile-responsive card-border mb-3">
            <div className="dropdown-menu-header">
                <div className="dropdown-menu-header-inner bg-focus">
                    <div className="menu-header-image opacity-3"
                            style={{
                                backgroundImage: 'url(' + profileHeaderBg + ')'
                            }}
                    />
                    <div className="menu-header-content btn-pane-right">
                        <div>
                        <h5 className="menu-header-title">{profileHeaderTitle}</h5>
                            {/* <h6 className="menu-header-subtitle"><span className="badge badge-success">{profileSubtitle}</span></h6> */}
                        </div>
                    </div>
                </div>
            </div>

            <Card className="main-card">
                <CardBody>
                    <CardTitle>{profileBodyTitle}</CardTitle>
                    <div className="scroll-area-sm-md">
                        <PerfectScrollbar>
                            <VerticalTimeline className="vertical-time-icons" layout="1-column">
                                {profileAttributes.map((attribute, index) => {
                                    return (
                                        <VerticalTimelineElement
                                            key={index}
                                            className="vertical-timeline-item"
                                            icon={<div className="timeline-icon border-primary"><i
                                                className={attribute.className}/></div>}
                                        >
                                            <h4 className="timeline-title">{attribute.title}</h4>
                                            <p>{profile[attribute.accessor]}</p>
                                        </VerticalTimelineElement>
                                    )
                                })}
                            </VerticalTimeline>
                        </PerfectScrollbar>
                    </div>
                    
                </CardBody>
            </Card>
        </Card>
    )
}

export default ProfileCard;