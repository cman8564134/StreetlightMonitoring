import React, { Fragment } from 'react';

import Loader from '../../Loader/BallClipRotateMultiple/BallClipRotateMultiple';

const IconBox = ( props ) => {
    const {
        iconBgClassName,
        iconClassName,
        header,
        value,
        loading,
        suffix,
        prefix,
        font,
        value2,
        prefix2,
        suffix2,
        subtitle2
    } = props;

    let widgetValue = <Loader/>;
    let widgetValue2 = null;

    let widgetValueClassName = "widget-numbers";

    if(font === "sm") {
        widgetValueClassName = "widget-numbers-sm"
    }

    if(!loading) {
        widgetValue = (
            <div className={widgetValueClassName}>
                <span className="font-size-md">{prefix}</span>{value}<span className="font-size-md">{suffix}</span>
            </div>
        );
        
        if(value2) {
            widgetValue2 = (
                <Fragment>
                    {subtitle2 ? 
                        <div className="widget-subheading">
                            {subtitle2}
                        </div>
                        : null
                    }
                    
                    <div className={widgetValueClassName}>
                        <span className="font-size-md">{prefix2}</span>{value2}<span className="font-size-md">{suffix2}</span>
                    </div>
                </Fragment>
                
            );  
        }
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
                    
                    {widgetValue2}
                    
                    
                </div>
            </div>
            <div className="divider m-0 d-md-none d-sm-block"/>
        </Fragment>
    );
}

export default IconBox;