import React, {Component} from 'react';
// import DatePicker from 'react-bootstrap-date-picker';
import Decrypt from '../../services/decrypt';
import CryptoJS from 'crypto-js';
import {testGet} from '../../actions/AuthAction';
import {connect} from 'react-redux';

function mapStateToProps(state){
    return{
      state:state,
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

    //為了確保有當天的體重紀錄
    let x = Decrypt.decryptBOUserData();
    const time = + new Date(this.props.state.dateStore);
    const timestamp = parseInt((time/1000).toFixed());

    var dateStr = this.props.dateStr || "";
    var nDate = dateStr == "" ? new Date().toISOString():CryptoJS.AES.decrypt(dateStr, 'dts').toString(CryptoJS.enc.Utf8);
  }

  // 日期變化時啟動
  handleCalendarChange(value) {
    let x = Decrypt.decryptBOUserData();
  }

  // note變化時啟動
  handleTextareaChange(e){
  }

  // note 存檔動作
  handleNoteSave(){
    let x = Decrypt.decryptBOUserData();
  }

  render() {
    return (
      <div className="tab-content">
          <div className="tab-pane fade active in" id="track-tab-2">
            <br/>
            <div className="input-prepend input-group" style={{fontWeight:"bold"}}>
            <span className="add-on input-group-addon">
                <i className="glyph-icon icon-calendar"></i>
            </span>
              
            </div>

              <div className="form-group">

                <div className="col-sm-10">
                  <textarea name="notetet" rows={3} value=""
                    onChange={this.handleTextareaChange.bind(this)}
                    className="form-control textarea-counter textarea-autosize"/>
                  <div className="character-remaining clear input-description">

                  </div>
                </div>

                <div className="col-sm-2">
                </div>

              </div>
          </div>
      </div>
    );
  }

}

export default connect(mapStateToProps,{testGet})(HomeContent);
