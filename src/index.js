import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';

import './assets/base.scss';
import App from './App';
import themeOptionsReducer from './store/reducers/themeOptions';
import authReducer from './store/reducers/authentication';
import concessionsReducer from './store/reducers/concessions';
import concessionDetailsReducer from './store/reducers/concessionDetails';
import sectionDetailsReducer from './store/reducers/sectionDetails';
import subsectionDetailsReducer from './store/reducers/subsectionDetails';
import roadDetailsReducer from './store/reducers/roadDetails';
import feederPillarDetailsReducer from './store/reducers/feederPillarDetails';
import electricityBillingReducer from './store/reducers/electricityBilling';
import alertReducer from './store/reducers/alert';
import reportReducer from './store/reducers/report';
import TrafficLightFormReducer from './store/reducers/trafficLightForm'
import AnalyticsReducer from './store/reducers/analytics'
import NavigationReducer from './store/reducers/navigation';
import * as serviceWorker from './serviceWorker';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose ;
const rootReducer = combineReducers({
  ThemeOptions: themeOptionsReducer,
  Authentication: authReducer,
  Concessions: concessionsReducer,
  ConcessionDetails: concessionDetailsReducer,
  SectionDetails: sectionDetailsReducer,
  SubsectionDetails: subsectionDetailsReducer,
  RoadDetails: roadDetailsReducer,
  FeederPillarDetails: feederPillarDetailsReducer,
  ElectricityBill: electricityBillingReducer,
  Report: reportReducer,
  Alert: alertReducer,
  TrafficForm : TrafficLightFormReducer,
  Analytics : AnalyticsReducer,
  Navigation: NavigationReducer
});

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
