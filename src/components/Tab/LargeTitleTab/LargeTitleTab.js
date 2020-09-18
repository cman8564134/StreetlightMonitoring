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

const LargeTitleTab = ( props ) => {
    let {
        tabs, 
        activeTab,
        toggleTabHandler
    } = props; 

    return (
        <Card tabs="true" className="card-hover-shadow-2x mb-3">
            <CardHeader className="tabs-lg-alternate">
                <Nav justified={true}>
                    {tabs.map((tab, index) => {
                        return (
                            <NavItem key={index}>
                                <NavLink 
                                    href="#"
                                    className={classnames({active: activeTab === index})}
                                    onClick={() => {
                                        toggleTabHandler(index);
                                    }}
                                >
                                    <div className="widget-number">
                                        {tab.value + tab.suffix}
                                    </div>
                                    <div className="tab-subheading">
                                        {tab.subheading}
                                    </div>
                                </NavLink>
                            </NavItem>
                        )
                    })} 
                </Nav>
            </CardHeader>
            <TabContent activeTab={activeTab}>
                {tabs.map((tab, index) => {
                    return (
                        <TabPane tabId={index} key={index}>
                            {tab.children}
                        </TabPane>
                    )
                })}
            </TabContent>
        </Card>
    );
}

export default LargeTitleTab;