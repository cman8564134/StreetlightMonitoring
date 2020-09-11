import React from 'react';

import {
    Card,
    CardHeader,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,

} from 'reactstrap';

import classnames from 'classnames';

import CountUp from 'react-countup';

import Chart from 'react-apexcharts';

const GraphCardTabs = ( props ) => {
    let {
        activeTab,
        todaysGeneration,
        optionsTodaysGeneration,
        seriesTodaysGeneration,
        performanceRatioAverage,
        optionsPerformanceRatio,
        seriesPerformanceRatio,
        toggleTabHandler
    } = props; 

    return (
        <Card tabs="true" className="card-hover-shadow-2x mb-3">
            <CardHeader className="tabs-lg-alternate">
                <Nav justified={true}>
                    <NavItem>
                        <NavLink href="#"
                                    className={classnames({active: activeTab === '1'})}
                                    onClick={() => {
                                        toggleTabHandler('1');
                                    }}
                        >
                            <div className="widget-number">
                                <CountUp start={0}
                                            end={todaysGeneration}
                                            separator=""
                                            decimals={2}
                                            decimal="."
                                            delay={2}
                                            prefix=""
                                            suffix=" KWh"
                                            duration="3"/>
                            </div>
                            <div className="tab-subheading">
                                Today's Generation
                            </div>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#"
                                    className={classnames({active: activeTab === '2'})}
                                    onClick={() => {
                                        toggleTabHandler('2');
                                    }}
                        >
                            <div className="widget-number">
                                <CountUp start={0}
                                            end={performanceRatioAverage}
                                            separator=""
                                            decimals={2}
                                            decimal="."
                                            delay={2}
                                            prefix=""
                                            suffix=""
                                            duration="3"/>
                            </div>
                            <div className="tab-subheading">
                                Performance Ratio
                            </div>
                        </NavLink>
                    </NavItem>
                </Nav>
            </CardHeader>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <Chart options={optionsTodaysGeneration} series={seriesTodaysGeneration} type="line" width="100%" height="330px"/>
                </TabPane>
                <TabPane tabId="2">
                    <Chart options={optionsPerformanceRatio} series={seriesPerformanceRatio} type="line" width="100%" height="330px"/>
                </TabPane>
            </TabContent>
        </Card>
    );
}

export default GraphCardTabs;