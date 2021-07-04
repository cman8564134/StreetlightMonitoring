import React, { useState, useEffect, Suspense } from 'react';
import cx from 'classnames';
import ResizeDetector from 'react-resize-detector';
import {connect} from 'react-redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import Login from './containers/Login/LoginBoxed';
import Loader from './components/Loader/BallClipRotateMultiple/BallClipRotateMultiple';
import * as actions from './store/actions/index';
import NotFound from './containers/NotFound/NotFound';

const Dashboard = React.lazy(() => {
  return import('./containers/Dashboard/Dashboard');
});

const ConcessionDetails = React.lazy(() => {
  return import('./containers/Dashboard/ConcessionDetails/ConcessionDetails');
});

const SectionDetails = React.lazy(() => {
  return import('./containers/Dashboard/SectionDetails/SectionDetails');
});

const SubsectionDetails = React.lazy(() => {
  return import('./containers/Dashboard/SubsectionDetails/SubsectionDetails');
});

const RoadDetails = React.lazy(() => {
  return import('./containers/Dashboard/RoadDetails/RoadDetails');
});

const FeederPillarDetails = React.lazy(() => {
  return import('./containers/Dashboard/FeederPillarDetails/FeederPillarDetails');
});

const ElectricityBilling = React.lazy(() => {
  return import('./containers/ElectricityBilling/ElectricityBilling');
});

// const Inverter = React.lazy(() => {
//   return import('./containers/Inverter/Inverter');
// });

const Alert = React.lazy(() => {
  return import('./containers/Alert/Alert');
});

const Tickets = React.lazy(() => {
  return import('./containers/Tickets/Tickets');
});

// const Configurations = React.lazy(() => {
//   return import('./containers/Configurations/Configurations');
// });

const Report = React.lazy(() => {
  return import('./containers/Report/Report');
});

const Analytics = React.lazy(() => {
  return import('./containers/Analytics/Analytics');
});

const App = ( props ) => {
  const [ closedSmallerSidebar ] = useState(false);
  let {
    colorScheme,
    enableFixedHeader,
    enableFixedSidebar,
    enableFixedFooter,
    enableClosedSidebar,
    enableMobileMenu,
    enablePageTabsAlt,
    onTryAutoSignIn,
    location,
    onUpdateMainNavItemByUserConcessionId
  } = props;

  const [userConcessionId, setUserConcessionId] = useState(null);

  useEffect (() => {
    onTryAutoSignIn({pathname: location.pathname})
      .then(response => {
        setUserConcessionId(response.concessionId);
        onUpdateMainNavItemByUserConcessionId(response.concessionId);
        if(response.isLoggedIn && response.isPageNotFound){
          props.history.push('/page-not-found');
        }else if(!response.isLoggedIn){
          props.history.push('/');
        }
        
      });
  }, [onTryAutoSignIn, props.history, location.pathname, onUpdateMainNavItemByUserConcessionId]);

  return (
    <ResizeDetector 
      handleWidth
      render={( {width} ) => (
        <div className={cx(
          "app-container app-theme-" + colorScheme,
          {'fixed-header': enableFixedHeader},
          {'fixed-sidebar': enableFixedSidebar || width < 1250},
          {'fixed-footer': enableFixedFooter},
          {'closed-sidebar': enableClosedSidebar || width < 1250},
          {'closed-sidebar-mobile': closedSmallerSidebar || width < 1250},
          {'sidebar-mobile-open': enableMobileMenu},
          {'body-tabs-shadow-btn': enablePageTabsAlt},
        )}>
          <Suspense fallback={
            <div className="loader-container">
            <div className="loader-container-inner">
                <div className="text-center">
                    <Loader />
                </div>
            </div>
        </div>
          }>
            <Switch>
              {/* <Route path="/dashboard/:concessionId/:sectionId/:subsectionId/:feederPillarId" render={(props) => <FeederPillarDetails {...props}/>}/> */}
              <Route path="/dashboard/:concessionId/:sectionId/:subsectionId/:roadId" render={(props) => <RoadDetails {...props} userConcessionId={userConcessionId}/>}/>
              <Route path="/dashboard/:concessionId/:sectionId/:subsectionId" render={(props) => <SubsectionDetails {...props} userConcessionId={userConcessionId}/>}/>
              <Route path="/dashboard/:concessionId/:sectionId" render={(props) => <SectionDetails {...props} userConcessionId={userConcessionId}/>}/>
              <Route path="/dashboard/:concessionId" render={(props) => <ConcessionDetails {...props} userConcessionId={userConcessionId}/>}/>
              <Route path="/dashboard" render={(props) => <Dashboard {...props}/>}/>
              <Route path="/billing" render={(props) => <ElectricityBilling {...props}/>}/>
              {/* <Route path="/inverter" render={(props) => <Inverter {...props}/>}/> */}
              <Route path="/alert" render={(props) => <Alert {...props}/>}/>
              <Route path="/tickets" render={(props) => <Tickets {...props}/>}/>
              {/* <Route path="/configurations" render={(props) => <Configurations {...props}/>}/> */}
              <Route path="/report" render={(props) => <Report {...props}/>}/>
              <Route path="/analytics" render={(props) => <Analytics {...props}/>}/>
              <Route path="/" exact component={Login} />
              <Route path="/page-not-found" exact component={NotFound} />
              <Redirect to="/page-not-found"/>  
            </Switch>
          </Suspense>
          
        </div>
      )}
    />
  );
}


const mapStateToProp = state => ({
  colorScheme: state.ThemeOptions.colorScheme,
  enableFixedHeader: state.ThemeOptions.enableFixedHeader,
  enableMobileMenu: state.ThemeOptions.enableMobileMenu,
  enableFixedFooter: state.ThemeOptions.enableFixedFooter,
  enableFixedSidebar: state.ThemeOptions.enableFixedSidebar,
  enableClosedSidebar: state.ThemeOptions.enableClosedSidebar,
  enablePageTabsAlt: state.ThemeOptions.enablePageTabsAlt
});

const mapDispatchToProps = dispatch => ({
  onTryAutoSignIn: (params) => dispatch(actions.authCheckState(params)),
  onUpdateMainNavItemByUserConcessionId: (params) => dispatch(actions.updateMainNavItemByUserConcessionId(params))
});

export default withRouter(connect(mapStateToProp, mapDispatchToProps)(App));
