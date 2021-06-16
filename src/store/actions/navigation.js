import * as actionTypes from './actionTypes';
import axios from '../../axios-backend';

export const fetchConcessionNavItemsStart = () => {
    return {
        type: actionTypes.FETCH_CONCESSION_NAV_ITEMS_START,
        loading: true
    }
}

export const fetchConcessionNavItemsSuccess = (navItems) => {
    return {
        type: actionTypes.FETCH_CONCESSION_NAV_ITEMS_SUCCESS,
        loading: false,
        navItems: navItems,
    }
}

export const fetchConcessionNavItemsFail = (error) => {
    return {
        type: actionTypes.FETCH_CONCESSION_NAV_ITEMS_FAIL,
        loading: false,
        error: error
    }
}

export const fetchConcessionNavItems =  () => {
    return dispatch => {
        
        dispatch(fetchConcessionNavItemsStart());

        axios.get('/getConcessionNavItems')
        .then(response => {
            dispatch(fetchConcessionNavItemsSuccess(response.data.navItems));
        })
        .catch(error => {
            console.log(error);
            dispatch(fetchConcessionNavItemsFail(error));
        });  
    }
}

export const updateCustomMultiLevelMenuExpandState =  (id) => {
    return dispatch => {
        
        dispatch({
            type: actionTypes.UPDATE_CUSTOM_MULTI_LEVEL_MENU_EXPAND_STATE,
            id: id
        }); 
    }
}

export const updateMainNavItemByUserConcessionId =  (userConcessionId) => {
    return dispatch => {
        dispatch({
            type: actionTypes.UPDATE_MAIN_NAV_ITEM_BY_USER_CONCESSION_ID,
            userConcessionId: userConcessionId
        }); 
    }
}