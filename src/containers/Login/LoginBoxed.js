import React, {Fragment} from 'react';

import { connect } from 'react-redux'

import {Col, Row, Form, Alert} from 'reactstrap';

import LaddaButton, {
    ZOOM_IN,
} from 'react-ladda';

import LabelInputFormGroup from '../../components/Form/LabelInputFormGroup/LabelInputFormGroup';
import { HANDLE_LOGIN_INPUT_CHANGED_SUCCESS } from '../../store/actions/actionTypes';
import * as actions from '../../store/actions/index';

const LoginBoxed = (props) => {
    const {
        error,
        loading,
        onAuthentication,
        formElementArray,
        onHandleInputChanged
    } = props;

    const onLoginHandler = () => {
        const username = formElementArray[0].username.value;
        const password = formElementArray[0].password.value;
        const params = {username: username, password: password};
        onAuthentication(params)
            .then((response) => {
                if(response.isSuccess) {
                    const concessionId = response.concessionId;
                    if(concessionId){
                        props.history.push("/dashboard/" + concessionId);   
                    }
                    else{
                        props.history.push("/dashboard");
                    }
                }
            });
        
    }

    const inputChangedHandler = (event, elementRowIndex, elementId, validationRules) => {
        onHandleInputChanged(HANDLE_LOGIN_INPUT_CHANGED_SUCCESS, event.target.value, elementRowIndex, elementId, validationRules);
    }

    let errorMessage = null; 


    if(error != null && error !== '') {
        errorMessage = (
            <Row>
                <Col md="12" lg="12" xl="12">
                    <Alert color="danger">
                        {error}
                    </Alert>
                </Col>    
            </Row>
        )
    }

    
    return (

        <Fragment>
            <div className="h-100 bg-login bg-animation">
                <div className="d-flex h-100 justify-content-center align-items-center">
                    <Col md="8" className="mx-auto app-login-box">
                        <div className="app-logo-inverse mx-auto mb-3"/>

                        <div className="modal-dialog w-100 mx-auto">
                            <div className="modal-content">
                                <div className="modal-body">
                                    <div className="h5 modal-title text-center">
                                        <h4 className="mt-2">
                                            <div>Welcome back,</div>
                                            <span>Please sign in to your account below.</span>
                                        </h4>
                                    </div>
                                    {errorMessage}
                                    <Form>
                                        <Row form>
                                            {formElementArray.map((formElementRow, index) => {
                                                const array = [];
                                                for (let key in formElementRow) {
                                                    array.push({
                                                        id: key,
                                                        config: formElementRow[key]
                                                    });
                                                }

                                                return array.map(formElement => {
                                                    const {
                                                        id,
                                                        config
                                                    } = formElement;

                                                    return (
                                                        <Col key={array.id} md={6}>
                                                            <LabelInputFormGroup 
                                                                elementRowIndex={index}
                                                                elementId={id}
                                                                elementLabel={config.elementLabel}
                                                                elementType={config.elementType}
                                                                elementConfig={config.elementConfig} 
                                                                elementValue={config.value}
                                                                validationRules={config.validation}
                                                                valid={config.valid}
                                                                touched={config.touched}
                                                                errorMessage={config.errorMessage}
                                                                inputChangedHandler={inputChangedHandler}
                                                            />
                                                        </Col>
                                                    )
                                                })
                                            })}
                                        </Row>
                                    </Form>
                                </div>
                                <div className="modal-footer clearfix">
                                    <div className="float-right">
                                        {/* <Button color="primary" size="lg">Login to Dashboard</Button> */}
                                        <LaddaButton 
                                            className="btn btn-primary btn-pill"
                                            loading={loading}
                                            onClick={onLoginHandler}
                                            data-style={ZOOM_IN}>
                                                Login to Dashboard
                                        </LaddaButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-center text-white opacity-8 mt-3">
                            {/* Copyright &copy; Arkmind */}
                        </div>
                    </Col>
                </div>
            </div>
        </Fragment>
)};

const mapStateToProps = state => {
    return {
        loading: state.Authentication.loading,
        error: state.Authentication.error,
        formElementArray: state.Authentication.formElementArray,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthentication: (params) => dispatch(actions.authentication(params)),
        onHandleInputChanged: (type, value, elementRowIndex, elementId, validationRules) => dispatch(actions.handleInputChanged(type, value, elementRowIndex, elementId, validationRules))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginBoxed);
