import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import login from './login';
import signup from './signup';
import view from './view';
import fblogin from './fblogin';
import articleList from './articles';

import mofit from './mofit';
import eatfit from './eatfit';

import ProgressStore from './progressStore'
import foodDetail from './foodDetail';

import weight from './weight';
import eatFitList from './eatFitList';
import moveFitList from './moveFitList';
import date from './date';

import profile from './profile';
import header from './header';
import profitobex from './profitobexReducer';
import MessageReducer from './messageReducer'
import profitobe from './profitobe';
import policy from './policy';
import * as storage from 'redux-storage';


const rootReducer = combineReducers({
  login,
  signup,
  view,
  articleList,
  header,
  mofitStore:mofit,
  progressStore:ProgressStore,
  weight,
  eatFitList,
  moveFitList,
  date,
  eatfitStore:eatfit,
  foodDetail,
  FB:fblogin,
  profile,
  bexStore:profitobex,
  routing: routerReducer,
  policy,
  profitobe
});
const reducer = storage.reducer(rootReducer);

export default reducer;
