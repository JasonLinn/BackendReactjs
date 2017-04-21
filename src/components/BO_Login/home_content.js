import React, {Component} from 'react';
import Decrypt from '../../services/decrypt';
import CryptoJS from 'crypto-js';
import {loginUser} from '../../actions/AuthAction';
import {connect} from 'react-redux';
import { Button } from 'reactstrap';

function mapStateToProps(state){
    return{
      state:state,
      isLogin:state.loginStore.isLogin,
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

  // 日期變化時啟動
  handleCalendarChange(value) {
    let x = Decrypt.decryptBOUserData();
  }

  // note變化時啟動
  handleLogin(e){

    this.props.loginUser(11,'hunk.kuo','zxc123');

  }

  render() {
    return (
      <div>
        <Button color="primary" onClick={this.handleLogin.bind(this)}>登入</Button>{' '}
      </div>
    );
  }

}

export default connect(mapStateToProps,{loginUser})(HomeContent);
