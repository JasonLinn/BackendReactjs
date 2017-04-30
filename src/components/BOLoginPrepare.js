import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import * as COMMON from '../common/common';
import Decrypt from '../services/decrypt';
import {connect} from 'react-redux';

function mapStateToProps(state){
    return{
      state:state,
    }
};

class BOLoginPrepare extends Component {

  componentDidMount() {
    console.log("tppp",0);
    let x = Decrypt.decryptBOUserData();
    if(x == null){
      !__RELEASE__ && console.log("tp",0);
      browserHistory.push(COMMON.ROOT_PATH+"/login");
      return;
    }
    var self = this;
    !__RELEASE__ && console.log("tp",1);
    COMMON.wait(1000)
    .then(function(){
      !__RELEASE__ && console.log("tp",2);
      window.location = COMMON.ROOT_PATH+'/accountbo.html';
    });
  }

	render() {
    return (
      <div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(BOLoginPrepare);
