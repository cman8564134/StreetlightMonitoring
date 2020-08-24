import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import MetisMenu from 'react-metismenu';

import {MainNav, AnalyticsNav, AdministrationNav} from './NavItems';
// import RoleBasedAccessControl from '../../RoleBasedAcessControl/RoleBasedAccessControl';


const Nav = ( props ) => {
    let {
        toggleMobileSidebar,
        user
    } = props;

    return (
        <Fragment>
            <h5 className="app-sidebar__heading">Main</h5>
            <MetisMenu content={MainNav} onSelected={toggleMobileSidebar} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
            <h5 className="app-sidebar__heading">Analytics</h5>
            <MetisMenu content={AnalyticsNav}  onSelected={toggleMobileSidebar} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>

            {/* <h5 className="app-sidebar__heading">Administration</h5>
            <RoleBasedAccessControl 
                roles={user.roles}
                perform="configuration:visit"
            >
                <MetisMenu content={AdministrationNav}  onSelected={toggleMobileSidebar} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>        
            </RoleBasedAccessControl> */}
            
        </Fragment>
    );
}

const mapStateToProp = state => ({
    user: state.Authentication.user,
  });

export default withRouter(connect(mapStateToProp)(Nav));