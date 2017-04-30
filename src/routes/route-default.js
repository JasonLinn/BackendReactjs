import React from 'react';
import {Route, IndexRoute, Redirect, IndexRedirect} from 'react-router';

import appWLBo from '../components/app_wl_bo';
import NotFound from '../components/NotFound'

import BOIndexPrepare from '../components/BOIndexPrepare';

import BOIndex from '../components/BO_Home/index'
import BOHome from '../components/BO_Home/home';

import * as COMMON from '../common/common';

export default(

  <Route path={COMMON.ROOT_PATH+"/"} component={appWLBo}>
    <IndexRedirect to={COMMON.ROOT_PATH+"/prepare"} />
    <Redirect from={COMMON.ROOT_PATH+"/indexbo.html"} to={COMMON.ROOT_PATH+"/prepare"} />
    <Route path={COMMON.ROOT_PATH+"/prepare"} component={BOIndexPrepare}/>

    <Route path={COMMON.ROOT_PATH+"/st"} component={BOIndex} >
      <IndexRoute component={BOHome} />
      <Route path="home(/:dateStr)" component={BOHome} />
      <Route path="test" component={BOHome} />
    </Route>

    <Route path={COMMON.ROOT_PATH+"*"} component={NotFound} />
  </Route>

);
