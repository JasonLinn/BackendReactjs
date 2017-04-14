import React from 'react';
import {Route, IndexRoute, Redirect, IndexRedirect} from 'react-router';

import app from './components/app';
import Login from './components/Login'
import JoinUs from './components/JoinUs'
import Forgetpassword from './components/Forgetpassword'
import SignUp from './components/SignUp'
import NotFound from './components/NotFound'
import Dashboard from './components/Dashboard/DashboardView'
import Profile from './components/Profile/Profile'
import Setting from './components/Setting'

import TrackPrepare from './components/TrackPrepare';

import ProgressCharts from './components/ProgressCharts'

import Track from './components/track'
import MofitIndex from './components/Track_mofit/index'
import MofitHome from './components/Track_mofit/home';
import MofitNewAreobic from './components/Track_mofit/new_areobic'
import MofitNewWeightTrain from './components/Track_mofit/new_weight_train'

import EatfitIndex from './components/Track_eatfit/index';
import EatfitHome from './components/Track_eatfit/home';
import EatfitFoodInfo from './components/Track_eatfit/detail_foodinfo';

import BodyInfoIndex from './components/Track_body_info/index'
import BodyInfoHome from './components/Track_body_info/home';

import EatfitNewBreakfast from './components/Track_eatfit/new_breakfast';
import EatfitNewLunch from './components/Track_eatfit/new_lunch';
import EatfitNewDinner from './components/Track_eatfit/new_dinner';
import EatfitNewOther from './components/Track_eatfit/new_other';

import GoToBex from './go_to_bex';
import ProfitobeHome from './components/Profitobe/profitobeHome';
import ProfitobeIndex from './components/Profitobe/profitobeIndex';
import ProfitobeService from './components/Profitobe/profitobeService';
import ProfitobeInvoice from './components/Profitobe/invoice';
import ProfitobeProfile from './components/Profitobe/profitobeProfile';

import MessageCenter from './components/Message/messageCenter';

import { checkUserAuth } from './actions/index'

import * as COMMON from './common/common';

export default(

  <Route path={COMMON.ROOT_PATH+"/"} component={app}>
    <IndexRedirect to={COMMON.ROOT_PATH+"/prepare"} />
    <Redirect from={COMMON.ROOT_PATH+"/index.html"} to={COMMON.ROOT_PATH+"/prepare"} />
    <Route path={COMMON.ROOT_PATH+"/prepare"} component={TrackPrepare}/>

    <Route path={COMMON.ROOT_PATH+"/login"} component={Login} fb={FB}/>
    <Route path={COMMON.ROOT_PATH+"/joinus"} component={JoinUs}/>
    <Route path={COMMON.ROOT_PATH+"/forget"} component={Forgetpassword}/>
    <Route path={COMMON.ROOT_PATH+"/dashboard"} component={Dashboard} />
    <Route path={COMMON.ROOT_PATH+"/progresscharts"} component={ProgressCharts}/>

    <Route path={COMMON.ROOT_PATH+"/track"} component={Track}>
      <Route path="eatfit" component={EatfitIndex}>
          <IndexRoute component={EatfitHome} />
          <Route path="home(/:dateStr)" component={EatfitHome} />
          <Route path="foodInfo" component={EatfitFoodInfo} />
          <Route path="addNewBreakfast" component={EatfitNewBreakfast} />
          <Route path="addNewLunch" component={EatfitNewLunch} />
          <Route path="addNewDinner" component={EatfitNewDinner} />
          <Route path="addNewOther" component={EatfitNewOther} />
      </Route>
      <Route path="mofit" component={MofitIndex} >
        <IndexRoute component={MofitHome} />
        <Route path="home(/:dateStr)" component={MofitHome} />
        <Route path="addAreobic" component={MofitNewAreobic} />
        <Route path="addWeightTrain" component={MofitNewWeightTrain} />
      </Route>
      <Route path="bodyInfo" component={BodyInfoIndex} >
        <IndexRoute component={BodyInfoHome} />
        <Route path="home" component={BodyInfoHome} />
      </Route>
    </Route>
    <Route path={COMMON.ROOT_PATH+"/profile"} component={Profile}>
        <IndexRoute component={Profile} />
    </Route>
    <Route path={COMMON.ROOT_PATH+"/setting"} component={Setting}>
        <IndexRoute component={Setting} />
    </Route>

    <Route path={COMMON.ROOT_PATH+"/pbx/*"} component={GoToBex} />
    <Route path={COMMON.ROOT_PATH+"/pbxpayend/:tp"} component={Login}/>

    <Route path={COMMON.ROOT_PATH+"/profitobe"} component={ProfitobeIndex} >
      <IndexRoute component={ProfitobeHome}/>
      <Route path="profile/:profileID" >
        <IndexRoute component={ProfitobeProfile} />
        <Route path="invoice/:invoiceSelected" component={ProfitobeInvoice} />
      </Route>
    </Route>


    <Route path={COMMON.ROOT_PATH+"*"} component={NotFound} />
  </Route>

);
