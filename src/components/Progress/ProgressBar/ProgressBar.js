import React from 'react';

import {
    Progress
} from 'reactstrap';

const ProgressBar = ( props ) => {
    const {
        progressValue,
        subLabelLeft,
        subLabelRight
    } = props;

    return (
        <div className="widget-progress-wrapper">
            <Progress
                className="progress-bar-sm progress-bar-animated-alt"
                color="primary"
                value={progressValue}/>
            <div className="progress-sub-label">
                <div className="sub-label-left">
                    {subLabelLeft}
                </div>
                <div className="sub-label-right">
                    {subLabelRight}
                </div>
            </div>
        </div>
    )
}

export default ProgressBar;