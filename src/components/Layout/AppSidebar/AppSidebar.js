import React, { Fragment } from 'react';
import cx from 'classnames';

import VerticalNavWrapper from '../AppNav/VerticalNavWrapper';

import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import PerfectScrollbar from 'react-perfect-scrollbar';
import AppLogo  from '../AppLogo/AppLogo';

const appSidebar = ( props ) => {
    let {
        backgroundColor,
        enableBackgroundImage,
        enableSidebarShadow,
        backgroundImage,
        backgroundImageOpacity,
        toggleMobileSidebar,
        enableClosedSidebar,
        toggleEnableClosedSidebar,
        toggleMobileSmall,
    } = props;

    return (
        <Fragment>
            <div className="sidebar-mobile-overlay" onClick={toggleMobileSidebar}/>
            <CSSTransitionGroup
                component="div"
                className={cx("app-sidebar", backgroundColor, {'sidebar-shadow': enableSidebarShadow})}
                transitionName="SidebarAnimation"
                transitionAppear={true}
                transitionAppearTimeout={1500}
                transitionEnter={false}
                transitionLeave={false}>
                {/* <AppLogo 
                    enableClosedSidebar = {enableClosedSidebar}
                    toggleEnableClosedSidebar = {toggleEnableClosedSidebar}
                    toggleMobileSidebar = {toggleMobileSidebar}
                    toggleMobileSmall = {toggleMobileSmall}
                    isShowLogo = {true}
                /> */}
                <PerfectScrollbar>
                    <div className="app-sidebar__inner">
                        <VerticalNavWrapper 
                            toggleMobileSidebar = {toggleMobileSidebar}
                        />
                    </div>
                </PerfectScrollbar>
                <div
                    className={cx("app-sidebar-bg", backgroundImageOpacity)}
                    style={{
                        backgroundImage: enableBackgroundImage ? 'url(' + backgroundImage + ')' : null
                    }}>
                </div>
            </CSSTransitionGroup>
        </Fragment>
    )   
}

export default (appSidebar);