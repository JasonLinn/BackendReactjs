import React, {Component} from 'react';
import BOHome from './home';
import Decrypt from '../../services/decrypt';
import {connect} from 'react-redux';
import * as COMMON from '../../common/common';
import { browserHistory } from 'react-router';
import { Button } from 'reactstrap';
import MenuSidebar from '../Attachment/menu_sidebar';

function mapStateToProps(state){
    return{
      state:state,
    }
};

class BOAccountIndex extends Component {

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
      <div id="wrapper">
        {/* Navigation */}
        <MenuSidebar />
        {this.props.children}
      </div>
    );
  }
}

export default connect(mapStateToProps)(BOAccountIndex);
