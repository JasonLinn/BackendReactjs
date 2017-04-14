import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import view from './view';
import date from './date';
import sample from './sample';

import * as storage from 'redux-storage';

const rootReducer = combineReducers({
  routing:routerReducer,
  viewStore:view,
  dateStore:date,
  sampleStore:sample
});

const reducer = storage.reducer(rootReducer);

export default reducer;
