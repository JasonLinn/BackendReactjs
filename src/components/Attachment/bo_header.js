import React, {Component} from 'react';
import { Link } from 'react-router';
import * as COMMON from '../../common/common';
import Decrypt from '../../services/decrypt';
import {connect} from 'react-redux';
import {logout} from '../../actions/AuthAction';

function mapStateToProps(state){
    return{
      fetchingStore:state.fetchingStore,
      state:state,
      dateStore:state.dateStore,
    }
};

class BOHeader extends Component {

  componentDidMount() {

  }

  signOut(state) {
     !__RELEASE__ && console.log("logout",1);
     var x1 =localStorage.getItem('bouser') || '{}';
     if (x1 == '{}'){
       !__RELEASE__ && console.log("logout",2);
       window.location =  COMMON.ROOT_PATH+'/loginbo.html';
       return;
     };
     let x = Decrypt.decryptBOUserData();
     !__RELEASE__ && console.log("logout",3,x.user.uuid, x.token, x.user.name);
     this.props.logout(x.user.uuid, x.token);
     !__RELEASE__ && console.log("logout",4);
   }

  render() {
    let x = Decrypt.decryptBOUserData();
    return (
      <ul className="nav navbar-nav top-nav navbar-right pull-xs-right">
        <li className="dropdown nav-item">
          <a href="javascript:;" className="nav-link dropdown-toggle" data-toggle="dropdown"><i className="fa fa-user" /> {x.user.name} <b className="caret" /></a>
          <ul className="dropdown-menu">
            <li className="dropdown-item">
              <a href="javascript:;"><i className="fa fa-fw fa-gear" /> 設定</a>
            </li>
            <li className="divider" />
            <li className="dropdown-item">
              <a href="javascript:;" onClick={()=>{this.signOut(this)}}><i className="fa fa-fw fa-power-off" /> 登出</a>
            </li>
          </ul>
        </li>
      </ul>
    );
  }
}

export default connect(mapStateToProps,{logout})(BOHeader);
