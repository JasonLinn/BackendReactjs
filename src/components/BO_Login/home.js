import React, {Component} from 'react';
import HomeContent from './home_content';

export default class BOLoginHome extends Component {
  constructor(props){
    super(props);
    $(window).scrollTop(0);
  }
  render() {
    return (
      <div className="auth-container">
        <div className="card">
          <header className="auth-header">
            <h1 className="auth-title">
                <div className="logo">
                  <span className="l l1"></span>
                  <span className="l l2"></span>
                  <span className="l l3"></span>
                  <span className="l l4"></span>
                  <span className="l l5"></span>
                </div> 後台管理
            </h1>
          </header>
          <HomeContent />
        </div>
      </div>
    );
  }
}
