import * as actionTypes from '../actions/actionTypes';
import sideBar6 from '../../assets/images/sidebar/city1.jpg';

const initialState = {
    backgroundColor: '',
    headerBackgroundColor: '',
    enableMobileMenuSmall: '',
    enableBackgroundImage: false,
    enableClosedSidebar: true,
    enableFixedHeader: true,
    enableHeaderShadow: true,
    enableSidebarShadow: true,
    enableFixedFooter: true,
    enableFixedSidebar: true,
    colorScheme: 'white',
    backgroundImage: sideBar6,
    backgroundImageOpacity: 'opacity-06',
    enablePageTitleIcon: true,
    enablePageTitleSubheading: true,
    enablePageTabsAlt: true,
};

export default function reducer(
    state = initialState, action) {
    switch (action.type) {
        case actionTypes.SET_ENABLE_BACKGROUND_IMAGE:
            return {
                ...state,
                enableBackgroundImage: action.enableBackgroundImage
            };

        case actionTypes.SET_ENABLE_FIXED_HEADER:
            return {
                ...state,
                enableFixedHeader: action.enableFixedHeader
            };

        case actionTypes.SET_ENABLE_HEADER_SHADOW:
            return {
                ...state,
                enableHeaderShadow: action.enableHeaderShadow
            };

        case actionTypes.SET_ENABLE_SIDEBAR_SHADOW:
            return {
                ...state,
                enableSidebarShadow: action.enableSidebarShadow
            };

        case actionTypes.SET_ENABLE_PAGETITLE_ICON:
            return {
                ...state,
                enablePageTitleIcon: action.enablePageTitleIcon
            };

        case actionTypes.SET_ENABLE_PAGETITLE_SUBHEADING:
            return {
                ...state,
                enablePageTitleSubheading: action.enablePageTitleSubheading
            };

        case actionTypes.SET_ENABLE_PAGE_TABS_ALT:
            return {
                ...state,
                enablePageTabsAlt: action.enablePageTabsAlt
            };

        case actionTypes.SET_ENABLE_FIXED_SIDEBAR:
            return {
                ...state,
                enableFixedSidebar: action.enableFixedSidebar
            };

        case actionTypes.SET_ENABLE_MOBILE_MENU:
            return {
                ...state,
                enableMobileMenu: action.enableMobileMenu
            };

        case actionTypes.SET_ENABLE_MOBILE_MENU_SMALL:
            return {
                ...state,
                enableMobileMenuSmall: action.enableMobileMenuSmall
            };

        case actionTypes.SET_ENABLE_CLOSED_SIDEBAR:
            return {
                ...state,
                enableClosedSidebar: action.enableClosedSidebar
            };

        case actionTypes.SET_ENABLE_FIXED_FOOTER:
            return {
                ...state,
                enableFixedFooter: action.enableFixedFooter
            };

        case actionTypes.SET_BACKGROUND_COLOR:
            return {
                ...state,
                backgroundColor: action.backgroundColor
            };

        case actionTypes.SET_HEADER_BACKGROUND_COLOR:
            return {
                ...state,
                headerBackgroundColor: action.headerBackgroundColor
            };

        case actionTypes.SET_COLOR_SCHEME:
            return {
                ...state,
                colorScheme: action.colorScheme
            };

        case actionTypes.SET_BACKGROUND_IMAGE:
            return {
                ...state,
                backgroundImage: action.backgroundImage
            };

        case actionTypes.SET_BACKGROUND_IMAGE_OPACITY:
            return {
                ...state,
                backgroundImageOpacity: action.backgroundImageOpacity
            };
            default:
    }
    return state;
}