import React, {Component} from 'react';
import { Link } from 'react-router';
import * as COMMON from '../../common/common';
import Decrypt from '../../services/decrypt';

export default class MenuSidebar extends Component {
    closeSidebar(){
      var body = document.querySelector('body') // Using a class instead, see note below.
      body.classList.toggle('closed-sidebar');
      $('.glyph-icon', this).toggleClass('icon-outdent').toggleClass('icon-indent');
    }

    componentDidMount() {

    }

    render() {
      /* Sidebar menu */
      // $(function() {
      //     $('#sidebar-menu').superclick({
      //         animation: {
      //             height: 'show'
      //         },
      //         animationOut: {
      //             height: 'hide'
      //         }
      //     });
      //     var path = window.location.pathname.split('/');
      //     path = path[path.length-1];
      //
      //     if (path !== undefined) {
      //         $("#sidebar-menu").find("a[href$='" + path + "']").addClass('active');
      //         $("#sidebar-menu").find("a[href$='" + path + "']").parents().eq(3).superclick('show');
      //     }
      //
      // });

        return (
          <div id="page-sidebar">
            <div id="header-logo" className="logo-bg">
              <a href="http://www" activeClassName="active" className="logo-content-big" title="FiToBe">
                後台管理
                <i></i>
                <span></span>
              </a>
              <a href="http://www" activeClassName="active" className="logo-content-small" title="FiToBe">
                後台管理
                <i></i>
                <span></span>
              </a>
              <a id="close-sidebar" href="javascript:void(0)" title="Close sidebar" onClick={()=>this.closeSidebar()}>
                <i className="glyph-icon icon-outdent" />
              </a>
            </div>
            <div className="scroll-sidebar" style={{height:"100vw"}}>
              <ul id="sidebar-menu">

                <li>
                  <Link to={COMMON.ROOT_PATH+"/"} activeClassName="active" title="Account">
                    <i className="glyph-icon icon-linecons-pencil" />
                    <span>帳戶設定</span>
                  </Link>

                  <div className="sidebar-submenu">
                    <ul>
                      <li><Link to={COMMON.ROOT_PATH+"/"} activeClassName="active" title="Diet 1"><span>ㄅ</span></Link></li>
                      <li>
                        <Link to={COMMON.ROOT_PATH+"/"} activeClassName="active" title="Exercise 2" ><span>ㄉ</span></Link>
                      </li>
                    </ul>
                  </div>
                </li>

                <li>
                  <Link to={COMMON.ROOT_PATH+"/"} activeClassName="active" title="My Profile">
                    <i className="glyph-icon icon-linecons-user" />
                    <span>個人檔案</span>
                  </Link>
                </li>

              </ul>
            </div>
          </div>

        );
    }
}
