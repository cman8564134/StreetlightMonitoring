import React, {Fragment} from 'react';

import { connect } from 'react-redux';

// import Ionicon from 'react-ionicons';
import { IoIosNotificationsOutline } from "react-icons/io";

import {
    UncontrolledDropdown, DropdownToggle, DropdownMenu,
    Nav, Button, NavItem
} from 'reactstrap';

import city3 from '../../../../assets/images/dropdown-header/city3.jpg';

import Tabs from 'react-responsive-tabs';

// Dropdown Tabs Content
import Alert from '../TabsContent/Alert';

const HeaderDots = ( props ) => {
    const {
        unreadAlertCount,
        unreadAlert
    } = props;

    let notification = null;
    let alertCount = null;

    if(unreadAlertCount > 0){
        notification = (
            <div className="badge badge-dot badge-dot-sm badge-danger">Notifications</div>
        )
        
        alertCount = (
            <h6 className="menu-header-subtitle">You have <b>{unreadAlertCount}</b> unread alert(s)</h6>
        )
        
    }

    const tabsContent = [
        {
            title: 'Alerts',
            content: <Alert 
                hasAlert={unreadAlertCount > 0}
                alertData={unreadAlert}/>
        }
    ];
    
    function getTabs() {
        return tabsContent.map((tab, index) => ({
            title: tab.title,
            getContent: () => tab.content,
            key: index,
        }));
    }

    const viewAllAlertHandler = () => {
        props.history.push("/alert");
    }

    return (
        <Fragment>
            <div className="header-dots">
                <UncontrolledDropdown>
                    <DropdownToggle className="p-0 mr-2" color="link">
                        <div className="icon-wrapper icon-wrapper-alt rounded-circle">
                            <div className="icon-wrapper-bg bg-danger"/>
                            <IoIosNotificationsOutline color="#d92550" fontSize="23px" />
                            {notification}
                        </div>
                    </DropdownToggle>
                    <DropdownMenu right className="dropdown-menu-xl rm-pointers">
                        <div className="dropdown-menu-header mb-0">
                            <div className="dropdown-menu-header-inner bg-deep-blue">
                                <div className="menu-header-image opacity-1"
                                        style={{
                                            backgroundImage: 'url(' + city3 + ')'
                                        }}
                                />
                                <div className="menu-header-content text-dark">
                                    <h5 className="menu-header-title">Notifications</h5>
                                    {alertCount}
                                </div>
                            </div>
                        </div>
                        <Tabs tabsWrapperClass="body-tabs body-tabs-alt" transform={false} showInkBar={true}
                                items={getTabs()}/>
                        <Nav vertical>
                            <NavItem className="nav-item-divider"/>
                            <NavItem className="nav-item-btn text-center">
                                <Button size="sm" className="btn-shadow btn-wide btn-pill" color="focus" onClick={viewAllAlertHandler}>
                                    View All Alerts
                                </Button>
                            </NavItem>
                        </Nav>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </div>
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        unreadAlertCount: state.Authentication.unreadAlertCount,
        unreadAlert: state.Authentication.unreadAlert,
    }
}

export default connect(mapStateToProps)(HeaderDots);
