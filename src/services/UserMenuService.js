require('es6-promise').polyfill();
import 'isomorphic-fetch';
import Decrypt from './decrypt';
import * as COMMON from '../common/common';

var UserMenuFetchService = {
  async getMenu(uuid,token,callback){
    if (token === null || token == ""){
    }else{
      try {
        let response = await fetch(COMMON.FTH_BO_URL + '/BOUserMenu/'+ uuid, {
          method: 'GET',
          headers: COMMON.FETCH_GET_HEADERS(token)
        });
        let r = await response;
        !__RELEASE__ && console.log("getMenu", 1);
        if(r.ok){
          !__RELEASE__ && console.log("getMenu", 2, r.ok);
          r.json().then(function (data){
            !__RELEASE__ && console.log("getMenu", 3, data);
            callback(data);
          });
        }else{
          !__RELEASE__ && console.log("getMenu", 4);
          callback(false);
        }
      } catch(e) {
        callback(false);
        !__RELEASE__ && console.log("getMenu, error", e);
      }

    }
  }
}

module.exports = UserMenuFetchService;
