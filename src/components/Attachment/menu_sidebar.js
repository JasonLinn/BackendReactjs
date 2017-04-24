import React, {Component} from 'react';
import { Link } from 'react-router';
import * as COMMON from '../../common/common';
import Decrypt from '../../services/decrypt';
import {connect} from 'react-redux';
import BOHeader from './bo_header';
import MenuSidebarItem from './menu_sidebar_item';

function mapStateToProps(state){
    return{
      isFetching:state.fetchingStore.isFetching,
      state:state,
      date:state.dateStore.date,
      userMenu:state.userMenuStore.userMenu,
    }
};

class MenuSidebar extends Component {

    componentDidMount() {
      console.log(this.props.userMenu);
    }

    render() {

        return (
          <nav className="navbar navbar-dark bg-inverse navbar-fixed-top">
            {/* Brand and toggle get grouped for better mobile display */}
            <div className="navbar-header">
              <button className="navbar-toggler hidden-sm-up pull-sm-right" type="button" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                ☰
              </button>
              <a className="navbar-brand" href="index.html">BO 管理</a>
            </div>

            {/* Top Menu Items */}
            <BOHeader />

            <div className="collapse navbar-collapse navbar-toggleable-sm navbar-ex1-collapse">
              <ul className="nav navbar-nav side-nav list-group">
                {
                  this.props.userMenu.map(function (abcData, index) {
                    if(abcData.level == 1){
                      return <MenuSidebarItem key={index} index={index} data={abcData} />
                    }
                })
                }
              </ul>
            </div>
          </nav>
        );
    }
}

export default connect(mapStateToProps)(MenuSidebar);
