import React, {Component} from 'react';
import SampleHome from './home';
import Decrypt from '../../services/decrypt';
import {connect} from 'react-redux';
import * as COMMON from '../../common/common';
import { browserHistory } from 'react-router';
import { Button } from 'reactstrap';

function mapStateToProps(state){
    return{
      state:state,
    }
};

class BOLoginIndex extends Component {

  componentWillMount(e){
    // //檢驗登入權限
    // var x = Decrypt.decryptBOUserData();
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
                <h2>範例Login</h2>
            </div>
            {this.props.children}

            <Button color="primary">primary</Button>{' '}

          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(BOLoginIndex);
