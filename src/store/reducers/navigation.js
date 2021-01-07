import * as actionTypes from '../actions/actionTypes';
import { 
    createCustomMenuExpandStateObject,
    updateObject
 } from '../../shared/utility';

const initialState = {
    loadingConcessionMultiLevelNavMenu: false,
    concessionMultiLevelNavMenu: {},
    concessionNavMenuExpandState: {}
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
    const prevIsExpand = state.concessionNavMenuExpandState[action.id].isExpand;
    const updatedMenuExpandState = updateObject(state.concessionNavMenuExpandState, {[action.id]: {isExpand: !prevIsExpand}});
    return updateObject(state, {
        concessionNavMenuExpandState: updatedMenuExpandState
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
        default:
            return state;
    }
};

export default reducer;