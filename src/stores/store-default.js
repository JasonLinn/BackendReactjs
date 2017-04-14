import { createStore, compose, applyMiddleware} from 'redux';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import { Route, IndexRoute } from 'react-router';
import { browserHistory } from 'react-router';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import reducer from '../reducers';
import filter from 'redux-storage-decorator-filter';

const middleware = routerMiddleware(browserHistory)

import * as storage from 'redux-storage';

import createEngine from 'redux-storage-engine-localstorage';
let engine = createEngine('WebWLBOStore');
engine = filter(engine,[],['routing','dateStore','viewStore']);

const middleware1 = storage.createMiddleware(engine);
// const createStoreWithMiddleware = applyMiddleware(middleware)(createStore);
// const store = createStoreWithMiddleware(reducer);
const store = createStore(
  reducer,
  applyMiddleware(middleware, thunk, promise, middleware1)
);

const load = storage.createLoader(engine);
load(store);

export default store;
