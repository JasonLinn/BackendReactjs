import React, {Component} from 'react';
// import DatePicker from 'react-bootstrap-date-picker';
import Decrypt from '../../services/decrypt';
import CryptoJS from 'crypto-js';
import {connect} from 'react-redux';
import { Button } from 'reactstrap';

function mapStateToProps(state){
    return{
      fetchingStore:state.fetchingStore,
      state:state,
      dateStore:state.dateStore,
    }
};

class BOAccountBaseInfo extends Component {

  constructor(props){
    super(props);
  }
  // TODO 要載入dashboard所選中的日期
  // this.props.state.mofitStore.date 要換成 而且可能直接進入此頁 要預設 當天日期

  componentWillMount(e){
    // 進入元件時可能要先訂為當天的日期
    // this.handleCalendarChange(new Date().toISOString());
    // !__RELEASE__ && console.log("tk mf chdate td",1,new Date().toISOString());
    // !__RELEASE__ && console.log("tk mf chdate sd",2,this.props.state.mofitStore.date);
  }

  // 掛載完成時選出當天的 資料
  componentDidMount(node){

    let x = Decrypt.decryptBOUserData();
  }


  render() {
    return (
      <div id="page-wrapper">
        <div className="container-fluid">
          {/* Page Heading */}
          <div className="row">
            <div className="col-lg-12">
              <h1 className="page-header">
                基本資料
              </h1>
            </div>
          </div>
          {/* /.row */}
          <div className="row">
            <div className="col-xl-3 col-lg-6">
              <div className="card card-primary card-inverse">
                <div className="card-header card-primary">
                  <div className="row">
                    <div className="col-xs-3">
                      <i className="fa fa-comments fa-5x" />
                    </div>
                    <div className="col-xs-9 text-xs-right">
                      <div className="huge">26</div>
                      <div>New Comments!</div>
                    </div>
                  </div>
                </div>
                <div className="card-footer card-default">
                  <a href="javascript:;">
                    <span className="pull-xs-left">View Details</span>
                    <span className="pull-xs-right"><i className="fa fa-arrow-circle-right" /></span>
                    <div className="clearfix" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default connect(mapStateToProps)(BOAccountBaseInfo);
