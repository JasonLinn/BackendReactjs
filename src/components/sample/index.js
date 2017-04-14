import React, {Component} from 'react';
import SampleHome from './home';
import Decrypt from '../../services/decrypt';
import {connect} from 'react-redux';
import * as COMMON from '../../common/common';
import ReactGA from 'react-ga';
import { browserHistory } from 'react-router';

function mapStateToProps(state){
    return{
      state:state,
    }
};

class SampleIndex extends Component {

  componentWillMount(e){
    // //檢驗登入權限
    // var x = Decrypt.decryptUserData();
    // if (x !=null){
    //   this.props.checkUserAuth(x.token, x.uuid, this.props.location.pathname);
    // } else{
    //   browserHistory.push(COMMON.ROOT_PATH+"/login");
    // }
  }

  render() {
    return (
      <div id="page-wrapper">

        <div id="mobile-navigation">
          <button id="nav-toggle" className="collapsed" data-toggle="collapse" data-target="#page-sidebar"><span /></button>
        </div>

        <div id="page-content-wrapper">
          <div id="page-content">

            <div id="page-title" style={{marginBottom:"10px"}}>
                <h2>範例</h2>
            </div>
            {this.props.children}

          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(SampleIndex);
