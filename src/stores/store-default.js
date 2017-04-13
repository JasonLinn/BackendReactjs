import { createStore, compose, applyMiddleware} from 'redux';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import { Route, IndexRoute } from 'react-router';
import { browserHistory } from 'react-router';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import reducer from './reducers';
import filter from 'redux-storage-decorator-filter';

const middleware = routerMiddleware(browserHistory)

import * as storage from 'redux-storage';

import createEngine from 'redux-storage-engine-localstorage';
let engine = createEngine('WebFitobeStore');
engine = filter(engine,[],['routing','date','view']);
const middleware1 = storage.createMiddleware(engine);
// const createStoreWithMiddleware = applyMiddleware(middleware)(createStore);
// const store = createStoreWithMiddleware(reducer);
const store = createStore(
  reducer,
  applyMiddleware(middleware, thunk, promise, middleware1)
);



const load = storage.createLoader(engine);
load(store);

// Notice that our load function will return a promise that can also be used
// to respond to the restore event.
// load(store)
//     .then((newState) => !__RELEASE__ && console.log('Loaded state:', newState))
//     .catch(() => !__RELEASE__ && console.log('Failed to load previous state'));
//
// export const history = syncHistoryWithStore(browserHistory, store);

export default store;
