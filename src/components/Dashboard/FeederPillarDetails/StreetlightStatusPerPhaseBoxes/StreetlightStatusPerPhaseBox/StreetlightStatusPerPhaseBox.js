import React from 'react';

import {CardText, Col} from 'reactstrap';

import cx from 'classnames';

import Loader from '../../../../Loader/BallClipRotateMultiple/BallClipRotateMultiple';

const StreetlightStatusPerPhaseBox = ( props ) => {
    const {
        loading,
        title,
        totalActive,
        totalInactive,
        titleTextColor
    } = props;

    let widgetValue = <Loader/>

    if(!loading) {
        widgetValue=<Col md="4">
            <div className="widget-content">
                <div className="widget-content-wrapper">
                    <div className="widget-content-right ml-0 mr-3">
                        <div className={cx("widget-numbers", titleTextColor)}>
                            {title}
                        </div>
                    </div>
                    <div className="widget-content-left">
                        <div className="widget-heading">
                            ACTIVE: <span className="text-success">{totalActive}</span>
                        </div>
                        <div className="widget-heading">
                            INACTIVE: <span className="text-danger">{totalInactive}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Col>
    }

    return (
        widgetValue
    );
}

export default StreetlightStatusPerPhaseBox;