import React from "react";

import {
    Row,
    Col
} from 'reactstrap';

import Concession from '../Concession/Concession';


const Dashboard = ( props ) => {
    const {
        concessions,
        concessionsChart,
        highlightsHeaders,
        onClickViewDetailsHandler
    } = props;

    return (
        <Row>
            {concessions.map((concession) => {
                return (
                    <Col key={concession.id} md="6" lg="6" xl="6">
                        <Concession
                            concession={concession}
                            highlightsHeaders={highlightsHeaders}
                            concessionChart={concessionsChart[concession.concession_name]}
                            onClickViewDetailsHandler={onClickViewDetailsHandler}
                        />
                    </Col>
                )
            })}
        </Row>
    )
}

export default Dashboard;
