import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import * as COMMON from '../common/common';
import Decrypt from '../services/decrypt';
import {connect} from 'react-redux';
import {getMenu} from '../actions/UserMenuAction';

function mapStateToProps(state){
    return{
      state:state,
      userMenu:state.userMenuStore.userMenu,
    }
};

class BOAccountPrepare extends Component {

  componentDidMount() {
    let x = Decrypt.decryptBOUserData();
    if(x == null){
      window.location = COMMON.ROOT_PATH+'/loginbo.html';
      return;
    }
    var self = this;
    !__RELEASE__ && console.log("x",x.user);
    // 取出 選單資料 備用
    !__RELEASE__ && console.log("a p m",this.props.userMenu.length);
    if(this.props.userMenu.length == 0){
      this.props.getMenu(x.user.uuid,x.token);
    }
    // 應該導向到 accountbo.html
    COMMON.wait(1000)
    .then(function(){
      !__RELEASE__ && console.log("acct p",2);
      browserHistory.push(COMMON.ROOT_PATH+"/account/baseinfo");
    });
  }

	render() {
    return (
      <div>
      </div>
    );
  }
}

export default connect(mapStateToProps,{getMenu})(BOAccountPrepare);
