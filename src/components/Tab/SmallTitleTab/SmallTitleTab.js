import React, {Fragment} from 'react';

import {
    Card,
    CardBody,
    TabPane,
    TabContent,
    ButtonGroup,
    Button
} from 'reactstrap';

import {
    ResponsiveContainer
} from 'recharts';

import Chart from 'react-apexcharts'

import classnames from 'classnames';

import Loader from '../../Loader/BallClipRotateMultiple/BallClipRotateMultiple';


const SmallTitleTab = ( props ) => {
    const {
        tabs,
        activeTab,
        toggleTabHandler
    } = props;

    return (
        <Card className="mb-3">
            <div className="text-center mx-auto mt-3">
                <div tabs="true">
                    <ButtonGroup size="sm">
                        {tabs.map((tab, index) => {
                            const tabContentArray = [];
                            for (let key in tab) {
                                tabContentArray.push({
                                    id: key,
                                    tabContent: tab[key]
                                });
                            }

                            return (
                                <Fragment key={index}>
                                    {tabContentArray.map(tab => {
                                        return (
                                            <Button 
                                                key={tab.id}
                                                caret="true" 
                                                color="primary"
                                                className={"btn-shadow pl-3 pr-3 " + classnames({active: activeTab === tab.tabContent.tabName})}
                                                onClick={() => {
                                                    toggleTabHandler(tab.tabContent.tabName);
                                                }}
                                                >{tab.tabContent.tabName}
                                            </Button>
                                        )
                                    })}
                                </Fragment>
                            )
                        })
                        }
                    </ButtonGroup>
                </div>
            </div>
            <CardBody>
                <TabContent activeTab={activeTab}>
                    {tabs.map((tab, index) => {
                        const tabContentArray = [];
                        for (let key in tab) {
                            tabContentArray.push({
                                id: key,
                                tabContent: tab[key]
                            });
                        }

                        return (
                            <Fragment key={index}>
                                {tabContentArray.map((tab) => {
                                    let tabContent = <Loader />

                                    if(!tab.tabContent.loading){
                                        tabContent = tab.tabContent.children
                                    }

                                    return (
                                        <TabPane 
                                            key={tab.id}
                                            tabId={tab.tabContent.tabName}>
                                            <div className="text-center">
                                                <h5 className="menu-header-title">{tab.tabContent.chartTitle}</h5>
                                            </div>
                                            
                                            {tabContent}
                                        </TabPane>
                                    )
                                })}
                            </Fragment>   
                        )
                    })
                    }
                </TabContent>
            </CardBody>
        </Card>
    )
}

export default SmallTitleTab;