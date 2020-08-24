import React, {Fragment, useEffect} from 'react';

import { connect } from 'react-redux';

import {
    DropdownToggle, DropdownMenu,Button,
    UncontrolledButtonDropdown
} from 'reactstrap';

import {
    faAngleDown,

} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import city3 from '../../../../assets/images/dropdown-header/city3.jpg';
import default_avatar from '../../../../assets/images/avatars/default_avatar.png';


import * as actions from '../../../../store/actions';

const UserBox = ( props ) => {
    const {
        // onLogout,
        userData,
        // onFetchUnreadNotification
    } = props;

    // useEffect(() => {

    //     onFetchUnreadNotification({auth_token: userData.auth_token});

    // }, [onFetchUnreadNotification, userData])

    // const onLogoutHandler = () => {
    //     onLogout();
    //     props.history.push("/");
    // }

    return (
        <Fragment>
            <div className="header-btn-lg pr-0">
                <div className="widget-content p-0">
                    <div className="widget-content-wrapper">
                        <div className="widget-content-left">
                            <UncontrolledButtonDropdown>
                                <DropdownToggle color="link" className="p-0">
                                    <img width={42} className="rounded-circle" src={default_avatar} alt=""/>
                                    <FontAwesomeIcon className="ml-2 opacity-8" icon={faAngleDown}/>
                                </DropdownToggle>
                                <DropdownMenu right className="rm-pointers dropdown-menu-lg">
                                    <div className="dropdown-menu-header">
                                        <div className="dropdown-menu-header-inner bg-info">
                                            <div className="menu-header-image opacity-2"
                                                    style={{
                                                        backgroundImage: 'url(' + city3 + ')'
                                                    }}
                                            />
                                            <div className="menu-header-content text-left">
                                                <div className="widget-content p-0">
                                                    <div className="widget-content-wrapper">
                                                        <div className="widget-content-left mr-3">
                                                            <img width={42} className="rounded-circle" src={default_avatar}
                                                                    alt=""/>
                                                        </div>
                                                        <div className="widget-content-left">
                                                            <div className="widget-heading">
                                                                {userData.name}
                                                            </div>
                                                            <div className="widget-subheading opacity-8">
                                                                {/* A short profile description */}
                                                            </div>
                                                        </div>
                                                        <div className="widget-content-right mr-2">
                                                            <Button 
                                                                className="btn-pill btn-shadow btn-shine"
                                                                color="focus"
                                                                // onClick={() => onLogoutHandler()}
                                                                >
                                                                Logout
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </DropdownMenu>
                            </UncontrolledButtonDropdown>
                        </div>
                        <div className="widget-content-left  ml-3 header-user-info">
                            <div className="widget-heading">
                                {userData.name}
                            </div>
                            <div className="widget-subheading">
                                {/* VP People Manager */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    userData: state.Authentication.user
});

const mapDispatchToProps = dispatch => ({
    // onLogout: () => dispatch(actions.logout()),
    // onFetchUnreadNotification: (params) => dispatch(actions.fetchUnreadNotification(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserBox);