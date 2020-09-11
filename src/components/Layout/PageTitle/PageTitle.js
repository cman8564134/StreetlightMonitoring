import React, {Fragment} from 'react';
import cx from 'classnames';

import MainBreadcrumb from '../../Navigation/Breadcrumb/MainBreadcrumb';

const PageTitle = ( props ) => {
    let {
        heading,
        icon,
        enableBreadcrumb,
        breadcrumbItems
    } = props;

    let breadcrumb = null;
    
    if(enableBreadcrumb){
        breadcrumb = (
            <MainBreadcrumb 
                breadcrumbItems={breadcrumbItems}
            />
        );
    }
    
    return (
        
        <Fragment>
            <div className="app-page-title app-page-title-simple">
                <div className="page-title-wrapper">
                    <div className="page-title-heading">
                        <div>
                            <div className="page-title-head center-elem">
                                <span className={cx("d-inline-block pr-2")}>
                                    <i className={icon}/>
                                </span>
                                <span className="d-inline-block">
                                    {heading}
                                </span>
                            </div>
                            <div className={cx("page-title-subheading opacity-10")}>
                                {breadcrumb}
                            </div>
                        </div>
                    </div>
                    <div className="page-title-actions">
                        {props.children}
                    </div>
                </div>
            </div>
        </Fragment>
    );
    
}

export default PageTitle;