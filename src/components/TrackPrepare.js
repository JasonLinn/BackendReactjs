import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import * as COMMON from '../common/common';
import Decrypt from '../utils/decrypt';
import {connect} from 'react-redux';

function mapStateToProps(state){
    return{
      state:state,
    }
};

class TrackPrepare extends Component {

  componentDidMount() {
    let x = Decrypt.decryptData();
    if(x == null){
      !__RELEASE__ && console.log("tp",0);
      browserHistory.push(COMMON.ROOT_PATH+"/track/sample");
      return;
    }
    var self = this;
    !__RELEASE__ && console.log("tp",1);
    COMMON.wait(1000)
    .then(function(){
      !__RELEASE__ && console.log("tp",2);
      browserHistory.push(COMMON.ROOT_PATH+"/track/sample")});
  }

	render() {
    return (
      <div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(TrackPrepare);
