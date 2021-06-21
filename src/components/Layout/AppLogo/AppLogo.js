import React, {Fragment, useState} from 'react';

import { Slider } from 'react-burgers'

import AppMobileMenu from '../AppMobileMenu/AppMobileMenu';


const HeaderLogo = ( props ) => {
    let {
        enableClosedSidebar,
        toggleEnableClosedSidebar,
        toggleMobileSidebar,
        toggleMobileSmall,
        isShowLogo
    } = props;

    const [ active, setActive ] = useState(false);
    let logoClassName = "";

    if(isShowLogo)
        logoClassName = "logo-src";


    return (
        <Fragment>
            <div className="app-header__logo">
                <div className={logoClassName}  style={{backgroundRepeat: "no-repeat"}}/>
                <div className="header__pane ml-auto">
                    <div onClick={toggleEnableClosedSidebar}>
                    <Slider 
                        width={26}
                        lineHeight={2}
                        lineSpacing={5}
                        color='#6c757d'
                        active={enableClosedSidebar}
                        onClick={() => setActive(!active)}/>
                    </div>
                </div>
            </div>
            <AppMobileMenu
                toggleMobileSidebar = {toggleMobileSidebar}
                toggleMobileSmall = {toggleMobileSmall}
            />
        </Fragment>
    )
}

export default HeaderLogo;