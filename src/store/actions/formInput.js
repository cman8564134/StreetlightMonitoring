export const handleInputChangedSuccess = (type, value, elementRowIndex, elementId, validationRules) => {
    return {
        type: type,
        value: value,
        elementRowIndex: elementRowIndex,
        elementId: elementId,
        validationRules: validationRules
    }
}

export const handleInputChanged =  (type, value, elementRowIndex, elementId, validationRules) => {
    return dispatch => {
        dispatch(handleInputChangedSuccess(type, value, elementRowIndex, elementId, validationRules));

        return Promise.resolve();
    }
}