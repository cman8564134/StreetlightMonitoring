import React, {Fragment, useState} from 'react';

import { Slider } from 'react-burgers'

import cx from 'classnames';

import {
    faEllipsisV,

} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {
    Button
} from 'reactstrap';

const AppMobileMenu = ( props ) => {
    let{
        toggleMobileSidebar,
        toggleMobileSmall
    } = props;

    const [ active, setActive ] = useState(false);
    const [ activeSecondaryMenuMobile, setActiveSecondaryMenuMobile] = useState(false);

    return (
        <Fragment>
            <div className="app-header__mobile-menu">
                <div onClick={toggleMobileSidebar}>
                <Slider 
                        width={26}
                        lineHeight={2}
                        lineSpacing={5}
                        color='#6c757d'
                        active={active}
                        onClick={() => setActive(!active)}/>
                </div>
            </div>
            <div className="app-header__menu">
                <span onClick={toggleMobileSmall}>
                    <Button size="sm"
                            className={cx("btn-icon btn-icon-only", {active: activeSecondaryMenuMobile})}
                            color="primary"
                            onClick={() => setActiveSecondaryMenuMobile(!activeSecondaryMenuMobile)}>
                        <div className="btn-icon-wrapper"><FontAwesomeIcon icon={faEllipsisV}/></div>
                    </Button>
                </span>
            </div>
        </Fragment>
    )
}

export default AppMobileMenu;