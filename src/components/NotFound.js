import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import CryptoJS from 'crypto-js';
import * as COMMON from '../common/common';

function mapStateToProps(state){
    return{
      state:state,
    }
};
class NotFound extends Component {
  componentDidMount(){

  }

  render() {
    return(
      <div className="page404">
        <div className="container" id="l1">

          <div  id="page404btn">
            <Link to={COMMON.ROOT_PATH+"/dashboard"}>

              <img src={COMMON.ROOT_PATH+"/img/b_zh.png"}/>

            </Link>

          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(NotFound);
