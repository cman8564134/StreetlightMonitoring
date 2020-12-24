import React, {Fragment} from 'react';
import cx from 'classnames';

import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import AppLogo from '../AppLogo/AppLogo';

import UserBox from './UserBox/UserBox';

import HeaderDots from "./HeaderDots/HeaderDots";

const Header = ( props ) => {
    
    let {
        headerBackgroundColor,
        enableMobileMenuSmall,
        enableHeaderShadow,
        enableClosedSidebar,
        toggleEnableClosedSidebar,
        toggleMobileSidebar,
        toggleMobileSmall
    } = props;

    return (
        <Fragment>
            <CSSTransitionGroup
                component="div"
                className={cx("app-header", headerBackgroundColor, {'header-shadow': enableHeaderShadow})}
                transitionName="HeaderAnimation"
                transitionAppear={true}
                transitionAppearTimeout={1500}
                transitionEnter={false}
                transitionLeave={false}>

                <AppLogo
                    enableClosedSidebar = {enableClosedSidebar}
                    toggleEnableClosedSidebar = {toggleEnableClosedSidebar}
                    toggleMobileSidebar = {toggleMobileSidebar}
                    toggleMobileSmall = {toggleMobileSmall}
                />

                <div className={cx(
                    "app-header__content",
                    {'header-mobile-open': enableMobileMenuSmall},
                )}>
                    <div className="app-header-center">
                        <div className="logo-wrapper logo">
                            <div className="icon-wrapper-bg"/>
                        </div>
                        <div>
                            {/* iDynamix Streetlight Monitoring */}
                            {/* Streetlight Monitoring */}
                        </div>
                    </div>
                    <div className="app-header-right">
                        <HeaderDots {...props}/>
                        <UserBox {...props}/>
                    </div>
                </div>
            </CSSTransitionGroup>
        </Fragment>
    );
}

export default Header;