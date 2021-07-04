import * as actionTypes from '../actions/actionTypes';
import { 
    createCustomMenuExpandStateObject,
    updateObject
 } from '../../shared/utility';

const initialState = {
    loadingConcessionMultiLevelNavMenu: false,
    concessionMultiLevelNavMenu: {},
    concessionNavMenuExpandState: {},
    mainNav: [
        {
            icon: 'pe-7s-home',
            label: 'Dashboard',
            to: '/dashboard',
        },
        {
            icon: 'pe-7s-calculator',
            label: 'Electricity Billing',
            to: '/billing',
        },
        {
            icon: 'pe-7s-bell',
            label: 'Alert',
            to: '/alert',
        },
        {
            icon: 'pe-7s-ticket',
            label: 'Tickets',
            to: '/tickets',
        }
    ],
    
    analyticsNav: [
        {
            icon: 'pe-7s-graph',
            label: 'Report',
            to: '/report',
        },
        {
            icon: 'lnr-chart-bars',
            label: 'Analytics',
            to: '/analytics'
        }
    ],
    
    administrationNav: [
        {
            icon: 'pe-7s-tools',
            label: 'Configuration',
            to: '/configurations',
            
        },
        // {
        //     icon: 'pe-7s-config',
        //     label: 'Batch Process',
        //     to: '#/charts/apexcharts',
            
        // }
    ]
};

const fetchConcessionNavItemsStart = ( state, action ) => {
    return updateObject(state, {
        loadingConcessionMultiLevelNavMenu: action.loading
    });
}

const fetchConcessionNavItemsSuccess = ( state, action ) => {
    const customMenuState = createCustomMenuExpandStateObject(action.navItems);
    return updateObject(state, {
        concessionMultiLevelNavMenu: customMenuState.customMultiLevelNavMenu,
        loadingConcessionMultiLevelNavMenu: action.loading,
        concessionNavMenuExpandState: customMenuState.customMenuExpandState
    });
}

const fetchConcessionNavItemsFail = ( state, action ) => {
    return updateObject(state, {
        loadingConcessionMultiLevelNavMenu: action.loading
    });
}

const updateCustomMultiLevelMenuExpandState = ( state, action ) => {
    const id = action.id;
    const concessionNavMenuExpandState = state.concessionNavMenuExpandState;
    const updatedIsExpandState = !concessionNavMenuExpandState[id].isExpand;
    const menuItemIsExpandState = updateObject(concessionNavMenuExpandState[id],{isExpand: updatedIsExpandState});
    let updatedMenuExpandState = updateObject(concessionNavMenuExpandState, {[id]: menuItemIsExpandState});

    const navMenuExpandStateKeys = Object.keys(updatedMenuExpandState);

    //IF COLLAPSE MENU, COLLAPSE ALL ITS CHILD MENU
    if(!updatedIsExpandState){
        navMenuExpandStateKeys.map((key) => {
            const navMenuExpandState = updatedMenuExpandState[key];
            const parentId = navMenuExpandState.parentId;
            
            if(id !== navMenuExpandState.id && (parentId === id || parentId.startsWith(id))){
                const updatedExpandState = updateObject(updatedMenuExpandState[key],{isExpand: false});
                updatedMenuExpandState = updateObject(updatedMenuExpandState, {[key]: updatedExpandState});
            }
        });
    }

    return updateObject(state, {
        concessionNavMenuExpandState: updatedMenuExpandState
    });
}

const updateMainNavItemByUserConcessionId = ( state, action ) => {
    const userConcessionId = action.userConcessionId; 
    let to = "/dashboard";

    if(userConcessionId){
        to = to + "/" + userConcessionId;
    }

    const updatedMainNavItems = updateObject(state.mainNav[0], {to: to});

    const updatedMainNavAtIndex = updateObject(state.mainNav, {0: updatedMainNavItems});
    const updatedMainNav= Object.values(updatedMainNavAtIndex);

    return updateObject(state, {
        mainNav: updatedMainNav
    });
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_CONCESSION_NAV_ITEMS_START:
            return fetchConcessionNavItemsStart( state, action );
        case actionTypes.FETCH_CONCESSION_NAV_ITEMS_SUCCESS:
            return fetchConcessionNavItemsSuccess( state, action );
        case actionTypes.FETCH_CONCESSION_NAV_ITEMS_FAIL:
            return fetchConcessionNavItemsFail( state, action );
        case actionTypes.UPDATE_CUSTOM_MULTI_LEVEL_MENU_EXPAND_STATE:
            return updateCustomMultiLevelMenuExpandState( state, action );
        case actionTypes.UPDATE_MAIN_NAV_ITEM_BY_USER_CONCESSION_ID:
            return updateMainNavItemByUserConcessionId( state, action );
        default:
            return state;
    }
};

export default reducer;