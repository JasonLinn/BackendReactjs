require('es6-promise').polyfill();
import 'isomorphic-fetch';
import Decrypt from './decrypt';
import * as COMMON from '../common/common';

var AuthFetchService = {
  async login(mid,userid,passwd,callback){
    !__RELEASE__ && console.log("service:login",userid,passwd);
    if (userid === null || userid == ""){
    }else{
      try {
        !__RELEASE__ && console.log("service:login",COMMON.FTH_BO_URL + '/Login');
        let response = await fetch(COMMON.FTH_BO_URL + '/Login', {
          method: 'POST',
          headers: COMMON.FETCH_HEADERS(''),
          body:JSON.stringify({
            'UserID':userid,
            'UserPWD':passwd,
            'MID':mid
          })
        });
        let r = await response;
        !__RELEASE__ && console.log("service:login",r);
        if(r.ok){
          r.json().then(function (data){
            !__RELEASE__ && console.log("service:login ok",data);
            callback(data);
          });
        } else {
          r.json().then(function (data){
            !__RELEASE__ && console.log("service:login fail：",data.message);
            callback(false);
          });
        }
      } catch(e) {
        !__RELEASE__ && console.log("login, error", e);
        callback(false);
      }
    }
  },
  async logout(uuid, token, callback){
    try {
      let response = await fetch(COMMON.FTH_BO_URL + '/LogOut?id='+uuid, {
    		method: 'POST',
    		headers: COMMON.FETCH_HEADERS(token || ''),
    	});
      let r = await response;
      if(r.ok){
  			callback(r);
  		}else{
  			callback(r);
  		}
    } catch(e) {
      !__RELEASE__ && console.log("logout, error", e);
    }
  },





  async getBy(token,uuid,time,callback2){
    if (token === null || token == ""){
    }else{
      try {
        let response = await fetch(COMMON.FTH_BO_URL + '/eat_note?uuid='+ uuid + '&time=' + Math.round(Date.parse(time)/1000), {
          method: 'GET',
          headers: COMMON.FETCH_GET_HEADERS(token)
        });
        let r = await response;
        if(r.ok){
          r.json().then(function (data){
            callback2(data);
          });
        }
      } catch(e) {
        !__RELEASE__ && console.log("getNoteBy, error", e);
      }

    }
  },
  async updateBy(token,uuid,bodyData,callback){
    if (token === null || token == ""){
    }else{
      try {
        let response = await fetch(COMMON.FTH_BO_URL + '/eat_note', {
          method: 'PUT',
          headers: COMMON.FETCH_HEADERS(token),
          body:COMMON.toQueryString(bodyData)
        });
        let r = await response;
        if(r.ok){
          r.json().then(function (data){
            !__RELEASE__ && console.log("service:note 儲存資料 ok：",data);
            callback(data);
          });
        } else {
          r.json().then(function (data){
            !__RELEASE__ && console.log("service:note 儲存資料 fail：",data.message);
          });
        }
      } catch(e) {
        !__RELEASE__ && console.log("saveNoteBy, error", e);
      }
    }
  },

  async del(token,uuid,bodyData,callback){
    if (token === null || token == ""){
    }else{
      try {
        let response = await fetch(COMMON.FTH_BO_URL + '/eatfit', {
          method: 'DELETE',
          headers: COMMON.FETCH_HEADERS(token),
          body:COMMON.toQueryString(bodyData)
        });
        let r = await response;
        if(r.ok){
          r.json().then(function (data){
            !__RELEASE__ && console.log("service:mofit 刪除資料 ok：",data);
            callback(data);
          });
        } else {
          r.json().then(function (data){
            !__RELEASE__ && console.log("service:mofit 刪除資料 fail：",data.message);
          });
        }
      } catch(e) {
        !__RELEASE__ && console.log("delSelfFoodInfo, error", e);
      }
    }
  }
}

module.exports = AuthFetchService;
