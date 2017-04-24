import React, {Component} from 'react';
import { Link } from 'react-router';
import * as COMMON from '../../common/common';
import Decrypt from '../../services/decrypt';
import {connect} from 'react-redux';

function mapStateToProps(state){
    return{
      isFetching:state.fetchingStore.isFetching,
      state:state,
      date:state.dateStore.date,
      userMenu:state.userMenuStore.userMenu,
    }
};

class MenuSidebarItem extends Component {

  render() {
    var index = this.props.index;
    var abc = this.props.data;

    return (
      <li className="list-group-item">
        <a href="javascript:;" data-toggle="collapse" data-target={"#"+ abc.sfName}>
          {abc.sfName} <i className="fa fa-fw fa-caret-down" />
        </a>
        <ul id={abc.sfName} className="list-group collapse">
          {
          this.props.userMenu.map(function (l2Data, index2) {
            if(l2Data.parentSFID == abc.sfid){
              return <li key={index2} className="list-group-item">
                <a href="javascript:;">{l2Data.sfName}</a>
              </li>
            };
          })
          }
        </ul>
      </li>

    );
  }
}

export default connect(mapStateToProps)(MenuSidebarItem);
