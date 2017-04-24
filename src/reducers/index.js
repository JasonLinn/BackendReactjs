import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import view from './view';
import date from './date';
import login from './login';
import userMenu from './bo-menu';
import fetching from './fetching';
import * as storage from 'redux-storage';

const rootReducer = combineReducers({
  loginStore:login,
  routing:routerReducer,
  viewStore:view,
  dateStore:date,
  userMenuStore:userMenu,
  fetchingStore:fetching
});

const reducer = storage.reducer(rootReducer);

export default reducer;
