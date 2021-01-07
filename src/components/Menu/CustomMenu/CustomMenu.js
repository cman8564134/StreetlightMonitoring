import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Fragment, useState } from 'react';
import { Nav, NavItem, NavLink, Popover, Row } from 'reactstrap';
import cx from 'classnames';

import {
    faAngleDown,

} from '@fortawesome/free-solid-svg-icons';
import { updateObject } from '../../../shared/utility';
import CustomMenuContainer from './CustomMenuContainer/CustomMenuContainer';

const CustomMenu = ( props ) => {
    const {
       menuTitle,
       multiMenuNavItems,
       menuExpandState,
       onToggleCaret
    } = props;

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [popoverOpen, setPopoverOpen] = useState(false);
    // const [menuExpandState, setMenuExpandState] = useState({1:{id: 1, isExpand: false}, "1/1": {id: "1/1", isExpand: false}});

    const toggle = () => {
        setDropdownOpen(!dropdownOpen);
        setPopoverOpen(!popoverOpen);
    }

    return (
        <Fragment>
            <Nav className="header-megamenu">
                <NavItem>
                    <NavLink href="#"  id="PopoverMegaMenu">
                        <i className="nav-link-icon pe-7s-gift"> </i>
                        {menuTitle}
                        <FontAwesomeIcon className="ml-2 opacity-5" icon={faAngleDown} onClick={toggle}/>
                    </NavLink>
                </NavItem>
                <Popover 
                    className="rm-max-width" 
                    placement="bottom-start" 
                    fade={false} trigger="legacy" 
                    isOpen={popoverOpen} 
                    target="PopoverMegaMenu"
                    toggle={toggle}
                >
                    <div style={{padding: "1rem"}}>
                        <div className="grid-menu">
                                <Row className="no-gutters">
                                    <div className="app-sidebar__inner">
                                        <div className="metismenu vertical-nav-menu">
                                            <CustomMenuContainer
                                                {...props}
                                                multiLevelMenuNavItems={multiMenuNavItems}
                                                level="1"
                                                menuExpandState={menuExpandState}
                                                onToggleCaret={onToggleCaret}
                                            />
                                            {/* <ul className="metismenu-container">
                                                <li className="metismenu-item">
                                                    <div className="metismenu-link">
                                                        <i onClick={(e) => onToggleMenuLabel(e, "1")}>Dynamix Synergytech Sdn Bhd</i>
                                                        <i className="metismenu-state-icon pe-7s-angle-down caret-left metismenu-caret-left" onClick={(e)=> onToggleCaret(e, "1")}></i>
                                                    </div>
                                                    <ul className={cx("metismenu-container", {visible: menuExpandState["1"].isExpand})}>
                                                        <li className="metismenu-item">
                                                            <div className="metismenu-link">
                                                                <i  onClick={(e)=> onToggleCaret(e, "1/1")}>Shah Alam</i>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul> */}
                                        </div>
                                    </div>
                                </Row>
                            </div>
                    </div>
                </Popover>
            </Nav>
        </Fragment>
    )
}

export default CustomMenu;