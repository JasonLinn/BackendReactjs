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

class BOIndexPrepare extends Component {

  componentDidMount() {
    console.log("tpppp",0);
    let x = Decrypt.decryptBOUserData();
    if(x == null){
      !__RELEASE__ && console.log("tp",0);
      window.location = COMMON.ROOT_PATH+'/loginbo.html';
      return;
    }
    var self = this;
    !__RELEASE__ && console.log("tp",1);
    COMMON.wait(1000)
    .then(function(){
      !__RELEASE__ && console.log("tp",2);
      browserHistory.push(COMMON.ROOT_PATH+"/st")});
  }

	render() {
    return (
      <div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(BOIndexPrepare);
