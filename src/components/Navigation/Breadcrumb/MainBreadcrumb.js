import React, {Fragment} from 'react';

import {
    Breadcrumb, BreadcrumbItem
} from 'reactstrap';

const MainBreadcrumb = ( props ) => {
    let {
        breadcrumbItems
    } = props;

    return (
        <Fragment>
            <Breadcrumb>
                {breadcrumbItems.map(item => {
                    return (
                        <BreadcrumbItem key={item.title}>
                            {/* <a href={item.href} onClick={(e)=>{e.preventDefault();}}>{item.children}</a> */}
                            <a href={item.href} onClick={item.onClickHandler}>{item.children}</a>
                        </BreadcrumbItem>
                    )
                })}
            </Breadcrumb>
        </Fragment>
    );
}

export default MainBreadcrumb;