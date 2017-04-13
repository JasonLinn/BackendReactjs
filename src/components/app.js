import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { checkUserAuth } from '../actions/index';
import CryptoJS from 'crypto-js';
import Decrypt from '../utils/decrypt';
import routes from '../route';
import {withRouter, browserHistory} from 'react-router';
import * as COMMON from '../common/common';

function mapStateToProps(state){
  return{
    state:state
  }
}

function routesAreAuthorized(user, routes) {

    function routeIsAuthorized(user){
      // !__RELEASE__ && console.log("this is user",user);
        if (user != undefined){
          // !__RELEASE__ && console.log("in the if");
          return true;
        }
        // !__RELEASE__ && console.log("outside");
        return false;
    };
    if (user != null){
      return routeIsAuthorized(user.name);
    } else {
      return false;
    }
};
// function checkAuth(state){
//   // !__RELEASE__ && console.log("in check auth");
//   // !__RELEASE__ && console.log(state.props.location.pathname);
//
//   const location = state.props.location.pathname;
//   var x =Decrypt.decryptData();
//   // !__RELEASE__ && console.log("printing", x);
//
//   if (x === null){
//     x ={};
//     x["uuid"]="false";
//     x["token"]="false";
//     x["location"]=location;
//     x=JSON.stringify(x);
//   }
//   state.props.checkUserAuth(x.token, x.uuid, location);
//   // !__RELEASE__ && console.log("this is home location",props.state.routing.locationBeforeTransitions.pathname);
// }


class app extends Component {

  //只會被叫一次
  //放render會被一直叫
  // 二選一
  // constructor(props){ // ES6 取代 componentWillMount（ES5用法)
  //   super(props);
  componentWillMount(e){
    var x =Decrypt.decryptData();
    // !__RELEASE__ && console.log("this is routes", routes.props);
    // !__RELEASE__ && console.log(this.props.location.pathname.trim());
    // !__RELEASE__ && console.log(x);
    var proRegex = /profitobe/;
    const location = this.props.location.pathname.trim().toLowerCase();
    var msRegex1 = /login/;
    var msRegex2 = /joinus/;
    var msRegex3 = /forget/;
    var msRegex5 = /prepare/;
    !__RELEASE__ && console.log("app",location);
    // var proRegex = /profitobe/;

    if(!msRegex1.test(location) && !msRegex2.test(location) && !msRegex3.test(location) && !msRegex5.test(location)
       && !proRegex.test(location)
    ){
      !__RELEASE__ && console.log("app",1);
      if (!routesAreAuthorized(x, routes.props)){
        !__RELEASE__ && console.log("app",2);
        browserHistory.push(COMMON.ROOT_PATH+"/login");
        return;
        // window.location = "/login";
      }
    } else if (routesAreAuthorized(x,routes.props)){
      !__RELEASE__ && console.log("app",3);
      if(proRegex.test(location)){
        !__RELEASE__ && console.log("app",4);
      } else {
        !__RELEASE__ && console.log("app",5);
        browserHistory.push(COMMON.ROOT_PATH+"/dashboard");
        return;
        // window.location=COMMON.ROOT_PATH+"/dashboard";
      }
    }
  }
  // componentDidMount() {
  //   // !__RELEASE__ && console.log("did mount");
  //    this.checkAuthorization(routes.props);
  //  }
  // componentWillReceiveProps(nextProps) {
  //   // !__RELEASE__ && console.log("will receive props");
  //    this.checkAuthorization(nextProps.routes);
  //  }

  // checkAuthorization(routes) {
  //     if (!routesAreAuthorized(x, routes)){
  //       // !__RELEASE__ && console.log("hello");
  //       // browserHistory.push("/login");
  //     } else{
  //       browserHistory.push("/dashboard");
  //     }
  // }
  // componentWillMount(){
  //   checkAuth(this);
  // }

	render() {
    return (
      <div>
      {this.props.children}
      </div>
    );
  }
}

export default connect(mapStateToProps)(app);
