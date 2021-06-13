import React from 'react';

import Rodal from 'rodal';

const BasicModal = ( props ) => {
    let {
        visible,
        showOrHideModal,
        modalWidth
    } = props;
    
    return (
        <Rodal 
            visible={visible}
            onClose={showOrHideModal}
            animation='zoom'
            showMask={true}
            width={modalWidth}
            customStyles={{height: '80%'}}
        >
            {props.children}
        </Rodal>
    )
}

export default BasicModal;