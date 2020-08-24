import React from 'react';

import {
    Card, 
    CardHeader,
    CardBody,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane
} from 'reactstrap';

import {
    ResponsiveContainer
} from 'recharts';

import classnames from 'classnames';

import Chart from 'react-apexcharts'

import Loader from '../../Loader/BallClipRotateMultiple/BallClipRotateMultiple';

const GraphCardTabs = ( props ) => {
    let {
        activeTab,
        toggleTabHandler,
        navItemsArray,
        loading
    } = props; 

    return (
        <Card tabs="true" className="mb-3">
            <CardHeader>
                <Nav>
                    {navItemsArray.map(navItem => {
                        const itemsArray = [];
                        for (let key in navItem) {
                            itemsArray.push({
                                id: key,
                                chart: navItem[key]
                            });
                        }
                        return (
                            itemsArray.map((item) => {
                                return (
                                    <NavItem key={item.id}>
                                        <NavLink 
                                            href="#"
                                            className={classnames({active: activeTab === item.id})}
                                            onClick={() => {
                                                toggleTabHandler(item.id);
                                            }}
                                            style={{fontSize: '0.60rem'}}
                                        >
                                            {item.chart.navTitle}
                                        </NavLink>
                                    </NavItem>
                                )
                            })
                            
                        )
                    })}
                </Nav>
            </CardHeader>
            <CardBody>
                <TabContent activeTab={activeTab}>
                    {navItemsArray.map(navItem => {
                        const itemsArray = [];
                        for (let key in navItem) {
                            itemsArray.push({
                                id: key,
                                chart: navItem[key]
                            });
                        }

                        return (
                            itemsArray.map((item) => {
                                let chart = <Loader />

                                if(!loading) {
                                    chart = <Chart options={item.chart.chart_options} series={item.chart.chart_series} type="line" width="100%" height="330px"/>
                                }

                                return  (
                                    <TabPane key={item.id} tabId={item.id}>
                                        <ResponsiveContainer height={360}>
                                            {chart}
                                        </ResponsiveContainer>
                                    </TabPane>
                                )
                            })
                            
                        )
                    })}
                </TabContent>
            </CardBody>
        </Card>
    )
}

export default React.memo(GraphCardTabs)

