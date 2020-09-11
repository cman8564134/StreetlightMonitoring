import React from 'react';

import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import Tabs, {TabPane} from 'rc-tabs';

import TabContent from 'rc-tabs/lib/SwipeableTabContent';

import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';

const BasicTab = ( props ) => {
    const {
        tabPanes
    } = props;

    return (
        <CSSTransitionGroup
            component="div"
            transitionName="TabsAnimation"
            transitionAppear={true}
            transitionAppearTimeout={0}
            transitionEnter={false}
            transitionLeave={false}>
            <Tabs
                defaultActiveKey="0"
                renderTabBar={() => <ScrollableInkTabBar/>}
                renderTabContent={() => <TabContent/>}
            >
                {tabPanes.map((pane, key) => {
                    return (
                        <TabPane tab={pane.tab_name} key={key}>{pane.children}</TabPane>
                    )
                })}
            </Tabs>
        </CSSTransitionGroup>
    );
}

export default BasicTab;