import React, {Component} from 'react';
import CryptoJS from 'crypto-js';
import {withRouter,browserHistory} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as COMMON from '../common/common';
import routes from '../routes/route-default';

function mapStateToProps(allstate){
  return{
    state:allstate
  }
}

function routesAreAuthorized(user, routes) {
    function routeIsAuthorized(user){
        if (user != undefined){
          return true;
        }
        return false;
    };
    if (user != null){
      return routeIsAuthorized(user.name);
    } else {
      return false;
    }
};

class appWLBo extends Component {

  //只會被叫一次
  //放render會被一直叫
  // 二選一
  // constructor(props){ // ES6 取代 componentWillMount（ES5用法)
  //   super(props);
  componentWillMount(e){
    var x = Decrypt.decryptBOUserData();
    const location = this.props.location.pathname.trim().toLowerCase();
    var msRegex1 = /login/;
    var msRegex2 = /prepare/;
    !__RELEASE__ && console.log("app",location);

    if(!msRegex1.test(location) && !msRegex2.test(location)){
      !__RELEASE__ && console.log("app",1);
      if (!routesAreAuthorized(x, routes.props)){
        !__RELEASE__ && console.log("app",2);
        browserHistory.push(COMMON.ROOT_PATH+"/login");
        return;
      }
    } else if (routesAreAuthorized(x,routes.props)){
      !__RELEASE__ && console.log("app",3);
      if(proRegex.test(location)){
        !__RELEASE__ && console.log("app",4);
      } else {
        !__RELEASE__ && console.log("app",5);
        //browserHistory.push(COMMON.ROOT_PATH+"/dashboard");
        window.location = COMMON.ROOT_PATH+'/indexbo.html';
        return;
      }
    }
  }

	render() {
    return (
      <div>
      {this.props.children}
      </div>
    );
  }
}

export default connect(mapStateToProps)(appWLBo);
