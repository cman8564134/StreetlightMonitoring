import React, { Fragment } from 'react';

import Loader from '../../Loader/BallClipRotateMultiple/BallClipRotateMultiple';

const IconBox = ( props ) => {
    const {
        iconBgClassName,
        iconClassName,
        header,
        value,
        loading
    } = props;

    let widgetValue = <Loader/>

    if(!loading) {
        widgetValue = (
            <div className="widget-numbers">
                {value}
            </div>
        );
        
    }

    return (
        <Fragment>
            <div className="card no-shadow rm-border bg-transparent widget-chart text-left">
                <div className="icon-wrapper rounded-circle">
                    <div className={iconBgClassName}/>
                    <i className={iconClassName}/>
                </div>
                <div className="widget-chart-content">
                    <div className="widget-subheading">
                        {header}
                    </div>
                    {widgetValue}
                </div>
            </div>
            <div className="divider m-0 d-md-none d-sm-block"/>
        </Fragment>
    );
}

export default IconBox;