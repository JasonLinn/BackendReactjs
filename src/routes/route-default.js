import React from 'react';
import {Route, IndexRoute, Redirect, IndexRedirect} from 'react-router';

import appWLBo from './components/app_wl_bo';
import NotFound from './components/NotFound'

import TrackPrepare from './components/TrackPrepare';

import Track from './components/track'
import MofitIndex from './components/sample/index'
import MofitHome from './components/sample/home';

import GoToBex from './go_to_bex';

import * as COMMON from './common/common';

export default(

  <Route path={COMMON.ROOT_PATH+"/"} component={appWLBo}>
    <IndexRedirect to={COMMON.ROOT_PATH+"/prepare"} />
    <Redirect from={COMMON.ROOT_PATH+"/index.html"} to={COMMON.ROOT_PATH+"/prepare"} />
    <Route path={COMMON.ROOT_PATH+"/prepare"} component={TrackPrepare}/>

    <Route path={COMMON.ROOT_PATH+"/st"} component={Track}>
      <Route path="sample" component={MofitIndex} >
        <IndexRoute component={MofitHome} />
        <Route path="home(/:dateStr)" component={MofitHome} />
        <Route path="test" component={MofitHome} />
      </Route>
    </Route>

    <Route path={COMMON.ROOT_PATH+"/pbx/*"} component={GoToBex} />

    <Route path={COMMON.ROOT_PATH+"*"} component={NotFound} />
  </Route>

);
