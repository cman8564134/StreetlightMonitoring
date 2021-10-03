import * as actionTypes from '../actions/actionTypes';
import {
    updateObject,
    baseChartOptions,
    baseChartSeries,
    updateCharts
} from '../../shared/utility';

const initialState = {
    trafficLightConfig: {},
    isRevealPassword : false
};

const TrafficLightFormStart = ( state, action ) => {
    return updateObject(state, {
        loadingFeederPillarDetails: action.loading
    });
}

const PostTrafficLightFormSuccess = ( state, action ) => {
    return updateObject(state, {
        trafficLightConfig: action.formData
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_TRAFFIC_LIGHT_FORM_SUCCESS:
            return PostTrafficLightFormSuccess( state, action );
        case actionTypes.START_TRAFFIC_LIGHT_FORM:
            return TrafficLightFormStart( state, action );
        case  actionTypes.POST_TRAFFIC_LIGHT_FORM_SUCCESS:
            return PostTrafficLightFormSuccess( state, action );
        default:
            return state;
    }
};

export default reducer;