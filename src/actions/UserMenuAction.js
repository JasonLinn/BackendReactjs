import CryptoJS from 'crypto-js';
import {browserHistory} from 'react-router';
import Decrypt from '../services/decrypt';
import * as COMMON from '../common/common';
import UserMenuFetchService from '../services/UserMenuService';

// 交給 dispatch 用的函式 區段===================================================
export function action_GetMenu(data){
  return{type:'BO_USER_MENU',DataObj:data};
}

// ~============================================================================
export function getMenu(uuid, token) {
	return function (dispatch) {
    UserMenuFetchService.getMenu(uuid, token, function(result){
			if (result != false){
				dispatch(action_GetMenu(result));
			} else {
				!__RELEASE__ && console.log("loginUser",3,result);
				dispatch(action_GetMenu([]));
			}
    });
  };
}
