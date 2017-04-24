import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import rootReducer from '../reducers/index';
import routes from '../routes/route-bo-index';
import promise from 'redux-promise';
// import 'babel-polyfill';
import thunk from 'redux-thunk';
import store from '../stores/store-default';
import { syncHistoryWithStore } from 'react-router-redux';

import zh_TW from '../locales/zh_TW';
import en_US from '../locales/en_US';
import { IntlProvider } from 'react-intl';
import intl from 'intl';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// import 'bootstrap/dist/css/bootstrap.css';
// import initTranslation from './components/Common/localize';
// initTranslation();
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
export const history = syncHistoryWithStore(browserHistory, store);

// import ReactGA from 'react-ga';
// ReactGA.initialize('UA-xxx');

function logPageView() {
  // ReactGA.set({ page: window.location.pathname });
  // ReactGA.pageview(window.location.pathname);
}

function chooseLocale(){
    localStorage.setItem('lang', 'zh');
    return zh_TW;
    // var language;
    // if (typeof localStorage.getItem('lang') == "string") {
    //     language = localStorage.getItem('lang');
    // } else {
    //     language = navigator.language.split('-')[0];
    //     localStorage.setItem('lang', language);
    // }
    // switch(language){
    //     case 'en':
    //         return en_US;
    //         break;
    //     case 'zh':
    //         return zh_TW;
    //         break;
    //     default:
    //         return en_US;
    //         break;
    // }
}

ReactDOM.render(
<MuiThemeProvider>
  <Provider store={store}>
      <IntlProvider locale={'en'} messages={chooseLocale()}>
          <Router history={history} routes={routes} onUpdate={logPageView} />
      </IntlProvider>
  </Provider>
</MuiThemeProvider>
  , document.getElementById('container')
);
