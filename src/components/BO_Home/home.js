import React, {Component} from 'react';
import HomeContent from './home_content';

export default class BOHome extends Component {
  constructor(props){
    super(props);
    $(window).scrollTop(0);
  }
  render() {
    return (
      <div>
        <HomeContent />
      </div>
    );
  }
}
