import React, { Fragment } from "react";

import Layout from '../../hoc/Layout/Layout';
import Loader from 'react-loaders'

const Analytics = ( props ) => {
    return (
        <Fragment>
            <Layout {...props}>
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <div className="text-center">
                            <Loader type="ball-clip-rotate-multiple"/>
                        </div>
                        <h1 className="mt-5">
                            <small>Machine Learning In Progress</small>
                        </h1>
                    </div>
                </div>
            </Layout>
        </Fragment>
    )
}


export default Analytics;