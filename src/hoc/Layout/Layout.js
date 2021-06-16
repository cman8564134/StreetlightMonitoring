import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
import AppSidebar from '../../components/Layout/AppSidebar/AppSidebar';
import AppHeader from '../../components/Layout/AppHeader/AppHeader';

const Layout = ( props ) => {
    let {
        //AppSidebar
        backgroundColor,
        enableBackgroundImage,
        enableSidebarShadow,
        backgroundImage,
        backgroundImageOpacity,
        
        //AppLogo
        enableClosedSidebar,

        //AppHeader
        enableHeaderShadow,
        closedSmallerSidebar,
        headerBackgroundColor,
        enableMobileMenuSmall,
        
        //Navigation
        onFetchConcessionNavItems,
        concessionMultiLevelNavMenu,
        concessionNavMenuExpandState,
        onUpdateCustomMultiLevelMenuExpandState
    } = props;

    useEffect(() => {
        onFetchConcessionNavItems();
    }, [
        onFetchConcessionNavItems
    ]);

    const toggleMobileSidebar = () => {
        let {enableMobileMenu, setEnableMobileMenu} = props;
        setEnableMobileMenu(!enableMobileMenu);
    };

    const toggleEnableClosedSidebar = () => {
        let {enableClosedSidebar, setEnableClosedSidebar} = props;
        setEnableClosedSidebar(!enableClosedSidebar);
    };

    const toggleMobileSmall = () => {
        let {setEnableMobileMenuSmall} = props;
        setEnableMobileMenuSmall(!enableMobileMenuSmall);
    }

    //Expand Custom Multi Level Menu
    const onToggleCaret = (e, id) => {
        e.preventDefault();
        onUpdateCustomMultiLevelMenuExpandState(id);
    }

    return (
        <Fragment>
            <AppHeader 
                {...props}
                enableHeaderShadow = {enableHeaderShadow}
                closedSmallerSidebar = {closedSmallerSidebar}
                headerBackgroundColor = {headerBackgroundColor}
                enableMobileMenuSmall = {enableMobileMenuSmall}
                enableClosedSidebar = {enableClosedSidebar}
                toggleEnableClosedSidebar = {toggleEnableClosedSidebar}
                toggleMobileSidebar = {toggleMobileSidebar}
                toggleMobileSmall = {toggleMobileSmall}
                concessionMultiLevelNavMenu={concessionMultiLevelNavMenu}
                concessionNavMenuExpandState={concessionNavMenuExpandState}
                onToggleCaret={onToggleCaret}
            />
            <div className="app-main">
                <AppSidebar 
                    {...props}
                    backgroundColor = {backgroundColor}
                    enableBackgroundImage = {enableBackgroundImage} 
                    enableSidebarShadow = {enableSidebarShadow}
                    backgroundImage = {backgroundImage}
                    backgroundImageOpacity = {backgroundImageOpacity}
                    toggleMobileSidebar = {toggleMobileSidebar}
                    enableClosedSidebar = {enableClosedSidebar}
                    toggleEnableClosedSidebar = {toggleEnableClosedSidebar}
                    toggleMobileSmall = {toggleMobileSmall}
                />
                <div className="app-main__outer">
                    <div className="app-main__inner">
                        {props.children}        
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    enableBackgroundImage: state.ThemeOptions.enableBackgroundImage,
    enableSidebarShadow: state.ThemeOptions.enableSidebarShadow,
    enableMobileMenu: state.ThemeOptions.enableMobileMenu,
    backgroundColor: state.ThemeOptions.backgroundColor,
    backgroundImage: state.ThemeOptions.backgroundImage,
    backgroundImageOpacity: state.ThemeOptions.backgroundImageOpacity,
    enableClosedSidebar: state.ThemeOptions.enableClosedSidebar,
    enableMobileMenuSmall: state.ThemeOptions.enableMobileMenuSmall,
    enableHeaderShadow: state.ThemeOptions.enableHeaderShadow,
    closedSmallerSidebar: state.ThemeOptions.closedSmallerSidebar,
    headerBackgroundColor: state.ThemeOptions.headerBackgroundColor,
    concessionMultiLevelNavMenu: state.Navigation.concessionMultiLevelNavMenu,
    concessionNavMenuExpandState: state.Navigation.concessionNavMenuExpandState,
});

const mapDispatchToProps = dispatch => ({
    setEnableMobileMenu: enable => dispatch(actions.setEnableMobileMenu(enable)),
    setEnableClosedSidebar: enable => dispatch(actions.setEnableClosedSidebar(enable)),
    setEnableMobileMenuSmall: enable => dispatch(actions.setEnableMobileMenuSmall(enable)),
    onFetchConcessionNavItems: () => dispatch(actions.fetchConcessionNavItems()),
    onUpdateCustomMultiLevelMenuExpandState: (id) => dispatch(actions.updateCustomMultiLevelMenuExpandState(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);