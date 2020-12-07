import axios from "../../axios-backend";
import * as actionTypes from "./actionTypes";

export const fetchTrafficDetails = (data) => {
    return {
        type: actionTypes.GET_TRAFFIC_LIGHT_FORM_SUCCESS,
        loading: false,
        formData : data
    }
}


export const getTrafficLightInfo = (params) =>{
    return dispatch => {
        axios.post('/getTrafficLightForm',params,{timeout:10000 })
            .then(res => {
                console.log("getTrafficLightInfo res.data: ", res.data);
                const data = res.data;
                dispatch(fetchTrafficDetails(data));
            })
            .catch(error => {
                console.log("action:getTrafficLightInfo:" + error + params.values);
                alert("action:getTrafficLightInfo:" + error.data + params.values);
            });
    }
}


export const postNewTrafficLightInfo = (params) =>{

    console.log("action:PostNewTrafficLightInfo:" + params);
    alert("action:PostNewTrafficLightInfo" + params);
    // return dispatch => {
    //     axios.post('/getTrafficLightForm', params)
    //         .then(res => {
    //             console.log(res.data);
    //             alert(res.data);
    //         })
    //         .catch(error => {
    //             console.log(error);
    //             alert(error.data);
    //         });
    // }
}