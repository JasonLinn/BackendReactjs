import React, {Component} from 'react';
import HomeContent from './home_content';

export default class BOLoginHome extends Component {
  constructor(props){
    super(props);
    $(window).scrollTop(0);
  }
    render() {
        return (
          <div className="row">
            <div className="col-md-9">
              <div className="panel">
                <div className="panel-body" style={{padding:"0"}}>
                  <div className="example-box-wrapper">
                    <HomeContent dateStr = {this.props.params.dateStr || ""} />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              邊攔
            </div>
          </div>
        );
    }
}
