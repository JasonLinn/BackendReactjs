require('es6-promise').polyfill();
import 'isomorphic-fetch';

import Decrypt from './decrypt';
import * as COMMON from '../common/common';

var EatfitFetchService = {
  async getNoteBy(token,uuid,time,callback2){
    if (token === null || token == ""){
    }else{
      // fetch(COMMON.FTH_URL + '/eat_note?uuid='+ uuid + '&time=' + Math.round(Date.parse(time)/1000), {
      //   method: 'GET',
      //   headers: COMMON.FETCH_GET_HEADERS(token)
      // }).then(function(r){
      //   if(r.ok){
      //     r.json().then(function (data){
      //       // !__RELEASE__ && console.log("service:note 取得資料 ok：",data);
      //       callback2(data);
      //     });
      //   }
      // });


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
  async saveNoteBy(token,uuid,bodyData,callback){
    if (token === null || token == ""){
    }else{
      // fetch(COMMON.FTH_URL + '/eat_note', {
      //   method: 'PUT',
      //   headers: COMMON.FETCH_HEADERS(token),
      //   body:COMMON.toQueryString(bodyData)
      // }).then(function(r){
      //   if(r.ok){
      //     r.json().then(function (data){
      //       // !__RELEASE__ && console.log("service:note 儲存資料 ok：",data);
      //       callback(data);
      //     });
      //   } else {
      //     r.json().then(function (data){
      //       // !__RELEASE__ && console.log("service:note 儲存資料 fail：",data.message);
      //     });
      //   }
      // });


      try {
        let response = await fetch(COMMON.FTH_URL + '/eat_note', {
          method: 'PUT',
          headers: COMMON.FETCH_HEADERS(token),
          body:COMMON.toQueryString(bodyData)
        });
        let r = await response;
        if(r.ok){
          r.json().then(function (data){
            // !__RELEASE__ && console.log("service:note 儲存資料 ok：",data);
            callback(data);
          });
        } else {
          r.json().then(function (data){
            // !__RELEASE__ && console.log("service:note 儲存資料 fail：",data.message);
          });
        }
      } catch(e) {
        !__RELEASE__ && console.log("saveNoteBy, error", e);
      }
    }
  },
  async updateEatfit(token,uuid,eatData,callback){
    if (token === null || token == ""){
    }else{
      // fetch(COMMON.FTH_URL + '/eatfit', {
      //   method: 'PUT',
      //   headers: COMMON.FETCH_HEADERS(token),
      //   body:COMMON.toQueryString(eatData)
      // }).then(function(r){
      //   if(r.ok){
      //     r.json().then(function (data){
      //       // !__RELEASE__ && console.log("service:eatfit 更新資料 ok：",data);
      //       callback(data);
      //     });
      //   } else {
      //     r.json().then(function (data){
      //       // !__RELEASE__ && console.log("service:eatfit 更新資料 fail：",data.message);
      //     });
      //   }
      // });


      try {
        let response = await fetch(COMMON.FTH_URL + '/eatfit', {
          method: 'PUT',
          headers: COMMON.FETCH_HEADERS(token),
          body:COMMON.toQueryString(eatData)
        });
        let r = await response;
        if(r.ok){
          r.json().then(function (data){
            // !__RELEASE__ && console.log("service:eatfit 更新資料 ok：",data);
            callback(data);
          });
        } else {
          r.json().then(function (data){
            // !__RELEASE__ && console.log("service:eatfit 更新資料 fail：",data.message);
          });
        }
      } catch(e) {
        !__RELEASE__ && console.log("updateEatfit, error", e);
      }
    }
  },
  async saveSelfFoodInfo(token,uuid,eatData,callback){
    // !__RELEASE__ && console.log("service:self 存檔資料 ：",token,uuid,eatData);
    if (token === null || token == ""){
    }else{
      // fetch(COMMON.FTH_URL + '/eatfit/new', {
      //   method: 'POST',
      //   headers: COMMON.FETCH_HEADERS(token),
      //   body:COMMON.toQueryString(eatData)
      // }).then(function(r){
      //   // !__RELEASE__ && console.log("service:eat：",r);
      //   if(r.ok){
      //     r.json().then(function (data){
      //       // !__RELEASE__ && console.log("service:self 存檔資料 ok：",data);
      //       callback(data);
      //     });
      //   } else {
      //
      //     if(r.status == 406){
      //       r.json().then(function (data){
      //         // !__RELEASE__ && console.log("service:self 存檔資料 ok：",data);
      //         callback(r.status);
      //       });
      //     }
      //     r.json().then(function (data){
      //       // !__RELEASE__ && console.log("service:self 存檔資料 fail：",data.message);
      //       // !__RELEASE__ && console.log("service:eat fail：",data.message);
      //     });
      //   }
      // });


      try {
        let response = await fetch(COMMON.FTH_URL + '/eatfit/new', {
          method: 'POST',
          headers: COMMON.FETCH_HEADERS(token),
          body:COMMON.toQueryString(eatData)
        });
        let r = await response;
        // !__RELEASE__ && console.log("service:eat：",r);
        if(r.ok){
          r.json().then(function (data){
            // !__RELEASE__ && console.log("service:self 存檔資料 ok：",data);
            callback(data);
          });
        } else {

          if(r.status == 406){
            r.json().then(function (data){
              // !__RELEASE__ && console.log("service:self 存檔資料 ok：",data);
              callback(r.status);
            });
          }
          r.json().then(function (data){
            // !__RELEASE__ && console.log("service:self 存檔資料 fail：",data.message);
            // !__RELEASE__ && console.log("service:eat fail：",data.message);
          });
        }
      } catch(e) {
        !__RELEASE__ && console.log("saveSelfFoodInfo, error", e);
      }
    }
  },
  async delSelfFoodInfo(token,uuid,bodyData,callback){
    if (token === null || token == ""){
    }else{
      // fetch(COMMON.FTH_URL + '/eatfit', {
      //   method: 'DELETE',
      //   headers: COMMON.FETCH_HEADERS(token),
      //   body:COMMON.toQueryString(bodyData)
      // }).then(function(r){
      //   if(r.ok){
      //     r.json().then(function (data){
      //       // !__RELEASE__ && console.log("service:mofit 刪除資料 ok：",data);
      //       callback(data);
      //     });
      //   } else {
      //     r.json().then(function (data){
      //       // !__RELEASE__ && console.log("service:mofit 刪除資料 fail：",data.message);
      //     });
      //   }
      // });


      try {
        let response = await fetch(COMMON.FTH_URL + '/eatfit', {
          method: 'DELETE',
          headers: COMMON.FETCH_HEADERS(token),
          body:COMMON.toQueryString(bodyData)
        });
        let r = await response;
        if(r.ok){
          r.json().then(function (data){
            // !__RELEASE__ && console.log("service:mofit 刪除資料 ok：",data);
            callback(data);
          });
        } else {
          r.json().then(function (data){
            // !__RELEASE__ && console.log("service:mofit 刪除資料 fail：",data.message);
          });
        }
      } catch(e) {
        !__RELEASE__ && console.log("delSelfFoodInfo, error", e);
      }
    }
  },
  async getEatfitBy(token,uuid,time,callback2){
    if (token === null || token == ""){
    }else{
      // fetch(COMMON.FTH_URL + '/eatfit?uuid='+ uuid + '&time=' + Math.round(Date.parse(time)/1000), {
      //   method: 'GET',
      //   headers: COMMON.FETCH_GET_HEADERS(token)
      // }).then(function(r){
      //   if(r.ok){
      //     r.json().then(function (data){
      //       // !__RELEASE__ && console.log("service:eat 取得資料 ok：",data);
      //       callback2(data);
      //     });
      //   } else {
      //     r.json().then(function (data){
      //       // !__RELEASE__ && console.log("service:eat 取得資料 fail：",data.message);
      //     });
      //   }
      // });


      try {
        let response = await fetch(COMMON.FTH_URL + '/eatfit?uuid='+ uuid + '&time=' + Math.round(Date.parse(time)/1000), {
          method: 'GET',
          headers: COMMON.FETCH_GET_HEADERS(token)
        });
        let r = await response;
        if(r.ok){
          r.json().then(function (data){
            !__RELEASE__ && console.log("service:eat 取得資料 ok：",data);
            callback2(data);
          });
        } else {
          r.json().then(function (data){
            !__RELEASE__ && console.log("service:eat 取得資料 fail：",data.message);
          });
        }
      } catch(e) {
        !__RELEASE__ && console.log("getEatfitBy, error", e);
      }
    }
  },

  async foodSearch(token,uuid,foodName, page, callback){
    if (token === null || token == ""){
    }else{
      // fetch(COMMON.FTH_URL + '/food_info/search?name='+foodName+'&page=' + page, {
      //   method: 'GET',
      //   headers: COMMON.FETCH_GET_HEADERS(token)
      // }).then(function(r){
      //   if(r.ok){
      //     r.json().then(function (data){
      //       // !__RELEASE__ && console.log("service:recent 取得資料 ok：",data);
      //       callback(data);
      //     });
      //   } else {
      //     r.json().then(function (data){
      //       // !__RELEASE__ && console.log("service:recent 取得資料 fail：",data.message);
      //     });
      //   }
      // });


      try {
        let response = await fetch(COMMON.FTH_URL + '/food_info/search?name='+foodName+'&page=' + page, {
          method: 'GET',
          headers: COMMON.FETCH_GET_HEADERS(token)
        });
        let r = await response;
        if(r.ok){
          r.json().then(function (data){
            // !__RELEASE__ && console.log("service:recent 取得資料 ok：",data);
            callback(data);
          });
        } else {
          r.json().then(function (data){
            // !__RELEASE__ && console.log("service:recent 取得資料 fail：",data.message);
          });
        }
      } catch(e) {
        !__RELEASE__ && console.log("foodSearch, error", e);
      }
    }
  },
  async getRecent(token,uuid,callback){
    if (token === null || token == ""){
    }else{
      // fetch(COMMON.FTH_URL + '/eatfit/recent?uuid='+uuid, {
      //   method: 'GET',
      //   headers: COMMON.FETCH_GET_HEADERS(token)
      // }).then(function(r){
      //   if(r.ok){
      //     r.json().then(function (data){
      //       // !__RELEASE__ && console.log("service:recent 取得資料 ok：",data);
      //       callback(data);
      //     });
      //   } else {
      //     r.json().then(function (data){
      //       // !__RELEASE__ && console.log("service:recent 取得資料 fail：",data.message);
      //     });
      //   }
      // });


      try {
        let response = await fetch(COMMON.FTH_URL + '/eatfit/recent?uuid='+uuid, {
          method: 'GET',
          headers: COMMON.FETCH_GET_HEADERS(token)
        });
        let r = await response;
        if(r.ok){
          r.json().then(function (data){
            // !__RELEASE__ && console.log("service:recent 取得資料 ok：",data);
            callback(data);
          });
        } else {
          r.json().then(function (data){
            // !__RELEASE__ && console.log("service:recent 取得資料 fail：",data.message);
          });
        }
      } catch(e) {
        !__RELEASE__ && console.log("getRecent, error", e);
      }
    }
  },
  async getSpecificFoodInfo(token,uuid,id, callback){
    if (token === null || token == ""){
    }else{
      // fetch(COMMON.FTH_URL + '/self_food_info?uuid='+uuid+'&self_food_id='+id, {
      //   method: 'GET',
      //   headers: COMMON.FETCH_GET_HEADERS(token)
      // }).then(function(r){
      //   if(r.ok){
      //     r.json().then(function (data){
      //       // !__RELEASE__ && console.log("service:recent 取得資料 ok：",data);
      //       callback(data);
      //     });
      //   } else {
      //     r.json().then(function (data){
      //       // !__RELEASE__ && console.log("service:recent 取得資料 fail：",data.message);
      //     });
      //   }
      // });


      try {
        let response = await fetch(COMMON.FTH_URL + '/self_food_info?uuid='+uuid+'&self_food_id='+id, {
          method: 'GET',
          headers: COMMON.FETCH_GET_HEADERS(token)
        });
        let r = await response;
        if(r.ok){
          r.json().then(function (data){
            !__RELEASE__ && console.log("service:recent 取得資料 ok：",data);
            callback(data);
          });
        } else {
          r.json().then(function (data){
            !__RELEASE__ && console.log("service:recent 取得資料 fail：",data.message);
          });
        }
      } catch(e) {
        !__RELEASE__ && console.log("getSpecificFoodInfo, error", e);
      }
    }
  }
}

module.exports = EatfitFetchService;
