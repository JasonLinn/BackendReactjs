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

  // 登入事件
  handleLogin(e){
    e.preventDefault();

    var username = this.refs.username.value.trim();
    var password = this.refs.password.value.trim();

    if(username == '' || password == ''){
      alert('no input');
      return;
    }

    this.props.loginUser(11,username,password);
  }

  render() {
    return (
      <div className="auth-content">
        <form id="login-form">
          <div className="form-group">
            <label htmlFor="username">帳號</label>
            <input type="text" className="form-control underlined" name="username" id="username" ref="username" placeholder="Your account" required value="hunk.kuo"/>
          </div>
          <div className="form-group">
            <label htmlFor="password">密碼</label>
            <input type="password" className="form-control underlined" name="password" id="password" ref="password" placeholder="Your password" required value="zxc123"/>
          </div>
          <div className="form-group">
            <Button color="primary" className="btn btn-block btn-primary" onClick={this.handleLogin.bind(this)}>登入</Button>
          </div>
        </form>
      </div>
    );
  }

}

export default connect(mapStateToProps,{loginUser})(HomeContent);
