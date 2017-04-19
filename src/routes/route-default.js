import React from 'react';
import {Route, IndexRoute, Redirect, IndexRedirect} from 'react-router';

import appWLBo from '../components/app_wl_bo';
import NotFound from '../components/NotFound'

import TrackPrepare from '../components/TrackPrepare';

import SampleIndex from '../components/sample/index'
import SampleHome from '../components/sample/home';

import * as COMMON from '../common/common';

export default(

  <Route path={COMMON.ROOT_PATH+"/"} component={appWLBo}>
    <IndexRedirect to={COMMON.ROOT_PATH+"/prepare"} />
    <Redirect from={COMMON.ROOT_PATH+"/index.html"} to={COMMON.ROOT_PATH+"/prepare"} />
    <Route path={COMMON.ROOT_PATH+"/prepare"} component={TrackPrepare}/>

    <Route path={COMMON.ROOT_PATH+"/st"} component={SampleIndex} >
      <IndexRoute component={SampleHome} />
      <Route path="home(/:dateStr)" component={SampleHome} />
      <Route path="test" component={SampleHome} />
    </Route>

    <Route path={COMMON.ROOT_PATH+"*"} component={NotFound} />
  </Route>

);
