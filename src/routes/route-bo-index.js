import React from 'react';
import {Route, IndexRoute, Redirect, IndexRedirect} from 'react-router';

import appWLBo from '../components/app_wl_bo';
import NotFound from '../components/NotFound'

import BOIndexPrepare from '../components/BOIndexPrepare';

import BOAccountIndex from '../components/BO_Account/index'
import BOAccountHome from '../components/BO_Account/home';

import * as COMMON from '../common/common';

console.log("r1",COMMON.ROOT_PATH);

export default(

  <Route path={COMMON.ROOT_PATH+"/"} component={appWLBo}>
    <IndexRedirect to={COMMON.ROOT_PATH+"/prepare"} />
    <Redirect from={COMMON.ROOT_PATH+"/indexbo.html"} to={COMMON.ROOT_PATH+"/prepare"} />
    <Route path={COMMON.ROOT_PATH+"/prepare"} component={BOIndexPrepare}/>

    <Route path={COMMON.ROOT_PATH+"/account"} component={BOAccountIndex} >
      <IndexRoute component={BOAccountHome} />
      <Route path="home(/:dateStr)" component={BOAccountHome} />
    </Route>

    <Route path={COMMON.ROOT_PATH+"*"} component={NotFound} />
  </Route>

);
