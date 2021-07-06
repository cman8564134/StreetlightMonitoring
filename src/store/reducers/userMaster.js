import * as actionTypes from '../actions/actionTypes';
import { 
    updateObject, 
} from '../../shared/utility';

const initialState = {
    userMap: {}
}

const fetchUserMapSuccess = ( state, action ) => {
    return updateObject(state, {
        userMap: action.userMap
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_USER_MAP_SUCCESS:
            return fetchUserMapSuccess( state, action );
        
        default:
            return state;
    }
};

export default reducer;