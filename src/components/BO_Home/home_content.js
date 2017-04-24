import React, {Component} from 'react';
// import DatePicker from 'react-bootstrap-date-picker';
import Decrypt from '../../services/decrypt';
import CryptoJS from 'crypto-js';
import {testGet} from '../../actions/AuthAction';
import {connect} from 'react-redux';
import { Button } from 'reactstrap';

function mapStateToProps(state){
    return{
      fetchingStore:state.fetchingStore,
      state:state,
      dateStore:state.dateStore,
    }
};

class HomeContent extends Component {

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
                Dashboard <small>Statistics Overview</small>
              </h1>
              <ol className="breadcrumb">
                <li className="active">
                  <i className="fa fa-dashboard" /> Dashboard
                </li>
              </ol>
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
            <div className="col-xl-3 col-lg-6">
              <div className="card card-green card-inverse">
                <div className="card-header card-green">
                  <div className="row">
                    <div className="col-xs-3">
                      <i className="fa fa-tasks fa-5x" />
                    </div>
                    <div className="col-xs-9 text-xs-right">
                      <div className="huge">12</div>
                      <div>New Tasks!</div>
                    </div>
                  </div>
                </div>
                <div className="card-footer card-green">
                  <a href="javascript:;">
                    <span className="pull-xs-left">View Details</span>
                    <span className="pull-xs-right"><i className="fa fa-arrow-circle-right" /></span>
                    <div className="clearfix" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6">
              <div className="card card-yellow card-inverse">
                <div className="card-header card-yellow">
                  <div className="row">
                    <div className="col-xs-3">
                      <i className="fa fa-shopping-cart fa-5x" />
                    </div>
                    <div className="col-xs-9 text-xs-right">
                      <div className="huge">124</div>
                      <div>New Orders!</div>
                    </div>
                  </div>
                </div>
                <div className="card-footer card-yellow">
                  <a href="javascript:;">
                    <span className="pull-xs-left">View Details</span>
                    <span className="pull-xs-right"><i className="fa fa-arrow-circle-right" /></span>
                    <div className="clearfix" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6">
              <div className="card card-red card-inverse">
                <div className="card-header card-red">
                  <div className="row">
                    <div className="col-xs-3">
                      <i className="fa fa-support fa-5x" />
                    </div>
                    <div className="col-xs-9 text-xs-right">
                      <div className="huge">13</div>
                      <div>Support Tickets!</div>
                    </div>
                  </div>
                </div>
                <div className="card-footer card-red">
                  <a href="javascript:;">
                    <span className="pull-xs-left">View Details</span>
                    <span className="pull-xs-right"><i className="fa fa-arrow-circle-right" /></span>
                    <div className="clearfix" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* /.row */}
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header card-default">
                  <i className="fa fa-bar-chart-o fa-fw" /> Area Chart
                </div>
                <div className="card-block">
                  <div id="morris-area-chart" />
                </div>
              </div>
            </div>
          </div>
          {/* /.row */}
          <div className="row">
            <div className="col-xl-4 col-lg-12">
              <div className="card">
                <div className="card-header card-default">
                  <i className="fa fa-long-arrow-right fa-fw" /> Donut Chart
                </div>
                <div className="card-block">
                  <div id="morris-donut-chart" />
                  <div className="text-xs-right">
                    <a href="javascript:;">View Details <i className="fa fa-arrow-circle-right" /></a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-12">
              <div className="card card-default">
                <div className="card-header card-default">
                  <i className="fa fa-clock-o fa-fw" /> Tasks Card
                </div>
                <div className="card-block">
                  <div className="list-group">
                    <a href="javascript:;" className="list-group-item">
                      <span className="label label-pill label-default pull-xs-right">just now</span>
                      <i className="fa fa-fw fa-calendar" /> Calendar updated
                    </a>
                    <a href="javascript:;" className="list-group-item">
                      <span className="label label-pill label-default pull-xs-right">4 minutes ago</span>
                      <i className="fa fa-fw fa-comment" /> Commented on a post
                    </a>
                    <a href="javascript:;" className="list-group-item">
                      <span className="label label-pill label-default pull-xs-right">23 minutes ago</span>
                      <i className="fa fa-fw fa-truck" /> Order 392 shipped
                    </a>
                    <a href="javascript:;" className="list-group-item">
                      <span className="label label-pill label-default pull-xs-right">46 minutes ago</span>
                      <i className="fa fa-fw fa-money" /> Invoice 653 has been paid
                    </a>
                    <a href="javascript:;" className="list-group-item">
                      <span className="label label-pill label-default pull-xs-right">1 hour ago</span>
                      <i className="fa fa-fw fa-user" /> A new user has been added
                    </a>
                    <a href="javascript:;" className="list-group-item">
                      <span className="label label-pill label-default pull-xs-right">2 hours ago</span>
                      <i className="fa fa-fw fa-check" /> Completed task: "pick up dry cleaning"
                    </a>
                    <a href="javascript:;" className="list-group-item">
                      <span className="label label-pill label-default pull-xs-right">yesterday</span>
                      <i className="fa fa-fw fa-globe" /> Saved the world
                    </a>
                    <a href="javascript:;" className="list-group-item">
                      <span className="label label-pill label-default pull-xs-right">two days ago</span>
                      <i className="fa fa-fw fa-check" /> Completed task: "fix error on sales page"
                    </a>
                  </div>
                  <div className="text-xs-right">
                    <a href="javascript:;">View All Activity <i className="fa fa-arrow-circle-right" /></a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-12">
              <div className="card card-default">
                <div className="card-header card-default">
                  <i className="fa fa-money fa-fw" /> Transactions Card
                </div>
                <div className="card-block">
                  <div className="table-responsive">
                    <table className="table table-bordered table-hover table-striped">
                      <thead>
                        <tr>
                          <th>Order #</th>
                          <th>Order Date</th>
                          <th>Order Time</th>
                          <th>Amount (USD)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>3326</td>
                          <td>10/21/2013</td>
                          <td>3:29 PM</td>
                          <td>$321.33</td>
                        </tr>
                        <tr>
                          <td>3325</td>
                          <td>10/21/2013</td>
                          <td>3:20 PM</td>
                          <td>$234.34</td>
                        </tr>
                        <tr>
                          <td>3324</td>
                          <td>10/21/2013</td>
                          <td>3:03 PM</td>
                          <td>$724.17</td>
                        </tr>
                        <tr>
                          <td>3323</td>
                          <td>10/21/2013</td>
                          <td>3:00 PM</td>
                          <td>$23.71</td>
                        </tr>
                        <tr>
                          <td>3322</td>
                          <td>10/21/2013</td>
                          <td>2:49 PM</td>
                          <td>$8345.23</td>
                        </tr>
                        <tr>
                          <td>3321</td>
                          <td>10/21/2013</td>
                          <td>2:23 PM</td>
                          <td>$245.12</td>
                        </tr>
                        <tr>
                          <td>3320</td>
                          <td>10/21/2013</td>
                          <td>2:15 PM</td>
                          <td>$5663.54</td>
                        </tr>
                        <tr>
                          <td>3319</td>
                          <td>10/21/2013</td>
                          <td>2:13 PM</td>
                          <td>$943.45</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="text-xs-right">
                    <a href="javascript:;">View All Transactions <i className="fa fa-arrow-circle-right" /></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </div>
    );
  }

}

export default connect(mapStateToProps,{testGet})(HomeContent);
