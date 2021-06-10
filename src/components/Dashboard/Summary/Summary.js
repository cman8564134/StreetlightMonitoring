import React, { Fragment, useState } from 'react';

import {
    Row,
    Col
} from 'reactstrap';

import HighlightsBox from '../HighlightsBox/HighlightsBoxFourCol';
import LargeTitleTab from '../../Tab/LargeTitleTab/LargeTitleTab';
import LeftProgressCircle from '../../Progress/ProgressCircles/LeftProgressCircle/LeftProgressCircle';
import DataTable from '../../Tables/DataTable/DataTable';
import LeftLiquidGaugeCard from '../../Gauge/Alignment/LeftLiquidGaugeCard/LeftLiquidGaugeCard';

const Summary = ( props ) => {
    const {
        loadingHighlights,
        highlightsHeaders,
        values,
        concessions,
        concessionsTableColumns,
        loadingConcessionsTable,
        tabs,
        liquidGaugeStartColor,
        liquidGaugeEndColor
    } = props;

    const radius = 68;

    const [ activeLargeTitleTab, setActiveLargeTitleTab ] = useState(0);

    const toggleLargeTitleTabHandler = (tab) => {
        if (activeLargeTitleTab !== tab) {
            setActiveLargeTitleTab(tab);
        }
    }

    return (
        <Fragment>
            <HighlightsBox
                highlightsHeaders={highlightsHeaders}
                values={values}
                loading={loadingHighlights}
            />

            <Row>
                <Col md="12" lg="6" xl="6">
                    <LargeTitleTab 
                        tabs={tabs}
                        activeTab={activeLargeTitleTab}
                        toggleTabHandler={toggleLargeTitleTabHandler}
                    />  
                </Col>
                <Col md="6" lg="6">
                    <Row>
                        <Col md="6" lg="6">
                            <LeftProgressCircle 
                                percent={values.uptime_percentage}
                                trailColor="#cceff5"
                                color="#0bb3cd"
                                subheading={"Uptime (" + values.uptime_percentage +"%)"}
                                value={`${values.total_active_streetlights} Active`}
                                loading={loadingHighlights}
                                status="success"
                            />
                        </Col>
                        <Col md="6" lg="6">
                            <LeftProgressCircle 
                                percent={values.downtime_percentage}
                                trailColor="#cceff5"
                                color="#0bb3cd"
                                subheading={"Downtime (" + values.downtime_percentage +"%)"}
                                value={`${values.total_inactive_streetlights} Inactive`}
                                loading={loadingHighlights}
                                status="error"
                            />
                        </Col>
                        {/* <Col md="6" lg="6">
                            <LeftLiquidGaugeCard 
                                gaugePercentage={50}
                                startColor={liquidGaugeStartColor}
                                endColor={liquidGaugeEndColor}
                                subheading="Carbon Footprint Savings"
                                value={values.carbon_footprint_savings}
                                loading={loadingHighlights}
                                radius={radius}
                                suffix='KG'
                            />
                        </Col> */}
                        <Col md="12" lg="12">
                            <DataTable 
                                data={concessions}
                                columns={concessionsTableColumns}
                                pageSize={5}
                                header={null}
                                loading={loadingConcessionsTable}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Fragment>
        
    );
}

export default Summary;