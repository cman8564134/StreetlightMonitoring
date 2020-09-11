import React from 'react';

import Loader from 'react-loaders'

const BallClipRotateMultiple = ( props ) => {
    return (
        <div className="font-icon-wrapper mr-3 mb-3">
            <div
                className="loader-wrapper d-flex justify-content-center align-items-center">
                <Loader type="ball-clip-rotate-multiple"/>
            </div>
        </div>
    )
}

export default BallClipRotateMultiple;