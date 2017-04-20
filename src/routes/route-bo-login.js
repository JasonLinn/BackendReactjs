import React from 'react';
import {Route, IndexRoute, Redirect, IndexRedirect} from 'react-router';

import appWLBo from '../components/app_wl_bo';
import NotFound from '../components/NotFound'

import BOLoginPrepare from '../components/BOLoginPrepare';

import BOLoginIndex from '../components/BO_Login/index'
import BOLoginHome from '../components/BO_Login/home';

import * as COMMON from '../common/common';

export default(

  <Route path={COMMON.ROOT_PATH+"/"} component={appWLBo}>
    <IndexRedirect to={COMMON.ROOT_PATH+"/prepare"} />
    <Redirect from={COMMON.ROOT_PATH+"/loginbo.html"} to={COMMON.ROOT_PATH+"/prepare"} />
    <Route path={COMMON.ROOT_PATH+"/prepare"} component={BOLoginPrepare}/>

    <Route path={COMMON.ROOT_PATH+"/login"} component={BOLoginIndex}>
      <IndexRoute component={BOLoginHome} />
      <Route path="home" component={BOLoginHome} />
    </Route>

    <Route path={COMMON.ROOT_PATH+"*"} component={NotFound} />
  </Route>

);
