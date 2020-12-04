import * as actionTypes from '../actions/actionTypes';
import {
    updateObject,
    baseChartOptions,
    baseChartSeries,
    updateCharts
} from '../../shared/utility';

const initialState = {
    trafficLightForm: {},
    isRevealPassword : false
};

const TrafficLightFormStart = ( state, action ) => {
    return updateObject(state, {
        loadingFeederPillarDetails: action.loading
    });
}

const PostTrafficLightFormSuccess = ( state, action ) => {

    console.log("Action: " + action);
    return updateObject(state, {
        trafficLightForm: action.formData
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_TRAFFIC_LIGHT_FORM_SUCCESS:
            return PostTrafficLightFormSuccess;
        case actionTypes.START_TRAFFIC_LIGHT_FORM:
            return TrafficLightFormStart;
        case  actionTypes.POST_TRAFFIC_LIGHT_FORM_SUCCESS:
            return PostTrafficLightFormSuccess
        default:
            return state;
    }
};

export default reducer;