import React from 'react';

import Rodal from 'rodal';

import {
    ModalHeader, 
    ModalBody, 
    ModalFooter
} from 'reactstrap';

import Loader from '../Loader/BallClipRotateMultiple/BallClipRotateMultiple';

const Modal = ( props ) => {
    let {
        visible,
        showOrHideModal,
        modalWidth,
        modalForm,
        loading,
        heading
    } = props;

    let modalBody = <Loader />;

    if(!loading) {
        modalBody = modalForm
    }

    return (
        <Rodal 
            visible={visible}
            onClose={showOrHideModal}
            animation='zoom'
            showMask={true}
            width={modalWidth}
        >
            <ModalHeader>{heading}</ModalHeader>
            <ModalBody>
                {modalBody}     
            </ModalBody>
            <ModalFooter>
                {props.children}
            </ModalFooter>
        </Rodal>
    )
}

export default Modal;