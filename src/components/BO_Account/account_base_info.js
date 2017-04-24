import React, {Component} from 'react';
// import DatePicker from 'react-bootstrap-date-picker';
import Decrypt from '../../services/decrypt';
import CryptoJS from 'crypto-js';
import {connect} from 'react-redux';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

function mapStateToProps(state){
    return{
      fetchingStore:state.fetchingStore,
      state:state,
      dateStore:state.dateStore,
    }
};

class BOAccountBaseInfo extends Component {

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
    !__RELEASE__ && console.log("base info",x);
  }


  render() {
    let x = Decrypt.decryptBOUserData();
    Number.prototype.padLeft = function(base,chr){
        var  len = (String(base || 10).length - String(this).length)+1;
        return len > 0? new Array(len).join(chr || '0')+this : this;
    }
    var d = new Date(x.user.createTime*1000),dformat = [d.getFullYear(),(d.getMonth()+1).padLeft(),
               d.getDate().padLeft()
               ].join('/') +' ' +
              [d.getHours().padLeft(),
               d.getMinutes().padLeft(),
               d.getSeconds().padLeft()].join(':');

    return (
      <div id="page-wrapper">
        <div className="container-fluid">
          {/* Page Heading */}
          <div className="row">
            <div className="col-lg-12">
              <h1 className="page-header">
                基本資料詳細設定
              </h1>
            </div>
          </div>
          <Form>
            <FormGroup row>
              <Label for="accountName" sm={2}>用戶名</Label>
              <Col sm={10}>{x.user.name}</Col>
            </FormGroup>
            <FormGroup row>
              <Label for="nickName" sm={2}>暱稱</Label>
              <Col sm={10}>{x.user.zhNickName}</Col>
            </FormGroup>
            <FormGroup row>
              <Label for="oriPassword" sm={2}>開始密碼</Label>
              <Col sm={10}>
                <Input type="password" name="oriPassword" id="oriPassword" placeholder="請輸入原始密碼" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="chgPassword" sm={2}>密碼</Label>
              <Col sm={10}>
                <Input type="password" name="chgPassword" id="chgPassword" placeholder="密碼須為6-12位的英文字母和數字組合" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="cfmPassword" sm={2}>確認密碼</Label>
              <Col sm={10}>
                <Input type="password" name="cfmPassword" id="cfmPassword" placeholder="請輸入正確密碼" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2}>新增日期</Label>
              <Col sm={10}>{dformat}</Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2}>最後登入時間</Label>
              <Col sm={10}></Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2}>登入次數</Label>
              <Col sm={10}></Col>
            </FormGroup>
            {x.user.roleType == 0?<div>
            <FormGroup row>
              <Label sm={2}>默認限額設定</Label>
              <Col sm={10}></Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2}>餘額</Label>
              <Col sm={10}>{x.merchant1.balance}</Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2}>審批狀態</Label>
              <Col sm={{ size: 10 }}>
                <FormGroup check>
                  <Label check>
                    <Input type="checkbox" id="ck1" defaultChecked={x.merchant1.affiliateNeedApproval}/>{' '}
                    代理商是否需要審批
                    <Input type="checkbox" id="ck2" defaultChecked={x.merchant1.memberNeedApproval}/>{' '}
                    會員是否需要審批
                  </Label>
                </FormGroup>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="Select11" sm={2}>默認代理</Label>
              <Col sm={2}>
                大股東:<Input type="select" name="select" id="Select11" />
              </Col>
              <Col sm={2}>
                股東:<Input type="select" name="select" id="Select12" />
              </Col>
              <Col sm={2}>
                總代:<Input type="select" name="select" id="Select13" />
              </Col>
              <Col sm={2}>
                代理:<Input type="select" name="select" id="Select14" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="Select21" sm={2}>默認總代</Label>
              <Col sm={2}>
                大股東:<Input type="select" name="select" id="Select21" />
              </Col>
              <Col sm={2}>
                股東:<Input type="select" name="select" id="Select22" />
              </Col>
              <Col sm={2}>
                總代:<Input type="select" name="select" id="Select23" />
              </Col>
            </FormGroup>
            </div>
            :""}

            <FormGroup check row>
              <Col sm={{ size: 10, offset: 2 }}>
                <Button>確定</Button>
              </Col>
            </FormGroup>
          </Form>

        </div>
      </div>
    );
  }

}

export default connect(mapStateToProps)(BOAccountBaseInfo);
