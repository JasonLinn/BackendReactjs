require('es6-promise').polyfill();
import 'isomorphic-fetch';
import Decrypt from './decrypt';
import * as COMMON from '../common/common';

var AuthFetchService = {
  async getBy(token,uuid,time,callback2){
    if (token === null || token == ""){
    }else{
      try {
        let response = await fetch(COMMON.FTH_URL + '/eat_note?uuid='+ uuid + '&time=' + Math.round(Date.parse(time)/1000), {
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
        let response = await fetch(COMMON.FTH_URL + '/eat_note', {
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

  async insert(token,uuid,eatData,callback){
    !__RELEASE__ && console.log("service:self 存檔資料 ：",token,uuid,eatData);
    if (token === null || token == ""){
    }else{
      try {
        let response = await fetch(COMMON.FTH_URL + '/eatfit/new', {
          method: 'POST',
          headers: COMMON.FETCH_HEADERS(token),
          body:COMMON.toQueryString(eatData)
        });
        let r = await response;
        !__RELEASE__ && console.log("service:eat：",r);
        if(r.ok){
          r.json().then(function (data){
            !__RELEASE__ && console.log("service:self 存檔資料 ok：",data);
            callback(data);
          });
        } else {

          if(r.status == 406){
            r.json().then(function (data){
              !__RELEASE__ && console.log("service:self 存檔資料 ok：",data);
              callback(r.status);
            });
          }
          r.json().then(function (data){
            !__RELEASE__ && console.log("service:self 存檔資料 fail：",data.message);
            !__RELEASE__ && console.log("service:eat fail：",data.message);
          });
        }
      } catch(e) {
        !__RELEASE__ && console.log("saveSelfFoodInfo, error", e);
      }
    }
  },
  async del(token,uuid,bodyData,callback){
    if (token === null || token == ""){
    }else{
      try {
        let response = await fetch(COMMON.FTH_URL + '/eatfit', {
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
