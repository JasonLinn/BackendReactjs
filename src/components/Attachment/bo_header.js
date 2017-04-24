import React, {Component} from 'react';
import { Link } from 'react-router';
import * as COMMON from '../../common/common';
import Decrypt from '../../services/decrypt';

export default class BOHeader extends Component {
    componentDidMount() {

    }

    render() {

      return (
        <ul className="nav navbar-nav top-nav navbar-right pull-xs-right">
          <li className="dropdown nav-item">
            <a href="javascript:;" className="nav-link dropdown-toggle" data-toggle="dropdown"><i className="fa fa-user" /> 大名 <b className="caret" /></a>
            <ul className="dropdown-menu">
              <li className="dropdown-item">
                <a href="javascript:;"><i className="fa fa-fw fa-gear" /> 設定</a>
              </li>
              <li className="divider" />
              <li className="dropdown-item">
                <a href="javascript:;"><i className="fa fa-fw fa-power-off" /> 登出</a>
              </li>
            </ul>
          </li>
        </ul>
      );
    }
}
